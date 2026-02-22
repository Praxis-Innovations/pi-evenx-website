'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { colors, gradients, radius, store_urls } from '@/lib/theme';

const Footer: React.FC = () => {
  const [is_loaded, setIsLoaded] = useState(false);
  const [window_width, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setIsLoaded(true);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    footer: {
      background: gradients.footer,
      color: colors.white,
      padding: window_width <= 768 ? '3rem 0 1.5rem' : '4rem 0 2rem',
      position: 'relative' as const,
      overflow: 'hidden',
      opacity: is_loaded ? 1 : 0,
      transform: is_loaded ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: window_width <= 480 ? '0 16px' : '0 20px',
    },
    content: {
      display: 'grid',
      gridTemplateColumns:
        window_width <= 480 ? '1fr' : window_width <= 768 ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: window_width <= 768 ? '1.5rem' : '2rem',
      marginBottom: window_width <= 768 ? '2rem' : '3rem',
    },
    section: {
      marginBottom: window_width <= 768 ? '1.5rem' : '0',
      opacity: is_loaded ? 1 : 0,
      transform: is_loaded ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    section_title: {
      fontSize: window_width <= 480 ? '1rem' : '1.1rem',
      fontWeight: 700,
      marginBottom: window_width <= 768 ? '0.75rem' : '1rem',
      color: colors.neutral[50],
      display: 'flex',
      alignItems: 'center',
    },
    links: {
      listStyle: 'none' as const,
      padding: 0,
      margin: 0,
    },
    link_item: {
      marginBottom: window_width <= 768 ? '0.75rem' : '0.5rem',
    },
    link: {
      color: colors.neutral[300],
      textDecoration: 'none',
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      fontSize: window_width <= 480 ? '0.9rem' : '1rem',
      display: 'block',
      padding: window_width <= 768 ? '0.5rem 0' : '0',
      borderRadius: radius.sm,
      paddingLeft: window_width <= 768 ? '0.5rem' : '0',
    },
    bottom: {
      borderTop: `1px solid ${colors.neutral[700]}`,
      paddingTop: window_width <= 768 ? '1.5rem' : '2rem',
      textAlign: 'center' as const,
      color: colors.neutral[400],
      opacity: is_loaded ? 1 : 0,
      transform: is_loaded ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s',
    },
    description: {
      color: colors.neutral[300],
      lineHeight: 1.6,
      fontSize: window_width <= 480 ? '0.9rem' : '1rem',
      marginBottom: window_width <= 768 ? '1rem' : '1.5rem',
    },
    download_btn: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'rgba(255, 255, 255, 0.08)',
      padding: '0.5rem 1rem',
      borderRadius: radius.md,
      border: '1px solid rgba(255, 255, 255, 0.12)',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      marginBottom: '0.5rem',
      textDecoration: 'none',
      color: colors.white,
    },
  };

  return (
    <footer style={{ ...styles.footer, visibility: window_width > 0 ? 'visible' : 'hidden' }}>
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.section}>
            <h3 style={styles.section_title}>
              <Image src="/evenx-logo.png" alt="EvenX logo" width={18} height={18} style={{ marginRight: '0.5rem' }} />
              EvenX
            </h3>
            <p style={styles.description}>Making expense splitting simple, fair, and stress-free.</p>
          </div>

          <div style={styles.section}>
            <h3 style={styles.section_title}>Quick Links</h3>
            <ul style={styles.links}>
              <li style={styles.link_item}>
                <a
                  href="#home"
                  style={styles.link}
                  onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary[300])}
                  onMouseLeave={(e) => (e.currentTarget.style.color = colors.neutral[300])}
                >
                  Home
                </a>
              </li>
              <li style={styles.link_item}>
                <a
                  href="#features"
                  style={styles.link}
                  onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary[300])}
                  onMouseLeave={(e) => (e.currentTarget.style.color = colors.neutral[300])}
                >
                  Features
                </a>
              </li>
              <li style={styles.link_item}>
                <a
                  href="#about"
                  style={styles.link}
                  onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary[300])}
                  onMouseLeave={(e) => (e.currentTarget.style.color = colors.neutral[300])}
                >
                  About
                </a>
              </li>
              <li style={styles.link_item}>
                <a
                  href="#contact"
                  style={styles.link}
                  onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary[300])}
                  onMouseLeave={(e) => (e.currentTarget.style.color = colors.neutral[300])}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div style={styles.section}>
            <h3 style={styles.section_title}>Support</h3>
            <ul style={styles.links}>
              <li style={styles.link_item}>
                <a
                  href="/privacy_policy.html"
                  style={styles.link}
                  onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary[300])}
                  onMouseLeave={(e) => (e.currentTarget.style.color = colors.neutral[300])}
                >
                  Privacy Policy
                </a>
              </li>
              <li style={styles.link_item}>
                <a
                  href="/terms_and_conditions.html"
                  style={styles.link}
                  onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary[300])}
                  onMouseLeave={(e) => (e.currentTarget.style.color = colors.neutral[300])}
                >
                  Terms of Service
                </a>
              </li>
              <li style={styles.link_item}>
                <a
                  href="/account-deletion"
                  style={styles.link}
                  onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary[300])}
                  onMouseLeave={(e) => (e.currentTarget.style.color = colors.neutral[300])}
                >
                  Account Deletion
                </a>
              </li>
            </ul>
          </div>

          <div style={styles.section}>
            <h3 style={styles.section_title}>Download</h3>
            <div>
              <a
                href={store_urls.ios}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.download_btn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                }}
              >
                <i className="fab fa-apple" style={{ fontSize: '1.2rem' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>App Store</span>
              </a>
              <a
                href={store_urls.android}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.download_btn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                }}
              >
                <i className="fab fa-google-play" style={{ fontSize: '1.2rem' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Google Play</span>
              </a>
            </div>
          </div>
        </div>

        <div style={styles.bottom}>
          <p>&copy; 2026 EvenX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
