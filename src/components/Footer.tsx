import React, { useEffect, useState } from 'react';

const Footer: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
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
    footerSection1: {
      transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s',
    },
    footerSection2: {
      transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s',
    },
    footerSection3: {
      transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s',
    },
    footerSection4: {
      transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s',
    },
    footerTitle: {
      fontSize: windowWidth <= 480 ? '1rem' : '1.1rem',
      fontWeight: 700,
      marginBottom: windowWidth <= 768 ? '0.75rem' : '1rem',
      color: '#f9fafb',
    },
    footerTitleText: {
      margin: 0,
    },
    footerLinks: {
      listStyle: 'none' as const,
      padding: 0,
      margin: 0,
    },
    footerLink: {
      marginBottom: windowWidth <= 768 ? '0.75rem' : '0.5rem',
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? 'translateX(0)' : 'translateX(-10px)',
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
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
      borderLeft: windowWidth <= 768 ? '2px solid transparent' : 'none',
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
      opacity: isLoaded ? 1 : 0,
      transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s',
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
    brandIcon: {
      marginRight: '0.5rem',
      fontSize: '1rem',
      color: '#3b82f6',
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.footerContent}>
          <div style={{...styles.footerSection, ...styles.footerSection1}}>
            <h3 style={styles.footerTitle}>
              <span style={styles.footerTitleText}>
                <i className="fas fa-coins" style={styles.brandIcon}></i>
                EvenX
              </span>
            </h3>
            <p style={styles.description}>
              Making expense splitting simple, fair, and stress-free.
            </p>
            <div style={styles.socialLinks}>
              <i 
                className="fab fa-twitter" 
                style={styles.socialLink}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#1da1f2';
                  e.currentTarget.style.background = 'rgba(29, 161, 242, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#d1d5db';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              ></i>
              <i 
                className="fab fa-facebook" 
                style={styles.socialLink}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#1877f2';
                  e.currentTarget.style.background = 'rgba(24, 119, 242, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#d1d5db';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              ></i>
              <i 
                className="fab fa-instagram" 
                style={styles.socialLink}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#e4405f';
                  e.currentTarget.style.background = 'rgba(228, 64, 95, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#d1d5db';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              ></i>
            </div>
          </div>
          
          <div style={{...styles.footerSection, ...styles.footerSection2}}>
            <h3 
              style={styles.footerTitle}
            >
              <span style={styles.footerTitleText}>Quick Links</span>
            </h3>
            <ul style={styles.footerLinks}>
              <li style={styles.footerLink}>
                <a 
                  href="#home" 
                  style={styles.footerLinkA}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderLeftColor = '#3b82f6';
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#d1d5db';
                    e.currentTarget.style.borderLeftColor = 'transparent';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  Home
                </a>
              </li>
              <li style={styles.footerLink}>
                <a 
                  href="#features" 
                  style={styles.footerLinkA}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderLeftColor = '#3b82f6';
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#d1d5db';
                    e.currentTarget.style.borderLeftColor = 'transparent';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  Features
                </a>
              </li>
              <li style={styles.footerLink}>
                <a 
                  href="#about" 
                  style={styles.footerLinkA}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderLeftColor = '#3b82f6';
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#d1d5db';
                    e.currentTarget.style.borderLeftColor = 'transparent';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  About
                </a>
              </li>
              <li style={styles.footerLink}>
                <a 
                  href="#contact" 
                  style={styles.footerLinkA}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderLeftColor = '#3b82f6';
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#d1d5db';
                    e.currentTarget.style.borderLeftColor = 'transparent';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div style={{...styles.footerSection, ...styles.footerSection3}}>
            <h3 
              style={styles.footerTitle}
            >
              <span style={styles.footerTitleText}>Support</span>
            </h3>
            <ul style={styles.footerLinks}>
              <li style={styles.footerLink}>
                <a 
                  href="#" 
                  style={styles.footerLinkA}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderLeftColor = '#3b82f6';
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#d1d5db';
                    e.currentTarget.style.borderLeftColor = 'transparent';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  Help Center
                </a>
              </li>
              <li style={styles.footerLink}>
                <a 
                  href="#" 
                  style={styles.footerLinkA}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderLeftColor = '#3b82f6';
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#d1d5db';
                    e.currentTarget.style.borderLeftColor = 'transparent';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  Privacy Policy
                </a>
              </li>
              <li style={styles.footerLink}>
                <a 
                  href="#" 
                  style={styles.footerLinkA}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderLeftColor = '#3b82f6';
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#d1d5db';
                    e.currentTarget.style.borderLeftColor = 'transparent';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  Terms of Service
                </a>
              </li>
              <li style={styles.footerLink}>
                <a 
                  href="#" 
                  style={styles.footerLinkA}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderLeftColor = '#3b82f6';
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#d1d5db';
                    e.currentTarget.style.borderLeftColor = 'transparent';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
            
            <div style={{...styles.footerSection, ...styles.footerSection4}}>
              <h3 
                style={styles.footerTitle}
              >
                <span style={styles.footerTitleText}>Download</span>
              </h3>
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
