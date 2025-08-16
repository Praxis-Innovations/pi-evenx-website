import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>About EvenX</h2>
            <p>
              EvenX was born from the frustration of splitting bills and keeping track of who owes what. 
              We believe that managing shared expenses should be simple, transparent, and stress-free.
            </p>
            <p>
              Our mission is to eliminate the awkwardness around money conversations and make it easy 
              for friends, families, and roommates to split expenses fairly and efficiently.
            </p>
            <div className="stats">
              <div className="stat">
                <h3>100+</h3>
                <p>Active Users</p>
              </div>
              <div className="stat">
                <h3>$200K+</h3>
                <p>Expenses Tracked</p>
              </div>
              <div className="stat">
                <h3>4.8★</h3>
                <p>App Store Rating</p>
              </div>
            </div>
          </div>
          <div className="about-image">
            <div className="about-mockup">
              <img 
                src="https://via.placeholder.com/400x600/6366f1/ffffff?text=EvenX+App" 
                alt="EvenX App Screenshot" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
