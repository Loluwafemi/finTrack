import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useColorScheme } from "../../../lib/useColorScheme";
import { COLORS } from "../../../theme/colors";
import { SkeletonBase } from "../SkeletonBase";

// User Account Management Screen
export function UserAccountManagementScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;

  return (
    <SkeletonBase
      title="User Account Management"
      description="Manage user accounts, roles, and permissions"
    >
      <View className="space-y-4">
        {/* Quick Actions */}
        <View className="mb-6">
          <Text
            className="text-lg font-semibold mb-3"
            style={{ color: currentColors.foreground }}
          >
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {[
              "Add User",
              "Manage Roles",
              "User Permissions",
              "Bulk Operations",
            ].map((action) => (
              <TouchableOpacity
                key={action}
                className="px-4 py-2 rounded-lg border"
                style={{
                  borderColor: currentColors.border,
                  backgroundColor: currentColors.card,
                }}
              >
                <Text style={{ color: currentColors.foreground }}>
                  {action}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stats Cards */}
        <View className="mb-6">
          <Text
            className="text-lg font-semibold mb-3"
            style={{ color: currentColors.foreground }}
          >
            User Statistics
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {[
              { label: "Total Users", value: "---" },
              { label: "Active Users", value: "---" },
              { label: "Pending Approvals", value: "---" },
              { label: "Inactive Users", value: "---" },
            ].map((stat) => (
              <View
                key={stat.label}
                className="flex-1 min-w-[120px] p-4 rounded-lg"
                style={{ backgroundColor: currentColors.card }}
              >
                <Text
                  className="text-2xl font-bold mb-1"
                  style={{ color: currentColors.foreground }}
                >
                  {stat.value}
                </Text>
                <Text
                  className="text-sm"
                  style={{ color: currentColors.textSecondary }}
                >
                  {stat.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </SkeletonBase>
  );
}