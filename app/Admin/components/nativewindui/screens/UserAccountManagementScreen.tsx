import React, { useState } from "react";
import { Text, View, ScrollView, Alert } from "react-native";
import { useColorScheme } from "../../../lib/useColorScheme";
import { COLORS } from "../../../theme/colors";
import { SkeletonBase } from "../SkeletonBase";
import {
  KPICard,
  AlertCard,
  ActivityItem,
  SectionHeader,
  GridSection,
} from "./components";

import { SKELETON_SCREEN_META } from "@/components/custom/screenMeta";

export function UserAccountManagementScreen({
  setSelectedScreen,
}: {
  setSelectedScreen?: (screen: any) => void;
}) {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: "High Transaction Volume",
      description: "Unusual activity detected - 45 transactions in 10 minutes.",
      priority: "high" as const,
      time: "2 min ago",
    },
    {
      id: 2,
      title: "Failed Login Attempts",
      description: "Multiple failed attempts detected for user account.",
      priority: "medium" as const,
      time: "15 min ago",
    },
  ]);

  const handleRefreshKPIs = () => {
    Alert.alert("Refresh KPIs", "KPIs have been refreshed.");
  };

  const handleExportReport = () => {
    Alert.alert("Export Report", "Report has been exported.");
  };

  const handleMarkAllRead = () => {
    setAlerts([]);
    Alert.alert("Mark All Read", "All alerts have been marked as read.");
  };

  const handleViewDetails = (alert: any) => {
    Alert.alert("View Details", `Viewing details for: ${alert.title}`);
  };

  const handleDismissAlert = (alertId: number) => {
    setAlerts((prevAlerts) =>
      prevAlerts.filter((alert) => alert.id !== alertId)
    );
  };

  const handleViewAllActivities = () => {
    if (setSelectedScreen) {
      const transactionScreen = SKELETON_SCREEN_META.find(
        (screen) => screen.id === "account-manager"
      );
      if (transactionScreen) {
        setSelectedScreen(transactionScreen);
      } else {
        Alert.alert(
          "Error",
          "Could not find the transaction monitoring screen."
        );
      }
    } else {
      Alert.alert("View All Activities", "Viewing all activities.");
    }
  };
  const { isDarkColorScheme } = useColorScheme();
  const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;

  return (
    <SkeletonBase
      title="System Health Dashboard"
      description="Monitor system performance and user activities"
    >
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#fafbfc" }}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View className="px-4 sm:px-6 lg:px-8" style={{ paddingTop: 20 }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
            }}
            className="w-full flex-col lg:flex-row space-x-0 lg:space-x-8"
          >
            <View style={{ flex: 2, minWidth: 0, marginRight: 16 }}>
              <View
                className="mb-8"
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: 16,
                  padding: 20,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3,
                  marginBottom: 24,
                }}
              >
                <SectionHeader
                  title="Key Performance Indicators"
                  actionLabel="Refresh"
                  actionOnPress={handleRefreshKPIs}
                />
                <View className="mb-4">
                  <GridSection columns={2} gap={16}>
                    <KPICard
                      title="Total Revenue"
                      value="₦2,847,392"
                      isPositive={true}
                      trend="+12%"
                    />
                    <KPICard
                      title="Active Users"
                      value="1,234"
                      isPositive={true}
                      trend="+8%"
                    />
                  </GridSection>
                </View>
                <GridSection columns={2} gap={12}>
                  <KPICard
                    title="Conversion Rate"
                    value="3.2%"
                    isPositive={false}
                    trend="-2%"
                  />
                  <KPICard
                    title="Monthly Growth"
                    value="15.8%"
                    isPositive={true}
                    trend="+5%"
                  />
                </GridSection>
              </View>

              <View
                className="mb-8"
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: 16,
                  padding: 20,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 6,
                  elevation: 2,
                  marginBottom: 24,
                }}
              >
                <SectionHeader
                  title="User Statistics"
                  actionLabel="Export"
                  actionOnPress={handleExportReport}
                />
                <GridSection columns={2} gap={16}>
                  <KPICard
                    title="Total Users"
                    value="2,847"
                    isPositive={true}
                    trend="+8%"
                  />
                  <KPICard
                    title="Active Users"
                    value="2,156"
                    isPositive={true}
                    trend="+15%"
                  />
                </GridSection>
              </View>
            </View>
            <View
              style={{ flex: 1, minWidth: 0, marginLeft: 16 }}
              className="lg:pl-0"
            >
              <View
                className="mb-8"
                style={{
                  backgroundColor: "#fff5f5",
                  borderRadius: 16,
                  padding: 20,
                  shadowColor: "#dc3545",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 8,
                  elevation: 3,
                  marginBottom: 24,
                  borderLeftWidth: 4,
                  borderLeftColor: "#dc3545",
                }}
              >
                <SectionHeader
                  title="Alerts & Notifications"
                  actionLabel="Mark All Read"
                  actionOnPress={handleMarkAllRead}
                  badge={alerts.length}
                />
                <GridSection columns={1} gap={12}>
                  {alerts.map((alert) => (
                    <AlertCard
                      key={alert.id}
                      title={alert.title}
                      description={alert.description}
                      priority={alert.priority}
                      time={alert.time}
                      onView={() => handleViewDetails(alert)}
                      onDismiss={() => handleDismissAlert(alert.id)}
                    />
                  ))}
                </GridSection>
              </View>

              <View
                className="mb-8"
                style={{
                  backgroundColor: "#f0f9ff",
                  borderRadius: 16,
                  padding: 20,
                  shadowColor: "#3b82f6",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 8,
                  elevation: 3,
                  marginBottom: 24,
                  borderLeftWidth: 4,
                  borderLeftColor: "#3b82f6",
                }}
              >
                <SectionHeader
                  title="Activity Feed"
                  actionLabel="View All"
                  actionOnPress={handleViewAllActivities}
                />
                <GridSection columns={1} gap={6}>
                  <ActivityItem
                    action="User registration"
                    user="john.doe@email.com"
                    time="2 min ago"
                    type="success"
                  />
                  <ActivityItem
                    action="Transaction approved"
                    user="Admin Sarah"
                    time="5 min ago"
                    type="success"
                  />
                  <ActivityItem
                    action="Budget updated"
                    user="Manager Mike"
                    time="8 min ago"
                    type="info"
                  />
                </GridSection>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SkeletonBase>
  );
}
