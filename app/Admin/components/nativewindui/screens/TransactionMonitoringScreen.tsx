import React from "react";
import { Text, View } from "react-native";
import { SkeletonBase } from "../SkeletonBase";

// Transaction Monitoring Screen
export function TransactionMonitoringScreen() {
  return (
    <SkeletonBase
      title="Account Management"
      description="Manage accounts within organization"
    >
      <View className="space-y-4">
        {/* Filter Section */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3">Filters & Search</Text>
          <View
            className="p-4 rounded-lg border"
            style={{ borderColor: "#e2e8f0" }}
          >
            <Text className="text-sm opacity-70">
              Transaction filters will appear here
            </Text>
          </View>
        </View>

        {/* Transaction List */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3">
            Recent Transactions
          </Text>
          <View className="space-y-2">
            {[1, 2, 3].map((item) => (
              <View
                key={item}
                className="p-4 rounded-lg border"
                style={{ borderColor: "#e2e8f0" }}
              >
                <Text className="text-sm opacity-70">
                  Transaction #{item} details will appear here
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </SkeletonBase>
  );
}