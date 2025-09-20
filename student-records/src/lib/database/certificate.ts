import { prisma } from "@/lib/prisma";
import { CertificateCategory, VerificationStatus } from "@prisma/client";
import { StudentService } from "./student";

export class CertificateService {
  
  // Get all certificates for a student
  static async getStudentCertificates(studentId: string) {
    try {
      const certificates = await prisma.certificate.findMany({
        where: { studentId },
        include: {
          verifier: {
            include: { user: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
      
      return certificates;
    } catch (error) {
      console.error('Error fetching certificates:', error);
      throw new Error('Failed to fetch certificates');
    }
  }

  // Get certificate by ID
  static async getCertificateById(certificateId: string, studentId?: string) {
    try {
      const certificate = await prisma.certificate.findFirst({
        where: {
          id: certificateId,
          ...(studentId && { studentId })
        },
        include: {
          student: {
            include: { user: true }
          },
          verifier: {
            include: { user: true }
          }
        }
      });
      
      return certificate;
    } catch (error) {
      console.error('Error fetching certificate:', error);
      throw new Error('Failed to fetch certificate');
    }
  }

  // Create new certificate
  static async createCertificate(studentId: string, certificateData: {
    title: string;
    description?: string;
    issuer: string;
    issueDate: Date;
    expiryDate?: Date;
    credentialId?: string;
    credentialUrl?: string;
    filePath: string;
    fileType: string;
    fileSize: number;
    category: CertificateCategory;
    tags?: string[];
  }) {
    try {
      const certificate = await prisma.certificate.create({
        data: {
          studentId,
          ...certificateData,
          verificationStatus: VerificationStatus.PENDING,
          tags: certificateData.tags || []
        },
        include: {
          student: {
            include: { user: true }
          }
        }
      });

      // Create notification for student
      await StudentService.createNotification(
        studentId,
        'Certificate Uploaded Successfully',
        `Your certificate "${certificateData.title}" has been uploaded and is pending verification.`,
        'INFO',
        'certificate',
        certificate.id
      );

      // Log activity
      await StudentService.logActivity(
        studentId,
        'upload_certificate',
        'certificate',
        {
          certificateId: certificate.id,
          title: certificateData.title,
          issuer: certificateData.issuer,
          category: certificateData.category
        }
      );

      return certificate;
    } catch (error) {
      console.error('Error creating certificate:', error);
      throw new Error('Failed to create certificate');
    }
  }

  // Update certificate
  static async updateCertificate(certificateId: string, studentId: string, updateData: any) {
    try {
      // Check if certificate belongs to student
      const existingCertificate = await this.getCertificateById(certificateId, studentId);
      if (!existingCertificate) {
        throw new Error('Certificate not found or access denied');
      }

      // Don't allow updates if already verified
      if (existingCertificate.verificationStatus === VerificationStatus.VERIFIED) {
        throw new Error('Cannot update verified certificate');
      }

      const certificate = await prisma.certificate.update({
        where: { id: certificateId },
        data: {
          ...updateData,
          verificationStatus: VerificationStatus.PENDING // Reset to pending after update
        },
        include: {
          student: {
            include: { user: true }
          }
        }
      });

      // Log activity
      await StudentService.logActivity(
        studentId,
        'update_certificate',
        'certificate',
        {
          certificateId: certificate.id,
          title: certificate.title
        }
      );

      return certificate;
    } catch (error) {
      console.error('Error updating certificate:', error);
      throw error;
    }
  }

  // Delete certificate
  static async deleteCertificate(certificateId: string, studentId: string) {
    try {
      // Check if certificate belongs to student
      const existingCertificate = await this.getCertificateById(certificateId, studentId);
      if (!existingCertificate) {
        throw new Error('Certificate not found or access denied');
      }

      // Don't allow deletion if already verified (optional - you may want to allow this)
      if (existingCertificate.verificationStatus === VerificationStatus.VERIFIED) {
        throw new Error('Cannot delete verified certificate');
      }

      await prisma.certificate.delete({
        where: { id: certificateId }
      });

      // Log activity
      await StudentService.logActivity(
        studentId,
        'delete_certificate',
        'certificate',
        {
          certificateId: certificateId,
          title: existingCertificate.title
        }
      );

      return { success: true };
    } catch (error) {
      console.error('Error deleting certificate:', error);
      throw error;
    }
  }

  // Get certificates by verification status
  static async getCertificatesByStatus(studentId: string, status: VerificationStatus) {
    try {
      const certificates = await prisma.certificate.findMany({
        where: {
          studentId,
          verificationStatus: status
        },
        include: {
          verifier: {
            include: { user: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      return certificates;
    } catch (error) {
      console.error('Error fetching certificates by status:', error);
      throw new Error('Failed to fetch certificates');
    }
  }

  // Get certificates by category
  static async getCertificatesByCategory(studentId: string, category: CertificateCategory) {
    try {
      const certificates = await prisma.certificate.findMany({
        where: {
          studentId,
          category
        },
        include: {
          verifier: {
            include: { user: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      return certificates;
    } catch (error) {
      console.error('Error fetching certificates by category:', error);
      throw new Error('Failed to fetch certificates');
    }
  }

  // Search certificates
  static async searchCertificates(studentId: string, searchQuery: string) {
    try {
      const certificates = await prisma.certificate.findMany({
        where: {
          studentId,
          OR: [
            { title: { contains: searchQuery, mode: 'insensitive' } },
            { issuer: { contains: searchQuery, mode: 'insensitive' } },
            { description: { contains: searchQuery, mode: 'insensitive' } },
            { tags: { hasSome: [searchQuery] } }
          ]
        },
        include: {
          verifier: {
            include: { user: true }
          }
        },
        orderBy: { createdAt: 'desc' }
      });

      return certificates;
    } catch (error) {
      console.error('Error searching certificates:', error);
      throw new Error('Failed to search certificates');
    }
  }

  // Get certificate statistics
  static async getCertificateStats(studentId: string) {
    try {
      const [total, verified, pending, rejected] = await Promise.all([
        prisma.certificate.count({ where: { studentId } }),
        prisma.certificate.count({ 
          where: { studentId, verificationStatus: VerificationStatus.VERIFIED } 
        }),
        prisma.certificate.count({ 
          where: { studentId, verificationStatus: VerificationStatus.PENDING } 
        }),
        prisma.certificate.count({ 
          where: { studentId, verificationStatus: VerificationStatus.REJECTED } 
        })
      ]);

      // Get category breakdown
      const categoryStats = await prisma.certificate.groupBy({
        by: ['category'],
        where: { studentId },
        _count: { category: true }
      });

      // Get recent certificates
      const recent = await prisma.certificate.findMany({
        where: { studentId },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          title: true,
          issuer: true,
          verificationStatus: true,
          createdAt: true
        }
      });

      return {
        total,
        verified,
        pending,
        rejected,
        categoryBreakdown: categoryStats.map(stat => ({
          category: stat.category,
          count: stat._count.category
        })),
        recent
      };
    } catch (error) {
      console.error('Error fetching certificate statistics:', error);
      throw new Error('Failed to fetch certificate statistics');
    }
  }

  // Verify certificate (Admin function)
  static async verifyCertificate(
    certificateId: string, 
    adminId: string, 
    status: VerificationStatus.VERIFIED | VerificationStatus.REJECTED,
    rejectionReason?: string
  ) {
    try {
      const certificate = await prisma.certificate.update({
        where: { id: certificateId },
        data: {
          verificationStatus: status,
          verifiedBy: adminId,
          verifiedAt: new Date(),
          rejectionReason: status === VerificationStatus.REJECTED ? rejectionReason : null
        },
        include: {
          student: true
        }
      });

      // Create notification for student
      const notificationTitle = status === VerificationStatus.VERIFIED 
        ? 'Certificate Verified' 
        : 'Certificate Rejected';
      
      const notificationMessage = status === VerificationStatus.VERIFIED
        ? `Your certificate "${certificate.title}" has been verified and is now part of your official record.`
        : `Your certificate "${certificate.title}" was rejected. ${rejectionReason || 'Please check the details and resubmit if necessary.'}`;

      await StudentService.createNotification(
        certificate.studentId,
        notificationTitle,
        notificationMessage,
        status === VerificationStatus.VERIFIED ? 'SUCCESS' : 'ERROR',
        'certificate',
        certificate.id
      );

      return certificate;
    } catch (error) {
      console.error('Error verifying certificate:', error);
      throw new Error('Failed to verify certificate');
    }
  }
}