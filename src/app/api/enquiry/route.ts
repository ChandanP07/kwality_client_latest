import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Please login to submit an enquiry' }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, phone, company, printerName, message } = body;

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    const enquiry = await prisma.enquiry.create({
      data: {
        name: name.trim(),
        email: email?.trim() || session.user?.email || '',
        phone: phone.trim(),
        company: company?.trim() || '',
        printerName: printerName?.trim() || '',
        message: message?.trim() || '',
        userEmail: session.user?.email || '',
      },
    });

    return NextResponse.json({ success: true, id: enquiry.id }, { status: 201 });
  } catch (error) {
    console.error('Enquiry error:', error);
    return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const enquiries = await prisma.enquiry.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(enquiries);
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
