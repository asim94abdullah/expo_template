import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

import { Button } from '@/src/components/Button/Button';
import { EmptyState } from '@/src/components/EmptyState/EmptyState';
import { COLORS, GRADIENTS } from '@/src/constants/colors';
import { CART_ITEMS, CART_SHIPPING } from '@/src/features/cart/data';
import type { CartItem } from '@/src/features/cart/types';
import { RADIUS, SPACING } from '@/src/theme';
import { TYPOGRAPHY } from '@/src/theme/typography';
import { formatCurrency } from '@/src/utils/helpers';
import { scale, verticalScale } from '@/src/utils/responsive';

export function CartView() {
  const [items, setItems] = useState<CartItem[]>(CART_ITEMS);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );
  const total = subtotal + (items.length > 0 ? CART_SHIPPING : 0);

  function updateQuantity(id: string, delta: number) {
    setItems((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  if (items.length === 0) {
    return (
      <View style={styles.screen}>
        <EmptyState
          icon="cart-outline"
          title="Your cart is empty"
          description="Items you add will appear here."
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        {items.map((item) => (
          <LinearGradient
            key={item.id}
            colors={GRADIENTS.surface}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.line}>
            <LinearGradient
              colors={GRADIENTS.tabBar}
              locations={[0, 0.5, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.thumb}>
              <Text style={styles.thumbLabel}>{item.name.charAt(0)}</Text>
            </LinearGradient>
            <View style={styles.lineCopy}>
              <Text style={styles.lineName}>{item.name}</Text>
              <Text style={styles.lineVariant}>{item.variant}</Text>
              <Text style={styles.linePrice}>{formatCurrency(item.price)}</Text>
            </View>
            <View style={styles.stepper}>
              <Pressable
                accessibilityRole="button"
                onPress={() => updateQuantity(item.id, -1)}
                style={styles.stepperButton}>
                <Ionicons name="remove" size={scale(16)} color={COLORS.text} />
              </Pressable>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => updateQuantity(item.id, 1)}
                style={styles.stepperButton}>
                <Ionicons name="add" size={scale(16)} color={COLORS.text} />
              </Pressable>
            </View>
          </LinearGradient>
        ))}

        <LinearGradient
          colors={GRADIENTS.surface}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.summary}>
          <SummaryRow label="Subtotal" value={formatCurrency(subtotal)} />
          <SummaryRow label="Shipping" value={formatCurrency(CART_SHIPPING)} />
          <View style={styles.summaryDivider} />
          <SummaryRow label="Total" value={formatCurrency(total)} emphasized />
        </LinearGradient>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Checkout"
          onPress={() => Alert.alert('Checkout', 'Dummy checkout — connect a payments flow later.')}
        />
      </View>
    </View>
  );
}

function SummaryRow({
  label,
  value,
  emphasized = false,
}: {
  label: string;
  value: string;
  emphasized?: boolean;
}) {
  return (
    <View style={styles.summaryRow}>
      <Text style={[styles.summaryLabel, emphasized && styles.summaryStrong]}>{label}</Text>
      <Text style={[styles.summaryValue, emphasized && styles.summaryStrong]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
    gap: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    overflow: 'hidden',
  },
  thumb: {
    width: scale(56),
    height: scale(56),
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  thumbLabel: {
    ...TYPOGRAPHY.h3,
    color: COLORS.white,
  },
  lineCopy: {
    flex: 1,
    gap: scale(2),
  },
  lineName: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
  },
  lineVariant: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  linePrice: {
    ...TYPOGRAPHY.label,
    color: COLORS.primary,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  stepperButton: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
    minWidth: scale(16),
    textAlign: 'center',
  },
  summary: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    gap: SPACING.sm,
    overflow: 'hidden',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
  },
  summaryStrong: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text,
  },
  summaryDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: COLORS.border,
    marginVertical: scale(4),
  },
  footer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: verticalScale(16),
    paddingTop: SPACING.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
});
