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
      padding: '80px 0',
      background: '#f8fafc',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
    },
    sectionTitle: {
      textAlign: 'center' as const,
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#1f2937',
      marginBottom: '3rem',
    },
    contactContent: {
      display: 'grid',
      gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr',
      gap: '4rem',
    },
    contactInfo: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '2rem',
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    contactIcon: {
      width: '50px',
      height: '50px',
      background: '#6366f1',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '1.2rem',
    },
    contactText: {
      flex: 1,
    },
    contactTitle: {
      fontSize: '1.1rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '0.5rem',
    },
    contactValue: {
      color: '#6b7280',
    },
    socialLinks: {
      display: 'flex',
      gap: '1rem',
      marginTop: '2rem',
    },
    socialLink: {
      width: '50px',
      height: '50px',
      background: '#6366f1',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '1.2rem',
      cursor: 'pointer',
      border: 'none',
      transition: 'background-color 0.3s ease',
    },
    contactForm: {
      background: 'white',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
    },
    formGroup: {
      marginBottom: '1.5rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: 500,
      color: '#374151',
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
    },
    textarea: {
      width: '100%',
      padding: '12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '1rem',
      minHeight: '120px',
      resize: 'vertical' as const,
      transition: 'border-color 0.3s ease',
    },
    error: {
      color: '#dc2626',
      fontSize: '0.875rem',
      marginTop: '0.25rem',
    },
    submitButton: {
      background: '#6366f1',
      color: 'white',
      border: 'none',
      padding: '12px 24px',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      width: '100%',
      transition: 'background-color 0.3s ease',
    },
    message: {
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '1rem',
      textAlign: 'center' as const,
    },
    messageSuccess: {
      background: '#d1fae5',
      color: '#065f46',
      border: '1px solid #a7f3d0',
    },
    messageError: {
      background: '#fee2e2',
      color: '#991b1b',
      border: '1px solid #fca5a5',
    },
  };

  return (
    <section id="contact" style={styles.contact}>
      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>Get in Touch</h2>
        <div style={styles.contactContent}>
          <div style={styles.contactInfo}>
            <div style={styles.contactItem}>
              <div style={styles.contactIcon}>
                <i className="fas fa-envelope"></i>
              </div>
              <div style={styles.contactText}>
                <h3 style={styles.contactTitle}>Email</h3>
                <p style={styles.contactValue}>support@evenx.com</p>
              </div>
            </div>
            
            <div style={styles.contactItem}>
              <div style={styles.contactIcon}>
                <i className="fas fa-phone"></i>
              </div>
              <div style={styles.contactText}>
                <h3 style={styles.contactTitle}>Phone</h3>
                <p style={styles.contactValue}>+1 (416) 272-7831</p>
              </div>
            </div>
            
            <div style={styles.contactItem}>
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
                  e.currentTarget.style.background = '#4f46e5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#6366f1';
                }}
              >
                <i className="fab fa-twitter"></i>
              </button>
              <button 
                style={styles.socialLink}
                onClick={() => handleSocialClick('Facebook')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#4f46e5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#6366f1';
                }}
              >
                <i className="fab fa-facebook"></i>
              </button>
              <button 
                style={styles.socialLink}
                onClick={() => handleSocialClick('Instagram')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#4f46e5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#6366f1';
                }}
              >
                <i className="fab fa-instagram"></i>
              </button>
              <button 
                style={styles.socialLink}
                onClick={() => handleSocialClick('LinkedIn')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#4f46e5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#6366f1';
                }}
              >
                <i className="fab fa-linkedin"></i>
              </button>
            </div>
          </div>
          
          <div style={styles.contactForm}>
            {message && (
              <div style={{
                ...styles.message,
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
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    borderColor: errors.name ? '#dc2626' : '#d1d5db'
                  }}
                />
                {errors.name && <div style={styles.error}>{errors.name}</div>}
              </div>
              
              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.label}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    borderColor: errors.email ? '#dc2626' : '#d1d5db'
                  }}
                />
                {errors.email && <div style={styles.error}>{errors.email}</div>}
              </div>
              
              <div style={styles.formGroup}>
                <label htmlFor="subject" style={styles.label}>Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    borderColor: errors.subject ? '#dc2626' : '#d1d5db'
                  }}
                />
                {errors.subject && <div style={styles.error}>{errors.subject}</div>}
              </div>
              
              <div style={styles.formGroup}>
                <label htmlFor="message" style={styles.label}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  style={{
                    ...styles.textarea,
                    borderColor: errors.message ? '#dc2626' : '#d1d5db'
                  }}
                />
                {errors.message && <div style={styles.error}>{errors.message}</div>}
              </div>
              
              <button 
                type="submit" 
                style={styles.submitButton}
                disabled={isSubmitting}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.background = '#4f46e5';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.background = '#6366f1';
                  }
                }}
              >
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
