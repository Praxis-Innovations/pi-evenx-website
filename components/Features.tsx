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
        {/* Section heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-200 bg-primary-50 text-primary-600 text-sm font-semibold mb-5">
            <Icon name="bolt" size={14} />
            Core features
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything you need in a split bills app
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            EvenX helps groups split expenses fairly, keep a clean history, and settle
            balances without manual calculations.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="relative overflow-hidden border border-slate-100 rounded-2xl bg-white shadow-sm p-6
                         before:absolute before:top-0 before:inset-x-0 before:h-1 before:bg-gradient-primary before:rounded-t-2xl
                         hover:-translate-y-1 hover:shadow-card transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-violet-500 shadow-primary-sm flex items-center justify-center text-white mb-4">
                <Icon name={feature.icon} size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
