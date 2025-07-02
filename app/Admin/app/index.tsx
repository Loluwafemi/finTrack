import { User } from "@/lib/auth";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "../lib/useColorScheme";
import { getRoute } from "../src/constants/routes";
import { COLORS } from "../theme/colors";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isDarkColorScheme } = useColorScheme();
  const colors = isDarkColorScheme ? COLORS.dark : COLORS.light;
  const [status, setStatus] = useState(false)

  // use this to navigate about page on prompt request
  // check if cookies / session is active
  useEffect(() => {
    let isMounted = true;
    const navigateToDashboard = async () => {
    
      try {
        const response = await User.isAlive()
        
        if (response.status) {            
            setStatus(true)
            return router.navigate(getRoute('DASHBOARD'));
        }else{
          router.navigate(getRoute('AUTH'));
          setStatus(false)
        }
      } catch (error) {
        router.navigate(getRoute('AUTH'));
        setStatus(false)
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
