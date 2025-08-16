import React from 'react';
import './Hero.css';

const Hero = () => {
  const handleDownload = (platform) => {
    // This will be updated when the app is ready for release
    alert(`${platform} download functionality will be implemented when the app is ready for release.`);
  };

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Split Expenses Smartly with EvenX</h1>
          <p className="hero-subtitle">
            The easiest way to split bills, track shared expenses, and settle up with friends and family. 
            No more awkward money conversations!
          </p>
          <div className="hero-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => handleDownload('App Store')}
            >
              <i className="fab fa-apple"></i>
              Download on App Store
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => handleDownload('Google Play')}
            >
              <i className="fab fa-google-play"></i>
              Get it on Google Play
            </button>
          </div>
        </div>
        
        <div className="hero-image">
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="app-preview">
                <div className="app-header">
                  <i className="fas fa-coins"></i>
                  <span>EvenX</span>
                </div>
                <div className="expense-item">
                  <span>Dinner at Restaurant</span>
                  <span className="amount">$45.00</span>
                </div>
                <div className="expense-item">
                  <span>Movie Tickets</span>
                  <span className="amount">$24.00</span>
                </div>
                <div className="total">
                  <span>Total: $69.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
