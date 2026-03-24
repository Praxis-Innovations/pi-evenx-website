'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { buildApiUrl, ENDPOINTS } from '@/config/api';
import { colors, gradients, shadows, radius } from '@/lib/theme';
import Icon from '@/components/Icon';

type Status = 'ready' | 'loading' | 'success' | 'error';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const [status, setStatus] = useState<Status>('ready');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage('❌ Please enter your email address.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage('❌ Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    setStatus('loading');
    
    try {
      const response = await fetch(buildApiUrl(ENDPOINTS.FORGOT_PASSWORD), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('✅ If an account with that email exists, a password reset link has been sent to your email address. Please check your inbox and spam folder.');
      } else {
        const errorData = await response.json();
        setStatus('error');
        setMessage(`❌ ${errorData.message || 'Failed to send reset link. Please try again.'}`);
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setStatus('error');
      setMessage('❌ Failed to send reset link. The service is currently unavailable. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToLogin = (): void => {
    router.push('/login');
  };

  const handleGoHome = (): void => {
    router.push('/');
  };

  const handleRetry = (): void => {
    setStatus('ready');
    setMessage('');
    setEmail('');
  };

  const styles = {
    forgotPasswordPage: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: gradients.hero_bg,
      padding: '20px',
    },
    container: {
      background: colors.white,
      padding: '3rem',
      borderRadius: radius.xl,
      boxShadow: shadows.xl,
      maxWidth: '500px',
      width: '100%',
      textAlign: 'center' as const,
    },
    logo: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '1rem',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 700,
      color: colors.neutral[900],
      marginBottom: '1rem',
    },
    subtitle: {
      color: colors.neutral[500],
      marginBottom: '2rem',
      lineHeight: 1.6,
    },
    form: {
      textAlign: 'left' as const,
    },
    formGroup: {
      marginBottom: '1.5rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: 500,
      color: colors.neutral[600],
    },
    input: {
      width: '100%',
      padding: '12px',
      border: `2px solid ${colors.neutral[200]}`,
      borderRadius: radius.md,
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
      boxSizing: 'border-box' as const,
      outline: 'none',
      fontFamily: 'inherit',
    },
    submitButton: {
      background: gradients.primary,
      color: colors.white,
      border: 'none',
      padding: '12px 24px',
      borderRadius: radius.md,
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      width: '100%',
      transition: 'all 0.3s ease',
      fontFamily: 'inherit',
    },
    forgotSuccess: {
      textAlign: 'center' as const,
    },
    successIcon: {
      fontSize: '4rem',
      color: colors.success[500],
      marginBottom: '1rem',
    },
    forgotActions: {
      display: 'flex',
      gap: '1rem',
      marginTop: '2rem',
      flexDirection: 'row' as const,
    },
    btn: {
      padding: '12px 24px',
      borderRadius: radius.md,
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      border: 'none',
      textDecoration: 'none',
      display: 'inline-block',
      textAlign: 'center' as const,
      flex: 1,
      fontFamily: 'inherit',
    },
    btnPrimary: {
      background: gradients.primary,
      color: colors.white,
      transition: 'all 0.3s ease',
    },
    btnSecondary: {
      background: 'transparent',
      color: colors.primary[500],
      border: `2px solid ${colors.primary[500]}`,
      transition: 'all 0.3s ease',
    },
    forgotError: {
      textAlign: 'center' as const,
    },
    errorIcon: {
      fontSize: '4rem',
      color: colors.error[500],
      marginBottom: '1rem',
    },
    messageBox: {
      marginBottom: '2rem',
      padding: '12px',
      borderRadius: radius.md,
      background: colors.error[50],
      color: colors.error[800],
      border: `1px solid ${colors.error[200]}`,
    },
  };

  const renderContent = (): React.ReactNode => {
    if (status === 'success') {
      return (
        <div style={styles.forgotSuccess}>
          <div style={styles.successIcon}>
            <Icon name="mail-open" size={56} />
          </div>
          <h2 style={styles.title}>Check Your Email</h2>
          <p style={styles.messageBox}>{message}</p>
          <div style={styles.forgotActions}>
            <button 
              style={{ ...styles.btn, ...styles.btnPrimary }}
              onClick={handleGoToLogin}
            >
              Back to Login
            </button>
            <button 
              style={{ ...styles.btn, ...styles.btnSecondary }}
              onClick={handleGoHome}
            >
              Go to Website
            </button>
          </div>
        </div>
      );
    }

    if (status === 'error') {
      return (
        <div style={styles.forgotError}>
          <div style={styles.errorIcon}>
            <Icon name="error" size={56} />
          </div>
          <h2 style={styles.title}>Something Went Wrong</h2>
          <p style={styles.messageBox}>{message}</p>
          <div style={styles.forgotActions}>
            <button 
              style={{ ...styles.btn, ...styles.btnPrimary }}
              onClick={handleRetry}
            >
              Try Again
            </button>
            <button 
              style={{ ...styles.btn, ...styles.btnSecondary }}
              onClick={handleGoHome}
            >
              Go to Website
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={styles.form}>
        <h2 style={styles.title}>Forgot Your Password?</h2>
        <p style={styles.subtitle}>No worries! Enter your email address and we&apos;ll send you a link to reset your password.</p>
        
        {message && <div style={styles.messageBox}>{message}</div>}
        
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              style={styles.input}
              required
            />
          </div>
          
          <button 
            type="submit" 
            style={{
              ...styles.submitButton,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer',
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        
        <div style={styles.forgotActions}>
          <button 
            style={{ ...styles.btn, ...styles.btnSecondary }}
            onClick={handleGoHome}
          >
            Back to Website
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.forgotPasswordPage}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <Image src="/evenx-logo.png" alt="EvenX logo" width={56} height={56} />
        </div>
        {renderContent()}
      </div>
    </div>
  );
}
