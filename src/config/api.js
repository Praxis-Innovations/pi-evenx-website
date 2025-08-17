// API Configuration
const API_CONFIG = {
  // Get API base URL from environment variable, fallback to localhost for development
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
  
  // API endpoints
  ENDPOINTS: {
    VERIFY_EMAIL: '/verify-email',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    CONTACT_SUBMIT: '/api/contact/submit',
  }
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Export individual endpoints for convenience
export const {
  BASE_URL,
  ENDPOINTS
} = API_CONFIG;

export default API_CONFIG;
