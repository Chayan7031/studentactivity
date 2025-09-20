import { prisma } from "@/lib/prisma";
import { 
  ProficiencyLevel, 
  VerificationStatus, 
  CertificateCategory,
  AchievementCategory,
  AchievementLevel,
  JobType,
  WorkMode,
  ExperienceCategory,
  NotificationType
} from "@prisma/client";

export class StudentService {
  
  // Get student profile with all related data
  static async getStudentProfile(userId: string) {
    try {
      const student = await prisma.student.findUnique({
        where: { userId },
        include: {
          user: true,
          certificates: {
            orderBy: { createdAt: 'desc' },
            include: {
              verifier: {
                include: { user: true }
              }
            }
          },
          skills: {
            include: {
              skill: true
            },
            orderBy: { createdAt: 'desc' }
          },
          achievements: {
            orderBy: { createdAt: 'desc' },
            include: {
              verifier: {
                include: { user: true }
              }
            }
          },
          jobs: {
            orderBy: { startDate: 'desc' },
            include: {
              verifier: {
                include: { user: true }
              }
            }
          },
          internships: {
            orderBy: { startDate: 'desc' },
            include: {
              verifier: {
                include: { user: true }
              }
            }
          },
          experiences: {
            orderBy: { startDate: 'desc' }
          },
          notifications: {
            where: { read: false },
            orderBy: { createdAt: 'desc' },
            take: 10
          }
        }
      });

      if (!student) return null;

      // Calculate completion percentage
      const completionScore = this.calculateProfileCompletion(student);

      return {
        ...student,
        completionPercentage: completionScore
      };
    } catch (error) {
      console.error('Error fetching student profile:', error);
      throw new Error('Failed to fetch student profile');
    }
  }

  // Calculate profile completion percentage
  static calculateProfileCompletion(student: any): number {
    let score = 0;
    const maxScore = 100;

    // Basic info (30 points)
    if (student.firstName && student.lastName) score += 5;
    if (student.profilePhoto) score += 5;
    if (student.dateOfBirth) score += 3;
    if (student.address && student.city && student.state) score += 7;
    if (student.department && student.course) score += 5;
    if (student.currentGPA) score += 5;

    // Academic info (20 points)
    if (student.rollNumber) score += 5;
    if (student.batch) score += 3;
    if (student.year && student.semester) score += 5;
    if (student.admissionDate) score += 3;
    if (student.expectedGraduation) score += 4;

    // Activities (50 points)
    if (student.certificates?.length > 0) score += 15;
    if (student.skills?.length >= 3) score += 10;
    if (student.achievements?.length > 0) score += 10;
    if (student.jobs?.length > 0 || student.internships?.length > 0) score += 10;
    if (student.experiences?.length > 0) score += 5;

    return Math.min(score, maxScore);
  }

  // Get student dashboard stats
  static async getStudentStats(studentId: string) {
    try {
      const [
        certificatesCount,
        verifiedCertificates,
        skillsCount,
        achievementsCount,
        verifiedAchievements,
        jobsCount,
        internshipsCount,
        experiencesCount,
        recentActivities
      ] = await Promise.all([
        prisma.certificate.count({ where: { studentId } }),
        prisma.certificate.count({ 
          where: { 
            studentId, 
            verificationStatus: VerificationStatus.VERIFIED 
          } 
        }),
        prisma.studentSkill.count({ where: { studentId } }),
        prisma.achievement.count({ where: { studentId } }),
        prisma.achievement.count({ 
          where: { 
            studentId, 
            verificationStatus: VerificationStatus.VERIFIED 
          } 
        }),
        prisma.job.count({ where: { studentId } }),
        prisma.internship.count({ where: { studentId } }),
        prisma.experience.count({ where: { studentId } }),
        prisma.studentActivity.findMany({
          where: { studentId },
          orderBy: { createdAt: 'desc' },
          take: 5
        })
      ]);

      return {
        certificates: {
          total: certificatesCount,
          verified: verifiedCertificates,
          pending: certificatesCount - verifiedCertificates
        },
        skills: skillsCount,
        achievements: {
          total: achievementsCount,
          verified: verifiedAchievements,
          pending: achievementsCount - verifiedAchievements
        },
        experience: {
          jobs: jobsCount,
          internships: internshipsCount,
          other: experiencesCount
        },
        recentActivities
      };
    } catch (error) {
      console.error('Error fetching student stats:', error);
      throw new Error('Failed to fetch student statistics');
    }
  }

