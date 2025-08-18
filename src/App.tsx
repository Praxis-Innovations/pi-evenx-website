import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Features from './components/Features';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App(): React.JSX.Element {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Email verification route - standalone page without navbar/footer */}
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          
          {/* Reset password route - standalone page without navbar/footer */}
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          
          {/* Forgot password route - standalone page without navbar/footer */}
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Main website route with full layout */}
          <Route path="/" element={
            <>
              <Navbar isScrolled={isScrolled} />
              <main>
                <Hero />
                <Features />
                <About />
                <Contact />
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
