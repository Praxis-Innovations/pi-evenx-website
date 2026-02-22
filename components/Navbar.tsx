'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { colors } from '@/lib/theme';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const [is_menu_open, setIsMenuOpen] = useState<boolean>(false);
  const [window_width, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = (): void => {
    setIsMenuOpen(!is_menu_open);
  };

  const closeMenu = (): void => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (section_id: string): void => {
    const element = document.getElementById(section_id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  const styles = {
    navbar: {
      position: 'fixed' as const,
      top: 0,
      width: '100%',
      background: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      padding: '0.75rem 0',
      transition: 'all 0.3s ease',
      boxShadow: isScrolled ? '0 2px 20px rgba(0, 0, 0, 0.08)' : 'none',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '1.5rem',
      fontWeight: 700,
      color: colors.primary[500],
      fontFamily: 'var(--font-plus-jakarta-sans), sans-serif',
    },
    menu: {
      display: 'flex',
      listStyle: 'none' as const,
      gap: '2rem',
      margin: 0,
      padding: 0,
    },
    nav_link: {
      background: 'none',
      border: 'none',
      textDecoration: 'none',
      color: colors.neutral[600],
      fontWeight: 500,
      transition: 'color 0.3s ease',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontSize: '1rem',
    },
    hamburger: {
      display: 'flex',
      flexDirection: 'column' as const,
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: '8px',
      borderRadius: '4px',
      transition: 'all 0.3s ease',
    },
    bar: {
      width: '25px',
      height: '3px',
      background: colors.neutral[600],
      margin: '3px 0',
      transition: '0.3s ease',
      borderRadius: '2px',
    },
    mobile_menu: {
      position: 'fixed' as const,
      left: is_menu_open ? 0 : '-100%',
      top: '70px',
      flexDirection: 'column' as const,
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(10px)',
      width: '100%',
      textAlign: 'center' as const,
      transition: '0.3s ease',
      boxShadow: '0 10px 27px rgba(0, 0, 0, 0.08)',
      padding: '2rem 0',
      display: 'flex',
      listStyle: 'none' as const,
      margin: 0,
      zIndex: 999,
    },
    mobile_link: {
      background: 'none',
      border: 'none',
      textDecoration: 'none',
      color: colors.neutral[600],
      fontWeight: 600,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontSize: '1.1rem',
      padding: '0.75rem 2rem',
      borderRadius: '8px',
      display: 'block',
      width: '100%',
    },
  };

  const is_ready = window_width > 0;

  return (
    <nav style={{ ...styles.navbar, visibility: is_ready ? 'visible' : 'hidden' }}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <Image src="/evenx-logo.png" alt="EvenX logo" width={28} height={28} style={{ marginRight: '0.5rem' }} />
          <span>EvenX</span>
        </div>

        {window_width > 768 && (
          <ul style={styles.menu}>
            {['Home', 'Features', 'About', 'Contact'].map((item) => (
              <li key={item} style={{ listStyle: 'none' }}>
                <button
                  onClick={() => scrollToSection(item.toLowerCase())}
                  style={styles.nav_link}
                  onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary[500])}
                  onMouseLeave={(e) => (e.currentTarget.style.color = colors.neutral[600])}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        )}

        {window_width <= 768 && (
          <div
            style={styles.hamburger}
            onClick={toggleMenu}
            onMouseEnter={(e) => (e.currentTarget.style.background = `${colors.primary[500]}10`)}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <span style={{ ...styles.bar, transform: is_menu_open ? 'translateY(8px) rotate(45deg)' : 'none' }} />
            <span style={{ ...styles.bar, opacity: is_menu_open ? 0 : 1 }} />
            <span style={{ ...styles.bar, transform: is_menu_open ? 'translateY(-8px) rotate(-45deg)' : 'none' }} />
          </div>
        )}
      </div>

      {window_width <= 768 && (
        <ul style={styles.mobile_menu}>
          {['Home', 'Features', 'About', 'Contact'].map((item) => (
            <li key={item} style={{ margin: '1rem 0' }}>
              <button
                onClick={() => scrollToSection(item.toLowerCase())}
                style={styles.mobile_link}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${colors.primary[500]}10`;
                  e.currentTarget.style.color = colors.primary[500];
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = colors.neutral[600];
                }}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
