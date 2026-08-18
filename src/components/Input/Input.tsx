import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS, GRADIENTS } from '@/src/constants/colors';
import { RADIUS, SPACING } from '@/src/theme';
import { TYPOGRAPHY } from '@/src/theme/typography';
import { scale, verticalScale } from '@/src/utils/responsive';

type InputProps = TextInputProps & {
  label: string;
  error?: string;
};

export function Input({
  label,
  error,
  secureTextEntry,
  style,
  ...rest
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = Boolean(secureTextEntry);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <LinearGradient
        colors={GRADIENTS.surface}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.field, error ? styles.fieldError : null]}>
        <TextInput
          placeholderTextColor={COLORS.textSecondary}
          secureTextEntry={isPassword && !isPasswordVisible}
          style={[styles.input, style]}
          {...rest}
        />
        {isPassword ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => setIsPasswordVisible((visible) => !visible)}
            hitSlop={scale(8)}>
            <Ionicons
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={scale(20)}
              color={COLORS.textSecondary}
            />
          </Pressable>
        ) : null}
      </LinearGradient>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.xs,
  },
  label: {
    ...TYPOGRAPHY.label,
    color: COLORS.text,
  },
  field: {
    minHeight: verticalScale(52),
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    overflow: 'hidden',
  },
  fieldError: {
    borderColor: COLORS.error,
  },
  input: {
    flex: 1,
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    paddingVertical: SPACING.sm,
  },
  error: {
    ...TYPOGRAPHY.caption,
    color: COLORS.error,
  },
});
