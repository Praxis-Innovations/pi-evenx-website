import Link from 'next/link';
import Icon from '@/components/Icon';

const cards = [
  {
    href: '/split-expenses',
    title: 'Split Expenses Calculator',
    description:
      'For users who want a fast browser tool to split bills instantly with equal, custom, or ratio-based splits.',
  },
  {
    href: '/split-bills-app',
    title: 'Split Bills App',
    description:
      'For users searching for a fast way to split dinner, rent, groceries, and recurring group costs.',
  },
  {
    href: '/expense-splitting-app',
    title: 'Expense Splitting App',
    description:
      'For shared travel, events, and mixed group spending where every bill needs the right split.',
  },
  {
    href: '/shared-expense-tracker',
    title: 'Shared Expense Tracker',
    description:
      'For groups that want a clear running history of who paid, who owes, and what has been settled.',
  },
  {
    href: '/rent-split-calculator',
    title: 'Rent Split Calculator',
    description:
      'For roommates and housemates balancing rent, utilities, and recurring shared household costs.',
  },
  {
    href: '/splitwise-alternative',
    title: 'Splitwise Alternative',
    description:
      'For users comparing shared expense apps and checking the fit for recurring group-based splitting.',
  },
] as const;

export default function HomeIntentLinks() {
  return (
    <section id="compare" className="section-pad">
      <div className="site-container">
        {/* Section heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Find the EvenX page that matches your search
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            These pages explain how EvenX helps with the most common bill splitting and
            shared expense use cases.
          </p>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card) => (
            <article
              key={card.href}
              className="border border-slate-100 rounded-2xl bg-white shadow-sm p-5 flex flex-col gap-3
                         hover:shadow-card hover:border-primary-100 transition-all duration-300"
            >
              <h3 className="font-bold text-slate-900">{card.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed flex-1">
                {card.description}
              </p>
              <div className="flex items-center gap-4 pt-1">
                <Link
                  href={card.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors"
                >
                  Open {card.title.split(' ')[0]}
                  <Icon name="arrow-right" size={14} />
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors"
                >
                  Ask a question
                  <Icon name="arrow-right" size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
