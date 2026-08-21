export const COLORS = {
  primary: '#2563EB',
  primaryLight: '#38BDF8',
  primaryDark: '#1D4ED8',
  primaryDeep: '#4F46E5',
  primaryMuted: 'rgba(37, 99, 235, 0.12)',
  secondary: '#64748B',
  background: '#FFFFFF',
  surface: '#F8FAFC',
  text: '#0F172A',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  error: '#EF4444',
  success: '#22C55E',
  white: '#FFFFFF',
  whiteMuted: 'rgba(255, 255, 255, 0.72)',
  whiteSoft: 'rgba(255, 255, 255, 0.2)',
  black: '#000000',
} as const;

export const GRADIENTS = {
  primary: [COLORS.primary, COLORS.primaryDark],
  secondary: [COLORS.white, COLORS.surface],
  surface: [COLORS.surface, COLORS.white],
  tabBar: [COLORS.primaryLight, COLORS.primary, COLORS.primaryDeep],
} as const;
