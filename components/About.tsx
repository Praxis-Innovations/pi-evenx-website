'use client';

import React, { useState, useEffect } from 'react';
import { colors, radius } from '@/lib/theme';
import PhoneFrame from './PhoneFrame';

const stats = [
  { icon: 'fas fa-download', value: 'Free', label: '', color: '#86efac' },
  { icon: 'fas fa-mobile-alt', value: 'iOS + Android', label: 'Cross-platform', color: '#a5b4fc' },
];

const About: React.FC = () => {
  const [is_mobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      id="about"
      style={{
        padding: is_mobile ? '60px 0' : '90px 0',
        background: colors.neutral[50],
        position: 'relative',
        overflow: 'hidden',
        visibility: mounted ? 'visible' : 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: is_mobile ? '0 20px' : '0 30px',
          display: 'grid',
          gridTemplateColumns: is_mobile ? '1fr' : '1fr 1fr',
          gap: is_mobile ? '3rem' : '5rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Left: copy + stats */}
        <div
          style={{
            textAlign: is_mobile ? 'center' : 'left',
            animation: 'slideInLeft 1s ease-out',
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: colors.primary[50],
              border: `1px solid ${colors.primary[100]}`,
              borderRadius: '100px',
              padding: '5px 14px',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: colors.primary[600],
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem',
            }}
          >
            <i className="fas fa-heart" style={{ fontSize: '0.7rem' }} />
            Our Story
          </div>

          <h2
            style={{
              fontSize: is_mobile ? 'clamp(1.8rem, 6vw, 2.5rem)' : 'clamp(2rem, 5vw, 2.8rem)',
              fontWeight: 800,
              color: colors.neutral[900],
              marginBottom: '1.25rem',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            About EvenX
          </h2>

          <p
            style={{
              fontSize: is_mobile ? '1rem' : '1.1rem',
              color: colors.neutral[500],
              marginBottom: '1.25rem',
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            EvenX was born from the frustration of splitting bills and keeping track of who owes what. We believe that managing shared expenses should be simple, transparent, and stress-free.
          </p>

          <p
            style={{
              fontSize: is_mobile ? '0.95rem' : '1.05rem',
              color: colors.neutral[600],
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              fontWeight: 400,
            }}
          >
            Our mission is to eliminate the awkwardness around money conversations and make it easy for friends, families, and roommates to split expenses fairly and efficiently.
          </p>

          {/* Stats row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))`,
              gap: '1rem',
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  background: colors.white,
                  border: `1px solid ${colors.neutral[100]}`,
                  borderRadius: radius.lg,
                  padding: '1rem',
                  textAlign: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                <div
                  style={{
                    fontSize: '1.1rem',
                    marginBottom: '4px',
                  }}
                >
                  <i className={stat.icon} style={{ color: stat.color }} />
                </div>
                <div
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 800,
                    color: colors.neutral[900],
                    marginBottom: '2px',
                    lineHeight: 1.2,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: '0.7rem',
                    color: colors.neutral[400],
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: phone */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            order: is_mobile ? -1 : 0,
            animation: 'slideInRight 1s ease-out 0.4s both',
          }}
        >
          <PhoneFrame
            src="/phone-screenshots/groups.png"
            alt="EvenX group expense management"
            width={is_mobile ? 210 : 250}
            height={is_mobile ? 420 : 500}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
