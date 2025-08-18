import React from 'react';

const Hero: React.FC = () => {
  const handleDownload = (platform: string): void => {
    // This will be updated when the app is ready for release
    alert(`${platform} download functionality will be implemented when the app is ready for release.`);
  };

  const styles = {
    hero: {
      padding: '120px 0 80px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
    },
    heroContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'grid',
      gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr',
      gap: window.innerWidth <= 768 ? '2rem' : '4rem',
      alignItems: 'center',
      textAlign: window.innerWidth <= 768 ? 'center' as const : 'left' as const,
    },
    heroTitle: {
      fontSize: window.innerWidth <= 480 ? '2rem' : window.innerWidth <= 768 ? '2.5rem' : '3.5rem',
      fontWeight: 700,
      marginBottom: '1.5rem',
      lineHeight: 1.2,
    },
    heroSubtitle: {
      fontSize: '1.2rem',
      marginBottom: '2rem',
      opacity: 0.9,
      lineHeight: 1.6,
    },
    heroButtons: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap' as const,
      justifyContent: window.innerWidth <= 768 ? 'center' as const : 'flex-start',
    },
    phoneMockup: {
      display: 'flex',
      justifyContent: 'center',
    },
    phoneScreen: {
      width: window.innerWidth <= 480 ? '250px' : '280px',
      height: window.innerWidth <= 480 ? '450px' : '500px',
      background: '#1f2937',
      borderRadius: '30px',
      padding: '20px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
    },
    appPreview: {
      background: 'white',
      height: '100%',
      borderRadius: '20px',
      padding: '20px',
      color: '#333',
    },
    appHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontWeight: 700,
      color: '#6366f1',
      marginBottom: '20px',
    },
    expenseItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 0',
      borderBottom: '1px solid #e5e7eb',
    },
    amount: {
      fontWeight: 600,
      color: '#6366f1',
    },
    total: {
      marginTop: '20px',
      paddingTop: '20px',
      borderTop: '2px solid #6366f1',
      fontWeight: 700,
      textAlign: 'center' as const,
    },
  };

  return (
    <section id="home" style={styles.hero}>
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
                background: '#6366f1',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#4f46e5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#6366f1';
              }}
              onClick={() => handleDownload('App Store')}
            >
              <i className="fab fa-apple"></i>
              Download on App Store
            </button>
            <button 
              style={{
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.color = '#6366f1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'white';
              }}
              onClick={() => handleDownload('Google Play')}
            >
              <i className="fab fa-google-play"></i>
              Get it on Google Play
            </button>
          </div>
        </div>
        
        <div style={styles.phoneMockup}>
          <div style={styles.phoneScreen}>
            <div style={styles.appPreview}>
              <div style={styles.appHeader}>
                <i className="fas fa-coins"></i>
                <span>EvenX</span>
              </div>
              <div style={styles.expenseItem}>
                <span>Dinner at Restaurant</span>
                <span style={styles.amount}>$45.00</span>
              </div>
              <div style={styles.expenseItem}>
                <span>Movie Tickets</span>
                <span style={styles.amount}>$24.00</span>
              </div>
              <div style={styles.total}>
                <span>Total: $69.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
