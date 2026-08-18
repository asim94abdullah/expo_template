import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

import { Button } from '@/src/components/Button/Button';
import { COLORS, GRADIENTS } from '@/src/constants/colors';
import { ROUTES } from '@/src/constants/routes';
import { useAuth } from '@/src/features/auth/hooks/useAuth';
import { RADIUS, SPACING } from '@/src/theme';
import { TYPOGRAPHY } from '@/src/theme/typography';
import { scale, verticalScale } from '@/src/utils/responsive';

export default function SettingsScreen() {
  const { signOut, isLoading } = useAuth();

  return (
    <View style={styles.container}>
      <Pressable
        accessibilityRole="button"
        onPress={() => router.push(ROUTES.profile)}
        style={({ pressed }) => [pressed && styles.pressed]}>
        <LinearGradient
          colors={GRADIENTS.surface}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.row}>
          <LinearGradient
            colors={GRADIENTS.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconWrap}>
            <Ionicons name="person" size={scale(18)} color={COLORS.white} />
          </LinearGradient>
          <View style={styles.rowCopy}>
            <Text style={styles.rowTitle}>Profile</Text>
            <Text style={styles.rowSubtitle}>View and manage your account</Text>
          </View>
          <Ionicons name="chevron-forward" size={scale(20)} color={COLORS.textSecondary} />
        </LinearGradient>
      </Pressable>

      <Button title="Sign Out" variant="secondary" loading={isLoading} onPress={() => void signOut()} />
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
  row: {
    minHeight: verticalScale(72),
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    overflow: 'hidden',
  },
  iconWrap: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pressed: {
    opacity: 0.7,
  },
  rowCopy: {
    flex: 1,
    gap: scale(4),
  },
  rowTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
  },
  rowSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
});
