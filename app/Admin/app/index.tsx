import SplashScreen from "@/components/SplashScreen";
import { User } from "@/lib/auth";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useColorScheme } from "../lib/useColorScheme";
import { getRoute } from "../src/constants/routes";
import { COLORS } from "../theme/colors";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isDarkColorScheme } = useColorScheme();
  const colors = isDarkColorScheme ? COLORS.dark : COLORS.light;
  const [status, setStatus] = useState(false)
  const [progress, setProgress] = useState(0);

  // use this to navigate about page on prompt request
  // check if cookies / session is active
  useEffect(() => {
      const progressTimer = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 10;
          if (next >= 100) {
            clearInterval(progressTimer);
            return 100;
          }
          return next;
        });
      }, 150);

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
      clearInterval(progressTimer);
    };
  }, []);

 return <SplashScreen progress={progress} />;
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
