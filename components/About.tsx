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
    <section className="bg-slate-50 section-pad">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text column */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-200 bg-primary-50 text-primary-600 text-sm font-semibold mb-5">
              <Icon name="heart" size={14} />
              Why groups choose EvenX
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-left">
              Built for everyday shared spending, from rent to road trips
            </h2>
            <p className="mt-4 text-lg text-slate-500 leading-relaxed">
              EvenX was created to make splitting expenses simpler and less awkward. Instead
              of juggling notes, payment screenshots, and mental math, your group gets one
              place to record bills, review history, and settle balances clearly.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              It works well for roommate bills, travel costs, couples sharing purchases, and
              group events where everyone needs a clean answer to &ldquo;who owes what?&rdquo;
            </p>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map((stat) => (
                <div
                  key={stat.value}
                  className="border border-slate-100 rounded-xl bg-white p-5 shadow-sm"
                >
                  <Icon name={stat.icon} size={22} className="text-primary-500" />
                  <div className="mt-2.5 font-extrabold text-slate-900">
                    {stat.value}
                  </div>
                  <div className="text-slate-500 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Phone column */}
          <div className="flex justify-center">
            <PhoneFrame
              src="/phone-screenshots/groups.png"
              alt="Group overview screen in EvenX for roommate and trip expenses"
              width={240}
              height={480}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
