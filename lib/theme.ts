export const colors = {
  primary: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },

  violet: {
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
  },

  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },

  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
  },

  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
  },

  white: '#ffffff',
  black: '#000000',
} as const;

export const gradients = {
  primary: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  primary_hover: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
  hero_bg: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #6366f1 100%)',
  hero_radial: 'radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.35) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(165, 180, 252, 0.3) 0%, transparent 50%)',
  dark_section: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
  footer: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
  success: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
  error_bg: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
} as const;

export const shadows = {
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 12px rgba(0, 0, 0, 0.08)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
  xl: '0 16px 40px rgba(0, 0, 0, 0.16)',
  primary_sm: '0 4px 14px rgba(99, 102, 241, 0.25)',
  primary_md: '0 8px 24px rgba(99, 102, 241, 0.35)',
  primary_lg: '0 16px 40px rgba(99, 102, 241, 0.45)',
  phone: '0 24px 48px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.08)',
} as const;

export const radius = {
  sm: '6px',
  md: '10px',
  lg: '14px',
  xl: '20px',
  '2xl': '28px',
  full: '9999px',
} as const;

export const store_urls = {
  ios: 'https://apps.apple.com/ca/app/evenx/id6759013076',
  android: 'https://play.google.com/store/apps/details?id=ca.praxis.evenx',
} as const;
