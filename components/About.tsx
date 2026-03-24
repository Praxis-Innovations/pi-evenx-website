import PhoneFrame from '@/components/PhoneFrame';
import Icon from '@/components/Icon';
import type { IconName } from '@/components/Icon';

const stats = [
  {
    icon: 'download',
    value: 'Free to start',
    label: 'No spreadsheet needed',
  },
  {
    icon: 'mobile',
    value: 'iOS and Android',
    label: 'Cross-platform groups',
  },
] as const satisfies ReadonlyArray<{
  icon: IconName;
  value: string;
  label: string;
}>;

export default function About() {
  return (
    <section className="about-section section-pad">
      <div className="site-container about-grid">
        <div>
          <div className="eyebrow">
            <Icon name="heart" size={14} />
            Why groups choose EvenX
          </div>
          <h2 className="section-title" style={{ textAlign: 'left' }}>
            Built for everyday shared spending, from rent to road trips
          </h2>
          <p className="section-description" style={{ marginInline: 0 }}>
            EvenX was created to make splitting expenses simpler and less awkward. Instead
            of juggling notes, payment screenshots, and mental math, your group gets one
            place to record bills, review history, and settle balances clearly.
          </p>
          <p
            style={{
              marginTop: '1rem',
              color: 'var(--color-neutral-600)',
              fontSize: '1.04rem',
            }}
          >
            It works well for roommate bills, travel costs, couples sharing purchases, and
            group events where everyone needs a clean answer to “who owes what?”
          </p>

          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.value} className="stat-card">
                <Icon name={stat.icon} size={22} style={{ color: '#6366f1' }} />
                <div
                  style={{
                    marginTop: '0.65rem',
                    fontWeight: 800,
                    color: 'var(--color-neutral-900)',
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ color: 'var(--color-neutral-500)', fontSize: '0.92rem' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PhoneFrame
            src="/phone-screenshots/groups.png"
            alt="Group overview screen in EvenX for roommate and trip expenses"
            width={240}
            height={480}
          />
        </div>
      </div>
    </section>
  );
}
