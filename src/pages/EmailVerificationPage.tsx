import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { buildApiUrl, ENDPOINTS } from '../config/api';
import { sharedStyles } from '../styles/shared';

type VerificationStatus = 'verifying' | 'success' | 'error';

const EmailVerificationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('verifying');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const hasVerified = useRef<boolean>(false);

  // Styles for the page
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
    '@keyframes spin': {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
    },
  };

  // Memoize the verification function to prevent recreation
  const verifyEmail = useCallback(async (token: string): Promise<void> => {
    if (hasVerified.current) {
      return;
    }

    hasVerified.current = true; // Mark as verified immediately to prevent multiple calls
    
    try {
      // Show loading state
      setMessage('🔄 Verifying your email...');
      
      // Make API call to Spring Boot backend
      try {
        const response = await fetch(`${buildApiUrl(ENDPOINTS.VERIFY_EMAIL)}?token=${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // Email verified successfully
          setVerificationStatus('success');
          setMessage('✅ Thank you! Your email has been verified successfully. You can now log in to EvenX.');
        } else {
          const errorData = await response.json();
          setVerificationStatus('error');
          setMessage(`❌ Verification failed: ${errorData.message || 'The verification link may be expired or invalid.'}`);
        }
      } catch (apiError) {
        // If backend is not available, show appropriate message
        console.error('API Error:', apiError);
        setVerificationStatus('error');
        setMessage('❌ Verification failed. The verification service is currently unavailable. Please try again later or contact support.');
      }
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationStatus('error');
      setMessage('❌ Verification failed. Please try again or contact support if the problem persists.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Extract token from URL query parameters
    const token = searchParams.get('token');
    
    if (!token) {
      setVerificationStatus('error');
      setMessage('❌ Verification failed. No verification token found in the URL.');
      setIsLoading(false);
      return;
    }

    // Start verification process immediately when component mounts
    verifyEmail(token);
  }, [searchParams, verifyEmail]);

  const handleRetry = (): void => {
    // Reload the page to retry verification
    window.location.reload();
  };

  const handleGoToApp = (): void => {
    // Redirect to your mobile app or main website
    // You can customize this based on your needs
    window.location.href = 'localhost:3000'; // Replace with your app's URL
  };

  const handleGoHome = (): void => {
    // Navigate back to the main website
    navigate('/');
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

    // Error state
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
};

export default EmailVerificationPage;
