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
  title: 'Splitwise Alternative (2026): Split Expenses',
  description:
    'Looking for a Splitwise alternative? Compare feature fit, recurring workflows, and settlement clarity with EvenX, a mobile-first shared expense app for roommates and groups.',
  path: '/splitwise-alternative',
  keywords: [
    'splitwise alternative',
    'apps like splitwise',
    'best splitwise alternative',
    'splitwise competitor',
    'split expenses app',
    'alternative to Splitwise',
    'shared expense tracker app',
    'shared expenses app review',
    'evenx review',
  ],
});

const splitwiseFaqItems = [
  {
    question: 'Is EvenX a good alternative if our group changes members frequently?',
    answer:
      'Yes. EvenX handles changing participation by letting you select participants per expense and keep historical settlement clarity for each period.',
  },
  {
    question: 'How is EvenX different from chat-based expense tracking?',
    answer:
      'EvenX is structured around grouped expense entries, clear split methods, and running balances instead of message-thread manual reconciliation.',
  },
  {
    question: 'Do we still need external spreadsheets with EvenX?',
    answer:
      'Most teams use EvenX as the system of record for shared expenses, since each bill and payment is captured in one timeline and searchable by member.',
  },
  {
    question: 'Can I switch from an existing expense split app to EvenX?',
    answer:
      'Yes. You can migrate by recreating active groups and entering your latest balances as opening entries, then continue with recurring bills in EvenX.',
  },
];

const comparisonItems = [
  {
    title: 'Recurring shared costs',
    detail:
      'EvenX fits groups that log rent, utilities, groceries, subscriptions, and one-off bills in the same running timeline.',
  },
  {
    title: 'Flexible splits',
    detail:
      'Equal, custom, and percentage split modes help each bill match the real agreement instead of forcing one default.',
  },
  {
    title: 'Mobile-first setup',
    detail:
      'Groups can create a shared expense space, add members, and check balances from iPhone or Android.',
  },
  {
    title: 'Settlement context',
    detail:
      'The activity history keeps who paid, who participated, and what changed visible when the group settles up.',
  },
];

const migrationSteps = [
  {
    name: 'List active groups',
    text:
      'Keep only groups that still have open bills or recurring costs so the move stays focused.',
  },
  {
    name: 'Capture current balances',
    text:
      'Review what each person owes today and record those amounts as opening entries where needed.',
  },
  {
    name: 'Recreate key workflows',
    text:
      'Add the next rent, utility, grocery, or trip expense in EvenX and choose the split mode that matches the bill.',
  },
] as const;

const migrationHowTo = buildHowToJsonLd({
  name: 'Migrate shared expense tracking to EvenX',
  description:
    'Move active shared expense groups and current balances into EvenX, then continue with the next real group expense.',
  path: '/splitwise-alternative',
  steps: migrationSteps,
});

const splitwiseBreadcrumbItems = [
  { name: 'Home', path: '/' },
  { name: 'Split Expenses', path: '/split-expenses' },
  { name: 'Splitwise Alternative', path: '/splitwise-alternative' },
] as const;

export default function SplitwiseAlternativePage() {
  return (
    <>
      <SeoJsonLd data={buildFaqJsonLd(splitwiseFaqItems)} />
      <SeoJsonLd data={migrationHowTo} />
      <Navbar />
      <IntentLandingPage
        eyebrow="Splitwise alternative"
        title="A practical Splitwise alternative for shared cost workflows"
        description="EvenX focuses on fast bill entry, transparent running balances, and simple group clarity for roommates, couples, and travel groups."
        intro="If you are comparing a Splitwise alternative, align on your group's real needs first: recurring bills, multiple split methods, and visibility on what is already settled."
        screenshot={{
          src: '/phone-screenshots/activity.png',
          alt: 'EvenX shared expense tracker and settlement history',
        }}
        benefits={[
          'Compare based on workflow fit: one-time expenses, recurring housing costs, and mixed participation.',
          'Keep both custom-split flexibility and straightforward equal splits in one place.',
          'Track a clean settlement timeline so groups do not lose context in messages.',
        ]}
        useCases={[
          'Roommates evaluating a simpler setup for rent, utilities, and groceries.',
          'Friends who need recurring expense visibility across changing group membership.',
          'Travel groups wanting reliable balances after people join and leave.',
        ]}
        relatedLinks={[
          { href: '/shared-expense-tracker', label: 'Shared Expense Tracker' },
          { href: '/expense-splitting-app', label: 'Expense Splitting App' },
          { href: '/rent-split-calculator', label: 'Rent Split Calculator' },
          { href: '/split-bills-app', label: 'Split Bills App' },
          { href: '/split-expenses', label: 'Split Expenses Calculator' },
        ]}
        breadcrumbName="Splitwise Alternative"
        breadcrumbPath="/splitwise-alternative"
        breadcrumbItems={splitwiseBreadcrumbItems}
      />
      <section className="py-16 bg-slate-50" aria-label="Splitwise alternative details">
        <div className="site-container space-y-6">
          <section className="p-6 md:p-8 border border-slate-100 rounded-2xl bg-white shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
              How to compare apps like Splitwise
            </h2>
            <p className="text-slate-600 leading-relaxed">
              A better fit depends on the bills your group repeats, the split methods you need, and
              whether everyone can understand the balance after the month changes. EvenX is a
              practical alternative when the workflow is mostly shared expense entry, balance
              tracking, and settlement clarity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              {comparisonItems.map((item) => (
                <article key={item.title} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                  <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="p-6 md:p-8 border border-slate-100 rounded-2xl bg-white shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
              Migration plan from your current expense app
            </h2>
            <p className="text-slate-600 leading-relaxed">
              You do not need to move every historical receipt to test EvenX. Start with the current
              balances and the next round of real bills, then compare whether your group gets clearer
              answers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
              {migrationSteps.map((step) => (
                <article key={step.name} className="p-5 rounded-xl border border-slate-100 bg-slate-50">
                  <h3 className="font-bold text-slate-900 mb-2">{step.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.text}</p>
                </article>
              ))}
            </div>
            <p className="text-slate-600 leading-relaxed">
              For a small trial, create one household or trip group, add one recurring bill, one
              equal split, and one custom or percentage split. If people can see who paid and who
              owes without checking a spreadsheet or chat thread, the migration is working.
            </p>
          </section>

          <section
            className="p-6 md:p-8 border border-slate-100 rounded-2xl bg-white shadow-sm"
            aria-labelledby="splitwise-faq-heading"
          >
            <h2 id="splitwise-faq-heading" className="text-2xl font-extrabold text-slate-900 mb-4">
              Splitwise alternative FAQ
            </h2>
            <div className="space-y-3">
              {splitwiseFaqItems.map((item) => (
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
              Move from comparison to setup
            </h2>
            <p className="text-slate-600 mt-2">
              Continue to the core flow and see why EvenX keeps balances visible across one-time
              and recurring expense events.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link href="/" className="inline-link">
                Back to EvenX homepage
              </Link>
              <Link href="/split-expenses" className="inline-link">
                Try the Split Expenses flow
              </Link>
              <Link href="/rent-split-calculator" className="inline-link">
                Compare rent splitting
              </Link>
              <Link href="/expense-splitting-app" className="inline-link">
                Explore expense splitting app
              </Link>
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </>
  );
}
