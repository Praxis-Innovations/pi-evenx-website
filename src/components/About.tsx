import React from 'react';

const About: React.FC = () => {
  const styles = {
    about: {
      padding: '80px 0',
      background: 'white',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'grid',
      gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : '1fr 1fr',
      gap: '4rem',
      alignItems: 'center',
    },
    content: {
      textAlign: window.innerWidth <= 768 ? 'center' as const : 'left' as const,
    },
    sectionTitle: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#1f2937',
      marginBottom: '1.5rem',
    },
    subtitle: {
      fontSize: '1.1rem',
      color: '#6b7280',
      marginBottom: '2rem',
      lineHeight: 1.6,
    },
    description: {
      fontSize: '1rem',
      color: '#374151',
      lineHeight: 1.7,
      marginBottom: '2rem',
    },
    stats: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '2rem',
      marginTop: '2rem',
    },
    stat: {
      textAlign: 'center' as const,
    },
    statNumber: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#6366f1',
      marginBottom: '0.5rem',
    },
    statLabel: {
      color: '#6b7280',
      fontWeight: 500,
    },
    image: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    appImage: {
      width: '100%',
      maxWidth: '400px',
      height: 'auto',
      borderRadius: '12px',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    },
  };

  return (
    <section id="about" style={styles.about}>
      <div style={styles.container}>
        <div style={styles.content}>
          <h2 style={styles.sectionTitle}>About EvenX</h2>
          <p style={styles.subtitle}>
            We're on a mission to make expense sharing simple, transparent, and stress-free.
          </p>
          <p style={styles.description}>
            EvenX was born from the frustration of complicated expense tracking and awkward money conversations. 
            We believe that splitting expenses should be as easy as sending a text message. Our app combines 
            intuitive design with powerful features to give you complete control over your shared finances.
          </p>
          
          <div style={styles.stats}>
            <div style={styles.stat}>
              <div style={styles.statNumber}>50K+</div>
              <div style={styles.statLabel}>Active Users</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statNumber}>$2M+</div>
              <div style={styles.statLabel}>Expenses Tracked</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statNumber}>4.8★</div>
              <div style={styles.statLabel}>App Store Rating</div>
            </div>
            <div style={styles.stat}>
              <div style={styles.statNumber}>24/7</div>
              <div style={styles.statLabel}>Support</div>
            </div>
          </div>
        </div>
        
        <div style={styles.image}>
          <img 
            src="https://via.placeholder.com/400x600/6366f1/ffffff?text=EvenX+App"
            alt="EvenX Mobile App"
            style={styles.appImage}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
