'use client';

import React, { useState } from 'react';
import { buildApiUrl, ENDPOINTS } from '@/config/api';
import { colors, gradients, shadows, radius } from '@/lib/theme';
import Icon from '@/components/Icon';

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
  const form_palette = {
    card_bg: '#f8fafc',
    card_border: '#e2e8f0',
    card_text: '#0f172a',
    card_muted_text: '#475569',
    field_bg: '#ffffff',
    field_border: '#cbd5e1',
    field_text: '#0f172a',
    field_placeholder: '#64748b',
    focus_border: colors.primary[500],
    focus_ring: '0 0 0 4px rgba(99, 102, 241, 0.2)',
    label_text: '#1e293b',
    success_bg: '#f0fdf4',
    success_border: '#86efac',
    success_text: '#166534',
    error_bg: '#fef2f2',
    error_border: '#fecaca',
    error_text: '#b91c1c',
  } as const;

  const [form_data, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [is_submitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [message_type, setMessageType] = useState<'success' | 'error' | ''>('');

  const validateForm = (): boolean => {
    const new_errors: FormErrors = {};

    if (!form_data.name.trim()) {
      new_errors.name = 'Name is required';
    }

    if (!form_data.email.trim()) {
      new_errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form_data.email)) {
      new_errors.email = 'Please enter a valid email address';
    }

    if (!form_data.subject.trim()) {
      new_errors.subject = 'Subject is required';
    }

    if (!form_data.message.trim()) {
      new_errors.message = 'Message is required';
    }

    setErrors(new_errors);
    return Object.keys(new_errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
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
          name: form_data.name.trim(),
          email: form_data.email.trim(),
          subject: form_data.subject.trim(),
          message: form_data.message.trim(),
        }),
      });

      if (response.ok) {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
        setMessage('Thank you for your message! We\'ll get back to you soon.');
        setMessageType('success');

        setTimeout(() => {
          setMessage('');
          setMessageType('');
        }, 5000);
      } else {
        const error_data = await response.json();
        if (error_data.errors) {
          const backend_errors: FormErrors = {};
          error_data.errors.forEach((error: { field: string; message: string }) => {
            if (error.field === 'name') backend_errors.name = error.message;
            else if (error.field === 'email') backend_errors.email = error.message;
            else if (error.field === 'subject') backend_errors.subject = error.message;
            else if (error.field === 'message') backend_errors.message = error.message;
          });
          setErrors(backend_errors);
        } else {
          setMessage('Failed to send message. Please try again.');
          setMessageType('error');
        }
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setMessage('Network error. Please check your connection and try again.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const input_base: React.CSSProperties = {
    width: '100%',
    padding: '13px 16px',
    border: `1px solid ${form_palette.field_border}`,
    borderRadius: radius.lg,
    fontSize: '0.96rem',
    transition: 'all 0.3s ease',
    backgroundColor: form_palette.field_bg,
    color: form_palette.field_text,
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    outline: 'none',
    lineHeight: 1.5,
  };

  const styles = {
    section: {
      padding: '70px 0',
      background: gradients.dark_section,
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
    title: {
      textAlign: 'center' as const,
      fontSize: 'clamp(1.8rem, 4.5vw, 2.5rem)',
      fontWeight: 800,
      color: colors.white,
      marginBottom: '0.8rem',
      lineHeight: 1.1,
      fontFamily: 'var(--font-plus-jakarta-sans), sans-serif',
    },
    subtitle: {
      textAlign: 'center' as const,
      color: colors.neutral[200],
      fontSize: '1rem',
      marginBottom: '2.2rem',
      maxWidth: '560px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    form_wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '2rem',
    },
    form: {
      background: form_palette.card_bg,
      padding: '2.1rem',
      borderRadius: radius.xl,
      boxShadow: '0 24px 44px rgba(2, 6, 23, 0.35)',
      border: `1px solid ${form_palette.card_border}`,
      position: 'relative' as const,
      maxWidth: '600px',
      width: '100%',
    },
    form_headline: {
      color: form_palette.card_text,
      fontWeight: 700,
      fontSize: '1.1rem',
      marginBottom: '0.35rem',
    },
    form_description: {
      color: form_palette.card_muted_text,
      fontSize: '0.92rem',
      marginBottom: '1.25rem',
    },
    group: {
      marginBottom: '1.05rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.4rem',
      fontWeight: 600,
      color: form_palette.label_text,
      fontSize: '0.82rem',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.6px',
    },
    error_text: {
      color: form_palette.error_text,
      fontSize: '0.8rem',
      marginTop: '0.4rem',
      fontWeight: 500,
      display: 'flex',
      alignItems: 'center',
      gap: '0.4rem',
    },
    submit: {
      background: gradients.primary,
      color: colors.white,
      border: 'none',
      padding: '16px 28px',
      borderRadius: radius.lg,
      fontSize: '1rem',
      fontWeight: 700,
      cursor: 'pointer',
      width: '100%',
      transition: 'all 0.3s ease',
      letterSpacing: '0.3px',
      boxShadow: shadows.primary_md,
      position: 'relative' as const,
      fontFamily: 'inherit',
      marginTop: '0.35rem',
    },
    msg_box: {
      padding: '12px 16px',
      borderRadius: radius.md,
      marginBottom: '1rem',
      textAlign: 'center' as const,
      fontWeight: 500,
      fontSize: '0.9rem',
    },
    msg_success: {
      background: form_palette.success_bg,
      color: form_palette.success_text,
      border: `1px solid ${form_palette.success_border}`,
    },
    msg_error: {
      background: form_palette.error_bg,
      color: form_palette.error_text,
      border: `1px solid ${form_palette.error_border}`,
    },
  };

  return (
    <section id="contact" style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.title}>Get in Touch</h2>
        <p style={styles.subtitle}>Have a question, feedback, or partnership idea? Send us a message and our team will reply soon.</p>
        <div style={styles.form_wrapper}>
          <div style={styles.form}>
            <p style={styles.form_headline}>Contact Form</p>
            <p style={styles.form_description}>Fill in the details below and press send.</p>
            {message && (
              <div
                style={{
                  ...styles.msg_box,
                  ...(message_type === 'success' ? styles.msg_success : styles.msg_error),
                }}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={styles.group}>
                <label htmlFor="name" style={styles.label}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="contact_field"
                  placeholder="Enter your name"
                  value={form_data.name}
                  onChange={handleInputChange}
                  style={{
                    ...input_base,
                    borderColor: errors.name ? colors.error[500] : undefined,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = form_palette.focus_border;
                    e.currentTarget.style.boxShadow = form_palette.focus_ring;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = errors.name ? colors.error[500] : form_palette.field_border;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                {errors.name && (
                  <div style={styles.error_text}>
                    <Icon name="error" size={16} />
                    {errors.name}
                  </div>
                )}
              </div>

              <div style={styles.group}>
                <label htmlFor="email" style={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="contact_field"
                  placeholder="Enter your email address"
                  value={form_data.email}
                  onChange={handleInputChange}
                  style={{
                    ...input_base,
                    borderColor: errors.email ? colors.error[500] : undefined,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = form_palette.focus_border;
                    e.currentTarget.style.boxShadow = form_palette.focus_ring;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = errors.email ? colors.error[500] : form_palette.field_border;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                {errors.email && (
                  <div style={styles.error_text}>
                    <Icon name="error" size={16} />
                    {errors.email}
                  </div>
                )}
              </div>

              <div style={styles.group}>
                <label htmlFor="subject" style={styles.label}>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="contact_field"
                  placeholder="Enter subject"
                  value={form_data.subject}
                  onChange={handleInputChange}
                  style={{
                    ...input_base,
                    borderColor: errors.subject ? colors.error[500] : undefined,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = form_palette.focus_border;
                    e.currentTarget.style.boxShadow = form_palette.focus_ring;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = errors.subject ? colors.error[500] : form_palette.field_border;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                {errors.subject && (
                  <div style={styles.error_text}>
                    <Icon name="error" size={16} />
                    {errors.subject}
                  </div>
                )}
              </div>

              <div style={styles.group}>
                <label htmlFor="message" style={styles.label}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="contact_field"
                  placeholder="Enter your message"
                  value={form_data.message}
                  onChange={handleInputChange}
                  style={{
                    ...input_base,
                    minHeight: '140px',
                    resize: 'vertical' as const,
                    borderColor: errors.message ? colors.error[500] : undefined,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = form_palette.focus_border;
                    e.currentTarget.style.boxShadow = form_palette.focus_ring;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = errors.message ? colors.error[500] : form_palette.field_border;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                {errors.message && (
                  <div style={styles.error_text}>
                    <Icon name="error" size={16} />
                    {errors.message}
                  </div>
                )}
              </div>

              <button
                type="submit"
                style={{
                  ...styles.submit,
                  opacity: is_submitting ? 0.7 : 1,
                  cursor: is_submitting ? 'not-allowed' : 'pointer',
                }}
                disabled={is_submitting}
                onMouseEnter={(e) => {
                  if (!is_submitting) {
                    e.currentTarget.style.background = gradients.primary_hover;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = shadows.primary_lg;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = gradients.primary;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = shadows.primary_md;
                }}
              >
                <Icon name="paper-plane" size={16} style={{ marginRight: '8px' }} />
                {is_submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
