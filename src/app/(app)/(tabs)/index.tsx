import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS, GRADIENTS } from '@/src/constants/colors';
import { useAuth } from '@/src/features/auth/hooks/useAuth';
import { RADIUS, SPACING } from '@/src/theme';
import { TYPOGRAPHY } from '@/src/theme/typography';
import { capitalize } from '@/src/utils/helpers';
import { horizontalScale } from '@/src/utils/responsive';

export default function HomeScreen() {
  const { user } = useAuth();
  const greetingName = capitalize(user?.name ?? 'there');

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={GRADIENTS.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.hero}>
        <Text style={styles.eyebrow}>Welcome back</Text>
        <Text style={styles.title}>{greetingName}</Text>
        <Text style={styles.subtitle}>
          Your storefront is ready. Browse products, manage your cart, and keep your account up to date.
        </Text>
      </LinearGradient>

      <LinearGradient
        colors={GRADIENTS.surface}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}>
        <Text style={styles.cardTitle}>Getting started</Text>
        <Text style={styles.cardBody}>
          Use the tabs below to move between Home, Cart, and Settings. Profile lives one level above the tab bar.
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    gap: SPACING.lg,
  },
  hero: {
    gap: SPACING.sm,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    overflow: 'hidden',
  },
  eyebrow: {
    ...TYPOGRAPHY.caption,
    color: COLORS.white,
    textTransform: 'uppercase',
    letterSpacing: horizontalScale(0.6),
    opacity: 0.85,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.white,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.white,
    opacity: 0.9,
  },
  card: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    gap: SPACING.sm,
    overflow: 'hidden',
  },
  cardTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
  },
  cardBody: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
});
