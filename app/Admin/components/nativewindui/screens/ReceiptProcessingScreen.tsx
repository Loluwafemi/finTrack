import React from "react";
import { View, Text } from "react-native";
import { SkeletonBase } from "../SkeletonBase";

// Receipt Processing Screen
export function ReceiptProcessingScreen() {
  return (
    <SkeletonBase
      title="Receipt Processing"
      description="Process, validate, and manage receipt submissions"
    >
      <View className="space-y-4">
        {/* Upload Section */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3">Receipt Upload</Text>
          <View
            className="p-8 rounded-lg border-2 border-dashed"
            style={{ borderColor: "#e2e8f0" }}
          >
            <Text className="text-center text-sm opacity-70">
              Drag & drop receipts here or click to upload
            </Text>
          </View>
        </View>

        {/* Processing Queue */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-3">Processing Queue</Text>
          <View className="space-y-2">
            {[1, 2, 3].map((item) => (
              <View
                key={item}
                className="p-4 rounded-lg border"
                style={{ borderColor: "#e2e8f0" }}
              >
                <Text className="text-sm opacity-70">
                  Receipt #{item} processing status
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </SkeletonBase>
  );
}