import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { UserDetails } from "./DynamicModal";
import { useColorScheme } from "../lib/useColorScheme";
import { COLORS } from "../theme/colors";

interface ActivityModalProps {
  visible: boolean;
  onClose: () => void;
  userDetails: UserDetails;
}

const ActivityModal: React.FC<ActivityModalProps> = ({ visible, onClose, userDetails }) => {
  const { isDarkColorScheme } = useColorScheme();
  const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 20 }}
      >
        <View
          className="w-full h-5/6 rounded-xl"
          style={{
            backgroundColor: currentColors.background,
            maxWidth: "95%",
            maxHeight: "85%",
          }}
        >
          {/* Header */}
          <View
            className="px-4 py-4 border-b flex-row justify-between items-center"
            style={{
              borderBottomColor: currentColors.border,
              backgroundColor: currentColors.card,
            }}
          >
            <Text className="text-lg font-bold" style={{ color: currentColors.foreground }}>
              User Details
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="p-2 rounded-full"
              style={{ backgroundColor: currentColors.muted }}
              accessibilityLabel="Close modal"
              accessibilityRole="button"
            >
              <Text className="text-lg font-bold" style={{ color: currentColors.foreground }}>
                ×
              </Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View className="flex-1 p-4">
            <View className="flex-1 flex-row" style={{ gap: 16 }}>
              {/* Left Section - Static User Details */}
              <View className="flex-1">
                <View
                  className="p-6 rounded-lg border"
                  style={{
                    backgroundColor: currentColors.card,
                    borderColor: currentColors.border,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 3,
                  }}
                >
                  <Text className="text-lg font-bold mb-4" style={{ color: currentColors.foreground }}>
                    User Information
                  </Text>
                  {/* User Details */}
                  <View className="space-y-3">
                    <View>
                      <Text className="text-xs font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                        Full Name
                      </Text>
                      <Text className="text-sm font-semibold" style={{ color: currentColors.foreground }}>
                        {userDetails.name}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-xs font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                        Email Address
                      </Text>
                      <Text className="text-sm" style={{ color: currentColors.foreground }}>
                        {userDetails.email}
                      </Text>
                    </View>
                    {userDetails.phone && (
                      <View>
                        <Text className="text-xs font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                          Phone Number
                        </Text>
                        <Text className="text-sm" style={{ color: currentColors.foreground }}>
                          {userDetails.phone}
                        </Text>
                      </View>
                    )}
                    <View>
                      <Text className="text-xs font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                        Role
                      </Text>
                      <Text className="text-sm font-medium" style={{ color: currentColors.foreground }}>
                        {userDetails.role}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-xs font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                        Status
                      </Text>
                      <View className="flex-row items-center">
                        <View
                          className="w-2 h-2 rounded-full mr-2"
                          style={{ backgroundColor: "#10B981" }}
                        />
                        <Text className="text-sm font-medium capitalize" style={{ color: "#10B981" }}>
                          {userDetails.status}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text className="text-xs font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                        Join Date
                      </Text>
                      <Text className="text-sm" style={{ color: currentColors.foreground }}>
                        {userDetails.joinDate}
                      </Text>
                    </View>
                    {userDetails.lastLogin && (
                      <View>
                        <Text className="text-xs font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                          Last Login
                        </Text>
                        <Text className="text-sm" style={{ color: currentColors.foreground }}>
                          {userDetails.lastLogin}
                        </Text>
                      </View>
                    )}
                    {userDetails.organization && (
                      <View>
                        <Text className="text-xs font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                          Organization
                        </Text>
                        <Text className="text-sm" style={{ color: currentColors.foreground }}>
                          {userDetails.organization}
                        </Text>
                      </View>
                    )}
                    {userDetails.department && (
                      <View>
                        <Text className="text-xs font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                          Department
                        </Text>
                        <Text className="text-sm" style={{ color: currentColors.foreground }}>
                          {userDetails.department}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
              {/* Right Section - Activity Content Placeholder */}
              <View className="flex-1 flex items-center justify-center">
                <Text className="text-lg font-bold" style={{ color: currentColors.textSecondary }}>
                  Activity modal content goes here
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ActivityModal;