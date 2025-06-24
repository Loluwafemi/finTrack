import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import { ROUTES, getRoute } from "../src/constants/routes";
import { useColorScheme } from "../lib/useColorScheme";
import { COLORS } from "../theme/colors";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isDarkColorScheme } = useColorScheme();
  const colors = isDarkColorScheme ? COLORS.dark : COLORS.light;

  useEffect(() => {
    let isMounted = true;
    const navigateToDashboard = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (isMounted) {
        router.replace(getRoute("DASHBOARD"));
      }
    };

    navigateToDashboard();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <Text style={[styles.loadingText, { color: colors.foreground }]}>
          {isLoading ? "Loading Admin Dashboard..." : "Redirecting..."}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});
