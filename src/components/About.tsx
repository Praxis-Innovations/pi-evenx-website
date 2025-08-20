import React from 'react';

const About: React.FC = () => {
  const styles = {
    about: {
      padding: '70px 0',
      background: '#f8fafc',
      position: 'relative' as const,
      overflow: 'hidden',
    },
    container: {
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '0 30px',
      display: 'grid',
      gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr',
      gap: '3.5rem',
      alignItems: 'center',
      position: 'relative' as const,
      zIndex: 2,
    },
    content: {
      textAlign: window.innerWidth <= 768 ? 'center' as const : 'left' as const,
    },
    sectionTitle: {
      fontSize: 'clamp(2rem, 5vw, 2.8rem)',
      fontWeight: 800,
      color: '#1f2937',
      marginBottom: '1.75rem',
      lineHeight: 1.1,
    },
    subtitle: {
      fontSize: '1.15rem',
      color: '#6b7280',
      marginBottom: '1.5rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    description: {
      fontSize: '1.05rem',
      color: '#374151',
      lineHeight: 1.6,
      marginBottom: '2.25rem',
      fontWeight: 400,
    },
    stats: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '2.25rem',
      marginTop: '1.75rem',
      padding: '1.5rem 0',
      borderTop: '1px solid rgba(0, 0, 0, 0.08)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    },
    stat: {
      textAlign: 'center' as const,
      flex: 1,
      transition: 'all 0.3s ease',
    },
    statNumber: {
      fontSize: '2.6rem',
      fontWeight: 800,
      color: '#3b82f6',
      marginBottom: '0.4rem',
      lineHeight: 1,
    },
    statLabel: {
      color: '#6b7280',
      fontWeight: 500,
      fontSize: '0.9rem',
      textTransform: 'none' as const,
      letterSpacing: '0.2px',
    },
    image: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    appImage: {
      width: '100%',
      maxWidth: '380px',
      height: '300px',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
    },
  };

  return (
    <section id="about" style={styles.about}>

      
      <div style={styles.container}>
        <div style={{
          ...styles.content,
          animation: 'slideInLeft 1s ease-out'
        }}>
          <h2 style={styles.sectionTitle}>About EvenX</h2>
          <p style={{
            ...styles.subtitle,
            animation: 'slideInLeft 1s ease-out 0.2s both'
          }}>
            EvenX was born from the frustration of splitting bills and keeping track of who owes what. We believe that managing shared expenses should be simple, transparent, and stress-free.
          </p>
          <p style={{
            ...styles.description,
            animation: 'slideInLeft 1s ease-out 0.4s both'
          }}>
            Our mission is to eliminate the awkwardness around money conversations and make it easy for friends, families, and roommates to split expenses fairly and efficiently.
          </p>
          
          <div style={{
            ...styles.stats,
            animation: 'slideInLeft 1s ease-out 0.6s both'
          }}>
            <div style={styles.stat}>
              <div style={styles.statNumber}>100+</div>
              <div style={styles.statLabel}>Active Users</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statNumber}>$200K+</div>
              <div style={styles.statLabel}>Expenses Tracked</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statNumber}>4.8★</div>
              <div style={styles.statLabel}>App Store Rating</div>
            </div>
          </div>
        </div>
        
        <div style={{
          ...styles.image,
          animation: 'slideInRight 1s ease-out 0.8s both'
        }}>
          <div style={{
            ...styles.appImage,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6b7280',
            fontSize: '1.1rem',
            fontWeight: 500,
            background: '#e5e7eb',
            border: '1px solid #d1d5db',
          }}>
            EvenX App Screenshot
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
