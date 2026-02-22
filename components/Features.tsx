'use client';

import React, { useState, useEffect } from 'react';
import { colors, shadows, radius } from '@/lib/theme';

interface Feature {
  icon: string;
  title: string;
  description: string;
  accent: string;
  accent_light: string;
}

const Features: React.FC = () => {
  const [window_width, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const features: Feature[] = [
    {
      icon: 'fas fa-calculator',
      title: 'Smart Splitting',
      description: 'Equal, custom, or percentage splits — EvenX calculates who owes what instantly.',
      accent: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      accent_light: '#eef2ff',
    },
    {
      icon: 'fas fa-users',
      title: 'Group Management',
      description: 'Create groups for roommates, trips, events, and any circle that shares costs.',
      accent: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
      accent_light: '#f5f3ff',
    },
    {
      icon: 'fas fa-chart-pie',
      title: 'Expense Tracking',
      description: 'See a full breakdown of all shared expenses, balances, and history at a glance.',
      accent: 'linear-gradient(135deg, #4f46e5, #6366f1)',
      accent_light: '#eef2ff',
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Mobile First',
      description: 'Add expenses at the table, check balances on the go, settle up in a few taps.',
      accent: 'linear-gradient(135deg, #7c3aed, #8b5cf6)',
      accent_light: '#f5f3ff',
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Secure & Private',
      description: 'Your financial data is encrypted in transit. We never sell or share your information.',
      accent: 'linear-gradient(135deg, #6366f1, #4f46e5)',
      accent_light: '#eef2ff',
    },
    {
      icon: 'fas fa-sync',
      title: 'Real-time Sync',
      description: 'When someone adds an expense or settles up, it updates instantly for everyone.',
      accent: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      accent_light: '#f5f3ff',
    },
  ];

  const is_ready = window_width > 0;
  const col_count = window_width >= 1024 ? 3 : window_width >= 640 ? 2 : 1;

  return (
    <section
      id="features"
      style={{
        padding: '90px 0',
        background: colors.white,
        position: 'relative',
        overflow: 'hidden',
        visibility: is_ready ? 'visible' : 'hidden',
      }}
    >
      {/* Subtle background dots */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle, ${colors.neutral[200]} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          opacity: 0.5,
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
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
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
              marginBottom: '1rem',
            }}
          >
            <i className="fas fa-bolt" style={{ fontSize: '0.7rem' }} />
            Features
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 5.5vw, 2.8rem)',
              fontWeight: 800,
              color: colors.neutral[900],
              marginBottom: '1rem',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Why Choose EvenX?
          </h2>
          <p
            style={{
              fontSize: '1.1rem',
              color: colors.neutral[500],
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Everything your group needs to split expenses fairly and settle up without the drama.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${col_count}, 1fr)`,
            gap: '1.5rem',
          }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                background: colors.white,
                padding: '1.75rem',
                borderRadius: radius.xl,
                border: `1px solid ${colors.neutral[100]}`,
                boxShadow: shadows.sm,
                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                position: 'relative',
                overflow: 'hidden',
                animation: `fadeInUp 0.7s ease-out ${index * 0.08}s both`,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = shadows.lg;
                e.currentTarget.style.borderColor = colors.primary[200];
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = shadows.sm;
                e.currentTarget.style.borderColor = colors.neutral[100];
              }}
            >
              {/* Top accent bar */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: feature.accent,
                  borderRadius: '20px 20px 0 0',
                }}
              />

              {/* Icon */}
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: radius.lg,
                  background: feature.accent,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: `0 4px 14px rgba(99, 102, 241, 0.25)`,
                }}
              >
                <i className={feature.icon} style={{ color: colors.white, fontSize: '1.2rem' }} />
              </div>

              {/* Text */}
              <div>
                <h3
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: colors.neutral[900],
                    marginBottom: '0.5rem',
                    lineHeight: 1.2,
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    color: colors.neutral[500],
                    lineHeight: 1.6,
                    fontSize: '0.9rem',
                    fontWeight: 400,
                  }}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
