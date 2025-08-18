import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Apply only essential global styles
document.body.style.margin = '0';
document.body.style.fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";
(document.body.style as any).WebkitFontSmoothing = 'antialiased';
(document.body.style as any).MozOsxFontSmoothing = 'grayscale';
document.body.style.lineHeight = '1.6';
document.body.style.color = '#333';
document.body.style.overflowX = 'hidden';

// Set smooth scrolling
document.documentElement.style.scrollBehavior = 'smooth';

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
