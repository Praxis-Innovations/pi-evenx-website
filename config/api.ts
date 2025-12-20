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

/**
 * Gets the API base URL from environment variables
 */
const getBaseUrl = (): string => {
  // Try to get from Next.js public env var
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Fallback to localhost for development
  return 'http://localhost:8080';
};

const API_CONFIG: ApiConfig = {
  BASE_URL: getBaseUrl(),
  
  // API endpoints
  ENDPOINTS: {
    VERIFY_EMAIL: '/verify-email',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    CONTACT_SUBMIT: '/api/contact/submit',
  }
};

/**
 * Helper function to build full API URLs
 */
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Export individual endpoints for convenience
export const {
  BASE_URL,
  ENDPOINTS
} = API_CONFIG;

export default API_CONFIG;
