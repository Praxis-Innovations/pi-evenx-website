import Link from 'next/link';
import { colors, store_urls } from '@/lib/theme';
import PhoneFrame from '@/components/PhoneFrame';
import Icon from '@/components/Icon';

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="site-container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">
            <Icon name="bolt" size={14} />
            Split bills without the awkward math
          </div>
          <h1 className="hero-title">
            Split bills, track shared expenses, and settle up
            <span className="hero-highlight"> with EvenX</span>
          </h1>
          <p className="hero-subtitle">
            EvenX is a shared expense tracker built for roommates, trips, couples,
            and group events. Add expenses in seconds, split each bill fairly, and
            see who owes what without spreadsheets or group-chat confusion.
          </p>

          <div className="store-buttons">
            <a
              href={store_urls.ios}
              target="_blank"
              rel="noopener noreferrer"
              className="store-button"
            >
              <Icon name="apple" size={28} />
              <span className="store-button-copy">
                <small>Download on the</small>
                <strong>App Store</strong>
              </span>
            </a>
            <a
              href={store_urls.android}
              target="_blank"
              rel="noopener noreferrer"
              className="store-button"
            >
              <Icon name="google-play" size={28} />
              <span className="store-button-copy">
                <small>Get it on</small>
                <strong>Google Play</strong>
              </span>
            </a>
            <Link href="/split-expenses" className="store-button">
              <Icon name="calculator" size={24} />
              <span className="store-button-copy">
                <small>Try the free</small>
                <strong>Expense Calculator</strong>
              </span>
            </Link>
          </div>

          <div className="hero-trust-row">
            <span className="hero-trust-pill">
              <Icon name="shield" size={16} style={{ color: '#93c5fd' }} />
              Private by default
            </span>
            <span className="hero-trust-pill">
              <Icon name="mobile" size={16} style={{ color: '#c4b5fd' }} />
              iPhone and Android
            </span>
            <span className="hero-trust-pill">
              <Icon name="sync" size={16} style={{ color: '#ddd6fe' }} />
              Real-time shared balances
            </span>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-glow" />

          <div className="hero-card hero-card-left">
            <span
              className="hero-card-icon"
              style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}
            >
              <Icon name="check" size={16} />
            </span>
            <div>
              <div style={{ fontSize: '0.72rem', color: colors.neutral[500], fontWeight: 700 }}>
                Settled in seconds
              </div>
              <div style={{ fontWeight: 800 }}>$550 dinner split</div>
            </div>
          </div>

          <div className="hero-card hero-card-right">
            <span
              className="hero-card-icon"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              <Icon name="users" size={16} />
            </span>
            <div>
              <div style={{ fontSize: '0.72rem', color: colors.neutral[500], fontWeight: 700 }}>
                Built for groups
              </div>
              <div style={{ fontWeight: 800 }}>Roommates, trips, events</div>
            </div>
          </div>

          <PhoneFrame
            src="/phone-screenshots/dashboard.png"
            alt="EvenX app dashboard for split bills and shared expense tracking"
            width={260}
            height={520}
            rotate_y={-8}
            rotate_x={5}
            rotate_z={-1}
            priority
          />
        </div>
      </div>
    </section>
  );
}
