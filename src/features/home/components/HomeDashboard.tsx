import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS, GRADIENTS } from '@/src/constants/colors';
import { HOME_CATEGORIES, HOME_PRODUCTS, HOME_STATS } from '@/src/features/home/data';
import type { HomeProduct } from '@/src/features/home/types';
import { useAuth } from '@/src/features/auth/hooks/useAuth';
import { RADIUS, SPACING } from '@/src/theme';
import { TYPOGRAPHY } from '@/src/theme/typography';
import { formatDate } from '@/src/utils/date';
import { capitalize, formatCurrency } from '@/src/utils/helpers';
import { scale, verticalScale } from '@/src/utils/responsive';

export function HomeDashboard() {
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const { user } = useAuth();
  const greetingName = capitalize(user?.name ?? 'there');

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <StatusBar style={isFocused ? 'light' : 'dark'} />
      <LinearGradient
        colors={GRADIENTS.tabBar}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.hero, { paddingTop: insets.top + SPACING.md }]}>
        <Text style={styles.eyebrow}>{formatDate(new Date())}</Text>
        <Text style={styles.heroTitle}>Hello, {greetingName}</Text>
        <Text style={styles.heroSubtitle}>Discover new arrivals and pick up where you left off.</Text>
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.statsRow}>
          {HOME_STATS.map((stat) => (
            <LinearGradient
              key={stat.id}
              colors={GRADIENTS.surface}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons name={stat.icon} size={scale(16)} color={COLORS.primary} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </LinearGradient>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}>
          {HOME_CATEGORIES.map((category) => (
            <View key={category.id} style={styles.categoryChip}>
              <Ionicons name={category.icon} size={scale(16)} color={COLORS.primary} />
              <Text style={styles.categoryLabel}>{category.label}</Text>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Featured</Text>
        <View style={styles.productList}>
          {HOME_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

function ProductCard({ product }: { product: HomeProduct }) {
  return (
    <LinearGradient
      colors={GRADIENTS.surface}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.productCard}>
      <LinearGradient
        colors={GRADIENTS.tabBar}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.productThumb}>
        <Text style={styles.productThumbLabel}>{product.name.charAt(0)}</Text>
      </LinearGradient>
      <View style={styles.productCopy}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productCategory}>{product.category}</Text>
        <View style={styles.productMeta}>
          <Text style={styles.productPrice}>{formatCurrency(product.price)}</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={scale(12)} color={COLORS.primary} />
            <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingBottom: SPACING.xl,
  },
  hero: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    gap: SPACING.sm,
    overflow: 'hidden',
  },
  body: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    gap: SPACING.md,
  },
  eyebrow: {
    ...TYPOGRAPHY.caption,
    color: COLORS.whiteMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  heroTitle: {
    ...TYPOGRAPHY.h1,
    color: COLORS.white,
  },
  heroSubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.whiteMuted,
  },
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  statCard: {
    flex: 1,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.sm,
    gap: scale(4),
    overflow: 'hidden',
  },
  statIcon: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    backgroundColor: COLORS.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
    marginTop: SPACING.sm,
  },
  categoryRow: {
    gap: SPACING.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    paddingHorizontal: SPACING.md,
    paddingVertical: verticalScale(10),
    borderRadius: RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  categoryLabel: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
  },
  productList: {
    gap: SPACING.sm,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    overflow: 'hidden',
  },
  productThumb: {
    width: scale(56),
    height: scale(56),
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  productThumbLabel: {
    ...TYPOGRAPHY.h3,
    color: COLORS.white,
  },
  productCopy: {
    flex: 1,
    gap: scale(2),
  },
  productName: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
  },
  productCategory: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  productMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: scale(4),
  },
  productPrice: {
    ...TYPOGRAPHY.label,
    color: COLORS.primary,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  ratingText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
});
