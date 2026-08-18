import { Dimensions, PixelRatio, Platform } from 'react-native';

const PHONE_GUIDELINE = { width: 375, height: 812 };
const TABLET_GUIDELINE = { width: 768, height: 1024 };
const TABLET_SHORTEST_SIDE = 600;

function getWindow() {
  return Dimensions.get('window');
}

export function isTablet(): boolean {
  const { width, height } = getWindow();
  const shortestSide = Math.min(width, height);

  if (Platform.OS === 'ios' && Platform.isPad) {
    return true;
  }

  return shortestSide >= TABLET_SHORTEST_SIDE;
}

function getGuideline() {
  return isTablet() ? TABLET_GUIDELINE : PHONE_GUIDELINE;
}

function normalize(value: number): number {
  return PixelRatio.roundToNearestPixel(value);
}

export function horizontalScale(size: number): number {
  const { width } = getWindow();
  return normalize((width / getGuideline().width) * size);
}

export function verticalScale(size: number): number {
  const { height } = getWindow();
  return normalize((height / getGuideline().height) * size);
}

export function scale(size: number, factor?: number): number {
  const scaleFactor = factor ?? (isTablet() ? 0.35 : 0.5);
  return normalize(size + (horizontalScale(size) - size) * scaleFactor);
}

export const horizantalScale = horizontalScale;
