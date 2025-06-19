import { EmailTemplate } from '@/components/EmailTemplate';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import React from 'react';

// Initialize Resend with fallback for build time
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const { name, email, service, message, formType = 'contact' } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if Resend is configured
    if (!resend) {
      console.error('Resend API key not configured');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <noreply@yourdomain.com>',
      to: [process.env.RESEND_TO_EMAIL || 'your-email@example.com'],
      replyTo: email,
      subject: formType === 'contact' ? 'New Contact Form Submission' : 'New Order Received',
      react: React.createElement(EmailTemplate, { 
        firstName: name, 
        email, 
        service, 
        message, 
        formType 
      }),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Email sent successfully', data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
