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
    <section className="showcase-section section-pad">
      <div className="site-container">
        <div className="section-heading">
          <div className="eyebrow" style={{ color: '#c4b5fd', borderColor: 'rgba(196,181,253,0.22)' }}>
            <Icon name="mobile" size={14} />
            App preview
          </div>
          <h2 className="section-title" style={{ color: 'white' }}>
            A shared expense tracker your whole group can actually use
          </h2>
          <p className="section-description" style={{ color: '#cbd5e1' }}>
            Monitor group spending, friends balances, and recent activity from one clean
            dashboard on iPhone and Android.
          </p>
        </div>

        <div className="showcase-row">
          {screens.map((screen, index) => (
            <div
              key={screen.label}
              className={`showcase-item${index === 1 ? ' is-centered' : ''}`}
            >
              <PhoneFrame
                src={screen.src}
                alt={screen.alt}
                width={screen.width}
                height={screen.height}
                rotate_y={screen.rotateY}
                rotate_z={screen.rotateZ}
              />
              <div className="pill-label">
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: index === 1 ? '#818cf8' : '#a78bfa',
                    animation: 'pulseDot 2s ease-in-out infinite',
                  }}
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
