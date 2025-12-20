'use client';

import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setIsLoaded(true);
    
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDownload = (platform: string): void => {
    alert(`${platform} download functionality will be implemented when the app is ready for release.`);
  };

  const styles = {
    hero: {
      padding: '100px 0 80px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.4) 0%, transparent 50%), linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative' as const,
      overflow: 'hidden',
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    heroContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 32px',
      display: 'grid',
      gridTemplateColumns: windowWidth > 768 ? '1fr 1fr' : '1fr',
      gap: '4rem',
      alignItems: 'center',
      textAlign: windowWidth <= 768 ? 'center' as const : 'left' as const,
      position: 'relative' as const,
      zIndex: 2,
    },
    heroTitle: {
      fontSize: windowWidth <= 480 ? '2.6rem' : windowWidth <= 768 ? '3.2rem' : '3.6rem',
      fontWeight: 900,
      marginBottom: '2.4rem',
      lineHeight: 1.1,
      background: 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? 'translateX(0)' : 'translateX(-40px)',
      transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s',
      letterSpacing: '-0.02em',
    },
    heroSubtitle: {
      fontSize: windowWidth <= 480 ? '1.3rem' : '1.5rem',
      marginBottom: '3rem',
      opacity: isLoaded ? 0.95 : 0,
      transform: isLoaded ? 'translateX(0)' : 'translateX(-40px)',
      lineHeight: 1.6,
      fontWeight: 400,
      maxWidth: '520px',
      transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s',
    },
    heroButtons: {
      display: 'flex',
      gap: '1.5rem',
      flexWrap: 'wrap' as const,
      justifyContent: windowWidth <= 480 ? 'center' : 'flex-start',
      alignItems: windowWidth <= 480 ? 'center' : 'stretch',
      flexDirection: windowWidth <= 480 ? 'column' as const : 'row' as const,
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? 'translateX(0)' : 'translateX(-40px)',
      transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s',
      width: windowWidth <= 480 ? '100%' : 'auto',
      margin: windowWidth <= 480 ? '0 auto' : '0',
    },
    phoneMockup: {
      display: windowWidth <= 768 ? 'none' : 'flex',
      justifyContent: 'center',
      position: 'relative' as const,
      perspective: '1200px',
      marginTop: '0',
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? 'translateX(0) rotateY(0deg)' : 'translateX(40px) rotateY(20deg)',
      transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.8s',
    },
    phoneScreen: {
      width: '260px',
      height: '470px',
      background: '#ffffff',
      borderRadius: '28px',
      padding: '6px',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.08), inset 0 0 0 1px rgba(0, 0, 0, 0.05)',
      position: 'relative' as const,
      transform: 'perspective(1200px) rotateY(-12deg) rotateX(10deg) rotateZ(-2deg)',
      transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      overflow: 'hidden',
    },
    phoneScreenInner: {
      width: '100%',
      height: '100%',
      background: '#ffffff',
      borderRadius: '24px',
      overflow: 'hidden',
      position: 'relative' as const,
    },
    appPreview: {
      background: '#ffffff',
      height: '100%',
      padding: '16px',
      color: '#1f2937',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'flex-start',
      position: 'relative' as const,
    },
    appHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontWeight: 800,
      color: '#1f2937',
      marginBottom: '20px',
      fontSize: '16px',
      padding: '0',
      background: 'transparent',
      borderRadius: '0',
      border: 'none',
      position: 'relative' as const,
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.4s',
    },
    headerIcon: {
      width: '20px',
      height: '20px',
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      fontSize: '12px',
      boxShadow: '0 2px 10px rgba(59, 130, 246, 0.4)',
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    expenseItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1px solid #f3f4f6',
      fontSize: '14px',
      fontWeight: 500,
      color: '#1f2937',
      lineHeight: 1.4,
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
    },
    expenseText: {
      flex: 1,
      marginRight: '14px',
      fontWeight: 500,
    },
    amount: {
      fontWeight: 700,
      color: '#3b82f6',
      fontSize: '14px',
      minWidth: 'fit-content',
      background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    total: {
      marginTop: 'auto',
      paddingTop: '18px',
      borderTop: '2px solid #e5e7eb',
      fontWeight: 800,
      textAlign: 'center' as const,
      fontSize: '16px',
      color: '#1f2937',
      background: 'transparent',
      padding: '14px 0',
      borderRadius: '0',
      border: 'none',
      position: 'relative' as const,
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 2s',
    },
    floatingElement: {
      position: 'absolute' as const,
      width: '80px',
      height: '80px',
      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, transparent 70%)',
      borderRadius: '50%',
      animation: 'float 12s ease-in-out infinite',
      zIndex: 1,
      opacity: isLoaded ? 1 : 0,
      transition: 'opacity 1.5s ease 1.5s',
    },
  };

  if (windowWidth === 0) return null; // SSR safety

  return (
    <section id="home" style={styles.hero}>
      {/* Floating decorative elements */}
      <div style={{
        ...styles.floatingElement,
        top: '15%',
        left: '8%',
      }}></div>
      <div style={{
        ...styles.floatingElement,
        top: '70%',
        right: '12%',
        width: '120px',
        height: '120px',
      }}></div>
      
      <div style={styles.heroContainer}>
        <div style={{ flex: 1 }}>
          <h1 style={styles.heroTitle}>Split Expenses Smartly with EvenX</h1>
          <p style={styles.heroSubtitle}>
            The easiest way to split bills, track shared expenses, and settle up with friends and family. 
            No more awkward money conversations!
          </p>
          <div style={styles.heroButtons}>
            <button 
              style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                color: 'white',
                border: 'none',
                padding: '20px 32px',
                borderRadius: '16px',
                fontSize: '1.1rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                boxShadow: '0 12px 32px rgba(99, 102, 241, 0.4)',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.5px',
                width: windowWidth <= 480 ? '100%' : 'auto',
                maxWidth: windowWidth <= 480 ? '280px' : 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)';
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(99, 102, 241, 0.4)';
              }}
              onClick={() => handleDownload('App Store')}
            >
              <i className="fab fa-apple" style={{ fontSize: '1.3rem' }}></i>
              Download on App Store
            </button>
            <button 
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                padding: '20px 32px',
                borderRadius: '16px',
                fontSize: '1.1rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                backdropFilter: 'blur(20px)',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.5px',
                width: windowWidth <= 480 ? '100%' : 'auto',
                maxWidth: windowWidth <= 480 ? '280px' : 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                e.currentTarget.style.color = '#6366f1';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.03)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onClick={() => handleDownload('Google Play')}
            >
              <i className="fab fa-google-play" style={{ fontSize: '1.3rem' }}></i>
              Get it on Google Play
            </button>
          </div>
        </div>
        
        <div style={styles.phoneMockup}>
          <div style={styles.phoneScreen}>
            <div style={styles.phoneScreenInner}>
              <div style={styles.appPreview}>
                <div style={styles.appHeader}>
                  <span style={styles.headerIcon}>
                    <i className="fas fa-stack-bills"></i>
                  </span>
                  <span>EvenX</span>
                </div>
                <div style={{...styles.expenseItem, transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.6s'}}>
                  <span style={styles.expenseText}>Dinner at Restaurant</span>
                  <span style={styles.amount}>$45.00</span>
                </div>
                <div style={{...styles.expenseItem, transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.8s'}}>
                  <span style={styles.expenseText}>Movie Tickets</span>
                  <span style={styles.amount}>$24.00</span>
                </div>
                <div style={styles.total}>
                  <span>Total: $69.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-25px) translateX(15px) rotate(5deg);
          }
          50% {
            transform: translateY(-15px) translateX(-10px) rotate(-3deg);
          }
          75% {
            transform: translateY(-20px) translateX(20px) rotate(2deg);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
