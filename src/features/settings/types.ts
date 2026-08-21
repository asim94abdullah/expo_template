import Ionicons from '@expo/vector-icons/Ionicons';

export type SettingsIcon = keyof typeof Ionicons.glyphMap;

export type SettingsItem = {
  id: string;
  title: string;
  subtitle: string;
  icon: SettingsIcon;
  route?: '/profile';
  toggle?: boolean;
};

export type SettingsGroup = {
  id: string;
  title: string;
  items: SettingsItem[];
};
