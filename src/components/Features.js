import React from 'react';
import './Features.css';

const Features = () => {
  const features = [
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

  return (
    <section id="features" className="features">
      <div className="container">
        <h2 className="section-title">Why Choose EvenX?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <i className={feature.icon}></i>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
