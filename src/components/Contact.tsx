import React, { useState } from 'react';
import { buildApiUrl, ENDPOINTS } from '../config/api';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(buildApiUrl(ENDPOINTS.CONTACT_SUBMIT), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim()
        }),
      });

      if (response.ok) {
        // Success - clear form and show success message
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
        setMessage('✅ Thank you for your message! We\'ll get back to you soon.');
        setMessageType('success');
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setMessage('');
          setMessageType('');
        }, 5000);
      } else {
        // Handle backend validation errors
        const errorData = await response.json();
        if (errorData.errors) {
          // Map backend validation errors to form fields
          const backendErrors: FormErrors = {};
          errorData.errors.forEach((error: { field: string; message: string }) => {
            if (error.field === 'name') backendErrors.name = error.message;
            else if (error.field === 'email') backendErrors.email = error.message;
            else if (error.field === 'subject') backendErrors.subject = error.message;
            else if (error.field === 'message') backendErrors.message = error.message;
          });
          setErrors(backendErrors);
        } else {
          setMessage('❌ Failed to send message. Please try again.');
          setMessageType('error');
        }
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setMessage('❌ Network error. Please check your connection and try again.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialClick = (platform: string): void => {
    alert(`${platform} links will be configured when the accounts are set up.`);
  };

  const styles = {
    contact: {
      padding: '70px 0',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
      position: 'relative' as const,
      overflow: 'hidden',
    },
    container: {
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '0 30px',
      position: 'relative' as const,
      zIndex: 2,
    },
    sectionTitle: {
      textAlign: 'center' as const,
      fontSize: 'clamp(1.8rem, 4.5vw, 2.5rem)',
      fontWeight: 800,
      color: 'white',
      marginBottom: '2.5rem',
      background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      lineHeight: 1.1,
      textShadow: '0 0 30px rgba(96, 165, 250, 0.3)',
    },
    contactContent: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2rem',
    },
    contactInfo: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '0.8rem',
      minHeight: 'fit-content',
      justifyContent: 'space-between',
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.6rem',
      padding: '0.9rem',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(15px)',
      borderRadius: '14px',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'all 0.3s ease',
    },
    contactIcon: {
      width: '38px',
      height: '38px',
      background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '1rem',
      flexShrink: 0,
      boxShadow: '0 4px 15px rgba(96, 165, 250, 0.3)',
    },
    contactText: {
      flex: 1,
      minWidth: 0,
    },
    contactTitle: {
      fontSize: '0.9rem',
      fontWeight: 700,
      color: 'white',
      marginBottom: '0.15rem',
      lineHeight: 1.3,
    },
    contactValue: {
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '0.85rem',
      lineHeight: 1.4,
    },
    socialLinks: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1.5rem',
      justifyContent: 'center',
    },
    socialLink: {
      width: '42px',
      height: '42px',
      background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '1rem',
      cursor: 'pointer',
      border: 'none',
      transition: 'all 0.3s ease',
      boxShadow: '0 6px 20px rgba(96, 165, 250, 0.4)',
    },
    contactForm: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      padding: '2rem',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      position: 'relative' as const,
      overflow: 'hidden',
      maxWidth: '600px',
      width: '100%',
    },
    formGroup: {
      marginBottom: '1rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: 600,
      color: '#3b82f6',
      fontSize: '0.85rem',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
    },
    input: {
      width: '100%',
      padding: '14px 18px',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '14px',
      fontSize: '0.95rem',
      transition: 'all 0.3s ease',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      boxSizing: 'border-box' as const,
      backdropFilter: 'blur(10px)',
    },
    textarea: {
      width: '100%',
      padding: '14px 18px',
      border: '2px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '14px',
      fontSize: '0.95rem',
      minHeight: '140px',
      resize: 'vertical' as const,
      transition: 'all 0.3s ease',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
      boxSizing: 'border-box' as const,
      fontFamily: 'inherit',
      backdropFilter: 'blur(10px)',
    },
    error: {
      color: '#dc2626',
      fontSize: '0.8rem',
      marginTop: '0.4rem',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem',
    },
    submitButton: {
      background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)',
      color: 'white',
      border: 'none',
      padding: '16px 28px',
      borderRadius: '14px',
      fontSize: '1rem',
      fontWeight: 700,
      cursor: 'pointer',
      width: '100%',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
      boxShadow: '0 8px 25px rgba(96, 165, 250, 0.4)',
      position: 'relative' as const,
      overflow: 'hidden',
    },
    message: {
      padding: '12px 16px',
      borderRadius: '10px',
      marginBottom: '1rem',
      textAlign: 'center' as const,
      fontWeight: 500,
      fontSize: '0.9rem',
    },
    messageSuccess: {
      background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
      color: '#065f46',
      border: '2px solid #10b981',
      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)',
    },
    messageError: {
      background: 'linear-gradient(135deg, #fee2e2 0%, #fca5a5 100%)',
      color: '#991b1b',
      border: '2px solid #ef4444',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)',
    },
  };

  return (
    <section id="contact" style={styles.contact}>
      {/* Floating decorative elements */}
      <div style={{
        position: 'absolute',
        top: '25%',
        right: '10%',
        width: '60px',
        height: '60px',
        background: 'radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite',
        zIndex: 1,
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '30%',
        left: '8%',
        width: '45px',
        height: '45px',
        background: 'radial-gradient(circle, rgba(167, 139, 250, 0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite reverse',
        zIndex: 1,
      }}></div>
      
      <div style={styles.container}>
        <h2 style={{
          ...styles.sectionTitle,
          animation: 'fadeInUp 1s ease-out'
        }}>Get in Touch</h2>
        <div style={{
          ...styles.contactContent,
          animation: 'fadeInUp 1s ease-out 0.2s both'
        }}>
          <div style={{
            ...styles.contactInfo,
            display: 'none' // Hide the contact information section
          }}>
            <div 
              style={{
                ...styles.contactItem,
                animation: 'slideInLeft 0.8s ease-out 0.4s both'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = '#6366f1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              <div style={styles.contactIcon}>
                <i className="fas fa-envelope"></i>
              </div>
              <div style={styles.contactText}>
                <h3 style={styles.contactTitle}>Email</h3>
                <p style={styles.contactValue}>support@evenx.com</p>
              </div>
            </div>
            
            <div 
              style={{
                ...styles.contactItem,
                animation: 'slideInLeft 0.8s ease-out 0.6s both'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = '#6366f1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              <div style={styles.contactIcon}>
                <i className="fas fa-phone"></i>
              </div>
              <div style={styles.contactText}>
                <h3 style={styles.contactTitle}>Phone</h3>
                <p style={styles.contactValue}>+1 (416) 272-7831</p>
              </div>
            </div>
            
            <div 
              style={{
                ...styles.contactItem,
                animation: 'slideInLeft 0.8s ease-out 0.8s both'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = '#6366f1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              <div style={styles.contactIcon}>
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div style={styles.contactText}>
                <h3 style={styles.contactTitle}>Address</h3>
                <p style={styles.contactValue}>123 Tech Street, Toronto, ON</p>
              </div>
            </div>
            
            <div style={styles.socialLinks}>
              <button 
                style={styles.socialLink}
                onClick={() => handleSocialClick('Twitter')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)';
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
                }}
              >
                <i className="fab fa-twitter"></i>
              </button>
              <button 
                style={styles.socialLink}
                onClick={() => handleSocialClick('Facebook')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)';
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
                }}
              >
                <i className="fab fa-facebook"></i>
              </button>
              <button 
                style={styles.socialLink}
                onClick={() => handleSocialClick('Instagram')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <i className="fab fa-instagram"></i>
              </button>
              <button 
                style={styles.socialLink}
                onClick={() => handleSocialClick('LinkedIn')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <i className="fab fa-linkedin"></i>
              </button>
            </div>
          </div>
          
          <div style={{
            ...styles.contactForm,
            animation: 'slideInRight 0.8s ease-out 1s both'
          }}>
            {message && (
              <div style={{
                ...styles.message,
                ...(messageType === 'success' ? styles.messageSuccess : styles.messageError)
              }}>
                <i 
                  className={messageType === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle'} 
                  style={{ 
                    fontSize: '1.2rem', 
                    marginRight: '0.75rem',
                    color: messageType === 'success' ? '#10b981' : '#ef4444'
                  }}
                ></i>
                {message}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label htmlFor="name" style={styles.label}>Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name (2-100 characters)"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    borderColor: errors.name ? '#dc2626' : '#e5e7eb',
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#6366f1';
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.15)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = errors.name ? '#dc2626' : '#e5e7eb';
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
                {errors.name && (
                  <div style={styles.error}>
                    <i className="fas fa-exclamation-circle" style={{ fontSize: '1rem' }}></i>
                    {errors.name}
                  </div>
                )}
              </div>
              
              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    borderColor: errors.email ? '#dc2626' : '#e5e7eb',
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#6366f1';
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.15)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = errors.email ? '#dc2626' : '#e5e7eb';
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
                {errors.email && (
                  <div style={styles.error}>
                    <i className="fas fa-exclamation-circle" style={{ fontSize: '1rem' }}></i>
                    {errors.email}
                  </div>
                )}
              </div>
              
              <div style={styles.formGroup}>
                <label htmlFor="subject" style={styles.label}>Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Enter subject (5-200 characters)"
                  value={formData.subject}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    borderColor: errors.subject ? '#dc2626' : '#e5e7eb',
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#6366f1';
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.15)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = errors.subject ? '#dc2626' : '#e5e7eb';
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
                {errors.subject && (
                  <div style={styles.error}>
                    <i className="fas fa-exclamation-circle" style={{ fontSize: '1rem' }}></i>
                    {errors.subject}
                  </div>
                )}
              </div>
              
              <div style={styles.formGroup}>
                <label htmlFor="message" style={styles.label}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter your message (10-2000 characters)"
                  value={formData.message}
                  onChange={handleInputChange}
                  style={{
                    ...styles.textarea,
                    borderColor: errors.message ? '#dc2626' : '#e5e7eb',
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#6366f1';
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.15)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = errors.message ? '#dc2626' : '#e5e7eb';
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
                {errors.message && (
                  <div style={styles.error}>
                    <i className="fas fa-exclamation-circle" style={{ fontSize: '1rem' }}></i>
                    {errors.message}
                  </div>
                )}
              </div>
              
              <button 
                type="submit" 
                style={{
                  ...styles.submitButton,
                  opacity: isSubmitting ? 0.7 : 1,
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                }}
                disabled={isSubmitting}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 14px rgba(99, 102, 241, 0.3)';
                  }
                }}
              >
                <i className="fas fa-paper-plane" style={{ marginRight: '8px' }}></i>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
