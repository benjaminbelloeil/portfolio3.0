import React from 'react';

interface EmailTemplateProps {
  firstName: string;
  lastName?: string;
  email: string;
  service?: string;
  message: string;
  formType?: 'contact' | 'order';
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  firstName,
  lastName,
  email,
  service,
  message,
  formType = 'contact'
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', color: '#333' }}>
    <h2 style={{ color: '#2563eb', borderBottom: '2px solid #e5e7eb', paddingBottom: '10px' }}>
      {formType === 'contact' ? 'New Contact Form Submission' : 'New Order Received'}
    </h2>
    
    <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#374151' }}>Contact Information:</h3>
      <p><strong>Name:</strong> {firstName} {lastName || ''}</p>
      <p><strong>Email:</strong> {email}</p>
      {service && <p><strong>Service/Platform:</strong> {service}</p>}
    </div>

    <div style={{ backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#374151' }}>
        {formType === 'contact' ? 'Message:' : 'Order Details:'}
      </h3>
      <div style={{ whiteSpace: 'pre-wrap', backgroundColor: 'white', padding: '15px', borderRadius: '4px', border: '1px solid #d1d5db' }}>
        {message}
      </div>
    </div>

    <div style={{ fontSize: '12px', color: '#6b7280', borderTop: '1px solid #e5e7eb', paddingTop: '15px', marginTop: '30px' }}>
      <p>This email was sent from your portfolio website contact form.</p>
      <p>Reply directly to this email to respond to {firstName}.</p>
    </div>
  </div>
);
