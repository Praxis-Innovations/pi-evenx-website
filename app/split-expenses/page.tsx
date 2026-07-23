import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SeoJsonLd from '@/components/SeoJsonLd';
import SplitExpensesTool from '@/components/SplitExpensesTool';
import Icon from '@/components/Icon';
import styles from '@/components/SplitExpensesTool.module.css';
import { absoluteUrl, buildBreadcrumbJsonLd, buildHowToJsonLd, buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Free Split Expenses Calculator — Split Bills Evenly, Custom, or by Ratio',
  description:
    'Use this free split expenses calculator to divide bills with friends, roommates, and travel groups. Add people, enter expenses, choose even, custom, or ratio splits, and see who owes whom instantly.',
  path: '/split-expenses',
  keywords: [
    'split expenses',
    'split expenses calculator',
    'bill split calculator',
    'expense split tool',
    'split bill with friends',
    'split expenses calculator',
    'shared expense calculator',
    'divide expenses equally',
    'split rent calculator',
    'trip expense splitter',
    'roommate expense calculator',
    'group bill calculator',
    'free bill splitter',
    'rent split calculator',
    'group expense tool',
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
      'A free browser-based expense split calculator for splitting bills evenly, by custom amount, or by ratio among any number of people.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };
}

const steps = [
  {
    icon: 'users' as const,
    title: 'Add people',
    description: 'Enter the names of everyone sharing the expense — roommates, travel companions, dinner guests, or any group.',
  },
  {
    icon: 'calculator' as const,
    title: 'Add expenses',
    description: 'Enter each bill with the total amount and who paid. Add as many expenses as you need.',
  },
  {
    icon: 'chart-pie' as const,
    title: 'Choose how to split',
    description: 'Split evenly, set custom amounts per person, or use ratios for proportional splits.',
  },
  {
    icon: 'sync' as const,
    title: 'See who owes whom',
    description: 'The calculator shows the minimum number of payments needed so everyone settles up fairly.',
  },
];

export default function SplitExpensesPage() {
  return (
    <>
      <SeoJsonLd data={buildWebApplicationJsonLd()} />
      <SeoJsonLd data={buildHowToJsonLd()} />
      <SeoJsonLd data={buildBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Split Expenses Calculator', path: '/split-expenses' },
      ])} />

      <Navbar />

      <section className="pt-28 pb-14 bg-gradient-to-b from-primary-50 via-white to-slate-50">
        <div className="site-container text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-primary-500/20 bg-primary-500/10 text-primary-600 text-xs font-bold uppercase tracking-wider mb-5">
            <Icon name="calculator" size={14} />
            Free tool
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold text-slate-900 leading-tight tracking-tight mb-4 max-w-3xl mx-auto">
            Split Expenses Calculator — Divide Bills Fairly in Seconds
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            A free online calculator to split bills with roommates, friends, couples, and travel groups.
            Add people, enter expenses, choose even, custom, or ratio-based splits, and see exactly who owes whom.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <div key={step.title} className="flex flex-col items-center gap-2 p-5 rounded-xl bg-white border border-slate-100 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-violet-500 flex items-center justify-center text-white shadow-primary-sm">
                  <Icon name={step.icon} size={18} />
                </div>
                <div className="text-xs font-bold text-primary-600 uppercase tracking-wider">Step {i + 1}</div>
                <h2 className="text-sm font-bold text-slate-900">{step.title}</h2>
                <p className="text-slate-500 text-xs leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className={styles.page}>
        <div className={`site-container ${styles.pageShell}`}>
          <SplitExpensesTool />
          <section className={styles.surface} style={{ marginTop: '1rem' }}>
            <h2 style={{ marginBottom: '0.5rem', color: 'var(--color-neutral-900)' }}>
              Next page for rent and alternatives
            </h2>
            <p style={{ color: 'var(--color-neutral-500)' }}>
              If this calculator is for monthly rent, shared utilities, or comparing options in your
              current app, these pages often help users move from a single bill to a longer-running
              plan.
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.8rem',
                marginTop: '0.85rem',
              }}
            >
              <Link href="/rent-split-calculator" className="inline-link">
                Rent Split Calculator
              </Link>
              <Link href="/splitwise-alternative" className="inline-link">
                Splitwise Alternative
              </Link>
            </div>
          </section>
        </div>
      </main>

      <section className="py-16 bg-white">
        <div className="site-container max-w-3xl">
          <h2 className="text-2xl font-extrabold text-slate-900 mb-6 text-center">
            How the Split Expenses Calculator Works
          </h2>
          <div className="space-y-5 text-slate-600 leading-relaxed">
            <p>
              Splitting bills by hand gets messy fast — especially when different people pay for different things,
              some expenses are shared unevenly, or the group changes from one purchase to the next. This free
              split expenses calculator handles all of that automatically.
            </p>
            <p>
              Start by adding the names of everyone in your group. Then enter each expense: what it was for,
              how much it cost, and who paid. For each expense you can choose an <strong>even split</strong> (everyone
              pays equally), a <strong>custom split</strong> (you set each person's share), or a <strong>ratio-based
              split</strong> (proportional amounts based on ratios you define).
            </p>
            <p>
              Once all expenses are entered, the calculator tallies every payment and share, then shows you
              the <strong>minimum number of transfers</strong> needed to settle all balances. No spreadsheets,
              no mental math — just a clear list of who pays whom and how much.
            </p>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mt-10 mb-4">
            Common use cases for splitting expenses
          </h3>
          <ul className="space-y-3">
            {[
              'Roommates splitting rent, utilities, groceries, and household supplies each month.',
              'Travel groups dividing hotel rooms, meals, gas, tickets, and rideshares during a trip.',
              'Friends splitting dinner bills, concert tickets, or group gift contributions.',
              'Couples tracking shared purchases, subscriptions, and recurring costs.',
              'Event organizers splitting costs for parties, bachelor weekends, or group outings.',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-600">
                <Icon name="check" size={18} className="text-green-500 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-bold text-slate-900 mt-10 mb-4">
            Three ways to split any expense
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h4 className="font-bold text-slate-900 mb-2">Even split</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                The total is divided equally among all participants. Best for shared meals, group activities,
                or any expense everyone contributes to equally.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h4 className="font-bold text-slate-900 mb-2">Custom split</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Set a specific dollar amount for each person. Useful when one person ordered more at dinner
                or when shares are predetermined.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-slate-100 bg-slate-50">
              <h4 className="font-bold text-slate-900 mb-2">Ratio split</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Assign ratios (like 2:1:1) and the calculator divides proportionally. Great for shared rooms
                where one person gets the larger space.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-br from-primary-50 to-violet-50 border-t border-primary-100">
        <div className="site-container text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Want an app that tracks expenses over time?
          </h2>
          <p className="text-slate-600 text-sm mb-5 max-w-xl mx-auto">
            This calculator is great for one-time splits. For ongoing groups — roommates, couples, or recurring
            trips — the EvenX app keeps a running balance and settles up automatically.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-primary">
              Learn more about EvenX
            </Link>
            <Link href="/split-bills-app" className="btn-secondary">
              Split Bills App
            </Link>
            <Link href="/shared-expense-tracker" className="btn-secondary">
              Shared Expense Tracker
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
