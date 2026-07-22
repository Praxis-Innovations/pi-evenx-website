'use client';

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { buildApiUrl, ENDPOINTS } from '@/config/api';
import Icon from '@/components/Icon';
import AuthPageShell from '@/components/AuthPageShell';

type VerificationStatus = 'verifying' | 'success' | 'error';

/**
 * Loading fallback component for Suspense boundary
 */
function EmailVerificationLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-primary-600 via-violet-600 to-primary-500">
      <div className="bg-white p-10 md:p-12 rounded-2xl shadow-2xl max-w-[500px] w-full text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-5">Loading...</h2>
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

  const verifyEmail = useCallback(async (token: string): Promise<void> => {
    if (hasVerified.current) {
      return;
    }

    hasVerified.current = true;

    try {
      setMessage('Verifying your email...');

      const response = await fetch(`${buildApiUrl(ENDPOINTS.VERIFY_EMAIL)}?token=${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setVerificationStatus('success');
        setMessage('Thank you! Your email has been verified successfully. You can now log in to EvenX.');
      } else {
        const errorData = await response.json();
        setVerificationStatus('error');
        setMessage(`Verification failed: ${errorData.message || 'The verification link may be expired or invalid.'}`);
      }
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationStatus('error');
      setMessage('Verification failed. The verification service is currently unavailable. Please try again later or contact support.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setVerificationStatus('error');
      setMessage('Verification failed. No verification token found in the URL.');
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
        <div className="flex flex-col items-center gap-5">
          <div className="text-primary-500">
            <Icon name="spinner" size={48} className="icon-spin" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-5">Verifying Your Email</h2>
          <p className="text-lg text-slate-500 leading-relaxed mb-8">{message}</p>
        </div>
      );
    }

    if (verificationStatus === 'success') {
      return (
        <div className="flex flex-col items-center gap-5">
          <div className="text-green-500 mb-5">
            <Icon name="check-circle" size={56} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-5">Email Verified Successfully!</h2>
          <p className="text-lg text-slate-500 leading-relaxed mb-8">{message}</p>
          <div className="flex flex-col gap-4 w-full">
            <button
              className="w-full flex items-center justify-center gap-2.5 py-3 px-6 rounded-md text-base font-semibold cursor-pointer bg-gradient-to-br from-primary-500 to-violet-500 text-white transition-all hover:from-primary-600 hover:to-violet-600"
              onClick={handleGoToApp}
            >
              <Icon name="mobile" size={18} />
              Open EvenX App
            </button>
            <button
              className="w-full flex items-center justify-center gap-2.5 py-3 px-6 rounded-md text-base font-semibold cursor-pointer bg-transparent text-primary-500 border-2 border-primary-500 transition-all hover:bg-primary-50"
              onClick={handleGoHome}
            >
              <Icon name="home" size={18} />
              Go to EvenX Website
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center gap-5">
        <div className="text-red-500 mb-5">
          <Icon name="error" size={56} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-5">Verification Failed</h2>
        <p className="text-lg text-slate-500 leading-relaxed mb-8">{message}</p>
        <div className="flex flex-col gap-4 w-full">
          <button
            className="w-full flex items-center justify-center gap-2.5 py-3 px-6 rounded-md text-base font-semibold cursor-pointer bg-gradient-to-br from-primary-500 to-violet-500 text-white transition-all hover:from-primary-600 hover:to-violet-600"
            onClick={handleRetry}
          >
            <Icon name="redo" size={18} />
            Try Again
          </button>
          <button
            className="w-full flex items-center justify-center gap-2.5 py-3 px-6 rounded-md text-base font-semibold cursor-pointer bg-transparent text-primary-500 border-2 border-primary-500 transition-all hover:bg-primary-50"
            onClick={handleGoHome}
          >
            <Icon name="home" size={18} />
            Go to EvenX Website
          </button>
        </div>
      </div>
    );
  };

  return (
    <AuthPageShell>
      {renderContent()}
    </AuthPageShell>
  );
}
