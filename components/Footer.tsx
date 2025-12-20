'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setIsLoaded(true);
    
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    footer: {
      background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
      color: 'white',
      padding: windowWidth <= 768 ? '3rem 0 1.5rem' : '4rem 0 2rem',
      position: 'relative' as const,
      overflow: 'hidden',
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: windowWidth <= 480 ? '0 16px' : '0 20px',
    },
    footerContent: {
      display: 'grid',
      gridTemplateColumns: windowWidth <= 480 ? '1fr' : windowWidth <= 768 ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: windowWidth <= 768 ? '1.5rem' : '2rem',
      marginBottom: windowWidth <= 768 ? '2rem' : '3rem',
    },
    footerSection: {
      marginBottom: windowWidth <= 768 ? '1.5rem' : '0',
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    footerTitle: {
      fontSize: windowWidth <= 480 ? '1rem' : '1.1rem',
      fontWeight: 700,
      marginBottom: windowWidth <= 768 ? '0.75rem' : '1rem',
      color: '#f9fafb',
      display: 'flex',
      alignItems: 'center',
    },
    footerLinks: {
      listStyle: 'none' as const,
      padding: 0,
      margin: 0,
    },
    footerLink: {
      marginBottom: windowWidth <= 768 ? '0.75rem' : '0.5rem',
    },
    footerLinkA: {
      color: '#d1d5db',
      textDecoration: 'none',
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      fontSize: windowWidth <= 480 ? '0.9rem' : '1rem',
      display: 'block',
      padding: windowWidth <= 768 ? '0.5rem 0' : '0',
      borderRadius: '6px',
      paddingLeft: windowWidth <= 768 ? '0.5rem' : '0',
    },
    footerBottom: {
      borderTop: '1px solid #374151',
      paddingTop: windowWidth <= 768 ? '1.5rem' : '2rem',
      textAlign: 'center' as const,
      color: '#9ca3af',
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s',
    },
    socialLinks: {
      display: 'flex',
      gap: windowWidth <= 480 ? '0.75rem' : '1rem',
      marginTop: windowWidth <= 768 ? '1rem' : '1.5rem',
      flexWrap: 'wrap' as const,
    },
    socialLink: {
      color: '#d1d5db',
      fontSize: windowWidth <= 480 ? '1.1rem' : '1.2rem',
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '8px',
      background: 'rgba(255, 255, 255, 0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '40px',
      minHeight: '40px',
    },
    description: {
      color: '#d1d5db',
      lineHeight: 1.6,
      fontSize: windowWidth <= 480 ? '0.9rem' : '1rem',
      marginBottom: windowWidth <= 768 ? '1rem' : '1.5rem',
    },
    downloadButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '0.5rem 1rem',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      marginBottom: '0.5rem',
    },
    downloadIcon: {
      fontSize: '1.2rem',
      color: '#fff',
    },
    downloadText: {
      color: '#fff',
      fontSize: '0.9rem',
      fontWeight: 600,
    },
    brandLogo: {
      marginRight: '0.5rem',
    },
  };

  if (windowWidth === 0) return null;

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>
              <Image 
                src="/evenx-logo.png" 
                alt="EvenX logo" 
                width={18} 
                height={18} 
                style={styles.brandLogo}
              />
              EvenX
            </h3>
            <p style={styles.description}>
              Making expense splitting simple, fair, and stress-free.
            </p>
            <div style={styles.socialLinks}>
              <i className="fab fa-twitter" style={styles.socialLink}></i>
              <i className="fab fa-facebook" style={styles.socialLink}></i>
              <i className="fab fa-instagram" style={styles.socialLink}></i>
            </div>
          </div>
          
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Quick Links</h3>
            <ul style={styles.footerLinks}>
              <li style={styles.footerLink}>
                <a href="#home" style={styles.footerLinkA}>Home</a>
              </li>
              <li style={styles.footerLink}>
                <a href="#features" style={styles.footerLinkA}>Features</a>
              </li>
              <li style={styles.footerLink}>
                <a href="#about" style={styles.footerLinkA}>About</a>
              </li>
              <li style={styles.footerLink}>
                <a href="#contact" style={styles.footerLinkA}>Contact</a>
              </li>
            </ul>
          </div>
          
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Support</h3>
            <ul style={styles.footerLinks}>
              <li style={styles.footerLink}>
                <a href="#" style={styles.footerLinkA}>Help Center</a>
              </li>
              <li style={styles.footerLink}>
                <a href="#" style={styles.footerLinkA}>Privacy Policy</a>
              </li>
              <li style={styles.footerLink}>
                <a href="#" style={styles.footerLinkA}>Terms of Service</a>
              </li>
              <li style={styles.footerLink}>
                <a href="#" style={styles.footerLinkA}>FAQ</a>
              </li>
            </ul>
          </div>
            
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Download</h3>
            <div style={styles.footerLinks}>
              <div style={styles.downloadButton}>
                <i className="fab fa-apple" style={styles.downloadIcon}></i>
                <span style={styles.downloadText}>App Store</span>
              </div>
              <div style={styles.downloadButton}>
                <i className="fab fa-google-play" style={styles.downloadIcon}></i>
                <span style={styles.downloadText}>Google Play</span>
              </div>
            </div>
          </div>
        </div>
        
        <div style={styles.footerBottom}>
          <p>&copy; 2025 EvenX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
