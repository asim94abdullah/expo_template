import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { Button } from '@/src/components/Button/Button';
import { COLORS } from '@/src/constants/colors';
import { SPACING } from '@/src/theme';
import { TYPOGRAPHY } from '@/src/theme/typography';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal</Text>
      <Text style={styles.body}>This is a root-level modal route.</Text>
      <Button title="Close" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    justifyContent: 'center',
    gap: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
  },
  body: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
});
