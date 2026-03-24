import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { store_urls } from '@/lib/theme';

export default function Footer() {
  return (
    <footer className="footer-shell">
      <div className="site-container">
        <div className="footer-grid">
          <div className="footer-column">
            <Link href="/" className="site-brand" style={{ color: 'white' }}>
              <Image src="/evenx-logo.png" alt="EvenX logo" width={20} height={20} />
              <span>EvenX</span>
            </Link>
            <p style={{ color: 'var(--color-neutral-300)' }}>
              The split bills app for roommates, trips, group events, and everyday shared
              expenses.
            </p>
          </div>

          <div className="footer-column">
            <h3>Explore</h3>
            <Link href="/#features">Features</Link>
            <Link href="/#compare">Use Cases</Link>
            <Link href="/#faq">FAQ</Link>
            <Link href="/#contact">Contact</Link>
          </div>

          <div className="footer-column">
            <h3>Search Pages</h3>
            <Link href="/split-bills-app">Split Bills App</Link>
            <Link href="/expense-splitting-app">Expense Splitting App</Link>
            <Link href="/shared-expense-tracker">Shared Expense Tracker</Link>
          </div>

          <div className="footer-column">
            <h3>Support</h3>
            <Link href="/privacy_policy.html">Privacy Policy</Link>
            <Link href="/terms_and_conditions.html">Terms of Service</Link>
            <Link href="/account-deletion">Account Deletion</Link>
            <a href={store_urls.ios} target="_blank" rel="noopener noreferrer">
              <span className="footer-links">
                <Icon name="apple" size={16} />
                App Store
              </span>
            </a>
            <a href={store_urls.android} target="_blank" rel="noopener noreferrer">
              <span className="footer-links">
                <Icon name="google-play" size={16} />
                Google Play
              </span>
            </a>
          </div>
        </div>

        <div className="footer-divider">© 2026 EvenX. All rights reserved.</div>
      </div>
    </footer>
  );
}
