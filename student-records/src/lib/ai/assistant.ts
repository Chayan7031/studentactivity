import { prisma } from "@/lib/prisma";
import { AICategory, MessageRole } from "@prisma/client";

export class AIAssistantService {
  private static OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  private static API_URL = 'https://api.openai.com/v1/chat/completions';

  // Create a new conversation
  static async createConversation(studentId: string, title: string, category: AICategory) {
    try {
      const conversation = await prisma.aIConversation.create({
        data: {
          studentId,
          title,
          category
        }
      });
      return conversation;
    } catch (error) {
      console.error('Error creating AI conversation:', error);
      throw new Error('Failed to create conversation');
    }
  }

  // Get conversation with messages
  static async getConversation(conversationId: string) {
    try {
      const conversation = await prisma.aIConversation.findUnique({
        where: { id: conversationId },
        include: {
          messages: {
            orderBy: { createdAt: 'asc' }
          },
          student: {
            include: {
              certificates: {
                where: { verificationStatus: 'VERIFIED' }
              },
              skills: {
                include: { skill: true }
              },
              achievements: {
                where: { verificationStatus: 'VERIFIED' }
              },
              jobs: true,
              internships: true
            }
          }
        }
      });
      return conversation;
    } catch (error) {
      console.error('Error fetching conversation:', error);
      throw new Error('Failed to fetch conversation');
    }
  }

  // Get all conversations for a student
  static async getStudentConversations(studentId: string) {
    try {
      const conversations = await prisma.aIConversation.findMany({
        where: { studentId },
        include: {
          messages: {
            orderBy: { createdAt: 'desc' },
            take: 1
          }
        },
        orderBy: { updatedAt: 'desc' }
      });
      return conversations;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw new Error('Failed to fetch conversations');
    }
  }

  // Send message and get AI response
  static async sendMessage(conversationId: string, userMessage: string) {
    try {
      // Get conversation with student data for context
      const conversation = await this.getConversation(conversationId);
      if (!conversation) {
        throw new Error('Conversation not found');
      }

      // Save user message
      const userMsg = await prisma.aIMessage.create({
        data: {
          conversationId,
          role: MessageRole.USER,
          content: userMessage
        }
      });

      // Generate AI response
      const aiResponse = await this.generateAIResponse(conversation, userMessage);

      // Save AI response
      const aiMsg = await prisma.aIMessage.create({
        data: {
          conversationId,
          role: MessageRole.ASSISTANT,
          content: aiResponse,
          metadata: {
            model: 'gpt-3.5-turbo',
            timestamp: new Date().toISOString()
          }
        }
      });

      // Update conversation timestamp
      await prisma.aIConversation.update({
        where: { id: conversationId },
        data: { updatedAt: new Date() }
      });

      return {
        userMessage: userMsg,
        aiResponse: aiMsg
      };
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message');
    }
  }

  // Generate AI response using OpenAI or fallback logic
  static async generateAIResponse(conversation: any, userMessage: string): Promise<string> {
    try {
      const studentProfile = this.buildStudentProfile(conversation.student);
      const conversationHistory = conversation.messages.map((msg: any) => ({
        role: msg.role.toLowerCase(),
        content: msg.content
      }));

      if (this.OPENAI_API_KEY) {
        return await this.callOpenAI(studentProfile, conversationHistory, userMessage, conversation.category);
      } else {
        return this.generateFallbackResponse(studentProfile, userMessage, conversation.category);
      }
    } catch (error) {
      console.error('Error generating AI response:', error);
      return "I apologize, but I'm having trouble generating a response right now. Please try again later or contact support if the issue persists.";
    }
  }

  // Call OpenAI API
  static async callOpenAI(studentProfile: string, history: any[], userMessage: string, category: AICategory): Promise<string> {
    try {
      const systemPrompt = this.buildSystemPrompt(studentProfile, category);
      
      const messages = [
        { role: 'system', content: systemPrompt },
        ...history,
        { role: 'user', content: userMessage }
      ];

      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: messages,
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "I couldn't generate a response.";
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw error;
    }
  }

