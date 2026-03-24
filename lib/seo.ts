import type { Metadata } from 'next';
import { store_urls } from '@/lib/theme';

export const siteConfig = {
  name: 'EvenX',
  domain: 'https://www.evenx.io',
  ogImage: '/opengraph-image',
  description:
    'EvenX is a split bills app for roommates, trips, couples, and groups who want to split expenses, track shared spending, and settle up fast.',
  keywords: [
    'split bills app',
    'expense splitting app',
    'shared expense tracker',
    'split expenses with friends',
    'roommate bill splitter',
    'trip expense app',
    'group expense tracker',
  ],
  organization: {
    name: 'EvenX',
    url: 'https://www.evenx.io',
    logo: 'https://www.evenx.io/evenx-logo.png',
  },
} as const;

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  robots?: Metadata['robots'];
};

export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.domain).toString();
}

export function buildMetadata({
  title,
  description,
  path = '/',
  robots,
}: MetadataInput): Metadata {
  const canonical = absoluteUrl(path);

  return {
    title,
    description,
    keywords: [...siteConfig.keywords],
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: absoluteUrl(siteConfig.ogImage),
          width: 1200,
          height: 630,
          alt: 'EvenX split bills and shared expense tracking app',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl(siteConfig.ogImage)],
    },
    robots,
  };
}

export const faqItems = [
  {
    question: 'What is the best app to split bills with roommates and friends?',
    answer:
      'EvenX helps roommates, couples, travel groups, and friends split bills fairly, track who owes what, and settle balances without spreadsheets.',
  },
  {
    question: 'Can EvenX track shared expenses for trips and group events?',
    answer:
      'Yes. You can create groups for travel, events, or shared living, add expenses as they happen, and see updated balances in one place.',
  },
  {
    question: 'Does EvenX support different ways to split expenses?',
    answer:
      'Yes. EvenX supports equal splits, custom splits, and percentage-based splits so each expense can match the real-world arrangement.',
  },
  {
    question: 'Is EvenX available on iPhone and Android?',
    answer:
      'Yes. EvenX is available on both iOS and Android, so groups can track shared expenses across devices.',
  },
] as const;

export function buildWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.domain,
    description: siteConfig.description,
  };
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.organization.name,
    url: siteConfig.organization.url,
    logo: siteConfig.organization.logo,
  };
}

export function buildSoftwareApplicationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: siteConfig.name,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'iOS, Android',
    description: siteConfig.description,
    url: siteConfig.domain,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    sameAs: [store_urls.ios, store_urls.android],
    publisher: {
      '@type': 'Organization',
      name: siteConfig.organization.name,
      url: siteConfig.organization.url,
    },
  };
}

export function buildFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
