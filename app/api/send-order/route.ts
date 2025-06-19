import { EmailTemplate } from '@/components/EmailTemplate';
import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import React from 'react';

interface CartItem {
  id: number;
  title: string;
  price: string;
  quantity: number;
}

// Initialize Resend with fallback for build time
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      deliveryEmail, 
      platform, 
      phoneNumber, 
      notes, 
      cart, 
      total 
    } = await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !cart || cart.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create order summary
    const orderSummary = cart.map((item: CartItem) => 
      `${item.title} - Quantity: ${item.quantity} - Price: ${item.price}`
    ).join('\n');

    const orderMessage = `
Order Details:
${orderSummary}

Total: $${total}

Delivery Information:
Platform: ${platform}
Delivery Email: ${deliveryEmail || email}
Phone: ${phoneNumber || 'Not provided'}

Additional Notes:
${notes || 'None'}
    `;

    // Check if Resend is configured
    if (!resend) {
      console.error('Resend API key not configured');
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Portfolio Store <noreply@yourdomain.com>',
      to: [process.env.RESEND_TO_EMAIL || 'your-email@example.com'],
      replyTo: email,
      subject: `New Order from ${firstName} ${lastName}`,
      react: React.createElement(EmailTemplate, { 
        firstName, 
        lastName,
        email, 
        service: platform,
        message: orderMessage, 
        formType: 'order' 
      }),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send order email' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Order email sent successfully', data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
