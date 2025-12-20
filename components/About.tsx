'use client';

import React, { useState, useEffect } from 'react';

const About: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const styles = {
    about: {
      padding: isMobile ? '40px 0' : '70px 0',
      background: '#f8fafc',
      position: 'relative' as const,
      overflow: 'hidden',
    },
    container: {
      maxWidth: '1100px',
      margin: '0 auto',
      padding: isMobile ? '0 20px' : '0 30px',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '2rem' : '3.5rem',
      alignItems: 'center',
      position: 'relative' as const,
      zIndex: 2,
    },
    content: {
      textAlign: isMobile ? 'center' as const : 'left' as const,
    },
    sectionTitle: {
      fontSize: isMobile ? 'clamp(1.8rem, 6vw, 2.5rem)' : 'clamp(2rem, 5vw, 2.8rem)',
      fontWeight: 800,
      color: '#1f2937',
      marginBottom: isMobile ? '1.25rem' : '1.75rem',
      lineHeight: 1.1,
    },
    subtitle: {
      fontSize: isMobile ? '1rem' : '1.15rem',
      color: '#6b7280',
      marginBottom: isMobile ? '1.25rem' : '1.5rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    description: {
      fontSize: isMobile ? '0.95rem' : '1.05rem',
      color: '#374151',
      lineHeight: 1.6,
      marginBottom: isMobile ? '1.75rem' : '2.25rem',
      fontWeight: 400,
    },
    image: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      order: isMobile ? 1 : 0,
    },
    appImage: {
      width: '100%',
      maxWidth: isMobile ? '280px' : '380px',
      height: isMobile ? '200px' : '300px',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#6b7280',
      fontSize: isMobile ? '1rem' : '1.1rem',
      fontWeight: 500,
      background: '#e5e7eb',
      border: '1px solid #d1d5db',
    },
  };

  if (!mounted) return null;

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
        </div>
        
        <div style={{
          ...styles.image,
          animation: 'slideInRight 1s ease-out 0.8s both'
        }}>
          <div style={styles.appImage}>
            EvenX App Screenshot
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
