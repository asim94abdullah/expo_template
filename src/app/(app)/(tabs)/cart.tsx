import { StyleSheet, View } from 'react-native';

import { EmptyState } from '@/src/components/EmptyState/EmptyState';
import { COLORS } from '@/src/constants/colors';

export default function CartScreen() {
  return (
    <View style={styles.container}>
      <EmptyState
        icon="cart-outline"
        title="Your cart is empty"
        description="Items you add will appear here."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
