import { User } from "@/lib/auth";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import SplashScreen from "../components/SplashScreen";
import { getRoute } from "../src/constants/routes";

export default function Index() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(false)

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

    const navigateToDashboard = async () => {
      try {
        const response = await User.isAlive();
        
        setTimeout(() => {
          if (response.status) {
            setStatus(true);
            router.navigate(getRoute('DASHBOARD'));
          } else {
            router.navigate(getRoute('AUTH'));
            setStatus(false);
          }
        }, 1500);
      } catch (error) {
        setTimeout(() => {
          router.navigate(getRoute('AUTH'));
          setStatus(false);
        }, 1500);
      }
    };

    navigateToDashboard();
    
    return () => {
      clearInterval(progressTimer);
    };
  }, []);

  return <SplashScreen progress={progress} />;
}
