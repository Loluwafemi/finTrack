import React from "react";
import { TextInput, View } from "react-native";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * Reusable SearchInput component for consistent search UX across screens.
 * - Optimized for accessibility and mobile responsiveness.
 *
 * Responsive breakpoints: mobile <640px, tablet 640–1024px, desktop >1024px
 */
export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = "Search...",
  className = "w-full px-4 py-3 border border-gray-200 rounded-md bg-gray-50 text-sm "
}) => (
  <View className="flex-1">
    <TextInput
      placeholder={placeholder}
      className={className}
      value={value}
      onChangeText={onChangeText}
      autoCapitalize="none"
      autoCorrect={false}
      accessibilityLabel={placeholder}
      accessible
      returnKeyType="search"
      clearButtonMode="while-editing"
    />
  </View>
);