import Link from 'next/link';

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
] as const;

export default function HomeIntentLinks() {
  return (
    <section id="compare" className="section-pad">
      <div className="site-container">
        <div className="section-heading">
          <h2 className="section-title">Find the EvenX page that matches your search</h2>
          <p className="section-description">
            These pages explain how EvenX helps with the most common bill splitting and
            shared expense use cases.
          </p>
        </div>

        <div className="teaser-grid">
          {cards.map((card) => (
            <article key={card.href} className="teaser-card">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <div className="teaser-link-row">
                <Link href={card.href} className="inline-link">
                  Open {card.title}
                </Link>
                <Link href="/#contact" className="inline-link">
                  Ask a question
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
