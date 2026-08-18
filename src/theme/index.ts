import { COLORS } from '@/src/constants/colors';
import { TYPOGRAPHY } from '@/src/theme/typography';
import { horizontalScale, scale, verticalScale } from '@/src/utils/responsive';

export const SPACING = {
  xs: scale(4),
  sm: scale(8),
  md: horizontalScale(16),
  lg: horizontalScale(24),
  xl: verticalScale(32),
} as const;

export const RADIUS = {
  sm: scale(8),
  md: scale(12),
  lg: scale(16),
  full: 999,
} as const;

export const THEME = {
  colors: COLORS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  radius: RADIUS,
} as const;

export { COLORS, GRADIENTS } from '@/src/constants/colors';
export { TYPOGRAPHY } from '@/src/theme/typography';