  // Create or update student profile
  static async updateStudentProfile(userId: string, data: any) {
    try {
      const student = await prisma.student.upsert({
        where: { userId },
        update: {
          ...data,
          updatedAt: new Date()
        },
        create: {
          userId,
          ...data,
          profileCompleted: this.isProfileComplete(data)
        },
        include: {
          user: true
        }
      });

      // Log activity
      await this.logActivity(student.id, 'update_profile', 'profile');

      return student;
    } catch (error) {
      console.error('Error updating student profile:', error);
      throw new Error('Failed to update student profile');
    }
  }

  // Check if profile is complete
  static isProfileComplete(data: any): boolean {
    const requiredFields = [
      'firstName', 'lastName', 'rollNumber', 'department', 
      'course', 'year', 'semester', 'batch', 'admissionDate'
    ];
    return requiredFields.every(field => data[field]);
  }

  // Add certificate
  static async addCertificate(studentId: string, certificateData: any) {
    try {
      const certificate = await prisma.certificate.create({
        data: {
          studentId,
          ...certificateData,
          verificationStatus: VerificationStatus.PENDING
        }
      });

      // Create notification
      await this.createNotification(
        studentId,
        'Certificate Uploaded',
        `Your certificate "${certificateData.title}" has been uploaded and is pending verification.`,
        NotificationType.INFO,
        'certificate',
        certificate.id
      );

      // Log activity
      await this.logActivity(studentId, 'upload_certificate', 'certificate', {
        certificateId: certificate.id,
        title: certificateData.title
      });

      return certificate;
    } catch (error) {
      console.error('Error adding certificate:', error);
      throw new Error('Failed to add certificate');
    }
  }

  // Add skill
  static async addSkill(studentId: string, skillId: string, proficiency: ProficiencyLevel, description?: string) {
    try {
      const studentSkill = await prisma.studentSkill.upsert({
        where: {
          studentId_skillId: {
            studentId,
            skillId
          }
        },
        update: {
          proficiency,
          description,
          updatedAt: new Date()
        },
        create: {
          studentId,
          skillId,
          proficiency,
          description
        },
        include: {
          skill: true
        }
      });

      // Log activity
      await this.logActivity(studentId, 'add_skill', 'skill', {
        skillId,
        proficiency
      });

      return studentSkill;
    } catch (error) {
      console.error('Error adding skill:', error);
      throw new Error('Failed to add skill');
    }
  }

  // Get available skills
  static async getAvailableSkills(category?: string) {
    try {
      const skills = await prisma.skill.findMany({
        where: category ? { category } : {},
        orderBy: { name: 'asc' }
      });
      return skills;
    } catch (error) {
      console.error('Error fetching skills:', error);
      throw new Error('Failed to fetch skills');
    }
  }

  // Create notification
  static async createNotification(
    studentId: string,
    title: string,
    message: string,
    type: NotificationType,
    category?: string,
    entityId?: string
  ) {
    try {
      return await prisma.notification.create({
        data: {
          studentId,
          title,
          message,
          type,
          category,
          entityId
        }
      });
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  }

  // Log student activity
  static async logActivity(
    studentId: string,
    action: string,
    category?: string,
    metadata?: any,
    ipAddress?: string,
    userAgent?: string
  ) {
    try {
      return await prisma.studentActivity.create({
        data: {
          studentId,
          action,
          category,
          metadata,
          ipAddress,
          userAgent
        }
      });
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  }

  // Get notifications
  static async getNotifications(studentId: string, unreadOnly = false) {
    try {
      return await prisma.notification.findMany({
        where: {
          studentId,
          ...(unreadOnly && { read: false })
        },
        orderBy: { createdAt: 'desc' },
        take: 50
      });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw new Error('Failed to fetch notifications');
    }
  }

  // Mark notification as read
  static async markNotificationRead(notificationId: string) {
    try {
      return await prisma.notification.update({
        where: { id: notificationId },
        data: {
          read: true,
          readAt: new Date()
        }
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw new Error('Failed to mark notification as read');
    }
  }
}