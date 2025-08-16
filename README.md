# EvenX Website - React Version

A modern, responsive React website for the EvenX mobile application - a smart expense splitting app similar to Splitwise.

## 🌟 Features

### Core Functionality
- **Email Verification Flow** - Complete verification system for mobile app integration
- **App Information** - Comprehensive details about EvenX features and benefits
- **Contact Form** - User-friendly contact system with form validation
- **Responsive Design** - Works perfectly on all devices (desktop, tablet, mobile)

### Technical Features
- **React 18** - Modern React with hooks and functional components
- **Component-Based Architecture** - Modular, maintainable code structure
- **State Management** - React hooks for form handling and verification flow
- **Modern UI/UX** - Beautiful design with smooth animations and transitions
- **Mobile-First Approach** - Optimized for mobile users
- **Cross-Browser Compatible** - Works on all modern browsers

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or Download** the project files
2. **Install Dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start Development Server**:
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open Browser** - The app will automatically open at `http://localhost:3000`

### Build for Production

```bash
npm run build
# or
yarn build
```

This creates a `build` folder with optimized production files.

## 📱 Mobile App Integration

### Email Verification Flow
The React version implements the correct email verification flow:

1. **User clicks verification link** in their email (e.g., `https://yourapp.com/verify-email?token=abc123`)
2. **Dedicated verification page loads** - Clean, focused page without navigation
3. **Token extraction** - Frontend extracts token from URL query parameters
4. **Backend API call** - Frontend calls `/api/verify-email?token=abc123`
5. **Result display** - Shows success/failure message based on backend response

### Email Verification Page Features

- **Standalone Design** - Clean, focused page without website navigation
- **Professional Layout** - EvenX branding with clear verification status
- **Automatic Processing** - Verification starts immediately when page loads
- **Clear Actions** - Success/error states with appropriate next steps
- **Mobile Optimized** - Responsive design for all devices

### Backend API Integration

The frontend expects your backend to handle the `/api/verify-email` endpoint:

```javascript
// Example backend endpoint (Node.js/Express)
app.get('/api/verify-email', async (req, res) => {
  const { token } = req.query;
  
  try {
    // Verify the token in your database
    const isValid = await verifyEmailToken(token);
    
    if (isValid) {
      // Mark email as verified
      await markEmailAsVerified(token);
      res.json({ success: true, message: 'Email verified successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Verification failed' });
  }
});
```

### Deep Linking
To integrate with your mobile app, update the success handler in `src/pages/EmailVerificationPage.js`:

```javascript
// In the handleGoToApp function, customize the redirect:
const handleGoToApp = () => {
  // Redirect to your mobile app
  window.location.href = 'evenx://verification-success';
  // Or use universal links for iOS
  // window.location.href = 'https://yourdomain.com/app/verification-success';
};
```

## 🏗️ Project Structure

```
evenx-ui/
├── public/
│   └── index.html          # Main HTML template
├── src/
│   ├── components/         # React components for main website
│   │   ├── Navbar.js      # Navigation component
│   │   ├── Hero.js        # Hero section
│   │   ├── Features.js    # Features showcase
│   │   ├── About.js       # About section
│   │   ├── Contact.js     # Contact form
│   │   ├── Footer.js      # Footer
│   │   └── *.css          # Component styles
│   ├── pages/              # Dedicated page components
│   │   ├── EmailVerificationPage.js  # Email verification page
│   │   └── EmailVerificationPage.css # Verification page styles
│   ├── App.js             # Main App component with routing
│   ├── App.css            # App-level styles
│   ├── index.js           # React entry point
│   └── index.css          # Global styles
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🎨 Customization

### Colors and Branding
Update the CSS variables in component CSS files to match your brand:

```css
/* Primary brand colors */
--primary-color: #6366f1;    /* Main brand color */
--secondary-color: #8b5cf6;  /* Secondary brand color */
--accent-color: #10b981;     /* Success/accent color */
```

### Content Updates
- **App Information**: Update text content in component files
- **Contact Details**: Modify contact information in `Contact.js`
- **Download Links**: Update app store links when ready
- **Social Media**: Configure social media links in `Contact.js`
- **Verification Page**: Customize the verification page in `EmailVerificationPage.js`

### Images and Assets
- Replace placeholder images with your actual app screenshots
- Update the phone mockup with your app's actual interface
- Add your company logo and branding elements

## 🔧 Technical Details

### Technologies Used
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing for email verification
- **CSS3** - Modern styling with Flexbox and Grid
- **JavaScript (ES6+)** - Modern JavaScript features
- **Font Awesome** - Icons and visual elements
- **Google Fonts** - Typography (Inter font family)

### Dependencies
- `react` - Core React library
- `react-dom` - React DOM rendering
- `react-router-dom` - Client-side routing
- `react-scripts` - Create React App build tools

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📱 Mobile App Integration Examples

### iOS Deep Linking
```javascript
// In your iOS app, handle the verification success
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    if url.scheme == "evenx" && url.host == "verification-success" {
        // Handle successful verification
        handleVerificationSuccess()
        return true
    }
    return false
}
```

### Android Intent Handling
```java
// In your Android app, handle the verification success
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    
    Intent intent = getIntent();
    if (intent.getData() != null && "evenx".equals(intent.getData().getScheme())) {
        // Handle successful verification
        handleVerificationSuccess();
    }
}
```

## 🚀 Deployment

### Static Hosting
The React build can be deployed to any static hosting service:

- **Netlify** - Drag and drop deployment
- **Vercel** - Git-based deployment
- **GitHub Pages** - Free hosting for public repositories
- **AWS S3** - Scalable static hosting
- **Firebase Hosting** - Google's hosting solution

### Build and Deploy
```bash
# Build the project
npm run build

# Deploy the build folder to your hosting service
```

### Custom Domain
1. **Purchase** a domain (e.g., `evenx.com`)
2. **Configure** DNS settings
3. **Deploy** your React build
4. **Update** mobile app deep links

## 🔒 Security Considerations

### Email Verification
- Implement proper email validation on the backend
- Use secure token generation for verification codes
- Implement rate limiting for verification attempts
- Add CAPTCHA for bot protection

### Form Security
- Implement CSRF protection
- Validate all form inputs server-side
- Use HTTPS for all communications
- Sanitize user inputs

## 📊 Analytics and Tracking

### Google Analytics
Add Google Analytics to track website usage:

```javascript
// In public/index.html, add before </head>
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Conversion Tracking
Track key user actions:
- Email verification attempts
- Contact form submissions
- Download button clicks
- Feature section engagement

## 🆘 Support and Maintenance

### Regular Updates
- Keep React and dependencies updated
- Monitor browser compatibility
- Update content and features
- Test mobile app integration

### Performance Optimization
- Optimize images and assets
- Implement lazy loading
- Use CDN for external resources
- Monitor Core Web Vitals

## 🚀 Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (not recommended)
npm run eject
```

## 📄 License

This project is created for the EvenX mobile application. All rights reserved.

## 🤝 Contributing

For development and customization:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built with ❤️ and React for EvenX - Making expense splitting simple, fair, and stress-free.**
