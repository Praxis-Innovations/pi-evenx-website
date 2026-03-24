import Icon from '@/components/Icon';
import type { IconName } from '@/components/Icon';

const features = [
  {
    icon: 'calculator',
    title: 'Flexible bill splitting',
    description:
      'Split expenses equally, by custom amount, or by percentage so every bill matches the real arrangement.',
  },
  {
    icon: 'users',
    title: 'Groups for roommates and trips',
    description:
      'Create groups for apartments, vacations, events, or recurring household costs and keep everyone on the same page.',
  },
  {
    icon: 'chart-pie',
    title: 'Shared expense tracking',
    description:
      'See balances, history, and who paid for what at a glance instead of checking multiple chats or notes.',
  },
  {
    icon: 'mobile',
    title: 'Mobile-first expense entry',
    description:
      'Add bills on the go right after dinner, groceries, rent, or travel bookings while the details are still fresh.',
  },
  {
    icon: 'shield',
    title: 'Private and secure',
    description:
      'Expense data stays protected in transit, and the product is built to keep money conversations clear and controlled.',
  },
  {
    icon: 'sync',
    title: 'Updated balances for everyone',
    description:
      'When someone adds an expense or settles up, the shared view updates so the group always sees the latest numbers.',
  },
] as const satisfies ReadonlyArray<{
  icon: IconName;
  title: string;
  description: string;
}>;

export default function Features() {
  return (
    <section id="features" className="section-pad">
      <div className="site-container">
        <div className="section-heading">
          <div className="eyebrow">
            <Icon name="bolt" size={14} />
            Core features
          </div>
          <h2 className="section-title">Everything you need in a split bills app</h2>
          <p className="section-description">
            EvenX helps groups split expenses fairly, keep a clean history, and settle
            balances without manual calculations.
          </p>
        </div>

        <div className="feature-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <div className="feature-icon">
                <Icon name={feature.icon} size={24} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
