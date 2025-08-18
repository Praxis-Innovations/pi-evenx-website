// API Configuration
interface ApiConfig {
  BASE_URL: string;
  ENDPOINTS: {
    VERIFY_EMAIL: string;
    FORGOT_PASSWORD: string;
    RESET_PASSWORD: string;
    CONTACT_SUBMIT: string;
  };
}

const API_CONFIG: ApiConfig = {
  // Get API base URL from multiple sources
  BASE_URL: (() => {
    // 1. Try build-time env var (for development)
    if (process.env.REACT_APP_API_URL) {
      return process.env.REACT_APP_API_URL;
    }
    
    // 2. Try to get from meta tag (for Kubernetes deployment)
    const metaTag = document.querySelector('meta[name="api-url"]');
    if (metaTag && metaTag.getAttribute('content')) {
      return metaTag.getAttribute('content')!;
    }
    
    // 3. Fallback to localhost for development
    return 'http://localhost:8080';
  })(),
  
  // API endpoints
  ENDPOINTS: {
    VERIFY_EMAIL: '/verify-email',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    CONTACT_SUBMIT: '/api/contact/submit',
  }
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Export individual endpoints for convenience
export const {
  BASE_URL,
  ENDPOINTS
} = API_CONFIG;

export default API_CONFIG;