  // Build system prompt based on student profile and category
  static buildSystemPrompt(studentProfile: string, category: AICategory): string {
    const basePrompt = `You are a career guidance AI assistant helping students in their professional development. Here's the student's profile:

${studentProfile}

Please provide helpful, personalized advice based on their background and goals. Keep responses concise, actionable, and encouraging.`;

    const categorySpecificPrompts = {
      [AICategory.CAREER_GUIDANCE]: "Focus on career paths, industry insights, and professional development advice.",
      [AICategory.SKILL_RECOMMENDATION]: "Suggest relevant skills to develop based on their current profile and career goals.",
      [AICategory.RESUME_HELP]: "Provide resume writing tips and help improve their professional presentation.",
      [AICategory.INTERVIEW_PREP]: "Offer interview preparation advice and practice questions.",
      [AICategory.JOB_SEARCH]: "Help with job search strategies and identifying opportunities.",
      [AICategory.LEARNING_PATH]: "Create learning paths and recommend courses or resources.",
      [AICategory.PROJECT_IDEAS]: "Suggest project ideas that align with their skills and interests.",
      [AICategory.GENERAL_ADVICE]: "Provide general professional and academic advice."
    };

    return `${basePrompt}\n\n${categorySpecificPrompts[category]}`;
  }

  // Build student profile summary for AI context
  static buildStudentProfile(student: any): string {
    const profile = [];
    
    // Basic info
    profile.push(`Name: ${student.firstName} ${student.lastName}`);
    profile.push(`Department: ${student.department}`);
    profile.push(`Course: ${student.course}`);
    profile.push(`Year: ${student.year}, Semester: ${student.semester}`);
    
    if (student.currentGPA) {
      profile.push(`Current GPA: ${student.currentGPA}`);
    }

    // Skills
    if (student.skills?.length > 0) {
      const skillsList = student.skills.map((s: any) => `${s.skill.name} (${s.proficiency})`).join(', ');
      profile.push(`Skills: ${skillsList}`);
    }

    // Certificates
    if (student.certificates?.length > 0) {
      const certsList = student.certificates.map((c: any) => c.title).join(', ');
      profile.push(`Certificates: ${certsList}`);
    }

    // Achievements
    if (student.achievements?.length > 0) {
      const achievementsList = student.achievements.map((a: any) => a.title).join(', ');
      profile.push(`Achievements: ${achievementsList}`);
    }

    // Work experience
    const experience = [];
    if (student.jobs?.length > 0) {
      experience.push(`Jobs: ${student.jobs.length}`);
    }
    if (student.internships?.length > 0) {
      experience.push(`Internships: ${student.internships.length}`);
    }
    if (experience.length > 0) {
      profile.push(`Work Experience: ${experience.join(', ')}`);
    }

    return profile.join('\n');
  }

