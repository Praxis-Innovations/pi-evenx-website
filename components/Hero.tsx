'use client';

import React, { useEffect, useState } from 'react';
import { colors, gradients, store_urls } from '@/lib/theme';
import PhoneFrame from './PhoneFrame';

const Hero: React.FC = () => {
  const [is_loaded, setIsLoaded] = useState(false);
  const [window_width, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const animation_frame = window.requestAnimationFrame(() => {
      setIsLoaded(true);
    });
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.cancelAnimationFrame(animation_frame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const is_mobile = window_width > 0 && window_width <= 768;
  const is_small = window_width > 0 && window_width <= 480;
  const is_ready = window_width > 0;

  return (
    <section
      id="home"
      style={{
        padding: is_mobile ? '100px 0 60px' : '130px 0 90px',
        background: gradients.hero_bg,
        color: colors.white,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        visibility: is_ready ? 'visible' : 'hidden',
    }}
    >
      {/* Subtle dot grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          zIndex: 1,
        }}
      />

      {/* Background blob — top right */}
      <div
        style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, transparent 65%)',
          top: '-250px',
          right: '-150px',
          zIndex: 1,
          filter: 'blur(50px)',
        }}
      />
      {/* Background blob — bottom left */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 65%)',
          bottom: '-150px',
          left: '-100px',
          zIndex: 1,
          filter: 'blur(50px)',
        }}
      />

      {/* Page content */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 32px',
          display: 'grid',
          gridTemplateColumns: is_mobile ? '1fr' : '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          textAlign: is_mobile ? 'center' : 'left',
          position: 'relative',
          zIndex: 2,
          width: '100%',
        }}
      >
        {/* ── Left: copy ── */}
        <div
          style={{
            opacity: is_loaded ? 1 : 0,
            transform: is_loaded ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 500ms ease, transform 500ms ease',
          }}
        >
          {/* Heading */}
          <h1
            style={{
              fontSize: is_small ? '2.6rem' : is_mobile ? '3.2rem' : '3.9rem',
              fontWeight: 800,
              marginBottom: '1.5rem',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
            }}
          >
            <span style={{ color: colors.white }}>Split Expenses</span>
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 50%, #f9a8d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Smartly
            </span>
            <span style={{ color: colors.white }}>{' '}with EvenX</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: is_small ? '1.1rem' : '1.2rem',
              lineHeight: 1.75,
              fontWeight: 400,
              maxWidth: '480px',
              color: 'rgba(255, 255, 255, 0.9)',
              margin: is_mobile ? '0 auto 3rem' : '0 0 3.25rem',
            }}
          >
            The easiest way to split bills, track shared expenses, and settle up with friends and family. No more awkward money conversations!
          </p>

          {/* Store buttons */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: is_mobile ? 'center' : 'flex-start',
              marginBottom: '2.5rem',
            }}
          >
            <a
              href={store_urls.ios}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 28px',
                background: colors.white,
                color: colors.neutral[900],
                borderRadius: '16px',
                textDecoration: 'none',
                fontFamily: 'inherit',
                boxShadow: '0 10px 28px rgba(0,0,0,0.22)',
                transition: 'all 0.3s ease',
                minWidth: '170px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,0.22)';
              }}
            >
              <i className="fab fa-apple" style={{ fontSize: '2rem', lineHeight: 1, color: colors.neutral[900] }} />
              <div>
                <div style={{ fontSize: '0.68rem', fontWeight: 500, opacity: 0.5, lineHeight: 1, marginBottom: '3px' }}>Download on the</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, lineHeight: 1 }}>App Store</div>
              </div>
            </a>
            <a
              href={store_urls.android}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 28px',
                background: colors.white,
                color: colors.neutral[900],
                borderRadius: '16px',
                textDecoration: 'none',
                fontFamily: 'inherit',
                boxShadow: '0 10px 28px rgba(0,0,0,0.22)',
                transition: 'all 0.3s ease',
                minWidth: '170px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,0.22)';
              }}
            >
              <i className="fab fa-google-play" style={{ fontSize: '1.6rem', lineHeight: 1, color: colors.neutral[900] }} />
              <div>
                <div style={{ fontSize: '0.68rem', fontWeight: 500, opacity: 0.5, lineHeight: 1, marginBottom: '3px' }}>Get it on</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, lineHeight: 1 }}>Google Play</div>
              </div>
            </a>
          </div>

          {/* Trust row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              flexWrap: 'wrap',
              justifyContent: is_mobile ? 'center' : 'flex-start',
              fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.8)',
              fontWeight: 500,
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className="fas fa-shield-alt" style={{ color: '#93c5fd' }} />
              Encrypted &amp; private
            </span>
            <span style={{ opacity: 0.35 }}>·</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className="fas fa-mobile-alt" style={{ color: '#c4b5fd' }} />
              iOS &amp; Android
            </span>
          </div>
        </div>

        {/* ── Right: Phone + floating cards ── */}
        {!is_mobile && (
          <div
            style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            minHeight: '580px',
            opacity: is_loaded ? 1 : 0,
            transform: is_loaded ? 'translateY(0)' : 'translateY(18px)',
            transition: 'opacity 550ms ease 120ms, transform 550ms ease 120ms',
            }}
          >
            {/* Phone glow */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '300px',
                height: '80px',
                background: 'radial-gradient(ellipse, rgba(139, 92, 246, 0.55) 0%, transparent 70%)',
                filter: 'blur(24px)',
                zIndex: 1,
              }}
            />

            {/* Floating card — Settled up */}
            <div
              style={{
                position: 'absolute',
                top: '70px',
                left: '0px',
                background: 'rgba(255, 255, 255, 0.97)',
                borderRadius: '16px',
                padding: '12px 16px',
                boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
                zIndex: 10,
                animation: 'floatCard1 4s ease-in-out infinite',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '34px', height: '34px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <i className="fas fa-check" style={{ color: 'white', fontSize: '0.75rem' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, marginBottom: '2px' }}>Settled up!</div>
                  <div style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 800 }}>$550.00</div>
                </div>
              </div>
            </div>

            {/* Floating card — Group */}
            <div
              style={{
                position: 'absolute',
                bottom: '100px',
                right: '0px',
                background: 'rgba(255, 255, 255, 0.97)',
                borderRadius: '16px',
                padding: '12px 16px',
                boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
                zIndex: 10,
                animation: 'floatCard2 5s ease-in-out infinite',
                minWidth: '175px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '34px', height: '34px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <i className="fas fa-users" style={{ color: 'white', fontSize: '0.7rem' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, marginBottom: '2px' }}>Active Group</div>
                  <div style={{ fontSize: '0.88rem', color: '#0f172a', fontWeight: 800 }}>Roommates · 4 members</div>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div style={{ position: 'relative', zIndex: 5 }}>
              <PhoneFrame
                src="/phone-screenshots/dashboard.png"
                alt="EvenX app dashboard showing expense tracking"
                width={260}
                height={520}
                rotate_y={-8}
                rotate_x={5}
                rotate_z={-1}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
