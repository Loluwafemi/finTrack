import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { Icon } from "@roninoss/icons";
import { useRouter } from "expo-router";
import { COLORS } from "../../theme/colors";
import { useColorScheme } from "../../lib/useColorScheme";
import { cn } from "../../lib/cn";

interface TopNavProps {
  title?: string;
  showBackButton?: boolean;
  showMenuButton?: boolean;
  onBackPress?: () => void;
  onMenuPress?: () => void;
  rightComponent?: React.ReactNode;
}

export function TopNav({
  title = "Coming Soon",
  showBackButton = false,
  showMenuButton = false,
  onBackPress,
  onMenuPress,
  rightComponent,
}: TopNavProps) {
  const { isDarkColorScheme } = useColorScheme();
  const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;
  const router = useRouter();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View
      className="flex-row items-center justify-between px-4 py-3 border-b"
      style={{
        backgroundColor: currentColors.background,
        borderBottomColor: currentColors.border,
      }}
    >
      {/* Left side */}
      <View className="flex-row items-center">
        {showBackButton && (
          <TouchableOpacity
            onPress={handleBackPress}
            className="p-2 rounded-lg mr-2"
            style={{ backgroundColor: currentColors.grey3 }}
          >
            <Icon
              name="arrow-left"
              size={20}
              color={currentColors.foreground}
            />
          </TouchableOpacity>
        )}

        {showMenuButton && (
          <TouchableOpacity
            onPress={onMenuPress}
            className="p-2 rounded-lg mr-2"
            style={{ backgroundColor: currentColors.grey3 }}
          >
            <Icon name="web" size={20} color={currentColors.foreground} />
          </TouchableOpacity>
        )}
      </View>

      {/* Center - Title */}
      <Text
        className="text-lg font-semibold flex-1 text-center"
        style={{ color: currentColors.foreground }}
      >
        {title}
      </Text>

      {/* Right side */}
      <View className="flex-row items-center">
        {rightComponent || <View style={{ width: 40 }} />}
      </View>
    </View>
  );
}

// Notification Badge Component
export function NotificationBadge({ count }: { count: number }) {
  const { isDarkColorScheme } = useColorScheme();
  const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;

  if (count === 0) return null;

  return (
    <View
      className="absolute -top-1 -right-1 rounded-full min-w-5 h-5 items-center justify-center"
      style={{ backgroundColor: "#ef4444" }}
    >
      <Text className="text-xs font-bold" style={{ color: COLORS.white }}>
        {count > 99 ? "99+" : count.toString()}
      </Text>
    </View>
  );
}

// Search Bar Component
export function SearchBar({
  placeholder = "Search...",
  onSearch,
  value,
  onChangeText,
}: {
  placeholder?: string;
  onSearch?: (text: string) => void;
  value?: string;
  onChangeText?: (text: string) => void;
}) {
  const { isDarkColorScheme } = useColorScheme();
  const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;

  return (
    <View
      className="flex-row items-center px-3 py-2 rounded-lg mx-4 my-2"
      style={{
        backgroundColor: currentColors.grey3,
        borderWidth: 1,
        borderColor: currentColors.border,
      }}
    >
      <Icon name="magnify" size={20} color={currentColors.foreground} />
      <Text
        className="flex-1 ml-2 text-base"
        style={{ color: currentColors.textSecondary }}
      >
        {placeholder}
      </Text>
    </View>
  );
}

// Action Button Component
export function ActionButton({
  icon,
  onPress,
  color,
  size = 20,
}: {
  icon: string;
  onPress: () => void;
  color?: string;
  size?: number;
}) {
  const { isDarkColorScheme } = useColorScheme();
  const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;

  return (
    <TouchableOpacity
      onPress={onPress}
      className="p-2 rounded-lg"
      style={{ backgroundColor: currentColors.grey3 }}
    >
      <Icon
        name={icon as any}
        size={size}
        color={color || currentColors.foreground}
      />
    </TouchableOpacity>
  );
}

// Breadcrumb Component
export function Breadcrumb({ items }: { items: string[] }) {
  const { isDarkColorScheme } = useColorScheme();
  const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;

  return (
    <View className="flex-row items-center px-4 py-2">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Text
            className="text-sm"
            style={{
              color:
                index === items.length - 1
                  ? currentColors.foreground
                  : currentColors.textSecondary,
              fontWeight: index === items.length - 1 ? "600" : "400",
            }}
          >
            {item}
          </Text>
          {index < items.length - 1 && (
            <View style={{ marginHorizontal: 8 }}>
              <Icon
                name="chevron-right"
                size={16}
                color={currentColors.textSecondary}
              />
            </View>
          )}
        </React.Fragment>
      ))}
    </View>
  );
}
