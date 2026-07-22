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
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl transition-shadow duration-300 ${
        isScrolled ? 'shadow-nav' : ''
      }`}
    >
      <div className="site-container flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 no-underline"
          aria-label="EvenX home"
        >
          <Image src="/evenx-logo.png" alt="EvenX logo" width={30} height={30} />
          <span className="text-lg font-extrabold text-slate-900 tracking-tight">
            EvenX
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 list-none m-0 p-0">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="px-3.5 py-2 text-sm font-semibold text-slate-600 rounded-lg
                             hover:text-primary-600 hover:bg-primary-50
                             transition-colors duration-200 no-underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/split-expenses"
                className="ml-2 px-4 py-2 text-sm font-bold text-white rounded-lg
                           bg-gradient-primary shadow-primary-sm
                           hover:shadow-primary-md hover:-translate-y-0.5
                           transition-all duration-200 no-underline"
              >
                Split Calculator
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg
                     text-slate-700 hover:bg-slate-100 transition-colors duration-200"
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <Icon name={isMenuOpen ? 'close' : 'menu'} size={22} />
        </button>
      </div>

      {/* Mobile menu */}
      <nav
        aria-label="Mobile"
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="site-container flex flex-col gap-1 pb-5 pt-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className="px-4 py-3 text-sm font-semibold text-slate-700 rounded-lg
                         hover:bg-primary-50 hover:text-primary-600
                         transition-colors duration-200 no-underline"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/split-expenses"
            onClick={() => setIsMenuOpen(false)}
            className="mt-2 px-4 py-3 text-sm font-bold text-white text-center rounded-lg
                       bg-gradient-primary shadow-primary-sm no-underline"
          >
            Split Calculator
          </Link>
        </div>
      </nav>
    </header>
  );
}
