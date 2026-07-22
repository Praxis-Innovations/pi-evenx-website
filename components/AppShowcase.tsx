import PhoneFrame from '@/components/PhoneFrame';
import Icon from '@/components/Icon';

const screens = [
  {
    src: '/phone-screenshots/friends.png',
    alt: 'Friends balances screen in the EvenX split bills app',
    label: 'Friends and balances',
    width: 198,
    height: 398,
    rotateY: 10,
    rotateZ: 1,
  },
  {
    src: '/phone-screenshots/dashboard.png',
    alt: 'Shared expense dashboard in EvenX',
    label: 'Shared expense dashboard',
    width: 220,
    height: 440,
    rotateY: 0,
    rotateZ: 0,
  },
  {
    src: '/phone-screenshots/activity.png',
    alt: 'Recent activity feed for group expenses in EvenX',
    label: 'Recent activity',
    width: 198,
    height: 398,
    rotateY: -10,
    rotateZ: -1,
  },
] as const;

export default function AppShowcase() {
  return (
    <section className="bg-gradient-dark text-white section-pad">
      <div className="site-container">
        {/* Section heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-400/20 bg-violet-400/10 text-violet-300 text-sm font-semibold mb-5">
            <Icon name="mobile" size={14} />
            App preview
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            A shared expense tracker your whole group can actually use
          </h2>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Monitor group spending, friends balances, and recent activity from one clean
            dashboard on iPhone and Android.
          </p>
        </div>

        {/* Phone showcase row */}
        <div className="flex items-end justify-center gap-6 md:gap-10">
          {screens.map((screen, index) => (
            <div
              key={screen.label}
              className={`flex flex-col items-center gap-4 ${index === 1 ? '-translate-y-4' : ''} ${index !== 1 ? 'hidden md:flex' : ''}`}
            >
              <PhoneFrame
                src={screen.src}
                alt={screen.alt}
                width={screen.width}
                height={screen.height}
                rotate_y={screen.rotateY}
                rotate_z={screen.rotateZ}
              />
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.12] bg-white/5 text-slate-300 text-sm">
                <span
                  className={`w-2 h-2 rounded-full animate-pulse-dot ${index === 1 ? 'bg-primary-400' : 'bg-violet-400'}`}
                />
                {screen.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
