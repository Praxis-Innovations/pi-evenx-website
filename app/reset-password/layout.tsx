import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Reset Password',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: absoluteUrl('/reset-password'),
  },
};

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
