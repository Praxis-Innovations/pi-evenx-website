import type { Metadata } from 'next';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Account Deletion',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: absoluteUrl('/account-deletion'),
  },
};

export default function AccountDeletionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
