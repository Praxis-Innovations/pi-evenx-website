import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Forgot Password',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: absoluteUrl('/forgot-password'),
  },
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
