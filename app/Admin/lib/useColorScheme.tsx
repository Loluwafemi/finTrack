import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import { StatusBar } from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import { Platform } from 'react-native';
import { useEffect } from 'react';

const LIGHT_THEME = {
  light: true,
  dark: false,
  colors: {
    primary: '#3b82f6',
    background: '#ffffff',
    card: '#ffffff',
    text: '#000000',
    border: '#e5e7eb',
    notification: '#ff3b30',
    foreground: '#000000',
    textSecondary: '#6b7280',
    accent: '#3b82f6',
    destructive: '#ef4444',
    grey3: '#f3f4f6',
  },
};

const DARK_THEME = {
  light: false,
  dark: true,
  colors: {
    primary: '#60a5fa',
    background: '#000000',
    card: '#1f2937',
    text: '#ffffff',
    border: '#374151',
    notification: '#ff453a',
    foreground: '#ffffff',
    textSecondary: '#9ca3af',
    accent: '#60a5fa',
    destructive: '#f87171',
    grey3: '#374151',
  },
};

export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useNativewindColorScheme();
  
  return {
    colorScheme: colorScheme ?? 'dark',
    isDarkColorScheme: colorScheme === 'dark',
    setColorScheme,
    toggleColorScheme,
    colors: colorScheme === 'dark' ? DARK_THEME.colors : LIGHT_THEME.colors,
  };
}

export function useInitialAndroidBarSync() {
  const { colorScheme } = useColorScheme();
  
  useEffect(() => {
    if (Platform.OS === 'android') {
      // Set navigation bar style based on theme
      NavigationBar.setBackgroundColorAsync(
        colorScheme === 'dark' ? '#000000' : '#ffffff'
      );
    }
  }, [colorScheme]);
}