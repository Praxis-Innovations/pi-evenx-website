'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { buildApiUrl, ENDPOINTS } from '@/config/api';
import Icon from '@/components/Icon';
import AuthPageShell from '@/components/AuthPageShell';

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
      setMessage('Please enter your email address.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage('Please enter a valid email address.');
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
        setMessage('If an account with that email exists, a password reset link has been sent to your email address. Please check your inbox and spam folder.');
      } else {
        const errorData = await response.json();
        setStatus('error');
        setMessage(`${errorData.message || 'Failed to send reset link. Please try again.'}`);
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setStatus('error');
      setMessage('Failed to send reset link. The service is currently unavailable. Please try again later.');
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

  const renderContent = (): React.ReactNode => {
    if (status === 'success') {
      return (
        <div className="text-center">
          <div className="text-green-500 mb-4">
            <Icon name="mail-open" size={56} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Check Your Email</h2>
          <p className="mb-6 p-3 rounded-md bg-green-50 text-green-800 border border-green-200 text-sm">
            {message}
          </p>
          <div className="flex gap-4 mt-8">
            <button
              className="flex-1 py-3 px-6 rounded-md text-base font-semibold cursor-pointer bg-gradient-to-br from-primary-500 to-violet-500 text-white transition-all hover:from-primary-600 hover:to-violet-600"
              onClick={handleGoToLogin}
            >
              Back to Login
            </button>
            <button
              className="flex-1 py-3 px-6 rounded-md text-base font-semibold cursor-pointer bg-transparent text-primary-500 border-2 border-primary-500 transition-all hover:bg-primary-50"
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
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <Icon name="error" size={56} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Something Went Wrong</h2>
          <p className="mb-6 p-3 rounded-md bg-red-50 text-red-800 border border-red-200 text-sm">
            {message}
          </p>
          <div className="flex gap-4 mt-8">
            <button
              className="flex-1 py-3 px-6 rounded-md text-base font-semibold cursor-pointer bg-gradient-to-br from-primary-500 to-violet-500 text-white transition-all hover:from-primary-600 hover:to-violet-600"
              onClick={handleRetry}
            >
              Try Again
            </button>
            <button
              className="flex-1 py-3 px-6 rounded-md text-base font-semibold cursor-pointer bg-transparent text-primary-500 border-2 border-primary-500 transition-all hover:bg-primary-50"
              onClick={handleGoHome}
            >
              Go to Website
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="text-left">
        <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">Forgot Your Password?</h2>
        <p className="text-slate-500 mb-8 leading-relaxed text-center">
          No worries! Enter your email address and we&apos;ll send you a link to reset your password.
        </p>

        {message && (
          <div className="mb-6 p-3 rounded-md bg-red-50 text-red-800 border border-red-200 text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 font-medium text-slate-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full py-3 px-4 border-2 border-slate-200 rounded-md text-base outline-none transition-all font-[inherit] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 rounded-md text-base font-semibold cursor-pointer bg-gradient-to-br from-primary-500 to-violet-500 text-white transition-all hover:from-primary-600 hover:to-violet-600 disabled:opacity-70 disabled:cursor-not-allowed font-[inherit]"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="flex gap-4 mt-8">
          <button
            className="flex-1 py-3 px-6 rounded-md text-base font-semibold cursor-pointer bg-transparent text-primary-500 border-2 border-primary-500 transition-all hover:bg-primary-50"
            onClick={handleGoHome}
          >
            Back to Website
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
