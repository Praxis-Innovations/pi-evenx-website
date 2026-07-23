import type { Metadata } from 'next';
import Link from 'next/link';
import IntentLandingPage from '@/components/IntentLandingPage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SeoJsonLd from '@/components/SeoJsonLd';
import {
  buildMetadata,
  buildFaqJsonLd,
  buildHowToJsonLd,
} from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Rent Split Calculator for Roommates',
  description:
    'EvenX rent split calculator: split rent, utilities, and household costs by person, share, or percentage while keeping a transparent running balance.',
  path: '/rent-split-calculator',
  keywords: [
    'rent split calculator',
    'split rent calculator',
    'roommate rent calculator',
    'best rent split calculator',
    'roommate rent split app',
    'split utilities',
    'household expense calculator',
    'roommate split bills',
    'evenx rent split',
  ],
});

const pageFaqItems = [
  {
    question: 'How does EvenX split rent when roommates have different room sizes?',
    answer:
      'EvenX supports percentage-based splits, so you can assign a larger share to a bigger room and still keep the rest of your expenses fully transparent.',
  },
  {
    question: 'Can I include groceries and utility bills in the same rent split workflow?',
    answer:
      'Yes. EvenX lets you track recurring rent and one-time shared expenses in the same group, so everyone can see a single clear balance history.',
  },
  {
    question: 'How are monthly settlements reflected in EvenX?',
    answer:
      'Each paid expense updates the running group balance, so your members can quickly see what was paid, who is still owed, and what is already settled.',
  },
  {
    question: 'Can I compare EvenX with spreadsheet-based housing splits?',
    answer:
      'Yes. The biggest advantage is built-in person-level participation, audit trail, and auto-updating running balances that avoid manual recalculation errors.',
  },
];

const rentShareExample = [
  {
    name: 'Alex',
    rentShare: '$810',
    sharedBills: '$210',
    totalOwed: '$1,020',
    paid: '$1,800',
    settlement: 'Receives $780',
  },
  {
    name: 'Blake',
    rentShare: '$630',
    sharedBills: '$210',
    totalOwed: '$840',
    paid: '$270',
    settlement: 'Pays $570',
  },
  {
    name: 'Casey',
    rentShare: '$360',
    sharedBills: '$210',
    totalOwed: '$570',
    paid: '$360',
    settlement: 'Pays $210',
  },
];

const rentSplitSteps = [
  {
    name: 'Create a group',
    text: 'Add your housing group and list roommates with their preferred split setup.',
  },
  {
    name: 'Enter monthly costs',
    text: 'Add this month’s rent, electricity, internet, and water so the current balances stay up to date.',
  },
  {
    name: 'Add mixed split expenses',
    text: 'For groceries and incidentals, use equal, custom, or percentage splits based on contribution or room size.',
  },
  {
    name: 'Track payment events',
    text: 'Record who paid each bill and review the running balance to identify who should settle.',
  },
] as const;

const rentSplitHowTo = buildHowToJsonLd({
  name: 'Rent split calculation walkthrough',
  description:
    'Create a housing group in EvenX, add recurring rent plus utilities, and split each expense by person, percentage, or custom shares.',
  path: '/rent-split-calculator',
  steps: rentSplitSteps,
});

const rentSplitBreadcrumbItems = [
  { name: 'Home', path: '/' },
  { name: 'Split expenses', path: '/split-expenses' },
  { name: 'Rent split calculator', path: '/rent-split-calculator' },
] as const;

