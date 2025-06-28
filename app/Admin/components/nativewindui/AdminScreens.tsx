import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useColorScheme } from "../../lib/useColorScheme";
import { COLORS } from "../../theme/colors";

// Reports Screen Component
export function ReportsScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;

  return (
    <ScrollView
      className="flex-1 px-4 py-2"
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="mb-6">
        <Text
          className="text-2xl font-bold tracking-tight mb-2"
          style={{ color: currentColors.foreground }}
        >
          Reports & Analytics
        </Text>
        <Text
          className="text-sm"
          style={{ color: currentColors.textSecondary }}
        >
          Generate and view comprehensive system reports
        </Text>
      </View>

      {/* Coming Soon Content */}
      <View className="flex-1 justify-center items-center px-4 py-20">
        <Text
          className="text-4xl font-bold tracking-tight text-center mb-4"
          style={{ color: currentColors.foreground }}
        >
          Coming Soon
        </Text>
        <Text
          className="text-lg text-center opacity-70"
          style={{ color: currentColors.textSecondary }}
        >
          Reports and analytics features are under development
        </Text>
      </View>

      {/* Quick Stats */}
      <View className="mb-6">
        <Text
          className="text-base font-semibold mb-3"
          style={{ color: currentColors.foreground }}
        >
          Quick Overview
        </Text>
      </View>
    </ScrollView>
  );
}

// System Settings Screen Component
export function SystemSettingsScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1 px-4 py-2"
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="mb-6">
        <Text
          className="text-2xl font-bold tracking-tight mb-2"
          style={{ color: currentColors.foreground }}
        >
          System Settings
        </Text>
        <Text
          className="text-sm"
          style={{ color: currentColors.textSecondary }}
        >
          Configure system-wide settings and preferences
        </Text>
      </View>

      {/* Coming Soon Content */}
      <View className="flex-1 justify-center items-center px-4 py-20">
        <Text
          className="text-4xl font-bold tracking-tight text-center mb-4"
          style={{ color: currentColors.foreground }}
        >
          Coming Soon
        </Text>
        <Text
          className="text-lg text-center opacity-70"
          style={{ color: currentColors.textSecondary }}
        >
          System settings and configuration features are under development
        </Text>
      </View>
    </ScrollView>
  );
}
