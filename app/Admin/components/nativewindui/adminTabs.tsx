import React, { Component, ReactNode } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Icon } from "@roninoss/icons";
import { useRouter } from "expo-router";
import { COLORS } from "../../theme/colors";
import { useColorScheme } from "../../lib/useColorScheme";

interface ComponentProps {}
interface ComponentState {}

interface AdminHomeState {
  selectedPeriod: "week" | "month" | "year";
}

// Admin Dashboard Home Component
export function AdminHome() {
  const navigation = useRouter();
  const { isDarkColorScheme, colors } = useColorScheme();
  const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;

  return (
    <ScrollView className="px-1 py-2" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="flex flex-row items-center justify-between px-2 py-4">
        <Text
          className="text-3xl font-bold tracking-tight"
          style={{ color: currentColors.foreground }}
        >
          Admin Dashboard
        </Text>
        <Text
          className="text-xs font-medium tracking-wide opacity-70"
          style={{ color: currentColors.textSecondary }}
        >
          Super Admin
        </Text>
      </View>

      {/* Coming Soon Content */}
      <View className="flex-1 justify-center items-center px-4 py-20">
        <Text
          className="text-4xl font-bold tracking-tight text-center mb-4"
          style={{ color: currentColors.foreground }}
        >
          Coming Soon
        </Text>
        <Text
          className="text-lg text-center opacity-70"
          style={{ color: currentColors.textSecondary }}
        >
          Dashboard features are under development
        </Text>
      </View>

      {/* Recent Activity */}
      <View className="px-2">
        <Text
          className="text-lg font-semibold tracking-tight mb-3"
          style={{ color: currentColors.foreground }}
        >
          Recent Activity
        </Text>
        <RecentActivityList />
      </View>
    </ScrollView>
  );
}

// User Management Component
export class UserManagement extends Component<ComponentProps, ComponentState> {
  render(): ReactNode {
    return (
      <ScrollView className="px-2 py-2" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mb-4">
          <Text
            className="text-lg font-bold tracking-tight mb-2"
            style={{ color: COLORS.dark.foreground }}
          >
            User Management
          </Text>
        </View>

        {/* Coming Soon Content */}
        <View className="flex-1 justify-center items-center px-4 py-20">
          <Text
            className="text-4xl font-bold tracking-tight text-center mb-4"
            style={{ color: COLORS.dark.foreground }}
          >
            Coming Soon
          </Text>
          <Text
            className="text-lg text-center opacity-70"
            style={{ color: COLORS.dark.textSecondary }}
          >
            User management features are under development
          </Text>
        </View>
      </ScrollView>
    );
  }
}

// Analytics Component
export class Analytics extends Component<ComponentProps, ComponentState> {
  render(): ReactNode {
    return (
      <ScrollView className="px-2 py-2" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mb-4">
          <Text
            className="text-lg font-bold tracking-tight mb-2"
            style={{ color: COLORS.dark.foreground }}
          >
            Analytics Dashboard
          </Text>
        </View>

        {/* Coming Soon Content */}
        <View className="flex-1 justify-center items-center px-4 py-20">
          <Text
            className="text-4xl font-bold tracking-tight text-center mb-4"
            style={{ color: COLORS.dark.foreground }}
          >
            Coming Soon
          </Text>
          <Text
            className="text-lg text-center opacity-70"
            style={{ color: COLORS.dark.textSecondary }}
          >
            Analytics features are under development
          </Text>
        </View>
      </ScrollView>
    );
  }
}

// Admin Settings Component
export class AdminSettings extends Component<ComponentProps, ComponentState> {
  render(): ReactNode {
    return (
      <ScrollView className="px-2 py-2" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="mb-4">
          <Text
            className="text-lg font-bold tracking-tight mb-2"
            style={{ color: COLORS.dark.foreground }}
          >
            Admin Settings
          </Text>
        </View>

        {/* Coming Soon Content */}
        <View className="flex-1 justify-center items-center px-4 py-20">
          <Text
            className="text-4xl font-bold tracking-tight text-center mb-4"
            style={{ color: COLORS.dark.foreground }}
          >
            Coming Soon
          </Text>
          <Text
            className="text-lg text-center opacity-70"
            style={{ color: COLORS.dark.textSecondary }}
          >
            Settings features are under development
          </Text>
        </View>
      </ScrollView>
    );
  }
}

// Helper Components
function StatCard({
  title,
  value,
  change,
  icon,
  color,
}: {
  title: string;
  value: string;
  change: string;
  icon: string;
  color: string;
}) {
  const { isDarkColorScheme } = useColorScheme();
  const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;

  return (
    <View
      className="flex-1 mx-1 rounded-xl p-4 shadow-sm"
      style={{ backgroundColor: currentColors.card }}
    >
      <View className="flex flex-row items-center justify-between mb-2">
        <Icon name={icon as any} size={20} color={color} />
        <Text
          className="text-xs font-medium"
          style={{ color: change.startsWith("+") ? "#10b981" : "#ef4444" }}
        >
          {change}
        </Text>
      </View>
      <Text
        className="text-lg font-bold"
        style={{ color: currentColors.foreground }}
      >
        {value}
      </Text>
      <Text className="text-xs" style={{ color: currentColors.textSecondary }}>
        {title}
      </Text>
    </View>
  );
}

