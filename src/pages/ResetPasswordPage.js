import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { buildApiUrl, ENDPOINTS } from '../config/api';
import './ResetPasswordPage.css';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [resetStatus, setResetStatus] = useState('ready'); // 'ready', 'processing', 'success', 'error'
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const hasProcessed = useRef(false);

  // Extract token from URL query parameters
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setResetStatus('error');
      setMessage('❌ Invalid reset link. No reset token found in the URL.');
      return;
    }
  }, [token]);

  // Memoize the reset password function to prevent recreation
  const resetPassword = useCallback(async (token, newPassword) => {
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'Password must be at least 6 characters long';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
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

  const handleGoToLogin = () => {
    // Navigate to login page
    navigate('/login');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleRetry = () => {
    // Reset the form and allow retry
    hasProcessed.current = false;
    setResetStatus('ready');
    setMessage('');
    setFormData({ newPassword: '', confirmPassword: '' });
    setErrors({});
  };

  const renderContent = () => {
    if (!token) {
      return (
        <div className="reset-error">
          <div className="error-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h2>Invalid Reset Link</h2>
          <p>{message}</p>
          <div className="reset-actions">
            <button className="btn btn-primary" onClick={handleGoHome}>
              <i className="fas fa-home"></i>
              Go to EvenX Website
            </button>
          </div>
        </div>
      );
    }

    if (resetStatus === 'success') {
      return (
        <div className="reset-success">
          <div className="success-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h2>Password Reset Successful!</h2>
          <p>{message}</p>
          <div className="reset-actions">
            <button className="btn btn-primary" onClick={handleGoToLogin}>
              <i className="fas fa-sign-in-alt"></i>
              Go to Login
            </button>
            <button className="btn btn-secondary" onClick={handleGoHome}>
              <i className="fas fa-home"></i>
              Go to EvenX Website
            </button>
          </div>
        </div>
      );
    }

    if (resetStatus === 'error') {
      return (
        <div className="reset-error">
          <div className="error-icon">
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <h2>Password Reset Failed</h2>
          <p>{message}</p>
          <div className="reset-actions">
            <button className="btn btn-primary" onClick={handleRetry}>
              <i className="fas fa-redo"></i>
              Try Again
            </button>
            <button className="btn btn-secondary" onClick={handleGoHome}>
              <i className="fas fa-home"></i>
              Go to EvenX Website
            </button>
          </div>
        </div>
      );
    }

    if (resetStatus === 'processing') {
      return (
        <div className="reset-processing">
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
          <h2>Resetting Your Password</h2>
          <p>{message}</p>
        </div>
      );
    }

    // Default form view
    return (
      <div className="reset-form">
        <h2>Reset Your Password</h2>
        <p>Please enter your new password below.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className={errors.newPassword ? 'error' : ''}
              placeholder="Enter new password (min 6 characters)"
              disabled={isLoading}
            />
            {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={errors.confirmPassword ? 'error' : ''}
              placeholder="Confirm your new password"
              disabled={isLoading}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Resetting Password...
              </>
            ) : (
              <>
                <i className="fas fa-key"></i>
                Reset Password
              </>
            )}
          </button>
        </form>

        <div className="form-footer">
          <button className="btn btn-link" onClick={handleGoHome}>
            <i className="fas fa-arrow-left"></i>
            Back to Website
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="reset-password-page">
      <div className="reset-container">
        <div className="reset-header">
          <div className="logo">
            <i className="fas fa-coins"></i>
            <span>EvenX</span>
          </div>
          <h1>Reset Password</h1>
        </div>
        
        <div className="reset-content">
          {renderContent()}
        </div>
        
        <div className="reset-footer">
          <p>Need help? <a href="mailto:support@evenx.com">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
