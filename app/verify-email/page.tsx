'use client';

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { buildApiUrl, ENDPOINTS } from '@/config/api';
import { sharedStyles } from '@/lib/shared';

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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
    },
    container: {
      ...sharedStyles.container,
      textAlign: 'center' as const,
      background: 'white',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      maxWidth: '500px',
      width: '100%',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1f2937',
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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
    },
    container: {
      ...sharedStyles.container,
      textAlign: 'center' as const,
      background: 'white',
      borderRadius: '20px',
      padding: '40px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
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
      color: '#6366f1',
      animation: 'spin 1s linear infinite',
    },
    successIcon: {
      fontSize: '4rem',
      color: '#10b981',
      marginBottom: '20px',
    },
    errorIcon: {
      fontSize: '4rem',
      color: '#ef4444',
      marginBottom: '20px',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1f2937',
      marginBottom: '20px',
    },
    message: {
      fontSize: '1.1rem',
      color: '#6b7280',
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
      color: '#6366f1',
      border: '2px solid #6366f1',
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
    window.location.href = 'localhost:3000';
  };

  const handleGoHome = (): void => {
    router.push('/');
  };

  const renderContent = (): React.JSX.Element => {
    if (isLoading) {
      return (
        <div style={styles.loading}>
          <div style={styles.loadingSpinner}>
            <i className="fas fa-spinner fa-spin"></i>
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
            <i className="fas fa-check-circle"></i>
          </div>
          <h2 style={styles.title}>Email Verified Successfully!</h2>
          <p style={styles.message}>{message}</p>
          <div style={styles.actions}>
            <button style={{ ...styles.btn, ...styles.btnPrimary }} onClick={handleGoToApp}>
              <i className="fas fa-mobile-alt"></i>
              Open EvenX App
            </button>
            <button style={{ ...styles.btn, ...styles.btnSecondary }} onClick={handleGoHome}>
              <i className="fas fa-home"></i>
              Go to EvenX Website
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={styles.loading}>
        <div style={styles.errorIcon}>
          <i className="fas fa-exclamation-circle"></i>
        </div>
        <h2 style={styles.title}>Verification Failed</h2>
        <p style={styles.message}>{message}</p>
        <div style={styles.actions}>
          <button style={{ ...styles.btn, ...styles.btnPrimary }} onClick={handleRetry}>
            <i className="fas fa-redo"></i>
            Try Again
          </button>
          <button style={{ ...styles.btn, ...styles.btnSecondary }} onClick={handleGoHome}>
            <i className="fas fa-home"></i>
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