function ActionButton({
  title,
  icon,
  onPress,
}: {
  title: string;
  icon: string;
  onPress: () => void;
}) {
  const { isDarkColorScheme } = useColorScheme();
  const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;

  return (
    <TouchableHighlight
      className="flex-1 mx-1 rounded-xl p-4 items-center"
      style={{ backgroundColor: currentColors.accent }}
      onPress={onPress}
    >
      <View className="items-center">
        <Icon name={icon as any} size={24} color={COLORS.white} />
        <Text
          className="text-xs font-medium mt-2"
          style={{ color: COLORS.white }}
        >
          {title}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

function FilterChip({ title, active }: { title: string; active: boolean }) {
  return (
    <TouchableHighlight
      className="rounded-lg px-3 py-1"
      style={{
        backgroundColor: active ? COLORS.dark.accent : COLORS.dark.grey3,
      }}
    >
      <Text
        className="text-xs font-medium"
        style={{ color: active ? COLORS.white : COLORS.dark.textSecondary }}
      >
        {title}
      </Text>
    </TouchableHighlight>
  );
}

function SettingsSection({ title }: { title: string }) {
  return (
    <TouchableHighlight
      className="mb-3 rounded-xl p-4 shadow-sm"
      style={{ backgroundColor: COLORS.dark.card }}
      onPress={() => console.log(`Navigate to ${title}`)}
    >
      <View className="flex flex-row items-center justify-between">
        <Text
          className="text-base font-medium"
          style={{ color: COLORS.dark.foreground }}
        >
          {title}
        </Text>
        <Icon
          name="chevron-right"
          size={20}
          color={COLORS.dark.textSecondary}
        />
      </View>
    </TouchableHighlight>
  );
}

function RecentActivityList() {
  const activities = [
    { action: "User John Doe logged in", time: "2 min ago", type: "login" },
    {
      action: "New user registration",
      time: "5 min ago",
      type: "registration",
    },
    { action: "System backup completed", time: "1 hour ago", type: "system" },
    { action: "Admin settings updated", time: "2 hours ago", type: "admin" },
  ];

  return (
    <View>
      {activities.map((activity, index) => (
        <ActivityItem key={index} activity={activity} />
      ))}
    </View>
  );
}

function ActivityItem({ activity }: { activity: any }) {
  const { isDarkColorScheme } = useColorScheme();
  const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;

  const getIconName = (type: string) => {
    switch (type) {
      case "login":
        return "account-circle";
      case "registration":
        return "account-plus";
      case "system":
        return "cog";
      case "admin":
        return "cog";
      default:
        return "information-outline";
    }
  };

  return (
    <View
      className="mb-2 rounded-lg p-3 shadow-sm"
      style={{ backgroundColor: currentColors.card }}
    >
      <View className="flex flex-row items-center">
        <Icon
          name={getIconName(activity.type) as any}
          size={16}
          color={currentColors.textSecondary}
        />
        <View className="ml-3 flex-1">
          <Text
            className="text-sm font-medium"
            style={{ color: currentColors.foreground }}
          >
            {activity.action}
          </Text>
          <Text
            className="text-xs"
            style={{ color: currentColors.textSecondary }}
          >
            {activity.time}
          </Text>
        </View>
      </View>
    </View>
  );
}

function UserList() {
  const users = [
    {
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Active",
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "User",
      status: "Inactive",
    },
  ];

  return (
    <View>
      {users.map((user, index) => (
        <UserItem key={index} user={user} />
      ))}
    </View>
  );
}

function UserItem({ user }: { user: any }) {
  return (
    <TouchableHighlight
      className="mb-2 rounded-lg p-3 shadow-sm"
      style={{ backgroundColor: COLORS.dark.card }}
      onPress={() => console.log(`View user: ${user.name}`)}
    >
      <View className="flex flex-row items-center justify-between">
        <View className="flex-1">
          <Text
            className="text-sm font-medium"
            style={{ color: COLORS.dark.foreground }}
          >
            {user.name}
          </Text>
          <Text
            className="text-xs"
            style={{ color: COLORS.dark.textSecondary }}
          >
            {user.email}
          </Text>
        </View>
        <View className="items-end">
          <Text
            className="text-xs font-medium"
            style={{ color: COLORS.dark.accent }}
          >
            {user.role}
          </Text>
          <Text
            className="text-xs"
            style={{
              color: user.status === "Active" ? "#10b981" : "#ef4444",
            }}
          >
            {user.status}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}
