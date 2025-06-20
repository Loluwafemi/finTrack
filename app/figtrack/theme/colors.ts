import { Platform } from 'react-native';

const CUSTOM_BRAND_COLORS = {
  cardBackground: '#222831',
  majorBackground: '#393E46', 
  accent: '#00ADB5',
  text: '#EEEEEE',
  warning: '#CF0F47',
  success: '#10B981',
  white: '#FFFFFF',
  black: '#000000',
} as const;

const FIGTRACK_COLORS = {
  white: CUSTOM_BRAND_COLORS.white,
  black: CUSTOM_BRAND_COLORS.black,
  light: {
    grey6: CUSTOM_BRAND_COLORS.cardBackground,
    grey5: '#2A2F36',
    grey4: '#343A42',
    grey3: '#3E454E',
    grey2: '#4A525C',
    grey: '#565E68',
    background: CUSTOM_BRAND_COLORS.majorBackground,
    foreground: CUSTOM_BRAND_COLORS.text,
    root: CUSTOM_BRAND_COLORS.majorBackground,
    card: CUSTOM_BRAND_COLORS.cardBackground,
    destructive: CUSTOM_BRAND_COLORS.warning,
    success: CUSTOM_BRAND_COLORS.success,
    primary: CUSTOM_BRAND_COLORS.accent,
    accent: CUSTOM_BRAND_COLORS.accent,
    text: CUSTOM_BRAND_COLORS.text,
    textSecondary: '#B8B8B8',
    border: '#4A525C',
    notification: CUSTOM_BRAND_COLORS.accent,
  },
  dark: {
    grey6: CUSTOM_BRAND_COLORS.cardBackground,
    grey5: '#1A1E24',
    grey4: '#2A2F36',
    grey3: '#343A42',
    grey2: '#3E454E',
    grey: '#4A525C',
    background: '#1A1E24',
    foreground: CUSTOM_BRAND_COLORS.text,
    root: '#1A1E24',
    card: CUSTOM_BRAND_COLORS.cardBackground,
    destructive: CUSTOM_BRAND_COLORS.warning,
    success: CUSTOM_BRAND_COLORS.success,
    primary: CUSTOM_BRAND_COLORS.accent,
    accent: CUSTOM_BRAND_COLORS.accent,
    text: CUSTOM_BRAND_COLORS.text,
    textSecondary: '#B8B8B8',
    border: '#4A525C',
    notification: CUSTOM_BRAND_COLORS.accent,
  },
} as const;

const COLORS = FIGTRACK_COLORS;

export { COLORS, CUSTOM_BRAND_COLORS };
export type ColorScheme = typeof FIGTRACK_COLORS;
export type BrandColors = typeof CUSTOM_BRAND_COLORS;
