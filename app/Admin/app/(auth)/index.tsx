import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import '~/global.css';
import { useColorScheme } from "~/lib/useColorScheme";
import { getRoute } from "~/src/constants/routes";
import { COLORS } from "~/theme/colors";

/**
 * Dashboard Index Screen
 *
 * This is the main entry point for the admin dashboard.
 * Currently showing "Coming Soon" message while preserving the original styling and layout.
 *
 * The screen is fully responsive and adapts to both light and dark themes.
 */
export default function AuthenticationIndex() {
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
        {/* start here */}
        <Text
          style={[styles.comingSoonTitle, { color: currentColors.foreground }]}
        >
          Login Page
        </Text>
        <Text
          style={[
            styles.comingSoonSubtitle,
            { color: currentColors.textSecondary },
          ]}
        >
          LOGIN PAGE UNDER DEVELOPMENT
          : EMAIL, PASSWORD, ACCESS KEY? (OPTIONAL: USED WHEN AN ACCOUNT NEED FIRST TIME ENTRY ACCESS FROM SUPER ADMIN
        </Text>

        <button
        className="bg-black p-2 text-white rounded mt-4"
        onClick={()=>{
            router.navigate(getRoute('SIGNUP'));
        }}>
            Signup
        </button>
        {/* end here */}
      </View>

      <button
        className="bg-black p-2 text-white rounded mt-4"
        onClick={()=>{
            router.navigate(getRoute('DASHBOARD'));
        }}>
            Continue to dashboad
        </button>
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
