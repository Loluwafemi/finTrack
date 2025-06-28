import React from "react";
import { View, Text } from "react-native";
import { SkeletonBase } from "../SkeletonBase";

// Communication & Support Screen
export function CommunicationSupportScreen() {
  return (
    <SkeletonBase
      title="Communication & Support"
      description="Manage support tickets and internal communications"
    >
      <View className="space-y-4">
        {/* Support Tickets */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3">Support Tickets</Text>
          <View className="space-y-2">
            {[1, 2, 3].map((item) => (
              <View
                key={item}
                className="p-4 rounded-lg border"
                style={{ borderColor: "#e2e8f0" }}
              >
                <Text className="text-sm opacity-70">
                  Ticket #{item} - Status: Open
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Announcements */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3">Announcements</Text>
          <View
            className="p-6 rounded-lg border"
            style={{ borderColor: "#e2e8f0" }}
          >
            <Text className="text-sm opacity-70 text-center">
              No new announcements
            </Text>
          </View>
        </View>
      </View>
    </SkeletonBase>
  );
}