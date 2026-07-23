import type { Metadata } from 'next';
import IntentLandingPage from '@/components/IntentLandingPage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Split Bills App',
  description:
    'Use EvenX as your split bills app for roommates, dinners, rent, groceries, and group events. Track who paid and who still owes in one place.',
  keywords: [
    'split bills app',
    'split bill app',
    'bill splitting app',
    'split rent and utilities',
    'roommate bills app',
    'split expenses app',
  ],
  path: '/split-bills-app',
});

export default function SplitBillsAppPage() {
  return (
    <>
      <Navbar />
      <IntentLandingPage
        eyebrow="Split bills app"
        title="A split bills app for roommates, dinners, rent, and everyday group expenses"
        description="EvenX makes it easy to split bills, track balances, and keep everyone aligned when money is shared across a household, event, or friend group."
        intro="When people search for a split bills app, they usually want something fast, accurate, and easy to trust. EvenX keeps the numbers visible for everyone in the group so bills do not disappear into chat history."
        screenshot={{
          src: '/phone-screenshots/dashboard.png',
          alt: 'EvenX dashboard for splitting bills and tracking balances',
        }}
        benefits={[
          'Track who paid each bill and how it was split.',
          'Handle equal, custom, and percentage-based bill splits.',
          'See current balances before sending reminders or payments.',
        ]}
        useCases={[
          'Roommates splitting rent, utilities, and groceries.',
          'Friends splitting dinners, rideshares, and event tickets.',
          'Couples tracking recurring shared purchases and reimbursements.',
        ]}
        relatedLinks={[
          { href: '/expense-splitting-app', label: 'Expense Splitting App' },
          { href: '/shared-expense-tracker', label: 'Shared Expense Tracker' },
          { href: '/rent-split-calculator', label: 'Rent Split Calculator' },
          { href: '/splitwise-alternative', label: 'Splitwise Alternative' },
        ]}
        breadcrumbName="Split Bills App"
        breadcrumbPath="/split-bills-app"
      />
      <Footer />
    </>
  );
}
