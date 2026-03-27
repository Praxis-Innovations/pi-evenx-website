'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Icon from '@/components/Icon';

const navItems = [
  { href: '/#features', label: 'Features' },
  { href: '/#compare', label: 'Use Cases' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/#contact', label: 'Contact' },
] as const;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const closeMenu = () => setIsMenuOpen(false);
    window.addEventListener('hashchange', closeMenu);
    return () => window.removeEventListener('hashchange', closeMenu);
  }, []);

  return (
    <header className={`site-header${isScrolled ? ' scrolled' : ''}`}>
      <div className="site-container site-nav">
        <Link href="/" className="site-brand" aria-label="EvenX home">
          <Image src="/evenx-logo.png" alt="EvenX logo" width={30} height={30} />
          <span>EvenX</span>
        </Link>

        <nav aria-label="Primary">
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-link">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/split-expenses" className="nav-link nav-link-button">
                Split Calculator
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="nav-menu-button"
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <Icon name="mobile" size={22} />
        </button>
      </div>

      <nav aria-label="Mobile" className={`mobile-nav${isMenuOpen ? ' open' : ''}`}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)}>
            {item.label}
          </Link>
        ))}
        <Link
          href="/split-expenses"
          className="mobile-nav-cta"
          onClick={() => setIsMenuOpen(false)}
        >
          Split Calculator
        </Link>
        <Link href="/expense-splitting-app" onClick={() => setIsMenuOpen(false)}>
          Expense Splitting App
        </Link>
      </nav>
    </header>
  );
}
