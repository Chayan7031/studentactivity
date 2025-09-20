import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { CertificateService } from '@/lib/database/certificate';
import { prisma } from '@/lib/prisma';
import { CertificateCategory } from '@prisma/client';

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') as CertificateCategory;
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let certificates;

    if (search) {
      certificates = await CertificateService.searchCertificates(student.id, search);
    } else if (category) {
      certificates = await CertificateService.getCertificatesByCategory(student.id, category);
    } else if (status) {
      certificates = await CertificateService.getCertificatesByStatus(student.id, status as any);
    } else {
      certificates = await CertificateService.getStudentCertificates(student.id);
    }

    return NextResponse.json(certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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

    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'issuer', 'issueDate', 'category', 'filePath', 'fileType', 'fileSize'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Convert date strings to Date objects
    const certificateData = {
      ...data,
      issueDate: new Date(data.issueDate),
      expiryDate: data.expiryDate ? new Date(data.expiryDate) : null,
      tags: data.tags || []
    };

    const certificate = await CertificateService.createCertificate(student.id, certificateData);
    
    return NextResponse.json(certificate);
  } catch (error) {
    console.error('Error creating certificate:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}