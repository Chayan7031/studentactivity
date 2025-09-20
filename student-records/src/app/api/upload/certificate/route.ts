import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { FileHandler } from '@/lib/upload/fileHandler';
import { prisma } from '@/lib/prisma';

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

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!title) {
      return NextResponse.json(
        { error: 'Certificate title is required' },
        { status: 400 }
      );
    }

    // Upload file
    const uploadResult = await FileHandler.uploadCertificate(file, student.id, title);

    return NextResponse.json({
      success: true,
      filePath: uploadResult.filePath,
      fileSize: uploadResult.fileSize,
      fileType: uploadResult.fileType,
      fileName: file.name
    });

  } catch (error: any) {
    console.error('Error uploading certificate:', error);
    return NextResponse.json(
      { error: error.message || 'File upload failed' },
      { status: 500 }
    );
  }
}