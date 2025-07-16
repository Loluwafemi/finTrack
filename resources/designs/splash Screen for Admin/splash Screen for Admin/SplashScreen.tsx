// components/SplashScreen.tsx
import React, { FC, useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";

interface SplashScreenProps {
  progress: number; // 0 to 100
}

const SplashScreen: FC<SplashScreenProps> = ({ progress }) => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const blink = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    blink.start();

    return () => blink.stop();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <Text className="text-[154px] font-extrabold text-black tracking-widest">
        ADMIN
      </Text>

      <Animated.Text className="mt-2 text-lg text-gray-700" style={{ opacity }}>
        Loading...
      </Animated.Text>

      <View className="absolute bottom-6 w-full px-6">
        <View className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <View className="h-full bg-black" style={{ width: `${progress}%` }} />
        </View>

        <Text className="mt-1 text-center text-xs text-gray-500">
          {Math.floor(progress)}%
        </Text>
      </View>
    </View>
  );
};

export default SplashScreen;
