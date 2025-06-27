import { Theme, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { COLORS } from './colors';

const NAV_THEME: { light: Theme; dark: Theme } = {
  light: {
    dark: false,
    colors: {
      background: COLORS.light.background,
      border: COLORS.light.border,
      card: COLORS.light.card,
      notification: COLORS.light.notification,
      primary: COLORS.light.primary,
      text: COLORS.light.text,
    },
    fonts: DefaultTheme.fonts,
  },
  dark: {
    dark: true,
    colors: {
      background: COLORS.dark.background,
      border: COLORS.dark.border,
      card: COLORS.dark.card,
      notification: COLORS.dark.notification,
      primary: COLORS.dark.primary,
      text: COLORS.dark.text,
    },
    fonts: DarkTheme.fonts,
  },
};

// Export colors and types
export { COLORS, CUSTOM_BRAND_COLORS } from './colors';
export type { ColorScheme, BrandColors } from './colors';

// Export all styling utilities
export {
  globalStyles,
  textStyles,
  buttonStyles,
  inputStyles,
  iconStyles,
  layoutStyles,
  shadowStyles,
  graphStyles,
} from './styles';

// Export navigation theme
export { NAV_THEME };

// Usage examples:
// import { CUSTOM_BRAND_COLORS, globalStyles, textStyles } from '../theme';
// import { COLORS, NAV_THEME } from '../theme';
