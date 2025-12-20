'use client';

import React, { useState } from 'react';
import { buildApiUrl, ENDPOINTS } from '@/config/api';

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
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
        setMessage('✅ Thank you for your message! We\'ll get back to you soon.');
        setMessageType('success');
        
        setTimeout(() => {
          setMessage('');
          setMessageType('');
        }, 5000);
      } else {
        const errorData = await response.json();
        if (errorData.errors) {
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
    },
    contactContent: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2rem',
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
    messageBox: {
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
      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>Get in Touch</h2>
        <div style={styles.contactContent}>
          <div style={styles.contactForm}>
            {message && (
              <div style={{
                ...styles.messageBox,
                ...(messageType === 'success' ? styles.messageSuccess : styles.messageError)
              }}>
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
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    borderColor: errors.name ? '#dc2626' : 'rgba(255, 255, 255, 0.2)',
                    outline: 'none',
                  }}
                />
                {errors.name && (
                  <div style={styles.error}>
                    <i className="fas fa-exclamation-circle"></i>
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
                    borderColor: errors.email ? '#dc2626' : 'rgba(255, 255, 255, 0.2)',
                    outline: 'none',
                  }}
                />
                {errors.email && (
                  <div style={styles.error}>
                    <i className="fas fa-exclamation-circle"></i>
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
                  placeholder="Enter subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    borderColor: errors.subject ? '#dc2626' : 'rgba(255, 255, 255, 0.2)',
                    outline: 'none',
                  }}
                />
                {errors.subject && (
                  <div style={styles.error}>
                    <i className="fas fa-exclamation-circle"></i>
                    {errors.subject}
                  </div>
                )}
              </div>
              
              <div style={styles.formGroup}>
                <label htmlFor="message" style={styles.label}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleInputChange}
                  style={{
                    ...styles.textarea,
                    borderColor: errors.message ? '#dc2626' : 'rgba(255, 255, 255, 0.2)',
                    outline: 'none',
                  }}
                />
                {errors.message && (
                  <div style={styles.error}>
                    <i className="fas fa-exclamation-circle"></i>
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
