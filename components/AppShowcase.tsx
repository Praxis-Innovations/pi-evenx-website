'use client';

import React, { useState, useEffect } from 'react';
import { colors, gradients } from '@/lib/theme';
import PhoneFrame from './PhoneFrame';

interface Screen {
  src: string;
  alt: string;
  label: string;
  rotate_y: number;
  rotate_z: number;
}

const screens: Screen[] = [
  {
    src: '/phone-screenshots/friends.png',
    alt: 'Friends list with balances',
    label: 'Friends & Balances',
    rotate_y: 12,
    rotate_z: 1.5,
  },
  {
    src: '/phone-screenshots/dashboard.png',
    alt: 'Home dashboard',
    label: 'Expense Dashboard',
    rotate_y: 0,
    rotate_z: 0,
  },
  {
    src: '/phone-screenshots/activity.png',
    alt: 'Activity feed',
    label: 'Activity Feed',
    rotate_y: -12,
    rotate_z: -1.5,
  },
];

const AppShowcase: React.FC = () => {
  const [window_width, setWindowWidth] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const is_ready = mounted && window_width > 0;
  const is_mobile = window_width > 0 && window_width <= 768;
  const phone_width = is_mobile ? 180 : window_width <= 1100 ? 200 : 230;
  const phone_height = is_mobile ? 360 : window_width <= 1100 ? 400 : 460;

  return (
    <section
      style={{
        padding: '90px 0',
        background: gradients.dark_section,
        position: 'relative',
        overflow: 'hidden',
        visibility: is_ready ? 'visible' : 'hidden',
      }}
    >
      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Blob */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(60px)',
        }}
      />

      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 30px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(99, 102, 241, 0.15)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              borderRadius: '100px',
              padding: '5px 14px',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: colors.primary[300],
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            <i className="fas fa-mobile-alt" style={{ fontSize: '0.7rem' }} />
            App Preview
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5vw, 2.8rem)',
              fontWeight: 800,
              color: colors.white,
              marginBottom: '1rem',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            See EvenX in Action
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: colors.neutral[400],
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Manage groups, track friends, and stay on top of every shared expense — all in one place.
          </p>
        </div>

        {/* Phones row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: is_mobile ? '1.5rem' : '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          {screens.map((screen, index) => {
            const is_center = index === 1;
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1.5rem',
                  transform: is_center ? 'translateY(-20px)' : 'translateY(0)',
                  animation: `fadeInUp 0.8s ease-out ${index * 0.15}s both`,
                }}
              >
                <PhoneFrame
                  src={screen.src}
                  alt={screen.alt}
                  width={is_center ? phone_width + 20 : phone_width}
                  height={is_center ? phone_height + 40 : phone_height}
                  rotate_y={is_mobile ? 0 : screen.rotate_y}
                  rotate_z={is_mobile ? 0 : screen.rotate_z}
                />

                {/* Label pill */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(255, 255, 255, 0.07)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '100px',
                    padding: '6px 16px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: colors.neutral[300],
                  }}
                >
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: is_center ? colors.primary[400] : colors.violet[400],
                      animation: 'pulseDot 2s ease-in-out infinite',
                      flexShrink: 0,
                    }}
                  />
                  {screen.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
