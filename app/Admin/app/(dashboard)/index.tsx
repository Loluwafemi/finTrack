import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useColorScheme } from "../../lib/useColorScheme";
import { COLORS } from "../../theme/colors";

/**
 * Dashboard Index Screen
 *
 * This is the main entry point for the admin dashboard.
 * Currently showing "Coming Soon" message while preserving the original styling and layout.
 *
 * The screen is fully responsive and adapts to both light and dark themes.
 */
export default function DashboardIndex() {
  const { isDarkColorScheme } = useColorScheme();
  const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;

  return (
    <View
      style={[styles.container, { backgroundColor: currentColors.background }]}
    >
      <View
        style={[
          styles.comingSoonContainer,
          { backgroundColor: currentColors.background },
        ]}
      >
        <Text
          style={[styles.comingSoonTitle, { color: currentColors.foreground }]}
        >
          Coming Soon
        </Text>
        <Text
          style={[
            styles.comingSoonSubtitle,
            { color: currentColors.textSecondary },
          ]}
        >
          Admin Dashboard features are under development
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  comingSoonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  comingSoonTitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  comingSoonSubtitle: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.7,
  },
});
