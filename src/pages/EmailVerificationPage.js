import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './EmailVerificationPage.css';

const EmailVerificationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const hasVerified = useRef(false);

  // Memoize the verification function to prevent recreation
  const verifyEmail = useCallback(async (token) => {
    if (hasVerified.current) {
      return;
    }

    hasVerified.current = true; // Mark as verified immediately to prevent multiple calls
    
    try {
      // Show loading state
      setMessage('🔄 Verifying your email...');
      
      // Make API call to Spring Boot backend
      try {
        const response = await fetch(`http://localhost:8080/verify-email?token=${token}`, {
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
  }, []); // Empty dependency array - run only once on mount

  const handleRetry = () => {
    // Reload the page to retry verification
    window.location.reload();
  };

  const handleGoToApp = () => {
    // Redirect to your mobile app or main website
    // You can customize this based on your needs
    window.location.href = 'localhost:3000'; // Replace with your app's URL
  };

  const handleGoHome = () => {
    // Navigate back to the main website
    navigate('/');
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="verification-loading">
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
          <h2>Verifying Your Email</h2>
          <p>{message}</p>
        </div>
      );
    }

    if (verificationStatus === 'success') {
      return (
        <div className="verification-success">
          <div className="success-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h2>Email Verified Successfully!</h2>
          <p>{message}</p>
          <div className="verification-actions">
            <button className="btn btn-primary" onClick={handleGoToApp}>
              <i className="fas fa-mobile-alt"></i>
              Open EvenX App
            </button>
            <button className="btn btn-secondary" onClick={handleGoHome}>
              <i className="fas fa-home"></i>
              Go to EvenX Website
            </button>
          </div>
        </div>
      );
    }

    if (verificationStatus === 'error') {
      return (
        <div className="verification-error">
          <div className="error-icon">
            <i className="fas fa-exclamation-circle"></i>
          </div>
          <h2>Verification Failed</h2>
          <p>{message}</p>
          <div className="verification-actions">
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

    return null;
  };

  return (
    <div className="email-verification-page">
      <div className="verification-container">
        <div className="verification-header">
          <div className="logo">
            <i className="fas fa-coins"></i>
            <span>EvenX</span>
          </div>
          <h1>Email Verification</h1>
        </div>
        
        <div className="verification-content">
          {renderContent()}
        </div>
        
        <div className="verification-footer">
          <p>Need help? <a href="mailto:support@evenx.com">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