  // Fallback response when OpenAI is not available
  static generateFallbackResponse(studentProfile: string, userMessage: string, category: AICategory): string {
    const responses = {
      [AICategory.CAREER_GUIDANCE]: [
        "Based on your profile, I'd recommend exploring careers that align with your current skills and interests. Consider researching job market trends in your field and networking with professionals.",
        "Your academic background shows great potential! Consider reaching out to career counselors or industry professionals for personalized advice about career paths in your domain.",
      ],
      [AICategory.SKILL_RECOMMENDATION]: [
        "Looking at your current skill set, I'd suggest focusing on both technical and soft skills. Consider learning complementary technologies and improving communication skills.",
        "To enhance your profile, consider adding skills that are in high demand in your field. Online courses and certifications can be a great way to build expertise.",
      ],
      [AICategory.RESUME_HELP]: [
        "When crafting your resume, highlight your achievements with specific metrics. Include your verified certificates and skills prominently, and tailor it to each job application.",
        "Make sure your resume tells a story of your growth and potential. Include projects, internships, and any leadership experiences you've had.",
      ],
      [AICategory.INTERVIEW_PREP]: [
        "Practice common interview questions and prepare specific examples from your experience. Research the company thoroughly and prepare thoughtful questions to ask.",
        "Focus on the STAR method (Situation, Task, Action, Result) when describing your experiences. Practice with mock interviews to build confidence.",
      ],
      [AICategory.JOB_SEARCH]: [
        "Use multiple job search platforms and consider applying directly to company websites. Leverage your network and consider reaching out to alumni in your field.",
        "Create a strong online presence on professional platforms. Tailor your applications to each role and follow up appropriately after interviews.",
      ],
      [AICategory.LEARNING_PATH]: [
        "Create a structured learning plan based on your career goals. Mix theoretical knowledge with practical projects to reinforce your learning.",
        "Consider both formal courses and hands-on projects. Build a portfolio that demonstrates your skills and continuous learning mindset.",
      ],
      [AICategory.PROJECT_IDEAS]: [
        "Consider projects that solve real-world problems in your area of interest. This will help you build practical skills while creating portfolio pieces.",
        "Look for project ideas that combine multiple technologies or skills you want to develop. Open source contributions can also be valuable.",
      ],
      [AICategory.GENERAL_ADVICE]: [
        "Focus on continuous learning and building a strong professional network. Stay updated with industry trends and be open to new opportunities.",
        "Balance technical skills with soft skills like communication and teamwork. Seek feedback regularly and be willing to step out of your comfort zone.",
      ]
    };

    const categoryResponses = responses[category] || responses[AICategory.GENERAL_ADVICE];
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
  }

  // Get AI insights for student dashboard
  static async getStudentInsights(studentId: string) {
    try {
      const student = await prisma.student.findUnique({
        where: { id: studentId },
        include: {
          certificates: { where: { verificationStatus: 'VERIFIED' } },
          skills: { include: { skill: true } },
          achievements: { where: { verificationStatus: 'VERIFIED' } },
          jobs: true,
          internships: true
        }
      });

      if (!student) return null;

      const insights = [];

      // Profile completion insight
      const completionPercentage = this.calculateCompletionPercentage(student);
      if (completionPercentage < 70) {
        insights.push({
          type: 'profile',
          priority: 'high',
          title: 'Complete Your Profile',
          message: `Your profile is ${completionPercentage}% complete. Adding more details will help you get better career recommendations.`,
          action: 'Complete Profile'
        });
      }

      // Skills insights
      if (student.skills.length < 5) {
        insights.push({
          type: 'skills',
          priority: 'medium',
          title: 'Add More Skills',
          message: 'Consider adding more skills to strengthen your profile and improve job matches.',
          action: 'Add Skills'
        });
      }

      // Certificate insights
      if (student.certificates.length === 0) {
        insights.push({
          type: 'certificates',
          priority: 'medium',
          title: 'Upload Certificates',
          message: 'Adding certificates will validate your skills and improve your credibility.',
          action: 'Upload Certificate'
        });
      }

      // Experience insights
      if (student.jobs.length === 0 && student.internships.length === 0) {
        insights.push({
          type: 'experience',
          priority: 'high',
          title: 'Gain Work Experience',
          message: 'Consider applying for internships or part-time roles to build practical experience.',
          action: 'Find Opportunities'
        });
      }

      return insights.slice(0, 3); // Return top 3 insights
    } catch (error) {
      console.error('Error generating insights:', error);
      return [];
    }
  }

  // Calculate profile completion percentage
  static calculateCompletionPercentage(student: any): number {
    let score = 0;
    
    // Basic info (40%)
    if (student.firstName && student.lastName) score += 10;
    if (student.department && student.course) score += 10;
    if (student.rollNumber) score += 10;
    if (student.profilePhoto) score += 10;
    
    // Academic details (20%)
    if (student.currentGPA) score += 10;
    if (student.admissionDate) score += 10;
    
    // Skills and experience (40%)
    if (student.skills.length > 0) score += 10;
    if (student.skills.length >= 3) score += 5;
    if (student.certificates.length > 0) score += 10;
    if (student.jobs.length > 0 || student.internships.length > 0) score += 15;
    
    return Math.min(score, 100);
  }
}