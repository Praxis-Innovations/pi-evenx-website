import React, { useState } from 'react';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = (): void => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  const styles = {
    navbar: {
      position: 'fixed' as const,
      top: 0,
      width: '100%',
      background: isScrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      padding: '1rem 0',
      transition: 'all 0.3s ease',
      boxShadow: isScrolled ? '0 2px 20px rgba(0, 0, 0, 0.1)' : 'none',
    },
    navContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    navLogo: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#6366f1',
    },
    navLogoIcon: {
      marginRight: '0.5rem',
      fontSize: '1.8rem',
    },
    navMenu: {
      display: 'flex',
      listStyle: 'none' as const,
      gap: '2rem',
      margin: 0,
      padding: 0,
    },
    navItem: {
      listStyle: 'none' as const,
    },
    navLink: {
      background: 'none',
      border: 'none',
      textDecoration: 'none',
      color: '#333',
      fontWeight: 500,
      transition: 'color 0.3s ease',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontSize: '1rem',
    },
    hamburger: {
      display: 'none' as const,
      flexDirection: 'column' as const,
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: 0,
    },
    bar: {
      width: '25px',
      height: '3px',
      background: '#333',
      margin: '3px 0',
      transition: '0.3s',
    },
    mobileNavMenu: {
      position: 'fixed' as const,
      left: isMenuOpen ? 0 : '-100%',
      top: '70px',
      flexDirection: 'column' as const,
      backgroundColor: 'white',
      width: '100%',
      textAlign: 'center' as const,
      transition: '0.3s',
      boxShadow: '0 10px 27px rgba(0, 0, 0, 0.05)',
      padding: '2rem 0',
      display: 'flex',
      listStyle: 'none' as const,
      margin: 0,
    },
    mobileNavItem: {
      margin: '1rem 0',
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        <div style={styles.navLogo}>
          <i className="fas fa-coins" style={styles.navLogoIcon}></i>
          <span>EvenX</span>
        </div>
        
        <ul style={window.innerWidth <= 768 ? styles.mobileNavMenu : styles.navMenu}>
          <li style={window.innerWidth <= 768 ? styles.mobileNavItem : styles.navItem}>
            <button 
              onClick={() => scrollToSection('home')} 
              style={styles.navLink}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#6366f1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#333';
              }}
            >
              Home
            </button>
          </li>
          <li style={window.innerWidth <= 768 ? styles.mobileNavItem : styles.navItem}>
            <button 
              onClick={() => scrollToSection('features')} 
              style={styles.navLink}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#6366f1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#333';
              }}
            >
              Features
            </button>
          </li>
          <li style={window.innerWidth <= 768 ? styles.mobileNavItem : styles.navItem}>
            <button 
              onClick={() => scrollToSection('about')} 
              style={styles.navLink}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#6366f1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#333';
              }}
            >
              About
            </button>
          </li>
          <li style={window.innerWidth <= 768 ? styles.mobileNavItem : styles.navItem}>
            <button 
              onClick={() => scrollToSection('contact')} 
              style={styles.navLink}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#6366f1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#333';
              }}
            >
              Contact
            </button>
          </li>
        </ul>
        
        <div 
          style={{
            ...styles.hamburger,
            display: window.innerWidth <= 768 ? 'flex' : 'none',
          }} 
          onClick={toggleMenu}
        >
          <span 
            style={{
              ...styles.bar,
              transform: isMenuOpen ? 'translateY(8px) rotate(45deg)' : 'none',
            }}
          ></span>
          <span 
            style={{
              ...styles.bar,
              opacity: isMenuOpen ? 0 : 1,
            }}
          ></span>
          <span 
            style={{
              ...styles.bar,
              transform: isMenuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none',
            }}
          ></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
