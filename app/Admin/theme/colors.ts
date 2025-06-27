export const CUSTOM_BRAND_COLORS = {
  primary: '#3b82f6',
  secondary: '#64748b',
  accent: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4',
};

export const COLORS = {
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
  
  light: {
    primary: CUSTOM_BRAND_COLORS.primary,
    background: '#ffffff',
    foreground: '#0f172a',
    card: '#ffffff',
    cardForeground: '#0f172a',
    popover: '#ffffff',
    popoverForeground: '#0f172a',
    secondary: '#f1f5f9',
    secondaryForeground: '#0f172a',
    muted: '#f1f5f9',
    mutedForeground: '#64748b',
    accent: '#f1f5f9',
    accentForeground: '#0f172a',
    destructive: '#ef4444',
    destructiveForeground: '#f8fafc',
    border: '#e2e8f0',
    input: '#e2e8f0',
    ring: CUSTOM_BRAND_COLORS.primary,
    textSecondary: '#64748b',
    grey3: '#f8fafc',
  },
  
  dark: {
    primary: '#60a5fa',
    background: '#0f172a',
    foreground: '#f8fafc',
    card: '#1e293b',
    cardForeground: '#f8fafc',
    popover: '#1e293b',
    popoverForeground: '#f8fafc',
    secondary: '#1e293b',
    secondaryForeground: '#f8fafc',
    muted: '#1e293b',
    mutedForeground: '#94a3b8',
    accent: '#1e293b',
    accentForeground: '#f8fafc',
    destructive: '#dc2626',
    destructiveForeground: '#f8fafc',
    border: '#334155',
    input: '#334155',
    ring: '#94a3b8',
    textSecondary: '#94a3b8',
    grey3: '#334155',
  },
};

export function hexToRgba(hex: string, alpha: number = 1): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}