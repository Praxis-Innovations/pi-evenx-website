import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('ready'); // 'ready', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage('Please enter your email address.');
      setStatus('error');
      return;
    }

    if (!email.includes('@')) {
      setMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setIsLoading(true);
    setMessage('🔄 Sending password reset link...');
    setStatus('ready');

    try {
      // This would call your backend endpoint to send the reset email
      // For now, we'll simulate the API call
      const response = await fetch('http://localhost:8080/forgot-password', {
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

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const handleRetry = () => {
    setStatus('ready');
    setMessage('');
    setEmail('');
  };

  const renderContent = () => {
    if (status === 'success') {
      return (
        <div className="forgot-success">
          <div className="success-icon">
            <i className="fas fa-envelope-open"></i>
          </div>
          <h2>Check Your Email</h2>
          <p>{message}</p>
          <div className="forgot-actions">
            <button className="btn btn-primary" onClick={handleGoToLogin}>
              <i className="fas fa-sign-in-alt"></i>
              Back to Login
            </button>
            <button className="btn btn-secondary" onClick={handleGoHome}>
              <i className="fas fa-home"></i>
              Go to EvenX Website
            </button>
          </div>
        </div>
      );
    }

    if (status === 'error') {
      return (
        <div className="forgot-error">
          <div className="error-icon">
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <h2>Something Went Wrong</h2>
          <p>{message}</p>
          <div className="forgot-actions">
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

    // Default form view
    return (
      <div className="forgot-form">
        <h2>Forgot Your Password?</h2>
        <p>No worries! Enter your email address and we'll send you a link to reset your password.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email address"
              disabled={isLoading}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Sending Reset Link...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i>
                Send Reset Link
              </>
            )}
          </button>
        </form>

        <div className="form-footer">
          <button className="btn btn-link" onClick={handleGoToLogin}>
            <i className="fas fa-arrow-left"></i>
            Back to Login
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-container">
        <div className="forgot-header">
          <div className="logo">
            <i className="fas fa-coins"></i>
            <span>EvenX</span>
          </div>
          <h1>Forgot Password</h1>
        </div>
        
        <div className="forgot-content">
          {renderContent()}
        </div>
        
        <div className="forgot-footer">
          <p>Need help? <a href="mailto:support@evenx.com">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
