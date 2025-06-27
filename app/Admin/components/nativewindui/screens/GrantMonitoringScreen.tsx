import React from "react";
import { Text, View } from "react-native";
import { SkeletonBase } from "../SkeletonBase";

// Grant Monitoring Screen
export function GrantMonitoringScreen() {
  return (
    <SkeletonBase
      title="Budget Expense Monitoring"
      description="Track and manage budget & expense applications and disbursements"
    >
      <View className="space-y-4">
        {/* Grant Status Overview */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3">
            Budget Status Overview
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {["Pending", "Approved", "Disbursed", "Completed"].map((status) => (
              <View
                key={status}
                className="flex-1 min-w-[100px] p-3 rounded-lg border"
                style={{ borderColor: "#e2e8f0" }}
              >
                <Text className="text-xl font-bold">--</Text>
                <Text className="text-sm opacity-70">{status}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Grant List */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3">Active Budget</Text>
          <View
            className="p-4 rounded-lg border"
            style={{ borderColor: "#e2e8f0" }}
          >
            <Text className="text-sm opacity-70">
              Budget list will appear here
            </Text>
          </View>
        </View>
      </View>
    </SkeletonBase>
  );
}