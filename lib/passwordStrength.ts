export interface PasswordStrengthResult {
  strength: number; // 0-5
  label: string;
  color: string;
}

export const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[a-z]/.test(password)) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  return strength;
};

export const getPasswordStrengthResult = (password: string): PasswordStrengthResult => {
  const strength = calculatePasswordStrength(password);
  const strengthConfig = {
    0: { label: 'Very Weak', color: '#A9A9A9' },
    1: { label: 'Very Weak', color: '#A9A9A9' },
    2: { label: 'Weak', color: '#ff4444' },
    3: { label: 'Fair', color: '#ffaa00' },
    4: { label: 'Good', color: '#6bad6a' },
    5: { label: 'Strong', color: '#228B22' },
  };
  return {
    strength,
    label: strengthConfig[strength as keyof typeof strengthConfig].label,
    color: strengthConfig[strength as keyof typeof strengthConfig].color,
  };
};

export const isPasswordStrongEnough = (password: string): boolean => {
  return calculatePasswordStrength(password) >= 3;
};