export default function RentSplitCalculatorPage() {
  return (
    <>
      <SeoJsonLd data={buildFaqJsonLd(pageFaqItems)} />
      <SeoJsonLd data={rentSplitHowTo} />
      <Navbar />
      <IntentLandingPage
        eyebrow="Rent split calculator"
        title="A rent split calculator for roommates and shared housing"
        description="EvenX helps you handle recurring housing costs and one-off bills in one place. Add rent, utilities, grocery costs, and split logic by person, share, or percentage."
        intro="When your bills are monthly, consistency matters more than single-session math. EvenX keeps all household expenses in one shared timeline so everyone sees the current balances, what was paid, and what is still pending."
        screenshot={{
          src: '/phone-screenshots/dashboard.png',
          alt: 'EvenX dashboard for rent, utilities, and shared housing expenses',
        }}
        benefits={[
          'Split rent and fixed monthly costs across a named person group.',
          'Track who paid utilities, groceries, and incidentals against a moving balance.',
          'Support equal, custom, and percentage-based splits for flexible room agreements.',
        ]}
        useCases={[
          'Flatmates dividing rent and shared utilities by person.',
          'Temporary roommates sharing groceries, internet, and household subscriptions.',
          'Households who need a clear trail for monthly settlements.',
        ]}
        relatedLinks={[
          { href: '/split-expenses', label: 'Split Expenses Calculator' },
          { href: '/split-bills-app', label: 'Split Bills App' },
          { href: '/splitwise-alternative', label: 'Splitwise Alternative' },
          { href: '/shared-expense-tracker', label: 'Shared Expense Tracker' },
        ]}
        breadcrumbName="Rent Split Calculator"
        breadcrumbPath="/rent-split-calculator"
        breadcrumbItems={rentSplitBreadcrumbItems}
      />
      <section className="py-16 bg-slate-50" aria-label="Rent split calculator details">
        <div className="site-container space-y-6">
          <section className="p-6 md:p-8 border border-slate-100 rounded-2xl bg-white shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
              How EvenX compares for rent split workflows
            </h2>
            <p className="text-slate-600 leading-relaxed">
              If your search intent is a{' '}
              <strong>rent split calculator</strong>, EvenX is strongest when you need more than a
              one-time split: recurring bill tracking, mixed participation, and real-time settlement
              context.
            </p>
            <ol className="mt-5 space-y-3 list-decimal pl-5 text-slate-600 leading-relaxed">
              <li>
                <strong>Best for roommates with fixed monthly costs.</strong> Add rent and utilities
                each month, then review updated totals and clear history.
              </li>
              <li>
                <strong>Best for mixed income and room size arrangements.</strong> Use percentage
                splitting when room sizes or room count create uneven fairness assumptions.
              </li>
              <li>
                <strong>Best when everyone in the group uses a phone.</strong> EvenX keeps shared
                balances visible in each member context, including who paid and who owes.
              </li>
            </ol>
          </section>

          <section className="p-6 md:p-8 border border-slate-100 rounded-2xl bg-white shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
              Example rent split calculation
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Example: 3 roommates split monthly housing costs. Rent is $1,800 and room sizes make
              a 45/35/20 rent split fair. Electricity is $180, internet is $90, and groceries are
              $360 split equally.
            </p>
            <div className="my-5 rounded-2xl border border-primary-100 bg-primary-50 p-5 space-y-2 text-sm text-slate-600">
              <p>
                <strong>Rent formula:</strong> $1,800 x each roommate&apos;s agreed percentage.
              </p>
              <p>
                <strong>Shared bills formula:</strong> ($180 electricity + $90 internet + $360
                groceries) / 3 roommates = $210 each.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
              {rentShareExample.map((share) => (
                <article
                  key={share.name}
                  className="p-5 rounded-xl border border-slate-100 bg-slate-50 flex flex-col gap-2 text-sm text-slate-600"
                >
                  <h3 className="text-base font-bold text-slate-900">{share.name}</h3>
                  <span>Rent share: <strong>{share.rentShare}</strong></span>
                  <span>Shared bills: <strong>{share.sharedBills}</strong></span>
                  <span>Total owed: <strong>{share.totalOwed}</strong></span>
                  <span>Paid this month: <strong>{share.paid}</strong></span>
                  <span>Settlement: <strong>{share.settlement}</strong></span>
                </article>
              ))}
            </div>
            <p className="text-slate-600 leading-relaxed">
              In EvenX, add rent as a percentage split, add the other bills as equal splits, and
              mark who paid each one. The running balance then shows the settlement path without
              rebuilding a spreadsheet each month.
            </p>
          </section>

          <section className="p-6 md:p-8 border border-slate-100 rounded-2xl bg-white shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
              Fast path from calculator to group tracking
            </h2>
            <p className="text-slate-600 leading-relaxed">
              If you only need a one-time number, start with the browser-based{' '}
              <Link href="/split-expenses" className="inline-link">
                Split Expenses Calculator
              </Link>
              . For a household that repeats the same bills, create an EvenX group and reuse the
              same rent, utility, and grocery split logic each month.
            </p>
            <ol className="mt-5 space-y-3 list-decimal pl-5 text-slate-600 leading-relaxed">
              {rentSplitSteps.map((step) => (
                <li key={step.name}>
                  <strong>{step.name}.</strong> {step.text}
                </li>
              ))}
            </ol>
          </section>

          <section
            className="p-6 md:p-8 border border-slate-100 rounded-2xl bg-white shadow-sm"
            aria-labelledby="rent-faq-heading"
          >
            <h2 id="rent-faq-heading" className="text-2xl font-extrabold text-slate-900 mb-4">
              Rent split calculator FAQ
            </h2>
            <div className="space-y-3">
              {pageFaqItems.map((item) => (
                <article key={item.question} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <details>
                    <summary className="cursor-pointer font-bold text-slate-900">{item.question}</summary>
                    <p className="mt-3 text-slate-600 leading-relaxed">{item.answer}</p>
                  </details>
                </article>
              ))}
            </div>
          </section>

          <section className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-violet-50 border border-primary-100">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Continue your EvenX setup
            </h2>
            <p className="text-slate-600 mt-2">
              Use the core split flow to create your housing group and start recording payment
              history.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link href="/" className="inline-link">
                Back to homepage
              </Link>
              <Link href="/split-expenses" className="inline-link">
                Start the Split Expenses flow
              </Link>
              <Link href="/shared-expense-tracker" className="inline-link">
                Open shared expense tracker
              </Link>
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </>
  );
}
