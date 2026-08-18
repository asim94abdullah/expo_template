import type { TextStyle } from "react-native";

import { scale, verticalScale } from "@/src/utils/responsive";

export const TYPOGRAPHY = {
  h1: {
    fontSize: scale(32),
    fontWeight: "700",
    lineHeight: verticalScale(40),
  },
  h2: {
    fontSize: scale(24),
    fontWeight: "700",
    lineHeight: verticalScale(32),
  },
  h3: {
    fontSize: scale(20),
    fontWeight: "600",
    lineHeight: verticalScale(28),
  },
  body: {
    fontSize: scale(16),
    fontWeight: "400",
    lineHeight: verticalScale(24),
  },
  label: {
    fontSize: scale(14),
    fontWeight: "600",
    lineHeight: verticalScale(20),
  },
  caption: {
    fontSize: scale(13),
    fontWeight: "400",
    lineHeight: verticalScale(18),
  },
  button: {
    fontSize: scale(16),
    fontWeight: "600",
    lineHeight: verticalScale(24),
  },
} as const satisfies Record<string, TextStyle>;
