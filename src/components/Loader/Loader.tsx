import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { COLORS } from '@/src/constants/colors';
import { SPACING } from '@/src/theme';

type LoaderProps = {
  fullScreen?: boolean;
};

export function Loader({ fullScreen = false }: LoaderProps) {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
