import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { StyleSheet, Text, View, type ColorValue } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS, GRADIENTS } from '@/src/constants/colors';
import { RADIUS, SPACING } from '@/src/theme';
import { TYPOGRAPHY } from '@/src/theme/typography';
import { scale, verticalScale } from '@/src/utils/responsive';

type IoniconName = keyof typeof Ionicons.glyphMap;

type TabIconProps = {
  focused: boolean;
  color: ColorValue;
  icon: IoniconName;
  activeIcon: IoniconName;
};

function TabIcon({ focused, color, icon, activeIcon }: TabIconProps) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapFocused]}>
      <Ionicons name={focused ? activeIcon : icon} size={scale(22)} color={color} />
    </View>
  );
}

type TabLabelProps = {
  focused: boolean;
  color: ColorValue;
  label: string;
};

function TabLabel({ focused, color, label }: TabLabelProps) {
  return (
    <Text
      style={[
        styles.label,
        { color, fontWeight: focused ? '700' : '500' },
      ]}>
      {label}
    </Text>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: COLORS.background },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          ...TYPOGRAPHY.h3,
          color: COLORS.text,
        },
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.whiteMuted,
        tabBarHideOnKeyboard: true,
        tabBarBackground: () => (
          <LinearGradient
            colors={GRADIENTS.tabBar}
            locations={[0, 0.5, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        ),
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          height: verticalScale(64) + insets.bottom,
          paddingTop: scale(6),
          paddingBottom: Math.max(insets.bottom, scale(8)),
          paddingHorizontal: SPACING.sm,
          shadowColor: COLORS.primaryDeep,
          shadowOffset: { width: 0, height: -scale(6) },
          shadowOpacity: 0.28,
          shadowRadius: scale(12),
          elevation: 16,
        },
        tabBarItemStyle: {
          paddingVertical: scale(2),
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarLabel: ({ focused, color }) => (
            <TabLabel focused={focused} color={color} label="Home" />
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused} color={color} icon="home-outline" activeIcon="home" />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarLabel: ({ focused, color }) => (
            <TabLabel focused={focused} color={color} label="Cart" />
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused} color={color} icon="cart-outline" activeIcon="cart" />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarLabel: ({ focused, color }) => (
            <TabLabel focused={focused} color={color} label="Settings" />
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              focused={focused}
              color={color}
              icon="settings-outline"
              activeIcon="settings"
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: {
    width: scale(52),
    height: scale(32),
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapFocused: {
    backgroundColor: COLORS.whiteSoft,
  },
  label: {
    fontSize: scale(11),
    lineHeight: verticalScale(14),
    letterSpacing: 0.2,
    marginTop: scale(2),
  },
});
