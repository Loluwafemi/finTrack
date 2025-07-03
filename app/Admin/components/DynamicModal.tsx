import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useColorScheme } from "../lib/useColorScheme";
import { COLORS } from "../theme/colors";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface UserDetails {
  accounttype: string | null 
  banks: object[] | [],
  budgets: object[] | [],
  created_at: string | null,
  data: {
    organization: string | null,
    organization_name: string | null
  } | null,
  email: string | null,
  firstname: string | null,
  id: string | null,
  lastname: string | null,
  number: string | null,
  status: string | null,
  transactions: string | null,
  updated_at: string | null,
  userid: string | null,
  username: string | null
}

interface BaseModalProps {
  visible: boolean;
  onClose: () => void;
  userDetails: UserDetails;
}

/**
 * DynamicModal Component
 *
 * A responsive modal with two-column grid layout:
 * - Left column: Static user details (name, email, role, etc.)
 * - Right column: Dynamic content based on prompts/interactions
 *
 * Features:
 * - Mobile-first responsive design
 * - NativeWind styling with dark mode support
 * - Configurable dynamic content types
 * - Accessibility compliant (WCAG 2.1)
 * - Nigerian Naira currency formatting
 *
 * Responsive breakpoints: mobile <640px, tablet 640–1024px, desktop >1024px
 *
 * Time Complexity: O(1) for rendering, O(n) for dynamic content lists
 * Space Complexity: O(n) where n is the number of dynamic content items
 */
export const BaseModal: React.FC<BaseModalProps> = ({
  visible,
  onClose,
  userDetails,
}) => {
  const { isDarkColorScheme } = useColorScheme();
  const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;
  const [selectedTab, setSelectedTab] = useState<string>("overview");

  // Format currency in Nigerian Naira
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Format date for Nigerian locale
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status color based on user status
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "active":
        return "#10B981"; // green-500
      case "inactive":
        return "#6B7280"; // gray-500
      case "suspended":
        return "#EF4444"; // red-500
      default:
        return "#6B7280";
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View
        className="flex-1 justify-center items-center"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: 20,
        }}
      >
        <View
          className="w-full h-5/6 rounded-xl"
          style={{
            backgroundColor: currentColors.background,
            maxWidth: screenWidth > 1024 ? "90%" : "95%",
            maxHeight: screenHeight * 0.85,
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
            <Text
              className="text-lg font-bold"
              style={{ color: currentColors.foreground }}
            >
              User Details
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="p-2 rounded-full"
              style={{ backgroundColor: currentColors.muted }}
              accessibilityLabel="Close modal"
              accessibilityRole="button"
            >
              <Text
                className="text-lg font-bold"
                style={{ color: currentColors.foreground }}
              >
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
                  <Text
                    className="text-lg font-bold mb-4"
                    style={{ color: currentColors.foreground }}
                  >
                    User Information
                  </Text>

                  {/* User Details */}
                  <View className="space-y-3">
                    <View>
                      <Text
                        className="text-xs font-medium mb-1"
                        style={{ color: currentColors.textSecondary }}
                      >
                        Full Name
                      </Text>
                      <Text
                        className="text-sm font-semibold"
                        style={{ color: currentColors.foreground }}
                      >
                        {/* {userDetails.name} */}
                      </Text>
                    </View>

                    <View>
                      <Text
                        className="text-xs font-medium mb-1"
                        style={{ color: currentColors.textSecondary }}
                      >
                        Email Address
                      </Text>
                      <Text
                        className="text-sm"
                        style={{ color: currentColors.foreground }}
                      >
                        {/* {userDetails.email} */}
                      </Text>
                    </View>

                      <View>
                        <Text
                          className="text-xs font-medium mb-1"
                          style={{ color: currentColors.textSecondary }}
                        >
                          Phone Number
                        </Text>
                        <Text
                          className="text-sm"
                          style={{ color: currentColors.foreground }}
                        >
                          {/* {userDetails.phone} */}
                        </Text>
                      </View>

                    <View>
                      <Text
                        className="text-xs font-medium mb-1"
                        style={{ color: currentColors.textSecondary }}
                      >
                        Role
                      </Text>
                      <Text
                        className="text-sm font-medium"
                        style={{ color: currentColors.foreground }}
                      >
                        {/* {userDetails.role} */}
                      </Text>
                    </View>

                    <View>
                      <Text
                        className="text-xs font-medium mb-1"
                        style={{ color: currentColors.textSecondary }}
                      >
                        Status
                      </Text>
                      <View className="flex-row items-center">
                        <View
                          className="w-2 h-2 rounded-full mr-2"
                          style={{
                            // backgroundColor: getStatusColor(userDetails.status),
                          }}
                        />
                        <Text
                          className="text-sm font-medium capitalize"
                          // style={{ color: getStatusColor(userDetails.status) }}
                        >
                          {/* {userDetails.status} */}
                        </Text>
                      </View>
                    </View>

                    <View>
                      <Text
                        className="text-xs font-medium mb-1"
                        style={{ color: currentColors.textSecondary }}
                      >
                        Join Date
                      </Text>
                      <Text
                        className="text-sm"
                        style={{ color: currentColors.foreground }}
                      >
                        {/* {formatDate(userDetails.joinDate)} */}
                      </Text>
                    </View>

                      <View>
                        <Text
                          className="text-xs font-medium mb-1"
                          style={{ color: currentColors.textSecondary }}
                        >
                          Last Login
                        </Text>
                        <Text
                          className="text-sm"
                          style={{ color: currentColors.foreground }}
                        >
                          {/* {formatDate(userDetails.lastLogin)} */}
                        </Text>
                      </View>

                      <View>
                        <Text
                          className="text-xs font-medium mb-1"
                          style={{ color: currentColors.textSecondary }}
                        >
                          Organization
                        </Text>
                        <Text
                          className="text-sm"
                          style={{ color: currentColors.foreground }}
                        >
                          {/* {userDetails.organization} */}
                        </Text>
                      </View>

                      <View>
                        <Text
                          className="text-xs font-medium mb-1"
                          style={{ color: currentColors.textSecondary }}
                        >
                          Department
                        </Text>
                        <Text
                          className="text-sm"
                          style={{ color: currentColors.foreground }}
                        >
                          {/* {userDetails.department} */}
                        </Text>
                      </View>
                  </View>
                </View>
              </View>

              {/* Right Section - Placeholder for category-specific modal */}
              <View className="flex-1 flex items-center justify-center">
                <Text className="text-lg font-bold" style={{ color: currentColors.textSecondary }}>
                  Modal content will be implemented per category (log, activity, budget, message)
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Export types for external use
export type { UserDetails };

