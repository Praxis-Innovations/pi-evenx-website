import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { store_urls } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-gradient-dark text-white py-16 pb-10">
      <div className="site-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-flex items-center gap-2.5 text-white font-bold text-lg no-underline">
              <Image src="/evenx-logo.png" alt="EvenX logo" width={20} height={20} />
              <span>EvenX</span>
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed">
              The split bills app for roommates, trips, group events, and everyday shared
              expenses.
            </p>
          </div>

          {/* Explore column */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-1">Explore</h3>
            <Link href="/#features" className="text-slate-300 hover:text-white transition-colors text-sm">Features</Link>
            <Link href="/#compare" className="text-slate-300 hover:text-white transition-colors text-sm">Use Cases</Link>
            <Link href="/#faq" className="text-slate-300 hover:text-white transition-colors text-sm">FAQ</Link>
            <Link href="/#contact" className="text-slate-300 hover:text-white transition-colors text-sm">Contact</Link>
            <Link href="/products" className="text-slate-300 hover:text-white transition-colors text-sm">Our Products</Link>
          </div>

          {/* Search Pages column */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-1">Search Pages</h3>
            <Link href="/split-expenses" className="text-slate-300 hover:text-white transition-colors text-sm">Split Expenses Calculator</Link>
            <Link href="/split-bills-app" className="text-slate-300 hover:text-white transition-colors text-sm">Split Bills App</Link>
            <Link href="/expense-splitting-app" className="text-slate-300 hover:text-white transition-colors text-sm">Expense Splitting App</Link>
            <Link href="/shared-expense-tracker" className="text-slate-300 hover:text-white transition-colors text-sm">Shared Expense Tracker</Link>
            <Link href="/rent-split-calculator" className="text-slate-300 hover:text-white transition-colors text-sm">Rent Split Calculator</Link>
            <Link href="/splitwise-alternative" className="text-slate-300 hover:text-white transition-colors text-sm">Splitwise Alternative</Link>
          </div>

          {/* Support column */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-1">Support</h3>
            <Link href="/privacy_policy.html" className="text-slate-300 hover:text-white transition-colors text-sm">Privacy Policy</Link>
            <Link href="/terms_and_conditions.html" className="text-slate-300 hover:text-white transition-colors text-sm">Terms of Service</Link>
            <Link href="/account-deletion" className="text-slate-300 hover:text-white transition-colors text-sm">Account Deletion</Link>
            <a
              href={store_urls.ios}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm"
            >
              <Icon name="apple" size={16} />
              App Store
            </a>
            <a
              href={store_urls.android}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm"
            >
              <Icon name="google-play" size={16} />
              Google Play
            </a>
          </div>
        </div>

        {/* Divider and copyright */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-slate-400 text-sm">
          &copy; 2026 EvenX. All rights reserved. A product of{' '}
          <a href="https://praxisinnovations.ca/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors underline">
            Praxis Innovations Inc.
          </a>
        </div>
      </div>
    </footer>
  );
}
