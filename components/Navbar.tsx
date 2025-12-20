'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      padding: '0.75rem 0',
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
    navLogoImage: {
      marginRight: '0.5rem',
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
      display: 'flex',
      flexDirection: 'column' as const,
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: '8px',
      borderRadius: '4px',
      transition: 'all 0.3s ease',
    },
    bar: {
      width: '25px',
      height: '3px',
      background: '#333',
      margin: '3px 0',
      transition: '0.3s ease',
      borderRadius: '2px',
    },
    mobileNavMenu: {
      position: 'fixed' as const,
      left: isMenuOpen ? 0 : '-100%',
      top: '70px',
      flexDirection: 'column' as const,
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(10px)',
      width: '100%',
      textAlign: 'center' as const,
      transition: '0.3s ease',
      boxShadow: '0 10px 27px rgba(0, 0, 0, 0.1)',
      padding: '2rem 0',
      display: 'flex',
      listStyle: 'none' as const,
      margin: 0,
      zIndex: 999,
    },
    mobileNavItem: {
      margin: '1rem 0',
    },
    mobileNavLink: {
      background: 'none',
      border: 'none',
      textDecoration: 'none',
      color: '#333',
      fontWeight: 600,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontSize: '1.1rem',
      padding: '0.75rem 2rem',
      borderRadius: '8px',
      display: 'block',
      width: '100%',
    },
  };

  if (windowWidth === 0) return null; // SSR safety

  return (
    <nav style={styles.navbar}>
      <div style={styles.navContainer}>
        <div style={styles.navLogo}>
          <Image 
            src="/evenx-logo.png" 
            alt="EvenX logo" 
            width={28} 
            height={28} 
            style={styles.navLogoImage}
          />
          <span>EvenX</span>
        </div>
        
        {/* Desktop Navigation */}
        {windowWidth > 768 && (
          <ul style={styles.navMenu}>
            <li style={styles.navItem}>
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
            <li style={styles.navItem}>
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
            <li style={styles.navItem}>
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
            <li style={styles.navItem}>
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
        )}
        
        {/* Mobile Burger Menu */}
        {windowWidth <= 768 && (
          <div 
            style={styles.hamburger}
            onClick={toggleMenu}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
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
        )}
      </div>
      
      {/* Mobile Navigation Menu */}
      {windowWidth <= 768 && (
        <ul style={styles.mobileNavMenu}>
          <li style={styles.mobileNavItem}>
            <button 
              onClick={() => scrollToSection('home')} 
              style={styles.mobileNavLink}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                e.currentTarget.style.color = '#6366f1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#333';
              }}
            >
              Home
            </button>
          </li>
          <li style={styles.mobileNavItem}>
            <button 
              onClick={() => scrollToSection('features')} 
              style={styles.mobileNavLink}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                e.currentTarget.style.color = '#6366f1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#333';
              }}
            >
              Features
            </button>
          </li>
          <li style={styles.mobileNavItem}>
            <button 
              onClick={() => scrollToSection('about')} 
              style={styles.mobileNavLink}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                e.currentTarget.style.color = '#6366f1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#333';
              }}
            >
              About
            </button>
          </li>
          <li style={styles.mobileNavItem}>
            <button 
              onClick={() => scrollToSection('contact')} 
              style={styles.mobileNavLink}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                e.currentTarget.style.color = '#6366f1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#333';
              }}
            >
              Contact
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
