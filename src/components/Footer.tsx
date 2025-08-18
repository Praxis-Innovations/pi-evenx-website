import React from 'react';

const Footer: React.FC = () => {
  const styles = {
    footer: {
      background: '#1f2937',
      color: 'white',
      padding: '3rem 0 1rem',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
    },
    footerContent: {
      display: 'grid',
      gridTemplateColumns: window.innerWidth <= 768 ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '2rem',
      marginBottom: '2rem',
    },
    footerSection: {
      marginBottom: window.innerWidth <= 768 ? '2rem' : '0',
    },
    footerTitle: {
      fontSize: '1.1rem',
      fontWeight: 600,
      marginBottom: '1rem',
      color: '#f9fafb',
    },
    footerLinks: {
      listStyle: 'none' as const,
      padding: 0,
      margin: 0,
    },
    footerLink: {
      marginBottom: '0.5rem',
    },
    footerLinkA: {
      color: '#d1d5db',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
    },
    footerBottom: {
      borderTop: '1px solid #374151',
      paddingTop: '2rem',
      textAlign: 'center' as const,
      color: '#9ca3af',
    },
    socialLinks: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1rem',
    },
    socialLink: {
      color: '#d1d5db',
      fontSize: '1.2rem',
      transition: 'color 0.3s ease',
      cursor: 'pointer',
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>EvenX</h3>
            <p style={{ color: '#d1d5db', lineHeight: 1.6 }}>
              The easiest way to split bills, track shared expenses, and settle up with friends and family.
            </p>
            <div style={styles.socialLinks}>
              <i 
                className="fab fa-twitter" 
                style={styles.socialLink}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#1da1f2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#d1d5db';
                }}
              ></i>
              <i 
                className="fab fa-facebook" 
                style={styles.socialLink}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#1877f2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#d1d5db';
                }}
              ></i>
              <i 
                className="fab fa-instagram" 
                style={styles.socialLink}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#e4405f';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#d1d5db';
                }}
              ></i>
            </div>
          </div>
          
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Product</h3>
            <ul style={styles.footerLinks}>
              <li style={styles.footerLink}>
                <a href="#features" style={styles.footerLinkA}>Features</a>
              </li>
              <li style={styles.footerLink}>
                <a href="#about" style={styles.footerLinkA}>About</a>
              </li>
              <li style={styles.footerLink}>
                <a href="#contact" style={styles.footerLinkA}>Contact</a>
              </li>
              <li style={styles.footerLink}>
                <a href="#" style={styles.footerLinkA}>Download</a>
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
                <a href="#" style={styles.footerLinkA}>Contact Support</a>
              </li>
            </ul>
          </div>
          
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Company</h3>
            <ul style={styles.footerLinks}>
              <li style={styles.footerLink}>
                <a href="#" style={styles.footerLinkA}>About Us</a>
              </li>
              <li style={styles.footerLink}>
                <a href="#" style={styles.footerLinkA}>Careers</a>
              </li>
              <li style={styles.footerLink}>
                <a href="#" style={styles.footerLinkA}>Press</a>
              </li>
              <li style={styles.footerLink}>
                <a href="#" style={styles.footerLinkA}>Blog</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div style={styles.footerBottom}>
          <p>&copy; 2024 EvenX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
