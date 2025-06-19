import { StyleSheet } from 'react-native';
import { COLORS, CUSTOM_BRAND_COLORS } from './colors';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOM_BRAND_COLORS.majorBackground,
  },
  
  card: {
    backgroundColor: CUSTOM_BRAND_COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: CUSTOM_BRAND_COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  subCard: {
    backgroundColor: CUSTOM_BRAND_COLORS.cardBackground,
    borderRadius: 8,
    padding: 12,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#4A525C',
  },
  
  componentBackground: {
    backgroundColor: CUSTOM_BRAND_COLORS.cardBackground,
    borderRadius: 8,
    padding: 8,
  },
});

export const textStyles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: CUSTOM_BRAND_COLORS.accent,
    marginBottom: 8,
  },
  
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: CUSTOM_BRAND_COLORS.accent,
    marginBottom: 6,
  },
  
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: CUSTOM_BRAND_COLORS.accent,
    marginBottom: 12,
  },
  
  body: {
    fontSize: 16,
    color: CUSTOM_BRAND_COLORS.text,
    lineHeight: 24,
  },
  
  bodySecondary: {
    fontSize: 14,
    color: '#B8B8B8',
    lineHeight: 20,
  },
  
  caption: {
    fontSize: 12,
    color: '#B8B8B8',
    lineHeight: 16,
  },
  
  notification: {
    fontSize: 16,
    fontWeight: '600',
    color: CUSTOM_BRAND_COLORS.accent,
  },
  
  warning: {
    fontSize: 16,
    fontWeight: '600',
    color: CUSTOM_BRAND_COLORS.warning,
  },
  
  alert: {
    fontSize: 14,
    fontWeight: '500',
    color: CUSTOM_BRAND_COLORS.warning,
  },
});

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: CUSTOM_BRAND_COLORS.accent,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  primaryText: {
    color: CUSTOM_BRAND_COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  
  secondary: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: CUSTOM_BRAND_COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  secondaryText: {
    color: CUSTOM_BRAND_COLORS.accent,
    fontSize: 16,
    fontWeight: '600',
  },
  
  warning: {
    backgroundColor: CUSTOM_BRAND_COLORS.warning,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  warningText: {
    color: CUSTOM_BRAND_COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export const inputStyles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: CUSTOM_BRAND_COLORS.text,
    marginBottom: 4,
  },
  
  input: {
    backgroundColor: CUSTOM_BRAND_COLORS.cardBackground,
    borderWidth: 1,
    borderColor: '#4A525C',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: CUSTOM_BRAND_COLORS.text,
  },
  
  inputFocused: {
    borderColor: CUSTOM_BRAND_COLORS.accent,
    borderWidth: 2,
  },
  
  inputError: {
    borderColor: CUSTOM_BRAND_COLORS.warning,
    borderWidth: 2,
  },
});

export const iconStyles = StyleSheet.create({
  small: {
    width: 16,
    height: 16,
    tintColor: CUSTOM_BRAND_COLORS.text,
  },
  
  medium: {
    width: 24,
    height: 24,
    tintColor: CUSTOM_BRAND_COLORS.text,
  },
  
  large: {
    width: 32,
    height: 32,
    tintColor: CUSTOM_BRAND_COLORS.text,
  },
  
  accent: {
    tintColor: CUSTOM_BRAND_COLORS.accent,
  },
  
  warning: {
    tintColor: CUSTOM_BRAND_COLORS.warning,
  },
});

export const layoutStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  column: {
    flexDirection: 'column',
  },
  
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  padding: {
    padding: 16,
  },
  
  paddingHorizontal: {
    paddingHorizontal: 16,
  },
  
  paddingVertical: {
    paddingVertical: 16,
  },
  
  margin: {
    margin: 16,
  },
  
  marginHorizontal: {
    marginHorizontal: 16,
  },
  
  marginVertical: {
    marginVertical: 16,
  },
});

export const shadowStyles = StyleSheet.create({
  small: {
    shadowColor: CUSTOM_BRAND_COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  
  medium: {
    shadowColor: CUSTOM_BRAND_COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  large: {
    shadowColor: CUSTOM_BRAND_COLORS.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export const graphStyles = StyleSheet.create({
  container: {
    backgroundColor: CUSTOM_BRAND_COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: CUSTOM_BRAND_COLORS.accent,
    marginBottom: 12,
    textAlign: 'center',
  },
  
  accent: {
    color: CUSTOM_BRAND_COLORS.accent,
  },
  
  text: {
    color: CUSTOM_BRAND_COLORS.text,
  },
});

export { COLORS, CUSTOM_BRAND_COLORS };