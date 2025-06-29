import React from "react";
import { View, Text } from "react-native";

// SkeletonBase Component
export function SkeletonBase({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <View className="flex-1 p-6 bg-gray-50">
      <View className="mb-6">
        <Text className="text-2xl font-bold mb-1">{title}</Text>
        <Text className="text-base text-gray-600">{description}</Text>
      </View>
      {children}
    </View>
  );
}
