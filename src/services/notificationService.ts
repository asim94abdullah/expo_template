type LocalNotification = {
  title: string;
  body: string;
};

export const notificationService = {
  async requestPermissions(): Promise<boolean> {
    return false;
  },

  async scheduleLocalNotification(_notification: LocalNotification): Promise<void> {
    // Wire this to expo-notifications when push/local notifications are needed.
  },
};
