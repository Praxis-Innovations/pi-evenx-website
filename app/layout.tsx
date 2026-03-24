import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { buildMetadata, siteConfig } from '@/lib/seo';
import './globals.css';

const plus_jakarta_sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
});

const rootMetadata = buildMetadata({
  title: 'EvenX | Split Bills App for Roommates, Trips, and Shared Expenses',
  description: siteConfig.description,
  path: '/',
});

export const metadata: Metadata = {
  ...rootMetadata,
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: 'EvenX | Split Bills App for Roommates, Trips, and Shared Expenses',
    template: `%s | ${siteConfig.name}`,
  },
  manifest: '/manifest.webmanifest',
  category: 'finance',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
    shortcut: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plus_jakarta_sans.variable}>
      <head>
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
