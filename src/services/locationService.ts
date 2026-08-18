export type Coordinates = {
  latitude: number;
  longitude: number;
};

export const locationService = {
  async requestPermissions(): Promise<boolean> {
    return false;
  },

  async getCurrentPosition(): Promise<Coordinates | null> {
    // Wire this to expo-location when device location is needed.
    return null;
  },
};
