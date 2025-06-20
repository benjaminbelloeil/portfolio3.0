import { EmailTemplate } from '@/components/EmailTemplate';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import React from 'react';

// Initialize Resend with proper configuration
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Validate email format
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Rate limiting - simple in-memory store (consider Redis for production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // 5 emails per hour per IP
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  
  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (entry.count >= RATE_LIMIT) {
    return false;
  }
  
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' }, 
        { status: 429 }
      );
    }

    const { name, email, service, message, formType = 'contact' } = await request.json();

    // Enhanced validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (name.length > 100 || message.length > 5000) {
      return NextResponse.json({ error: 'Input too long' }, { status: 400 });
    }

    // Check if Resend is configured
    if (!resend) {
      console.error('Resend API key not configured');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    // Validate environment variables
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const toEmail = process.env.RESEND_TO_EMAIL;
    
    if (!fromEmail || !toEmail) {
      console.error('Email configuration incomplete');
      return NextResponse.json({ error: 'Email service configuration incomplete' }, { status: 500 });
    }

    // Validate email formats in environment variables
    if (!isValidEmail(fromEmail)) {
      console.error('Invalid RESEND_FROM_EMAIL format:', fromEmail);
      return NextResponse.json({ 
        error: 'Invalid email configuration - FROM email format is incorrect' 
      }, { status: 500 });
    }

    if (!isValidEmail(toEmail)) {
      console.error('Invalid RESEND_TO_EMAIL format:', toEmail);
      return NextResponse.json({ 
        error: 'Invalid email configuration - TO email format is incorrect' 
      }, { status: 500 });
    }

    console.log(`Sending email from ${fromEmail} to ${toEmail} for ${formType} form`);

    const { data, error } = await resend.emails.send({
      from: `Portfolio Contact <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: formType === 'contact' ? `New Contact: ${name}` : `New Order: ${name}`,
      // Add headers to improve deliverability
      headers: {
        'X-Entity-Ref-ID': `portfolio-${Date.now()}`,
        'List-Unsubscribe': `<mailto:${fromEmail}?subject=unsubscribe>`,
      },
      react: React.createElement(EmailTemplate, { 
        firstName: name, 
        email, 
        service, 
        message, 
        formType 
      }),
      // Add tags for better tracking and reputation
      tags: [
        { name: 'category', value: formType },
        { name: 'source', value: 'portfolio-website' }
      ],
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 400 });
    }

    console.log('Email sent successfully:', data?.id);
    return NextResponse.json({ 
      message: 'Email sent successfully', 
      id: data?.id 
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
