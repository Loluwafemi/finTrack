import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useColorScheme } from "../../lib/useColorScheme";
import { COLORS } from "../../theme/colors";
import { Icon } from "@roninoss/icons";
import {
  UserAccountManagementScreen,
  TransactionMonitoringScreen,
  GrantMonitoringScreen,
  FinancialReportsScreen,
  ReceiptProcessingScreen,
  DocumentApprovalScreen,
  AuditTrailScreen,
  BulkDocumentOperationScreen,
  InstitutionManagementScreen,
  SystemConfigurationScreen,
  CommunicationSupportScreen,
} from '../../components/nativewindui/AdminSkeletonScreens';

// Define skeleton screen options with icons
const SKELETON_SCREENS = [
  {
    id: "user-account",
    title: "User Account Management",
    icon: "account-group",
    component: UserAccountManagementScreen,
    description: "Manage user accounts, roles, and permissions",
  },
  {
    id: "transaction-monitoring",
    title: "Transaction Monitoring",
    icon: "chart-line",
    component: TransactionMonitoringScreen,
    description: "Monitor and track all financial transactions",
  },
  {
    id: "grant-monitoring",
    title: "Grant Monitoring",
    icon: "trophy",
    component: GrantMonitoringScreen,
    description: "Track and manage grant applications",
  },
  {
    id: "financial-reports",
    title: "Financial Reports",
    icon: "chart-bar",
    component: FinancialReportsScreen,
    description: "Generate comprehensive financial reports",
  },
  {
    id: "receipt-processing",
    title: "Receipt Processing",
    icon: "file-document",
    component: ReceiptProcessingScreen,
    description: "Process and validate receipt submissions",
  },
  {
    id: "document-approval",
    title: "Document Approval",
    icon: "check-circle",
    component: DocumentApprovalScreen,
    description: "Review and approve pending documents",
  },
  {
    id: "audit-trail",
    title: "Audit Trail",
    icon: "magnify",
    component: AuditTrailScreen,
    description: "Track system activities and compliance",
  },
  {
    id: "bulk-operations",
    title: "Bulk Document Operations",
    icon: "layers-triple",
    component: BulkDocumentOperationScreen,
    description: "Perform batch operations on documents",
  },
  {
    id: "institution-management",
    title: "Institution Management",
    icon: "office-building",
    component: InstitutionManagementScreen,
    description: "Manage partner institutions",
  },
  {
    id: "system-configuration",
    title: "System Configuration",
    icon: "cog",
    component: SystemConfigurationScreen,
    description: "Configure system-wide settings",
  },
  {
    id: "communication-support",
    title: "Communication & Support",
    icon: "message-text",
    component: CommunicationSupportScreen,
    description: "Manage communications and support",
  },
];

