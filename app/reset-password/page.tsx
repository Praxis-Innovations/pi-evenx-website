'use client';

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { buildApiUrl, ENDPOINTS } from '@/config/api';
import { getPasswordStrengthResult, isPasswordStrongEnough } from '@/lib/passwordStrength';
import Icon from '@/components/Icon';
import AuthPageShell from '@/components/AuthPageShell';

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
  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-primary-600 via-violet-600 to-primary-500">
      <div className="bg-white p-10 md:p-12 rounded-2xl shadow-2xl max-w-[500px] w-full text-center">
        <div className="flex justify-center mb-4">
          <Image src="/evenx-logo.png" alt="EvenX logo" width={56} height={56} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Loading...</h2>
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
    setMessage('Resetting your password...');

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
        setMessage('Your password has been reset successfully! You can now log in with your new password.');
      } else {
        const errorData = await response.json();
        setResetStatus('error');
        setMessage(`Password reset failed: ${errorData.message || 'The reset link may be expired or invalid.'}`);
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setResetStatus('error');
      setMessage('Password reset failed. The service is currently unavailable. Please try again later or contact support.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      setResetStatus('error');
      setMessage('Invalid reset link. No reset token found.');
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
      setMessage('Invalid reset link. No reset token found.');
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

  const renderContent = (): React.ReactNode => {
    if (isLoading) {
      return (
        <div className="text-center">
          <div className="text-primary-500 mb-4">
            <Icon name="spinner" size={56} className="icon-spin" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Resetting Password</h2>
          <p className="mb-6 p-3 rounded-md bg-primary-50 text-primary-800 border border-primary-200 text-sm">
            {message}
          </p>
        </div>
      );
    }

    if (resetStatus === 'success') {
      return (
        <div className="text-center">
          <div className="text-green-500 mb-4">
            <Icon name="check-circle" size={56} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Password Reset Successfully!</h2>
          <p className="mb-6 p-3 rounded-md bg-green-50 text-green-800 border border-green-200 text-sm">
            {message}
          </p>
          <div className="flex gap-4 mt-8">
            <button
              className="flex-1 py-3 px-6 rounded-md text-base font-semibold cursor-pointer bg-gradient-to-br from-primary-500 to-violet-500 text-white transition-all hover:from-primary-600 hover:to-violet-600"
              onClick={handleGoToLogin}
            >
              Go to Login
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

    if (resetStatus === 'error') {
      return (
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <Icon name="error" size={56} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Password Reset Failed</h2>
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
        <h2 className="text-2xl font-bold text-slate-900 mb-4 text-center">Reset Your Password</h2>
        <p className="text-slate-500 mb-8 leading-relaxed text-center">
          Enter your new password below to complete the reset process.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="newPassword" className="block mb-2 font-medium text-slate-600">
              New Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="Enter your new password"
                className={`w-full py-3 pl-4 pr-12 border-2 rounded-md text-base outline-none transition-all font-[inherit] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 ${
                  errors.newPassword ? 'border-red-600' : 'border-slate-200'
                }`}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-slate-500 p-1 flex items-center justify-center transition-colors hover:text-slate-700"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                <Icon name={showNewPassword ? 'eye-slash' : 'eye'} size={18} />
              </button>
            </div>
            {formData.newPassword && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(passwordStrength.strength / 5) * 100}%`,
                      background: passwordStrength.color,
                    }}
                  />
                </div>
                <span
                  className="text-xs font-medium min-w-[60px] text-right"
                  style={{ color: passwordStrength.color }}
                >
                  {passwordStrength.label}
                </span>
              </div>
            )}
            {errors.newPassword && (
              <div className="text-red-600 text-sm mt-1">{errors.newPassword}</div>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block mb-2 font-medium text-slate-600">
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your new password"
                className={`w-full py-3 pl-4 pr-12 border-2 rounded-md text-base outline-none transition-all font-[inherit] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 ${
                  errors.confirmPassword ? 'border-red-600' : 'border-slate-200'
                }`}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-slate-500 p-1 flex items-center justify-center transition-colors hover:text-slate-700"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Icon name={showConfirmPassword ? 'eye-slash' : 'eye'} size={18} />
              </button>
            </div>
            {errors.confirmPassword && (
              <div className="text-red-600 text-sm mt-1">{errors.confirmPassword}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 rounded-md text-base font-semibold cursor-pointer bg-gradient-to-br from-primary-500 to-violet-500 text-white transition-all hover:from-primary-600 hover:to-violet-600 disabled:opacity-70 disabled:cursor-not-allowed font-[inherit]"
            disabled={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
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
