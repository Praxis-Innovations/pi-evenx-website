import React from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const Features: React.FC = () => {
  const features: Feature[] = [
    {
      icon: 'fas fa-calculator',
      title: 'Smart Splitting',
      description: 'Automatically calculate who owes what with our intelligent expense splitting algorithm.'
    },
    {
      icon: 'fas fa-users',
      title: 'Group Management',
      description: 'Create groups for different occasions - roommates, trips, events, and more.'
    },
    {
      icon: 'fas fa-chart-pie',
      title: 'Expense Tracking',
      description: 'Keep track of all your shared expenses with detailed breakdowns and history.'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Mobile First',
      description: 'Designed for mobile use with an intuitive interface that makes expense management effortless.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Secure & Private',
      description: 'Your financial data is encrypted and secure. We never share your information.'
    },
    {
      icon: 'fas fa-sync',
      title: 'Real-time Sync',
      description: 'All changes sync instantly across all devices and group members.'
    }
  ];

  const styles = {
    features: {
      padding: '80px 0',
      background: '#f8fafc',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
    },
    sectionTitle: {
      textAlign: 'center' as const,
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#1f2937',
      marginBottom: '3rem',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
    },
    featureCard: {
      background: 'white',
      padding: '2rem',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      textAlign: 'center' as const,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    featureIcon: {
      fontSize: '3rem',
      color: '#6366f1',
      marginBottom: '1rem',
    },
    featureTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#1f2937',
      marginBottom: '1rem',
    },
    featureDescription: {
      color: '#6b7280',
      lineHeight: 1.6,
    },
  };

  return (
    <section id="features" style={styles.features}>
      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>Why Choose EvenX?</h2>
        <div style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              style={styles.featureCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
              }}
            >
              <div style={styles.featureIcon}>
                <i className={feature.icon}></i>
              </div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
