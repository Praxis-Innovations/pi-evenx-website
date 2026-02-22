import { colors, gradients, radius } from './theme';

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
    borderRadius: radius.md,
    fontSize: '1rem',
    fontWeight: 600,
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    minHeight: '44px',
    fontFamily: 'inherit',
  },

  btnPrimary: {
    background: gradients.primary,
    color: colors.white,
  },

  btnSecondary: {
    backgroundColor: 'transparent',
    color: colors.primary[500],
    border: `2px solid ${colors.primary[500]}`,
  },

  input: {
    width: '100%',
    padding: '12px 16px',
    border: `2px solid ${colors.neutral[200]}`,
    borderRadius: radius.md,
    fontSize: '1rem',
    transition: 'border-color 0.2s ease-in-out',
    fontFamily: 'inherit',
    outline: 'none',
  },

  label: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: colors.neutral[600],
    marginBottom: '8px',
    display: 'block',
  },

  error: {
    color: colors.error[500],
    fontSize: '0.875rem',
    marginTop: '4px',
  },

  success: {
    color: colors.success[500],
    fontSize: '0.875rem',
    marginTop: '4px',
  },
};
