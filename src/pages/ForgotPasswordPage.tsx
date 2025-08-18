import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildApiUrl, ENDPOINTS } from '../config/api';

type Status = 'ready' | 'loading' | 'success' | 'error';

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
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
      // This would call your backend endpoint to send the reset email
      // For now, we'll simulate the API call
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
    navigate('/login');
  };

  const handleGoHome = (): void => {
    navigate('/');
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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
    },
    container: {
      background: 'white',
      padding: '3rem',
      borderRadius: '16px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
      maxWidth: '500px',
      width: '100%',
      textAlign: 'center' as const,
    },
    logo: {
      fontSize: '2.5rem',
      color: '#6366f1',
      marginBottom: '1rem',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1f2937',
      marginBottom: '1rem',
    },
    subtitle: {
      color: '#6b7280',
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
    forgotSuccess: {
      textAlign: 'center' as const,
    },
    successIcon: {
      fontSize: '4rem',
      color: '#10b981',
      marginBottom: '1rem',
    },
    forgotActions: {
      display: 'flex',
      gap: '1rem',
      marginTop: '2rem',
      flexDirection: window.innerWidth <= 480 ? 'column' as const : 'row' as const,
    },
    btn: {
      padding: '12px 24px',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      border: 'none',
      textDecoration: 'none',
      display: 'inline-block',
      textAlign: 'center' as const,
      flex: 1,
    },
    btnPrimary: {
      background: '#6366f1',
      color: 'white',
      transition: 'background-color 0.3s ease',
    },
    btnSecondary: {
      background: 'transparent',
      color: '#6366f1',
      border: '2px solid #6366f1',
      transition: 'all 0.3s ease',
    },
    forgotError: {
      textAlign: 'center' as const,
    },
    errorIcon: {
      fontSize: '4rem',
      color: '#ef4444',
      marginBottom: '1rem',
    },
    message: {
      marginBottom: '2rem',
      padding: '12px',
      borderRadius: '8px',
      background: '#fef2f2',
      color: '#991b1b',
      border: '1px solid #fecaca',
    },
  };

  const renderContent = (): React.ReactNode => {
    if (status === 'success') {
      return (
        <div style={styles.forgotSuccess}>
          <div style={styles.successIcon}>
            <i className="fas fa-envelope-open"></i>
          </div>
          <h2 style={styles.title}>Check Your Email</h2>
          <p style={styles.message}>{message}</p>
          <div style={styles.forgotActions}>
            <button 
              style={{ ...styles.btn, ...styles.btnPrimary }}
              onClick={handleGoToLogin}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#4f46e5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#6366f1';
              }}
            >
              <i className="fas fa-sign-in-alt"></i>
              Back to Login
            </button>
            <button 
              style={{ ...styles.btn, ...styles.btnSecondary }}
              onClick={handleGoHome}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#6366f1';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#6366f1';
              }}
            >
              <i className="fas fa-home"></i>
              Go to EvenX Website
            </button>
          </div>
        </div>
      );
    }

    if (status === 'error') {
      return (
        <div style={styles.forgotError}>
          <div style={styles.errorIcon}>
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <h2 style={styles.title}>Something Went Wrong</h2>
          <p style={styles.message}>{message}</p>
          <div style={styles.forgotActions}>
            <button 
              style={{ ...styles.btn, ...styles.btnPrimary }}
              onClick={handleRetry}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#4f46e5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#6366f1';
              }}
            >
              <i className="fas fa-redo"></i>
              Try Again
            </button>
            <button 
              style={{ ...styles.btn, ...styles.btnSecondary }}
              onClick={handleGoHome}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#6366f1';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#6366f1';
              }}
            >
              <i className="fas fa-home"></i>
              Go to EvenX Website
            </button>
          </div>
        </div>
      );
    }

    // Default form view
    return (
      <div style={styles.form}>
        <h2 style={styles.title}>Forgot Your Password?</h2>
        <p style={styles.subtitle}>No worries! Enter your email address and we'll send you a link to reset your password.</p>
        
        {message && <div style={styles.message}>{message}</div>}
        
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
            style={styles.submitButton}
            disabled={isLoading}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.background = '#4f46e5';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.background = '#6366f1';
              }
            }}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
        
        <div style={styles.forgotActions}>
          <button 
            style={{ ...styles.btn, ...styles.btnSecondary }}
            onClick={handleGoHome}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#6366f1';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#6366f1';
            }}
          >
            <i className="fas fa-home"></i>
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
          <i className="fas fa-coins"></i>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
