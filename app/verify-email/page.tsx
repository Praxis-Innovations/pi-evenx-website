'use client';

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { buildApiUrl, ENDPOINTS } from '@/config/api';
import { sharedStyles } from '@/lib/shared';
import { colors, gradients, shadows, radius } from '@/lib/theme';
import Icon from '@/components/Icon';

type VerificationStatus = 'verifying' | 'success' | 'error';

/**
 * Loading fallback component for Suspense boundary
 */
function EmailVerificationLoading() {
  const styles = {
    page: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: gradients.hero_bg,
      padding: '20px',
    },
    container: {
      ...sharedStyles.container,
      textAlign: 'center' as const,
      background: colors.white,
      borderRadius: radius.xl,
      padding: '40px',
      boxShadow: shadows.xl,
      maxWidth: '500px',
      width: '100%',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 700,
      color: colors.neutral[900],
      marginBottom: '20px',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Loading...</h2>
      </div>
    </div>
  );
}

/**
 * Wrapper component that provides Suspense boundary for useSearchParams
 */
export default function EmailVerificationPage() {
  return (
    <Suspense fallback={<EmailVerificationLoading />}>
      <EmailVerificationContent />
    </Suspense>
  );
}

function EmailVerificationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('verifying');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const hasVerified = useRef<boolean>(false);

  const styles = {
    page: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: gradients.hero_bg,
      padding: '20px',
    },
    container: {
      ...sharedStyles.container,
      textAlign: 'center' as const,
      background: colors.white,
      borderRadius: radius.xl,
      padding: '40px',
      boxShadow: shadows.xl,
      maxWidth: '500px',
      width: '100%',
    },
    loading: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: '20px',
    },
    loadingSpinner: {
      fontSize: '3rem',
      color: colors.primary[500],
      animation: 'spin 1s linear infinite',
    },
    successIcon: {
      fontSize: '4rem',
      color: colors.success[500],
      marginBottom: '20px',
    },
    errorIcon: {
      fontSize: '4rem',
      color: colors.error[500],
      marginBottom: '20px',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 700,
      color: colors.neutral[900],
      marginBottom: '20px',
    },
    message: {
      fontSize: '1.1rem',
      color: colors.neutral[500],
      lineHeight: 1.6,
      marginBottom: '30px',
    },
    actions: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '15px',
      alignItems: 'stretch',
    },
    btn: {
      ...sharedStyles.btn,
      justifyContent: 'center',
      gap: '10px',
    },
    btnPrimary: {
      ...sharedStyles.btnPrimary,
    },
    btnSecondary: {
      ...sharedStyles.btnSecondary,
      color: colors.primary[500],
      border: `2px solid ${colors.primary[500]}`,
    },
  };

  const verifyEmail = useCallback(async (token: string): Promise<void> => {
    if (hasVerified.current) {
      return;
    }

    hasVerified.current = true;
    
    try {
      setMessage('🔄 Verifying your email...');
      
      const response = await fetch(`${buildApiUrl(ENDPOINTS.VERIFY_EMAIL)}?token=${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setVerificationStatus('success');
        setMessage('✅ Thank you! Your email has been verified successfully. You can now log in to EvenX.');
      } else {
        const errorData = await response.json();
        setVerificationStatus('error');
        setMessage(`❌ Verification failed: ${errorData.message || 'The verification link may be expired or invalid.'}`);
      }
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationStatus('error');
      setMessage('❌ Verification failed. The verification service is currently unavailable. Please try again later or contact support.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setVerificationStatus('error');
      setMessage('❌ Verification failed. No verification token found in the URL.');
      setIsLoading(false);
      return;
    }

    verifyEmail(token);
  }, [searchParams, verifyEmail]);

  const handleRetry = (): void => {
    window.location.reload();
  };

  const handleGoToApp = (): void => {
    window.location.href = '/';
  };

  const handleGoHome = (): void => {
    router.push('/');
  };

  const renderContent = (): React.JSX.Element => {
    if (isLoading) {
      return (
        <div style={styles.loading}>
          <div style={styles.loadingSpinner}>
            <Icon name="spinner" size={48} className="icon-spin" />
          </div>
          <h2 style={styles.title}>Verifying Your Email</h2>
          <p style={styles.message}>{message}</p>
        </div>
      );
    }

    if (verificationStatus === 'success') {
      return (
        <div style={styles.loading}>
          <div style={styles.successIcon}>
            <Icon name="check-circle" size={56} />
          </div>
          <h2 style={styles.title}>Email Verified Successfully!</h2>
          <p style={styles.message}>{message}</p>
          <div style={styles.actions}>
            <button style={{ ...styles.btn, ...styles.btnPrimary }} onClick={handleGoToApp}>
              <Icon name="mobile" size={18} />
              Open EvenX App
            </button>
            <button style={{ ...styles.btn, ...styles.btnSecondary }} onClick={handleGoHome}>
              <Icon name="home" size={18} />
              Go to EvenX Website
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={styles.loading}>
        <div style={styles.errorIcon}>
          <Icon name="error" size={56} />
        </div>
        <h2 style={styles.title}>Verification Failed</h2>
        <p style={styles.message}>{message}</p>
        <div style={styles.actions}>
          <button style={{ ...styles.btn, ...styles.btnPrimary }} onClick={handleRetry}>
            <Icon name="redo" size={18} />
            Try Again
          </button>
          <button style={{ ...styles.btn, ...styles.btnSecondary }} onClick={handleGoHome}>
            <Icon name="home" size={18} />
            Go to EvenX Website
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {renderContent()}
      </div>
    </div>
  );
}
