import type { SettingsGroup } from '@/src/features/settings/types';

export const SETTINGS_GROUPS: SettingsGroup[] = [
  {
    id: 'account',
    title: 'Account',
    items: [
      {
        id: 'profile',
        title: 'Profile',
        subtitle: 'Name, email, and photo',
        icon: 'person-outline',
        route: '/profile',
      },
      {
        id: 'addresses',
        title: 'Addresses',
        subtitle: '2 saved delivery locations',
        icon: 'location-outline',
      },
      {
        id: 'payments',
        title: 'Payment methods',
        subtitle: 'Visa ending in 4242',
        icon: 'card-outline',
      },
    ],
  },
  {
    id: 'preferences',
    title: 'Preferences',
    items: [
      {
        id: 'notifications',
        title: 'Notifications',
        subtitle: 'Order updates and offers',
        icon: 'notifications-outline',
        toggle: true,
      },
      {
        id: 'language',
        title: 'Language',
        subtitle: 'English (US)',
        icon: 'language-outline',
      },
    ],
  },
  {
    id: 'support',
    title: 'Support',
    items: [
      {
        id: 'help',
        title: 'Help center',
        subtitle: 'FAQs and contact support',
        icon: 'help-circle-outline',
      },
      {
        id: 'privacy',
        title: 'Privacy policy',
        subtitle: 'How we handle your data',
        icon: 'shield-checkmark-outline',
      },
    ],
  },
];
