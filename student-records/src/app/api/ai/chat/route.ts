import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { AIAssistantService } from '@/lib/ai/assistant';
import { prisma } from '@/lib/prisma';
import { AICategory } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get student record
    const student = await prisma.student.findUnique({
      where: { userId }
    });

    if (!student) {
      return NextResponse.json(
        { error: 'Student profile not found' },
        { status: 404 }
      );
    }

    const { message, conversationId, category } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    let currentConversationId = conversationId;

    // Create new conversation if none exists
    if (!currentConversationId) {
      const conversation = await AIAssistantService.createConversation(
        student.id, 
        'AI Chat Session', 
        (category as AICategory) || AICategory.GENERAL_ADVICE
      );
      currentConversationId = conversation.id;
    }

    // Send message and get AI response
    const result = await AIAssistantService.sendMessage(currentConversationId, message);

    return NextResponse.json({
      conversationId: currentConversationId,
      userMessage: result.userMessage,
      aiResponse: result.aiResponse
    });

  } catch (error) {
    console.error('Error in AI chat:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');

    // Get student record
    const student = await prisma.student.findUnique({
      where: { userId }
    });

    if (!student) {
      return NextResponse.json(
        { error: 'Student profile not found' },
        { status: 404 }
      );
    }

    if (conversationId) {
      // Get specific conversation
      const conversation = await AIAssistantService.getConversation(conversationId);
      return NextResponse.json(conversation);
    } else {
      // Get all conversations for student
      const conversations = await AIAssistantService.getStudentConversations(student.id);
      return NextResponse.json(conversations);
    }

  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}