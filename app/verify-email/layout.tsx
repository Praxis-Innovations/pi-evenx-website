import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Verify Email',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: absoluteUrl('/verify-email'),
  },
};

export default function VerifyEmailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
