import { LinearGradient } from 'expo-linear-gradient';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { COLORS, GRADIENTS } from '@/src/constants/colors';
import { RADIUS, SPACING } from '@/src/theme';
import { TYPOGRAPHY } from '@/src/theme/typography';
import { verticalScale } from '@/src/utils/responsive';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = Omit<PressableProps, 'style'> & {
  title: string;
  loading?: boolean;
  variant?: ButtonVariant;
  style?: StyleProp<ViewStyle>;
};

const variantConfig = {
  primary: {
    gradient: GRADIENTS.primary,
    text: COLORS.white,
    showBorder: false,
  },
  secondary: {
    gradient: GRADIENTS.secondary,
    text: COLORS.text,
    showBorder: true,
  },
  ghost: {
    gradient: null,
    text: COLORS.primary,
    showBorder: false,
  },
} as const;

export function Button({
  title,
  loading = false,
  variant = 'primary',
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const config = variantConfig[variant];

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        config.showBorder && styles.secondaryBorder,
        { opacity: pressed || isDisabled ? 0.75 : 1 },
        style,
      ]}
      {...rest}>
      {config.gradient ? (
        <LinearGradient
          colors={config.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      {loading ? (
        <ActivityIndicator color={config.text} />
      ) : (
        <Text style={[styles.title, { color: config.text }]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: verticalScale(52),
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    overflow: 'hidden',
  },
  secondaryBorder: {
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    ...TYPOGRAPHY.button,
  },
});
