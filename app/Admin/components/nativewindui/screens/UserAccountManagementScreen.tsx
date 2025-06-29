import React from "react";
import { Text, View, ScrollView } from "react-native";
import { useColorScheme } from "../../../lib/useColorScheme";
import { COLORS } from "../../../theme/colors";
import { SkeletonBase } from "../SkeletonBase";
import {
  KPICard,
  AlertCard,
  ActivityItem,
  QuickActionButton,
  SectionHeader,
  GridSection,
} from "./components";

export function UserAccountManagementScreen() {
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
              width: '100%',
              flexDirection: 'row',
            }}
            className="w-full flex-col lg:flex-row space-x-0 lg:space-x-8"
          >
            <View style={{flex: 2, minWidth: 0, marginRight: 16}}>
              <View className="mb-8" style={{ backgroundColor: '#ffffff', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3, marginBottom: 24 }}>
                <SectionHeader
                  title="Key Performance Indicators"
                  actionLabel="Refresh"
                  actionOnPress={() => { window.location.reload(); }}
                />
                <View className="mb-4">
                  <GridSection columns={2} gap={16}>
                    <KPICard title="Total Revenue" value="₦2,847,392" isPositive={true} trend="+12%" />
                    <KPICard title="Active Users" value="1,234" isPositive={true} trend="+8%" />
                  </GridSection>
                </View>
                <GridSection columns={2} gap={12}>
                  <KPICard title="Conversion Rate" value="3.2%" isPositive={false} trend="-2%" />
                  <KPICard title="Monthly Growth" value="15.8%" isPositive={true} trend="+5%" />
                </GridSection>
              </View>

              <View className="mb-8" style={{ backgroundColor: '#f8fafc', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2, marginBottom: 24 }}>
                <SectionHeader
                  title="User Statistics"
                  actionLabel="Export Report"
                  actionOnPress={() => console.log("Export report pressed")}
                  subtitle="Comprehensive user metrics and analytics"
                />
                <View className="mb-4">
                  <GridSection columns={2} gap={16}>
                    <KPICard title="Total Users" value="2,847" isPositive={true} trend="+8%" />
                    <KPICard title="Active Users" value="2,156" isPositive={true} trend="+15%" />
                  </GridSection>
                </View>
                <View className="mb-4">
                  <GridSection columns={2} gap={12}>

                    <KPICard title="Inactive Users" value="668" isPositive={false} trend="+3%" />
                  </GridSection>
                </View>
                <GridSection columns={2} gap={12}>
                  <KPICard title="New Registrations" value="142" isPositive={true} trend="+22%" />
                  <KPICard title="Premium Users" value="891" isPositive={true} trend="+18%" />
                </GridSection>
              </View>
            </View>
            <View style={{flex: 1, minWidth: 0, marginLeft: 16}} className="lg:pl-0">
              <View className="mb-8" style={{ backgroundColor: '#fff5f5', borderRadius: 16, padding: 20, shadowColor: '#dc3545', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3, marginBottom: 24, borderLeftWidth: 4, borderLeftColor: '#dc3545' }}>
                <SectionHeader
                  title="Alerts & Notifications"
                  actionLabel="Mark All Read"
                  actionOnPress={() => console.log("Mark all read")}
                  badge={3}
                />
                <GridSection columns={1} gap={12}>
                  <AlertCard title="Unusual Transaction Volume" description="High volume detected from IP 192.168.1.100 - 45 transactions in 10 minutes. This may indicate suspicious activity." priority="high" time="2 min ago" onView={() => console.log("View transaction details")} onDismiss={() => console.log("Dismiss transaction alert")} />
                  <AlertCard title="Multiple Failed Login Attempts" description="Account user@example.com has 5 failed login attempts in the last hour. Account temporarily locked." priority="medium" time="15 min ago" onView={() => console.log("View login details")} onDismiss={() => console.log("Dismiss login alert")} />
                  <AlertCard title="System Performance" description="Database response time increased by 15% in the last 30 minutes. Monitoring continues." priority="low" time="1 hour ago" onView={() => console.log("View performance details")} onDismiss={() => console.log("Dismiss performance alert")} />
                </GridSection>
              </View>

              <View className="mb-8" style={{ backgroundColor: '#f0f9ff', borderRadius: 16, padding: 20, shadowColor: '#3b82f6', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3, marginBottom: 24, borderLeftWidth: 4, borderLeftColor: '#3b82f6' }}>
                <SectionHeader
                  title="Real-time Activity Feed"
                  actionLabel="View All"
                  actionOnPress={() => console.log("View all activities")}
                  subtitle="Latest system activities and user actions"
                />
                <GridSection columns={1} gap={6}>
                  <ActivityItem action="New user registration completed" user="john.doe@email.com" time="2 min ago" type="success" />
                  <ActivityItem action="Transaction approved" user="Admin Sarah" time="5 min ago" type="success" />
                  <ActivityItem action="Budget limit updated" user="Manager Mike" time="8 min ago" type="info" />
                  <ActivityItem action="User role changed to Premium" user="Admin Sarah" time="12 min ago" type="info" />
                  <ActivityItem action="Failed login attempt blocked" user="System" time="15 min ago" type="warning" />
                </GridSection>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SkeletonBase>
  );
}
