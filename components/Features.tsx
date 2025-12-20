'use client';

import React, { useState, useEffect } from 'react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const Features: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(0);

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
      padding: '55px 0',
      background: '#ffffff',
      position: 'relative' as const,
      overflow: 'hidden',
    },
    container: {
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '0 30px',
      position: 'relative' as const,
      zIndex: 2,
    },
    sectionTitle: {
      textAlign: 'center' as const,
      fontSize: 'clamp(2.2rem, 5.5vw, 3rem)',
      fontWeight: 800,
      color: '#1f2937',
      marginBottom: '2rem',
      lineHeight: 1.1,
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: windowWidth >= 1024 ? 'repeat(3, 1fr)' : windowWidth >= 640 ? 'repeat(2, 1fr)' : '1fr',
      gap: '1.5rem',
    },
    featureCard: {
      background: '#ffffff',
      padding: '2rem 1.75rem',
      borderRadius: '18px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      textAlign: 'center' as const,
      transition: 'all 0.3s ease',
      border: '1px solid rgba(0, 0, 0, 0.05)',
      minHeight: '250px',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'flex-start',
      position: 'relative' as const,
      overflow: 'hidden',
    },
    featureIcon: {
      fontSize: '2.2rem',
      color: '#ffffff',
      marginBottom: '1.25rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '70px',
      height: '70px',
      background: '#8b5cf6',
      borderRadius: '50%',
      margin: '0 auto 1.25rem',
      boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
      transition: 'all 0.3s ease',
    },
    featureTitle: {
      fontSize: '1.2rem',
      fontWeight: 700,
      color: '#1f2937',
      marginBottom: '0.875rem',
      lineHeight: 1.2,
    },
    featureDescription: {
      color: '#6b7280',
      lineHeight: 1.6,
      fontSize: '0.9rem',
      flex: 1,
      fontWeight: 400,
    },
  };

  if (windowWidth === 0) return null;

  return (
    <section id="features" style={styles.features}>
      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>Why Choose EvenX?</h2>
        <div style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div 
              key={index} 
              style={{
                ...styles.featureCard,
                animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
              }}
            >
              <div 
                style={{
                  ...styles.featureIcon,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.background = '#a855f7';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.background = '#8b5cf6';
                }}
              >
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
