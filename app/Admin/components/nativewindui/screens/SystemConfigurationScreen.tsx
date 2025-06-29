import React from "react";
import { View, Text } from "react-native";
import { SkeletonBase } from "../SkeletonBase";

// System Configuration Screen
export function SystemConfigurationScreen() {
  return (
    <SkeletonBase
      title="System Configuration"
      description="Configure system-wide settings and parameters"
    >
      <View className="space-y-4">
        {/* Configuration Sections */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3">Settings</Text>
          <View className="space-y-3">
            {["General", "Security", "Notifications", "API Keys"].map(
              (setting) => (
                <View
                  key={setting}
                  className="p-4 rounded-lg border"
                  style={{ borderColor: "#e2e8f0" }}
                >
                  <Text className="text-sm opacity-70">{setting} Settings</Text>
                </View>
              )
            )}
          </View>
        </View>
      </View>
    </SkeletonBase>
  );
}
