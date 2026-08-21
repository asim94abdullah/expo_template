import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

import { Button } from '@/src/components/Button/Button';
import { COLORS, GRADIENTS } from '@/src/constants/colors';
import { ROUTES } from '@/src/constants/routes';
import { useAuth } from '@/src/features/auth/hooks/useAuth';
import { SETTINGS_GROUPS } from '@/src/features/settings/data';
import type { SettingsItem } from '@/src/features/settings/types';
import { RADIUS, SPACING } from '@/src/theme';
import { TYPOGRAPHY } from '@/src/theme/typography';
import { scale, verticalScale } from '@/src/utils/responsive';

export function SettingsView() {
  const { user, signOut, isLoading } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  function handleItemPress(item: SettingsItem) {
    if (item.toggle) {
      return;
    }

    if (item.route) {
      router.push(item.route);
      return;
    }

    Alert.alert(item.title, 'This is dummy settings data for the template.');
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={GRADIENTS.tabBar}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarLabel}>{(user?.name ?? 'U').charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.profileCopy}>
          <Text style={styles.profileName}>{user?.name ?? 'Guest'}</Text>
          <Text style={styles.profileEmail}>{user?.email ?? 'you@example.com'}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          onPress={() => router.push(ROUTES.profile)}
          hitSlop={scale(8)}>
          <Ionicons name="chevron-forward" size={scale(20)} color={COLORS.white} />
        </Pressable>
      </LinearGradient>

      {SETTINGS_GROUPS.map((group) => (
        <View key={group.id} style={styles.group}>
          <Text style={styles.groupTitle}>{group.title}</Text>
          <LinearGradient
            colors={GRADIENTS.surface}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.groupCard}>
            {group.items.map((item, index) => (
              <Pressable
                key={item.id}
                accessibilityRole="button"
                onPress={() => handleItemPress(item)}
                style={({ pressed }) => [
                  styles.row,
                  index < group.items.length - 1 && styles.rowDivider,
                  pressed && !item.toggle && styles.pressed,
                ]}>
                <LinearGradient
                  colors={GRADIENTS.primary}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.iconWrap}>
                  <Ionicons name={item.icon} size={scale(16)} color={COLORS.white} />
                </LinearGradient>
                <View style={styles.rowCopy}>
                  <Text style={styles.rowTitle}>{item.title}</Text>
                  <Text style={styles.rowSubtitle}>{item.subtitle}</Text>
                </View>
                {item.toggle ? (
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    trackColor={{ false: COLORS.border, true: COLORS.primary }}
                    thumbColor={COLORS.white}
                  />
                ) : (
                  <Ionicons name="chevron-forward" size={scale(18)} color={COLORS.textSecondary} />
                )}
              </Pressable>
            ))}
          </LinearGradient>
        </View>
      ))}

      <Button title="Sign Out" variant="secondary" loading={isLoading} onPress={() => void signOut()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
    gap: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    overflow: 'hidden',
  },
  avatar: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: COLORS.whiteSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLabel: {
    ...TYPOGRAPHY.h3,
    color: COLORS.white,
  },
  profileCopy: {
    flex: 1,
    gap: scale(2),
  },
  profileName: {
    ...TYPOGRAPHY.h3,
    color: COLORS.white,
  },
  profileEmail: {
    ...TYPOGRAPHY.caption,
    color: COLORS.whiteMuted,
  },
  group: {
    gap: SPACING.sm,
  },
  groupTitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  groupCard: {
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  row: {
    minHeight: verticalScale(68),
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.border,
  },
  pressed: {
    opacity: 0.7,
  },
  iconWrap: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  rowCopy: {
    flex: 1,
    gap: scale(2),
  },
  rowTitle: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
  },
  rowSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
});
