import React from 'react';
import './Footer.css';

const Footer = () => {
  const handleDownload = (platform) => {
    alert(`${platform} download functionality will be implemented when the app is ready for release.`);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <i className="fas fa-coins"></i>
              <span>EvenX</span>
            </div>
            <p>Making expense splitting simple, fair, and stress-free.</p>
          </div>
          
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><button onClick={() => scrollToSection('home')}>Home</button></li>
              <li><button onClick={() => scrollToSection('features')}>Features</button></li>
              <li><button onClick={() => scrollToSection('about')}>About</button></li>
              <li><button onClick={() => scrollToSection('contact')}>Contact</button></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li><button>Help Center</button></li>
              <li><button>Privacy Policy</button></li>
              <li><button>Terms of Service</button></li>
              <li><button>FAQ</button></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Download</h3>
            <div className="download-buttons">
              <button 
                className="download-btn"
                onClick={() => handleDownload('App Store')}
              >
                <i className="fab fa-apple"></i>
                App Store
              </button>
              <button 
                className="download-btn"
                onClick={() => handleDownload('Google Play')}
              >
                <i className="fab fa-google-play"></i>
                Google Play
              </button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 EvenX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
