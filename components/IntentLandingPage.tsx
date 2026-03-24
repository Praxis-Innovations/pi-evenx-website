import Link from 'next/link';
import PhoneFrame from '@/components/PhoneFrame';
import Icon from '@/components/Icon';
import { store_urls } from '@/lib/theme';

type IntentLandingPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  screenshot: {
    src: string;
    alt: string;
  };
  benefits: string[];
  useCases: string[];
  relatedLinks: Array<{ href: string; label: string }>;
};

export default function IntentLandingPage({
  eyebrow,
  title,
  description,
  intro,
  screenshot,
  benefits,
  useCases,
  relatedLinks,
}: IntentLandingPageProps) {
  return (
    <main className="intent-page">
      <div className="site-container intent-stack">
        <section className="intent-hero-grid">
          <div className="intent-hero-copy">
            <div className="eyebrow">
              <Icon name="bolt" size={14} />
              {eyebrow}
            </div>
            <h1>{title}</h1>
            <p>{description}</p>
            <div className="store-buttons">
              <a
                href={store_urls.ios}
                target="_blank"
                rel="noopener noreferrer"
                className="store-button"
              >
                <Icon name="apple" size={24} />
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
                <Icon name="google-play" size={24} />
                <span className="store-button-copy">
                  <small>Get it on</small>
                  <strong>Google Play</strong>
                </span>
              </a>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PhoneFrame
              src={screenshot.src}
              alt={screenshot.alt}
              width={235}
              height={470}
            />
          </div>
        </section>

        <section className="intent-surface">
          <h2>Why EvenX fits this use case</h2>
          <p>{intro}</p>
          <ul>
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </section>

        <section className="intent-surface">
          <h2>Common use cases</h2>
          <ul>
            {useCases.map((useCase) => (
              <li key={useCase}>{useCase}</li>
            ))}
          </ul>
        </section>

        <section className="intent-cta-band">
          <h2 style={{ color: 'var(--color-neutral-900)' }}>Explore related EvenX pages</h2>
          <p style={{ color: 'var(--color-neutral-600)', marginTop: '0.45rem' }}>
            These internal pages cover closely related bill-splitting searches and help you
            compare how EvenX handles each scenario.
          </p>
          <div className="cross-link-row" style={{ marginTop: '1rem' }}>
            <Link href="/" className="inline-link">
              Homepage
            </Link>
            {relatedLinks.map((link) => (
              <Link key={link.href} href={link.href} className="inline-link">
                {link.label}
              </Link>
            ))}
            <Link href="/#contact" className="inline-link">
              Contact EvenX
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
