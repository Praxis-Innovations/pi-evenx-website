import type { Metadata } from 'next';
import IntentLandingPage from '@/components/IntentLandingPage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Expense Splitting App',
  description:
    'EvenX is an expense splitting app for travel groups, friends, roommates, and shared events. Split costs fairly and keep a running balance for the whole group.',
  path: '/expense-splitting-app',
});

export default function ExpenseSplittingAppPage() {
  return (
    <>
      <Navbar />
      <IntentLandingPage
        eyebrow="Expense splitting app"
        title="An expense splitting app for trips, shared events, and flexible group costs"
        description="EvenX helps groups split mixed expenses fairly when not every person owes the same amount on every bill."
        intro="Expense splitting gets messy when groups have different budgets, partial participation, or changing plans. EvenX gives every expense its own split logic while still keeping one shared running balance."
        screenshot={{
          src: '/phone-screenshots/groups.png',
          alt: 'EvenX groups screen for expense splitting and shared group balances',
        }}
        benefits={[
          'Split travel and event expenses even when only part of the group joins.',
          'Keep a visible history of each transaction inside the group.',
          'Reduce confusion around reimbursements after a trip or event ends.',
        ]}
        useCases={[
          'Weekend trips with hotels, meals, gas, and tickets.',
          'Bachelor or birthday events with uneven participation.',
          'Household budgets where one bill needs a custom or percentage split.',
        ]}
        relatedLinks={[
          { href: '/split-bills-app', label: 'Split Bills App' },
          { href: '/shared-expense-tracker', label: 'Shared Expense Tracker' },
        ]}
      />
      <Footer />
    </>
  );
}
