// Shared styles used across multiple components
export const sharedStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    maxWidth: '600px',
    width: '100%',
  },
  
  btn: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 600,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    minHeight: '44px',
  },
  
  btnPrimary: {
    backgroundColor: '#6366f1',
    color: 'white',
  },
  
  btnSecondary: {
    backgroundColor: 'transparent',
    color: '#6366f1',
    border: '2px solid #6366f1',
  },
  
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.2s ease-in-out',
  },
  
  label: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '8px',
    display: 'block',
  },
  
  error: {
    color: '#ef4444',
    fontSize: '0.875rem',
    marginTop: '4px',
  },
  
  success: {
    color: '#10b981',
    fontSize: '0.875rem',
    marginTop: '4px',
  },
};
