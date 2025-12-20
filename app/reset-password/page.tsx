'use client';

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { buildApiUrl, ENDPOINTS } from '@/config/api';
import { getPasswordStrengthResult, isPasswordStrongEnough } from '@/lib/passwordStrength';

type ResetStatus = 'ready' | 'processing' | 'success' | 'error';

interface FormData {
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  newPassword?: string;
  confirmPassword?: string;
}

/**
 * Loading fallback component for Suspense boundary
 */
function ResetPasswordLoading() {
  const styles = {
    resetPasswordPage: {
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
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '1rem',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#1f2937',
      marginBottom: '1rem',
    },
  };

  return (
    <div style={styles.resetPasswordPage}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <Image src="/evenx-logo.png" alt="EvenX logo" width={56} height={56} />
        </div>
        <h2 style={styles.title}>Loading...</h2>
      </div>
    </div>
  );
}

/**
 * Wrapper component that provides Suspense boundary for useSearchParams
 */
export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<ResetPasswordLoading />}>
      <ResetPasswordContent />
    </Suspense>
  );
}

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [resetStatus, setResetStatus] = useState<ResetStatus>('ready');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState(getPasswordStrengthResult(''));
  const hasProcessed = useRef<boolean>(false);

  const token = searchParams.get('token');

  const resetPassword = useCallback(async (token: string, newPassword: string): Promise<void> => {
    if (hasProcessed.current) {
      return;
    }

    hasProcessed.current = true;
    setIsLoading(true);
    setResetStatus('processing');
    setMessage('🔄 Resetting your password...');

    try {
      const response = await fetch(buildApiUrl(ENDPOINTS.RESET_PASSWORD), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          newPassword: newPassword
        }),
      });

      if (response.ok) {
        setResetStatus('success');
        setMessage('✅ Your password has been reset successfully! You can now log in with your new password.');
      } else {
        const errorData = await response.json();
        setResetStatus('error');
        setMessage(`❌ Password reset failed: ${errorData.message || 'The reset link may be expired or invalid.'}`);
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setResetStatus('error');
      setMessage('❌ Password reset failed. The service is currently unavailable. Please try again later or contact support.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      setResetStatus('error');
      setMessage('❌ Invalid reset link. No reset token found.');
      return;
    }
  }, [token]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters long';
    } else if (!isPasswordStrongEnough(formData.newPassword)) {
      newErrors.newPassword = 'Password is too weak. Please use a stronger password.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'newPassword') {
      setPasswordStrength(getPasswordStrengthResult(value));
    }
    
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

    if (!token) {
      setResetStatus('error');
      setMessage('❌ Invalid reset link. No reset token found.');
      return;
    }

    await resetPassword(token, formData.newPassword);
  };

  const handleGoToLogin = (): void => {
    router.push('/login');
  };

  const handleGoHome = (): void => {
    router.push('/');
  };

  const handleRetry = (): void => {
    hasProcessed.current = false;
    setResetStatus('ready');
    setMessage('');
    setFormData({ newPassword: '', confirmPassword: '' });
  };

  const styles = {
    resetPasswordPage: {
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
      display: 'flex',
      justifyContent: 'center',
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
    passwordInputContainer: {
      position: 'relative' as const,
      display: 'flex',
      alignItems: 'center',
    },
    passwordInput: {
      width: '100%',
      padding: '12px 45px 12px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
      outline: 'none',
      boxSizing: 'border-box' as const,
    },
    passwordToggle: {
      position: 'absolute' as const,
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#6b7280',
      fontSize: '1rem',
      padding: '4px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'color 0.3s ease',
    },
    passwordStrengthContainer: {
      marginTop: '0.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    passwordStrengthBar: {
      flex: 1,
      height: '4px',
      background: '#e5e7eb',
      borderRadius: '2px',
      overflow: 'hidden',
    },
    passwordStrengthFill: {
      height: '100%',
      transition: 'all 0.3s ease',
      borderRadius: '2px',
    },
    passwordStrengthLabel: {
      fontSize: '0.75rem',
      fontWeight: 500,
      minWidth: '60px',
      textAlign: 'right' as const,
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
    resetSuccess: {
      textAlign: 'center' as const,
    },
    successIcon: {
      fontSize: '4rem',
      color: '#10b981',
      marginBottom: '1rem',
    },
    resetActions: {
      display: 'flex',
      gap: '1rem',
      marginTop: '2rem',
      flexDirection: 'row' as const,
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
    resetError: {
      textAlign: 'center' as const,
    },
    errorIcon: {
      fontSize: '4rem',
      color: '#ef4444',
      marginBottom: '1rem',
    },
    messageBox: {
      marginBottom: '2rem',
      padding: '12px',
      borderRadius: '8px',
      background: '#fef2f2',
      color: '#991b1b',
      border: '1px solid #fecaca',
    },
  };

  const renderContent = (): React.ReactNode => {
    if (isLoading) {
      return (
        <div style={styles.resetSuccess}>
          <div style={styles.successIcon}>
            <i className="fas fa-spinner fa-spin"></i>
          </div>
          <h2 style={styles.title}>Resetting Password</h2>
          <p style={styles.messageBox}>{message}</p>
        </div>
      );
    }

    if (resetStatus === 'success') {
      return (
        <div style={styles.resetSuccess}>
          <div style={styles.successIcon}>
            <i className="fas fa-check-circle"></i>
          </div>
          <h2 style={styles.title}>Password Reset Successfully!</h2>
          <p style={styles.messageBox}>{message}</p>
          <div style={styles.resetActions}>
            <button 
              style={{ ...styles.btn, ...styles.btnPrimary }}
              onClick={handleGoToLogin}
            >
              Go to Login
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

    if (resetStatus === 'error') {
      return (
        <div style={styles.resetError}>
          <div style={styles.errorIcon}>
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <h2 style={styles.title}>Password Reset Failed</h2>
          <p style={styles.messageBox}>{message}</p>
          <div style={styles.resetActions}>
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
        <h2 style={styles.title}>Reset Your Password</h2>
        <p style={styles.subtitle}>Enter your new password below to complete the reset process.</p>
        
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="newPassword" style={styles.label}>New Password</label>
            <div style={styles.passwordInputContainer}>
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="Enter your new password"
                style={{
                  ...styles.passwordInput,
                  borderColor: errors.newPassword ? '#dc2626' : '#d1d5db'
                }}
                required
              />
              <button
                type="button"
                style={styles.passwordToggle}
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                <i className={showNewPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </button>
            </div>
            {formData.newPassword && (
              <div style={styles.passwordStrengthContainer}>
                <div style={styles.passwordStrengthBar}>
                  <div 
                    style={{
                      ...styles.passwordStrengthFill,
                      width: `${(passwordStrength.strength / 5) * 100}%`,
                      background: passwordStrength.color,
                    }}
                  />
                </div>
                <span 
                  style={{
                    ...styles.passwordStrengthLabel,
                    color: passwordStrength.color,
                  }}
                >
                  {passwordStrength.label}
                </span>
              </div>
            )}
            {errors.newPassword && <div style={styles.error}>{errors.newPassword}</div>}
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
            <div style={styles.passwordInputContainer}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your new password"
                style={{
                  ...styles.passwordInput,
                  borderColor: errors.confirmPassword ? '#dc2626' : '#d1d5db'
                }}
                required
              />
              <button
                type="button"
                style={styles.passwordToggle}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i className={showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </button>
            </div>
            {errors.confirmPassword && <div style={styles.error}>{errors.confirmPassword}</div>}
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
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        
        <div style={styles.resetActions}>
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
    <div style={styles.resetPasswordPage}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <Image src="/evenx-logo.png" alt="EvenX logo" width={56} height={56} />
        </div>
        {renderContent()}
      </div>
    </div>
  );
}
