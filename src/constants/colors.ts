export const COLORS = {
  primary: '#2563EB',
  primaryDark: '#1D4ED8',
  secondary: '#64748B',
  background: '#FFFFFF',
  surface: '#F8FAFC',
  text: '#0F172A',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  error: '#EF4444',
  success: '#22C55E',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export const GRADIENTS = {
  primary: [COLORS.primary, COLORS.primaryDark],
  secondary: [COLORS.white, COLORS.surface],
  surface: [COLORS.surface, COLORS.white],
} as const;
