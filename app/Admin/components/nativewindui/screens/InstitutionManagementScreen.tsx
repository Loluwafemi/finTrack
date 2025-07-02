import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SkeletonBase } from "../SkeletonBase";

// Institution Management Screen
export function InstitutionManagementScreen() {
  return (
    <SkeletonBase
      title="Institution Management"
      description="Manage partner institutions and their configurations"
    >
      <View className="space-y-4">
        {/* Institution List */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3">Institutions</Text>
          <View className="space-y-3">
            {[1, 2, 3].map((item) => (
              <View
                key={item}
                className="p-4 rounded-lg border"
                style={{ borderColor: "#e2e8f0" }}
              >
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm opacity-70">
                    Institution #{item} details
                  </Text>
                  <TouchableOpacity className="px-3 py-1 rounded bg-blue-100">
                    <Text className="text-blue-800 text-xs">Manage</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </SkeletonBase>
  );
}