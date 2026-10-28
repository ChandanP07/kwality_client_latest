// client/src/app/api/auth/register/route.ts
// Creates a new CLIENT user.
// Does NOT set firmName/industry here — those are collected during onboarding.
// After registering, user logs in → middleware sees onboarded=false → /onboarding
// → onboarding sets firmName + creates ClientProfile → dashboard access granted.

import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, password } = body;

    if (!name?.trim() || !email?.trim() || !password) {
      return NextResponse.json(
        { error: 'Name, email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'This email is already registered. Please log in.' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        name:          name.trim(),
        email:         email.toLowerCase().trim(),
        password:      hashedPassword,
        phone:         phone?.trim() || null,
        role:          'CLIENT',
        onboarded:     false,   // ← triggers onboarding flow after login
        emailVerified: new Date(),
        isActive:      true,
      },
    });

    return NextResponse.json({
      message: 'Account created! Please log in to complete your setup.',
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Failed to create account. Please try again.' },
      { status: 500 }
    );
  }
} 