import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SkeletonBase } from "../SkeletonBase";

// Document Approval Screen
export function DocumentApprovalScreen() {
  return (
    <SkeletonBase
      title="Document Approval"
      description="Review and approve pending documents and requests
      Make this a modal || this is accessible through selected user from user account management. To preview user documents or request only 
      "
    >
      <View className="space-y-4">
        {/* Approval Queue */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3">Pending Approvals</Text>
          <View className="space-y-3">
            {[1, 2, 3].map((item) => (
              <View
                key={item}
                className="p-4 rounded-lg border"
                style={{ borderColor: "#e2e8f0" }}
              >
                <View className="flex-row justify-between items-center">
                  <Text className="text-sm opacity-70">
                    Document #{item} awaiting approval
                  </Text>
                  <View className="flex-row gap-2">
                    <TouchableOpacity className="px-3 py-1 rounded bg-green-100">
                      <Text className="text-green-800 text-xs">Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="px-3 py-1 rounded bg-red-100">
                      <Text className="text-red-800 text-xs">Reject</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </SkeletonBase>
  );
}