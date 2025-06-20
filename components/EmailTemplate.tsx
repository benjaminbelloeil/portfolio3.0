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
}) => {
  const fullName = lastName ? `${firstName} ${lastName}` : firstName;
  const isOrder = formType === 'order';
  
  // Parse order details if it's an order
  const formatOrderContent = (orderMessage: string) => {
    const sections = orderMessage.split('\n\n');
    let orderItems: string[] = [];
    let total = '';
    let deliveryInfo = '';
    let notes = '';
    
    sections.forEach(section => {
      const trimmedSection = section.trim();
      if (trimmedSection.startsWith('Order Details:')) {
        const itemsText = trimmedSection.replace('Order Details:', '').trim();
        orderItems = itemsText.split('\n').filter(line => line.trim() !== '');
      } else if (trimmedSection.startsWith('Total:')) {
        total = trimmedSection.replace('Total:', '').trim();
      } else if (trimmedSection.startsWith('Delivery Information:')) {
        deliveryInfo = trimmedSection;
      } else if (trimmedSection.startsWith('Additional Notes:')) {
        notes = trimmedSection.replace('Additional Notes:', '').trim();
      }
    });
    
    return { orderItems, total, deliveryInfo, notes };
  };
  
  const orderData = isOrder ? formatOrderContent(message) : null;
  
  // Parse delivery information for better formatting
  const parseDeliveryInfo = (deliveryText: string) => {
    const lines = deliveryText.replace('Delivery Information:', '').trim().split('\n');
    const info: { platform?: string; email?: string; phone?: string } = {};
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith('Platform:')) {
        info.platform = trimmedLine.replace('Platform:', '').trim();
      } else if (trimmedLine.startsWith('Delivery Email:')) {
        info.email = trimmedLine.replace('Delivery Email:', '').trim();
      } else if (trimmedLine.startsWith('Phone:')) {
        info.phone = trimmedLine.replace('Phone:', '').trim();
      }
    });
    
    return info;
  };
  
  return (
    <div style={{ 
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      lineHeight: '1.6', 
      color: '#ffffff',
      backgroundColor: '#121212',
      margin: '0',
      padding: '0'
    }}>
      {/* Main Container */}
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#121212',
        border: '1px solid #333333',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        
        {/* Header with Gradient */}
        <div style={{ 
          background: isOrder 
            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
            : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          padding: '32px 24px',
          textAlign: 'center' as const,
          position: 'relative' as const
        }}>
          {/* Subtle pattern overlay */}
          <div style={{
            position: 'absolute' as const,
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            pointerEvents: 'none' as const
          }} />
          
          <div style={{ position: 'relative' as const, zIndex: 1 }}>
            <div style={{ 
              fontSize: '32px', 
              marginBottom: '12px',
              opacity: 0.9
            }}>
              {isOrder ? '🛒' : '📧'}
            </div>
            <h1 style={{ 
              margin: '0', 
              fontSize: '28px', 
              fontWeight: '700',
              color: '#ffffff',
              letterSpacing: '-0.02em'
            }}>
              {isOrder ? 'New Order Received' : 'New Contact Message'}
            </h1>
            <p style={{
              margin: '8px 0 0 0',
              fontSize: '16px',
              color: 'rgba(255,255,255,0.8)',
              fontWeight: '400'
            }}>
              {isOrder ? 'A new order has been placed' : 'Someone reached out via your portfolio'}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ padding: '32px 24px', backgroundColor: '#1a1a1a' }}>
          
          {/* Customer Info Card */}
          <div style={{ 
            backgroundColor: '#262626', 
            padding: '24px', 
            borderRadius: '8px', 
            marginBottom: '24px',
            border: '1px solid #333333'
          }}>
            <h2 style={{ 
              margin: '0 0 28px 0', 
              fontSize: '18px',
              fontWeight: '600',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '14px'
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                backgroundColor: isOrder ? '#10b981' : '#3b82f6',
                borderRadius: '50%',
                display: 'inline-block'
              }}></span>
              Customer Information
            </h2>
            
            <div style={{ display: 'grid', gap: '24px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '8px 0'
              }}>
                <span style={{ 
                  color: '#9ca3af', 
                  fontSize: '14px', 
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ 
                    width: '4px', 
                    height: '4px', 
                    backgroundColor: '#6b7280',
                    borderRadius: '50%',
                    display: 'inline-block'
                  }}></span>
                  Name
                </span>
                <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600' }}>{fullName}</span>
              </div>
              
              <div style={{ height: '1px', backgroundColor: '#333333' }} />
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '8px 0'
              }}>
                <span style={{ 
                  color: '#9ca3af', 
                  fontSize: '14px', 
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ 
                    width: '4px', 
                    height: '4px', 
                    backgroundColor: '#6b7280',
                    borderRadius: '50%',
                    display: 'inline-block'
                  }}></span>
                  Email
                </span>
                <a href={`mailto:${email}`} style={{ 
                  color: isOrder ? '#10b981' : '#3b82f6', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '600',
                  padding: '4px 8px',
                  backgroundColor: isOrder ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                  borderRadius: '4px',
                  border: `1px solid ${isOrder ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)'}`
                }}>
                  {email}
                </a>
              </div>
              
              {service && (
                <>
                  <div style={{ height: '1px', backgroundColor: '#333333' }} />
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '8px 0'
                  }}>
                    <span style={{ 
                      color: '#9ca3af', 
                      fontSize: '14px', 
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <span style={{ 
                        width: '4px', 
                        height: '4px', 
                        backgroundColor: '#6b7280',
                        borderRadius: '50%',
                        display: 'inline-block'
                      }}></span>
                      {isOrder ? 'Platform' : 'Service'}
                    </span>
                    <span style={{ 
                      color: '#ffffff', 
                      fontSize: '14px', 
                      fontWeight: '600',
                      backgroundColor: '#333333',
                      padding: '4px 8px',
                      borderRadius: '4px'
                    }}>
                      {service}
                    </span>
                  </div>
                </>
              )}
              
              <div style={{ height: '1px', backgroundColor: '#333333' }} />
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '8px 0'
              }}>
                <span style={{ 
                  color: '#9ca3af', 
                  fontSize: '14px', 
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ 
                    width: '4px', 
                    height: '4px', 
                    backgroundColor: '#6b7280',
                    borderRadius: '50%',
                    display: 'inline-block'
                  }}></span>
                  Received
                </span>
                <span style={{ color: '#ffffff', fontSize: '14px' }}>
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Message/Order Content */}
          <div style={{ 
            backgroundColor: '#262626', 
            padding: '24px', 
            borderRadius: '8px', 
            marginBottom: '24px',
            border: '1px solid #333333'
          }}>
            <h3 style={{ 
              margin: '0 0 24px 0', 
              fontSize: '18px',
              fontWeight: '600',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '14px'
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                backgroundColor: isOrder ? '#10b981' : '#3b82f6',
                borderRadius: '50%',
                display: 'inline-block'
              }}></span>
              {isOrder ? 'Order Details' : 'Message'}
            </h3>
            
            {isOrder && orderData ? (
              // Formatted Order Display
              <div style={{ display: 'grid', gap: '28px' }}>
                {/* Order Items */}
                {orderData.orderItems.length > 0 && (
                  <div>
                    <h4 style={{ 
                      margin: '0 0 20px 0', 
                      fontSize: '16px', 
                      fontWeight: '600', 
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <span style={{
                        width: '4px',
                        height: '4px',
                        backgroundColor: '#10b981',
                        borderRadius: '50%',
                        display: 'inline-block'
                      }}></span>
                      Items Ordered
                    </h4>
                    <div style={{ 
                      backgroundColor: '#1a1a1a',
                      borderRadius: '6px',
                      border: '1px solid #333333',
                      overflow: 'hidden'
                    }}>
                      {orderData.orderItems.map((item, index) => (
                        <div key={index} style={{
                          padding: '20px 24px',
                          borderBottom: index < orderData.orderItems.length - 1 ? '1px solid #333333' : 'none',
                          fontSize: '14px',
                          color: '#e5e7eb',
                          lineHeight: '1.5'
                        }}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Total */}
                {orderData.total && (
                  <div style={{ 
                    backgroundColor: '#1a1a1a',
                    padding: '24px', 
                    borderRadius: '6px', 
                    border: '1px solid #333333',
                    textAlign: 'center' as const
                  }}>
                    <div style={{ 
                      fontSize: '20px', 
                      fontWeight: '700', 
                      color: '#10b981',
                      marginBottom: '6px'
                    }}>
                      Order Total
                    </div>
                    <div style={{ 
                      fontSize: '24px', 
                      fontWeight: '800', 
                      color: '#ffffff'
                    }}>
                      {orderData.total}
                    </div>
                  </div>
                )}
                
                {/* Delivery Info */}
                {orderData.deliveryInfo && (
                  <div>
                    <h4 style={{ 
                      margin: '0 0 20px 0', 
                      fontSize: '16px', 
                      fontWeight: '600', 
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <span style={{
                        width: '4px',
                        height: '4px',
                        backgroundColor: '#10b981',
                        borderRadius: '50%',
                        display: 'inline-block'
                      }}></span>
                      Delivery Information
                    </h4>
                    <div style={{ 
                      backgroundColor: '#1a1a1a',
                      borderRadius: '6px', 
                      border: '1px solid #333333',
                      overflow: 'hidden'
                    }}>
                      {(() => {
                        const deliveryDetails = parseDeliveryInfo(orderData.deliveryInfo);
                        return (
                          <div style={{ display: 'grid', gap: '0' }}>
                            {deliveryDetails.platform && (
                              <div style={{
                                padding: '20px 24px',
                                borderBottom: '1px solid #333333',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}>
                                <span style={{ 
                                  color: '#9ca3af', 
                                  fontSize: '14px', 
                                  fontWeight: '500',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '12px'
                                }}>
                                  <span style={{ 
                                    width: '3px', 
                                    height: '3px', 
                                    backgroundColor: '#6b7280',
                                    borderRadius: '50%',
                                    display: 'inline-block'
                                  }}></span>
                                  Platform
                                </span>
                                <span style={{ color: '#e5e7eb', fontSize: '14px', fontWeight: '600' }}>
                                  {deliveryDetails.platform}
                                </span>
                              </div>
                            )}
                            {deliveryDetails.email && (
                              <div style={{
                                padding: '20px 24px',
                                borderBottom: deliveryDetails.phone ? '1px solid #333333' : 'none',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}>
                                <span style={{ 
                                  color: '#9ca3af', 
                                  fontSize: '14px', 
                                  fontWeight: '500',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '12px'
                                }}>
                                  <span style={{ 
                                    width: '3px', 
                                    height: '3px', 
                                    backgroundColor: '#6b7280',
                                    borderRadius: '50%',
                                    display: 'inline-block'
                                  }}></span>
                                  Delivery Email
                                </span>
                                <a href={`mailto:${deliveryDetails.email}`} style={{ 
                                  color: '#10b981', 
                                  textDecoration: 'none',
                                  fontSize: '14px',
                                  fontWeight: '600'
                                }}>
                                  {deliveryDetails.email}
                                </a>
                              </div>
                            )}
                            {deliveryDetails.phone && (
                              <div style={{
                                padding: '20px 24px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                              }}>
                                <span style={{ 
                                  color: '#9ca3af', 
                                  fontSize: '14px', 
                                  fontWeight: '500',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '12px'
                                }}>
                                  <span style={{ 
                                    width: '3px', 
                                    height: '3px', 
                                    backgroundColor: '#6b7280',
                                    borderRadius: '50%',
                                    display: 'inline-block'
                                  }}></span>
                                  Phone
                                </span>
                                <a href={`tel:${deliveryDetails.phone}`} style={{ 
                                  color: '#3b82f6', 
                                  textDecoration: 'none',
                                  fontSize: '14px',
                                  fontWeight: '600'
                                }}>
                                  {deliveryDetails.phone}
                                </a>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )}
                
                {/* Notes */}
                {orderData.notes && orderData.notes !== 'None' && (
                  <div>
                    <h4 style={{ 
                      margin: '0 0 20px 0', 
                      fontSize: '16px', 
                      fontWeight: '600', 
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}>
                      <span style={{
                        width: '4px',
                        height: '4px',
                        backgroundColor: '#10b981',
                        borderRadius: '50%',
                        display: 'inline-block'
                      }}></span>
                      Additional Notes
                    </h4>
                    <div style={{ 
                      backgroundColor: '#1a1a1a',
                      padding: '24px', 
                      borderRadius: '6px', 
                      border: '1px solid #333333',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      color: '#e5e7eb'
                    }}>
                      {orderData.notes}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Regular Message Display
              <div style={{ 
                backgroundColor: '#1a1a1a',
                padding: '20px', 
                borderRadius: '6px', 
                border: '1px solid #333333',
                fontSize: '14px',
                lineHeight: '1.6',
                color: '#e5e7eb',
                whiteSpace: 'pre-wrap' as const,
                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
              }}>
                {message}
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div style={{ 
            backgroundColor: isOrder ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
            border: `1px solid ${isOrder ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.2)'}`,
            padding: '24px', 
            borderRadius: '8px',
            textAlign: 'center' as const
          }}>
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ 
                margin: '0 0 8px 0', 
                fontSize: '18px', 
                fontWeight: '600',
                color: '#ffffff'
              }}>
                {isOrder ? '⚡ Ready to Process' : '💬 Quick Response'}
              </h3>
              <p style={{ 
                margin: '0', 
                color: '#9ca3af', 
                fontSize: '14px' 
              }}>
                {isOrder 
                  ? 'Process this order and reach out with next steps'
                  : 'Reply directly to start the conversation'
                }
              </p>
            </div>
            
            <a 
              href={`mailto:${email}?subject=${isOrder ? 'Re: Your Order Confirmation' : 'Re: Your Portfolio Inquiry'}`}
              style={{
                backgroundColor: isOrder ? '#10b981' : '#3b82f6',
                color: '#ffffff',
                padding: '12px 24px',
                textDecoration: 'none',
                borderRadius: '6px',
                fontWeight: '600',
                fontSize: '14px',
                display: 'inline-block',
                transition: 'all 0.2s ease',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              💬 Reply to {firstName} →
            </a>
          </div>
        </div>

        {/* Footer */}
        <div style={{ 
          backgroundColor: '#0f0f0f',
          padding: '24px',
          textAlign: 'center' as const,
          borderTop: '1px solid #333333'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{
              margin: '0 0 8px 0',
              fontSize: '16px',
              fontWeight: '600',
              color: '#ffffff'
            }}>
              Benjamin Belloeil
            </h4>
            <p style={{ 
              margin: '0', 
              fontSize: '14px', 
              color: '#9ca3af' 
            }}>
              Full-Stack Developer & Software Engineer
            </p>
          </div>
          
          <div style={{
            padding: '16px 0',
            borderTop: '1px solid #333333',
            fontSize: '12px',
            color: '#6b7280'
          }}>
            <p style={{ margin: '0 0 8px 0' }}>
              This {isOrder ? 'order confirmation' : 'contact message'} was sent from your portfolio website.
            </p>
            <p style={{ margin: '0' }}>
              Reply directly to this email to respond to {fullName}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
