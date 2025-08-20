import React, { useEffect, useState } from 'react';

const Hero: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDownload = (platform: string): void => {
    // This will be updated when the app is ready for release
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
      gridTemplateColumns: '1fr 1fr',
      gap: '4rem',
      alignItems: 'center',
      textAlign: 'left' as const,
      position: 'relative' as const,
      zIndex: 2,
    },
    heroTitle: {
      fontSize: '3.6rem',
      fontWeight: 900,
      marginBottom: '2.4rem',
      lineHeight: 1.1,
      background: 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      textShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? 'translateX(0)' : 'translateX(-40px)',
      transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s',
      letterSpacing: '-0.02em',
    },
    heroSubtitle: {
      fontSize: '1.5rem',
      marginBottom: '3rem',
      opacity: isLoaded ? 0.95 : 0,
      transform: isLoaded ? 'translateX(0)' : 'translateX(-40px)',
      lineHeight: 1.6,
      fontWeight: 400,
      maxWidth: '520px',
      textShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
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
      display: 'flex',
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
    expenseItem1: {
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.6s',
    },
    expenseItem2: {
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.8s',
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
      position: 'absolute',
      width: '80px',
      height: '80px',
      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, transparent 70%)',
      borderRadius: '50%',
      animation: 'float 12s ease-in-out infinite',
      zIndex: 1,
      opacity: isLoaded ? 1 : 0,
      transition: 'opacity 1.5s ease 1.5s',
    },
    floatingElement2: {
      position: 'absolute',
      width: '120px',
      height: '120px',
      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
      borderRadius: '50%',
      animation: 'float 15s ease-in-out infinite reverse',
      zIndex: 1,
      opacity: isLoaded ? 1 : 0,
      transition: 'opacity 1.5s ease 1.8s',
    },
    floatingElement3: {
      position: 'absolute',
      width: '60px',
      height: '60px',
      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
      borderRadius: '50%',
      animation: 'float 10s ease-in-out infinite',
      zIndex: 1,
      opacity: isLoaded ? 1 : 0,
      transition: 'opacity 1.5s ease 2.1s',
    },
  };

  return (
    <section id="home" style={styles.hero} className="hero-section">
      {/* Enhanced floating decorative elements */}
      <div style={{
        ...styles.floatingElement,
        top: '15%',
        left: '8%',
        position: 'absolute' as const,
      }}></div>
      <div style={{
        ...styles.floatingElement2,
        top: '70%',
        right: '12%',
        position: 'absolute' as const,
      }}></div>
      <div style={{
        ...styles.floatingElement3,
        top: '40%',
        left: '75%',
        position: 'absolute' as const,
      }}></div>
      
      <div style={styles.heroContainer} className="hero-container">
        <div style={{ flex: 1 }}>
          <h1 style={styles.heroTitle} className="hero-title">Split Expenses Smartly with EvenX</h1>
          <p style={styles.heroSubtitle} className="hero-subtitle">
            The easiest way to split bills, track shared expenses, and settle up with friends and family. 
            No more awkward money conversations!
          </p>
          <div style={styles.heroButtons} className="hero-buttons">
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
                width: 'auto',
                minHeight: 'auto',
                position: 'relative' as const,
                overflow: 'hidden',
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
              className="download-button"
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
                width: 'auto',
                minHeight: 'auto',
                position: 'relative' as const,
                overflow: 'hidden',
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
              className="download-button"
            >
              <i className="fab fa-google-play" style={{ fontSize: '1.3rem' }}></i>
              Get it on Google Play
            </button>
          </div>
        </div>
        
        <div style={styles.phoneMockup} className="phone-mockup">
          <div 
            style={styles.phoneScreen}
            className="phone-screen"
            onMouseEnter={window.innerWidth > 768 ? (e) => {
              e.currentTarget.style.transform = 'perspective(1200px) rotateY(-8deg) rotateX(8deg) rotateZ(-1deg) scale(1.03)';
              e.currentTarget.style.boxShadow = '0 40px 100px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 0 0 1px rgba(0, 0, 0, 0.05)';
            } : undefined}
            onMouseLeave={window.innerWidth > 768 ? (e) => {
              e.currentTarget.style.transform = 'perspective(1200px) rotateY(-15deg) rotateX(12deg) rotateZ(-3deg)';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.08), inset 0 0 0 1px rgba(0, 0, 0, 0.05)';
            } : undefined}
          >
            <div style={styles.phoneScreenInner} className="phone-screen-inner">
              <div style={styles.appPreview} className="app-preview">
                <div style={styles.appHeader} className="app-header">
                  <span style={styles.headerIcon} className="header-icon">
                    <i className="fas fa-stack-bills"></i>
                  </span>
                  <span>EvenX</span>
                </div>
                <div style={{...styles.expenseItem, ...styles.expenseItem1}} className="expense-item">
                  <span style={styles.expenseText} className="expense-text">Dinner at Restaurant</span>
                  <span style={styles.amount} className="amount">$45.00</span>
                </div>
                <div style={{...styles.expenseItem, ...styles.expenseItem2}} className="expense-item">
                  <span style={styles.expenseText} className="expense-text">Movie Tickets</span>
                  <span style={styles.amount} className="amount">$24.00</span>
                </div>
                <div style={styles.total} className="total">
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
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        /* Responsive Design with CSS Media Queries */
        @media (max-width: 1200px) {
          .hero-container {
            max-width: 100% !important;
            padding: 0 32px !important;
            gap: 4rem !important;
          }
          
          .hero-title {
            font-size: 3.8rem !important;
          }
          
          .hero-subtitle {
            font-size: 1.6rem !important;
            max-width: 580px !important;
          }
          
          .phone-screen {
            width: 260px !important;
            height: 470px !important;
          }
        }
        
        @media (max-width: 768px) {
          .hero-section {
            padding: 80px 0 60px !important;
            min-height: 85vh !important;
          }
          
          .hero-container {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
            padding: 0 24px !important;
            text-align: center !important;
          }
          
          .hero-title {
            font-size: 3.2rem !important;
            margin-bottom: 2.2rem !important;
          }
          
          .hero-subtitle {
            font-size: 1.5rem !important;
            margin-bottom: 2.5rem !important;
            max-width: 100% !important;
          }
          
          .hero-buttons {
            justify-content: center !important;
            gap: 1.2rem !important;
          }
          
          .phone-mockup {
            margin-top: 2rem !important;
          }
          
          .phone-screen {
            width: 230px !important;
            height: 410px !important;
            border-radius: 25px !important;
            padding: 5px !important;
            transform: perspective(1200px) rotateY(-10deg) rotateX(8deg) rotateZ(-2deg) !important;
          }
          
          .phone-screen-inner {
            border-radius: 20px !important;
          }
          
          .app-preview {
            padding: 16px !important;
          }
          
          .app-header {
            gap: 10px !important;
            margin-bottom: 20px !important;
            font-size: 16px !important;
          }
          
          .header-icon {
            width: 20px !important;
            height: 20px !important;
            border-radius: 6px !important;
            font-size: 12px !important;
          }
          
          .expense-item {
            padding: 12px 0 !important;
            font-size: 13px !important;
          }
          
          .expense-text {
            margin-right: 14px !important;
          }
          
          .amount {
            font-size: 13px !important;
          }
          
          .total {
            padding-top: 18px !important;
            font-size: 16px !important;
            padding: 14px 0 !important;
          }
        }
        
        @media (max-width: 480px) {
          .hero-section {
            padding: 60px 0 40px !important;
            min-height: 80vh !important;
          }
          
          .hero-container {
            padding: 0 20px !important;
            gap: 2rem !important;
            text-align: center !important;
          }
          
          .hero-title {
            font-size: 2.6rem !important;
            margin-bottom: 2rem !important;
          }
          
          .hero-subtitle {
            font-size: 1.3rem !important;
            margin-bottom: 2.2rem !important;
          }
          
          .hero-buttons {
            flex-direction: column !important;
            gap: 1rem !important;
            justify-content: center !important;
            align-items: center !important;
            width: 100% !important;
            display: flex !important;
            margin: 0 auto !important;
            text-align: center !important;
          }
          
          .hero-buttons button {
            width: 100% !important;
            padding: 18px 28px !important;
            font-size: 1.1rem !important;
            max-width: 280px !important;
            margin: 0 auto !important;
            text-align: center !important;
          }
          
          .phone-screen {
            width: 190px !important;
            height: 340px !important;
            border-radius: 22px !important;
            padding: 4px !important;
            transform: perspective(1200px) rotateY(-8deg) rotateX(6deg) rotateZ(-1deg) !important;
          }
          
          .phone-screen-inner {
            border-radius: 18px !important;
          }
          
          .app-preview {
            padding: 14px !important;
          }
          
          .app-header {
            gap: 8px !important;
            margin-bottom: 18px !important;
            font-size: 14px !important;
          }
          
          .header-icon {
            width: 18px !important;
            height: 18px !important;
            border-radius: 5px !important;
            font-size: 11px !important;
          }
          
          .expense-item {
            padding: 10px 0 !important;
            font-size: 12px !important;
          }
          
          .expense-text {
            margin-right: 12px !important;
          }
          
          .amount {
            font-size: 12px !important;
          }
          
          .total {
            padding-top: 16px !important;
            font-size: 14px !important;
            padding: 12px 0 !important;
          }
        }
        
        /* Smooth transitions for all responsive changes */
        .hero-section,
        .hero-container,
        .hero-title,
        .hero-subtitle,
        .hero-buttons,
        .phone-mockup,
        .phone-screen,
        .phone-screen-inner,
        .app-preview,
        .app-header,
        .header-icon,
        .expense-item,
        .expense-text,
        .amount,
        .total {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
        }
        
        /* Prevent layout shifts and ensure proper scaling */
        .hero-section {
          min-height: 95vh;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        
        .hero-container {
          width: 100% !important;
          max-width: 1400px !important;
          margin: 0 auto !important;
        }
        
        /* Force mobile button centering with maximum specificity */
        @media (max-width: 480px) {
          .hero-buttons {
            justify-content: center !important;
            align-items: center !important;
            text-align: center !important;
          }
          
          /* Target the button container specifically */
          .hero-buttons[style*="justifyContent"] {
            justify-content: center !important;
          }
          
          .hero-buttons[style*="alignItems"] {
            align-items: center !important;
          }
          
          .hero-buttons[style*="flexDirection"] {
            flex-direction: column !important;
          }
        }
        
        @media (max-width: 768px) {
          .hero-section {
            min-height: 85vh;
          }
        }
        
        @media (max-width: 480px) {
          .hero-section {
            min-height: 80vh;
          }
        }
        
        /* Ensure proper button sizing */
        .hero-buttons button {
          white-space: nowrap !important;
          min-width: fit-content !important;
        }
        
        @media (max-width: 480px) {
          .hero-buttons button {
            white-space: normal !important;
            min-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
