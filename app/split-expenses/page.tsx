import type { Metadata } from 'next';
import SeoJsonLd from '@/components/SeoJsonLd';
import SplitExpensesTool from '@/components/SplitExpensesTool';
import styles from '@/components/SplitExpensesTool.module.css';
import { absoluteUrl, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Split Expenses Calculator',
  description:
    'Use this split expenses calculator to split bills with friends, roommates, and travel groups. Add people, enter expenses, and see who pays whom in seconds.',
  path: '/split-expenses',
  keywords: [
    'split expenses',
    'bill split calculator',
    'expense split tool',
    'split bill with friends',
    'split expenses calculator',
    'shared expense calculator',
  ],
});

function buildWebApplicationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'EvenX Split Expenses Calculator',
    url: absoluteUrl('/split-expenses'),
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript',
    description:
      'A lightweight browser-based expense split tool for splitting bills evenly, by custom amount, or by ratio.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

export default function SplitExpensesPage() {
  return (
    <>
      <SeoJsonLd data={buildWebApplicationJsonLd()} />

      <main className={styles.page}>
        <div className={`site-container ${styles.pageShell}`}>
          <SplitExpensesTool />
        </div>
      </main>
    </>
  );
}
