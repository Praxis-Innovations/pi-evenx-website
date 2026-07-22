import type { Metadata } from 'next';
import IntentLandingPage from '@/components/IntentLandingPage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Shared Expense Tracker',
  description:
    'Track shared expenses with EvenX. Review balances, expense history, and settlements for roommates, couples, trips, and recurring group spending.',
  path: '/shared-expense-tracker',
});

export default function SharedExpenseTrackerPage() {
  return (
    <>
      <Navbar />
      <IntentLandingPage
        eyebrow="Shared expense tracker"
        title="A shared expense tracker for groups that need a clear balance history"
        description="EvenX gives you a running record of shared spending so everyone can see what was added, how it was split, and what has already been settled."
        intro="Many groups do not just need bill splitting once. They need a shared expense tracker that keeps an ongoing record across weeks or months. EvenX is built for that recurring visibility."
        screenshot={{
          src: '/phone-screenshots/activity.png',
          alt: 'EvenX activity feed showing shared expense history and balance updates',
        }}
        benefits={[
          'Review past expenses without searching old chats or messages.',
          'Keep long-running group balances visible over time.',
          'Spot what has been paid, what is pending, and what was settled.',
        ]}
        useCases={[
          'Long-term roommates who share groceries, utilities, and home supplies.',
          'Couples tracking ongoing shared spending month after month.',
          'Travel groups that want a clean expense history after the trip ends.',
        ]}
        relatedLinks={[
          { href: '/split-bills-app', label: 'Split Bills App' },
          { href: '/expense-splitting-app', label: 'Expense Splitting App' },
        ]}
        breadcrumbName="Shared Expense Tracker"
        breadcrumbPath="/shared-expense-tracker"
      />
      <Footer />
    </>
  );
}