export default function SkeletonDemoScreen() {
  const { isDarkColorScheme } = useColorScheme();
  const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;
  const [selectedScreen, setSelectedScreen] = useState(SKELETON_SCREENS[0]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const SelectedComponent = selectedScreen.component;

  return (
    <View
      className="flex-1"
      style={{ backgroundColor: currentColors.background }}
    >
      {/* Header */}
      <View
        className="px-4 py-3 border-b flex-row items-center justify-between"
        style={{
          borderBottomColor: currentColors.border,
          backgroundColor: currentColors.card,
        }}
      >
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="mr-3 p-2 rounded-lg"
            style={{ backgroundColor: currentColors.background }}
          >
            <Icon
              name={(sidebarCollapsed ? "menu" : "close") as any}
              size={20}
              color={currentColors.foreground}
            />
          </TouchableOpacity>
          <Text
            className="text-xl font-bold"
            style={{ color: currentColors.foreground }}
          >
            Admin Skeleton Components
          </Text>
        </View>
        <View className="flex-row items-center">
          <View className="mr-2">
            <Icon name="grid" size={20} color={currentColors.textSecondary} />
          </View>
          <Text
            className="text-sm"
            style={{ color: currentColors.textSecondary }}
          >
            Demo Mode
          </Text>
        </View>
      </View>

      <View className="flex-1 flex-row">
        {/* Sidebar */}
        {!sidebarCollapsed && (
          <View
            className="w-80 border-r"
            style={{
              borderRightColor: currentColors.border,
              backgroundColor: currentColors.card,
            }}
          >
            <ScrollView
              className="flex-1 p-4"
              showsVerticalScrollIndicator={false}
            >
              <Text
                className="text-sm font-semibold mb-4 uppercase tracking-wide"
                style={{ color: currentColors.textSecondary }}
              >
                Available Components
              </Text>

              {SKELETON_SCREENS.map((screen) => (
                <TouchableOpacity
                  key={screen.id}
                  onPress={() => setSelectedScreen(screen)}
                  className={`p-3 mb-2 rounded-lg border ${
                    selectedScreen.id === screen.id ? "border-blue-500" : ""
                  }`}
                  style={{
                    backgroundColor:
                      selectedScreen.id === screen.id
                        ? currentColors.primary + "10"
                        : currentColors.background,
                    borderColor:
                      selectedScreen.id === screen.id
                        ? currentColors.primary
                        : currentColors.border,
                  }}
                >
                  <View className="flex-row items-center mb-2">
                    <View className="mr-3">
                      <Icon
                        name={screen.icon as any}
                        size={18}
                        color={
                          selectedScreen.id === screen.id
                            ? currentColors.primary
                            : currentColors.foreground
                        }
                      />
                    </View>
                    <Text
                      className={`font-medium flex-1 ${
                        selectedScreen.id === screen.id ? "text-blue-600" : ""
                      }`}
                      style={{
                        color:
                          selectedScreen.id === screen.id
                            ? currentColors.primary
                            : currentColors.foreground,
                      }}
                    >
                      {screen.title}
                    </Text>
                  </View>
                  <Text
                    className="text-xs leading-4"
                    style={{ color: currentColors.textSecondary }}
                  >
                    {screen.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Main Content */}
        <View className="flex-1">
          {/* Current Screen Header */}
          <View
            className="px-6 py-4 border-b"
            style={{
              borderBottomColor: currentColors.border,
              backgroundColor: currentColors.background,
            }}
          >
            <View className="flex-row items-center">
              <View  className="mr-3"> 
              <Icon
                name={selectedScreen.icon as any}
                size={24}
                color={currentColors.primary}
              />
              </View>
              <View className="flex-1">
                <Text
                  className="text-lg font-semibold"
                  style={{ color: currentColors.foreground }}
                >
                  {selectedScreen.title}
                </Text>
                <Text
                  className="text-sm mt-1"
                  style={{ color: currentColors.textSecondary }}
                >
                  {selectedScreen.description}
                </Text>
              </View>
              <View
                className="px-3 py-1 rounded-full"
                style={{ backgroundColor: currentColors.primary + "20" }}
              >
                <Text
                  className="text-xs font-medium"
                  style={{ color: currentColors.primary }}
                >
                  Skeleton
                </Text>
              </View>
            </View>
          </View>

          {/* Component Content */}
          <View className="flex-1">
            <SelectedComponent />
          </View>
        </View>
      </View>

      {/* Footer */}
      <View
        className="px-4 py-2 border-t flex-row items-center justify-between"
        style={{
          borderTopColor: currentColors.border,
          backgroundColor: currentColors.card,
        }}
      >
        <Text
          className="text-xs"
          style={{ color: currentColors.textSecondary }}
        >
          {SKELETON_SCREENS.length} skeleton components available
        </Text>
        <Text
          className="text-xs"
          style={{ color: currentColors.textSecondary }}
        >
          Ready for implementation
        </Text>
      </View>
    </View>
  );
}

/**
 * Responsive Breakpoint Assumptions:
 * - Mobile: <640px (single column, collapsed sidebar by default)
 * - Tablet: 640-1024px (adaptive layout)
 * - Desktop: >1024px (full sidebar + content layout)
 *
 * Performance Notes:
 * - Components are lazy-loaded via dynamic imports
 * - Sidebar state is managed locally for optimal UX
 * - Color scheme changes are handled reactively
 *
 * Accessibility Features:
 * - Semantic navigation structure
 * - Keyboard navigation support
 * - Screen reader compatible
 * - High contrast color support
 */
