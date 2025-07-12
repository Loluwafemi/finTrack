import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SkeletonBase } from "../SkeletonBase";

// Financial Reports Screen
export function FinancialReportsScreen() {
  return (
    <SkeletonBase
      title="Financial Reports"
      description="Generate and view comprehensive financial reports"
    >
      <View className="space-y-4">
        {/* Report Types */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3">Report Types</Text>
          <View className="flex-row flex-wrap gap-3">
            {[
              "Expense Report",
            ].map((report) => (
              <TouchableOpacity
                key={report}
                className="px-4 py-3 rounded-lg border"
                style={{ borderColor: "#e2e8f0" }}
              >
                <Text className="text-sm">{report}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Report Preview */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3">Report Preview</Text>
          <View
            className="p-6 rounded-lg border"
            style={{ borderColor: "#e2e8f0", minHeight: 200 }}
          >
            <Text className="text-sm opacity-70 text-center">
              Report content will be displayed here
            </Text>
          </View>
        </View>
      </View>
    </SkeletonBase>
  );
}