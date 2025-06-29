import React, { useState } from "react";
import { Text, View, ScrollView, RefreshControl, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Progress from "react-native-progress";
import { SelectList } from "react-native-dropdown-select-list";
import { Pressable } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";
import { COLORS } from "~/theme/colors";

interface BudgetStatus {
  id: string;
  name: string;
  count: number;
  color: string;
  percentage?: number;
}

interface BudgetItem {
  id: string;
  title: string;
  category: string;
  amount: number;
  spent: number;
  status: "pending" | "approved" | "disbursed" | "completed";
  deadline: string;
  progress: number;
}
const mockBudgetStatuses: BudgetStatus[] = [
  { id: "1", name: "Pending", count: 12, color: "#f59e0b", percentage: 0.3 },
  { id: "2", name: "Approved", count: 8, color: "#10b981", percentage: 0.2 },
  {
    id: "3",
    name: "Disbursed",
    count: 15,
    color: "#3b82f6",
    percentage: 0.375,
  },
  { id: "4", name: "Completed", count: 5, color: "#6b7280", percentage: 0.125 },
];

const mockBudgetItems: BudgetItem[] = [
  {
    id: "1",
    title: "Infrastructure Development",
    category: "Capital Projects",
    amount: 500000,
    spent: 325000,
    status: "disbursed",
    deadline: "2024-06-30",
    progress: 0.65,
  },
  {
    id: "2",
    title: "Education Program",
    category: "Social Services",
    amount: 250000,
    spent: 180000,
    status: "approved",
    deadline: "2024-08-15",
    progress: 0.72,
  },
  {
    id: "3",
    title: "Healthcare Initiative",
    category: "Health",
    amount: 750000,
    spent: 125000,
    status: "pending",
    deadline: "2024-12-31",
    progress: 0.17,
  },
];

const filterOptions = [
  { key: "all", value: "All Budgets" },
  { key: "pending", value: "Pending" },
  { key: "approved", value: "Approved" },
  { key: "disbursed", value: "Disbursed" },
  { key: "completed", value: "Completed" },
];


export function GrantMonitoringScreen() {
  const { colorScheme } = useColorScheme();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(mockBudgetItems);
  const [budgetStatuses, setBudgetStatuses] =
    useState<BudgetStatus[]>(mockBudgetStatuses);

  const colors = COLORS[colorScheme];

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const filteredBudgets = budgetItems.filter(
    (item) => selectedFilter === "all" || item.status === selectedFilter
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const statusColors: Record<string, string> = {
      pending: "#f59e0b",
      approved: "#10b981",
      disbursed: "#3b82f6",
      completed: "#6b7280",
    };
    return statusColors[status] || "#6b7280";
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <View className="flex-1 px-4">
        <ScrollView
          className="flex-1"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >

          <View className="mb-6">
            <Text
              className="text-2xl font-bold mb-2"
              style={{ color: colors.foreground }}
            >
              Budget Expense Monitoring
            </Text>
            <Text
              className="text-base opacity-70"
              style={{ color: colors.foreground }}
            >
              Track and manage budget expenses
            </Text>
          </View>


          <View className="mb-6">
            <Text
              className="text-lg font-semibold mb-4"
              style={{ color: colors.foreground }}
            >
              Budget Status Overview
            </Text>
            <View className="flex-row flex-wrap gap-3">
              {budgetStatuses.map((status) => (
                <View
                  key={status.id}
                  className="flex-1 min-w-[100px] p-4 rounded-xl"
                  style={{
                    backgroundColor: colors.card,
                    borderWidth: 1,
                    borderColor: colors.border,
                  }}
                >
                  <View className="flex-row items-center justify-between mb-2">
                    <Text
                      className="text-2xl font-bold"
                      style={{ color: status.color }}
                    >
                      {status.count}
                    </Text>
                    <View
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: status.color }}
                    />
                  </View>
                  <Text
                    className="text-sm font-medium"
                    style={{ color: colors.foreground }}
                  >
                    {status.name}
                  </Text>
                  {status.percentage && (
                    <View className="mt-2">
                      <Progress.Bar
                        progress={status.percentage}
                        width={null}
                        height={4}
                        color={status.color}
                        unfilledColor={colors.muted}
                        borderWidth={0}
                      />
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>


          <View className="mb-6">
            <SelectList
              placeholder="Filter by status"
              setSelected={setSelectedFilter}
              data={filterOptions}
              save="key"
              boxStyles={{
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderRadius: 12,
              }}
              dropdownStyles={{
                backgroundColor: colors.card,
                borderColor: colors.border,
              }}
              inputStyles={{ color: colors.foreground }}
              dropdownTextStyles={{ color: colors.foreground }}
            />
          </View>


          <View className="mb-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text
                className="text-lg font-semibold"
                style={{ color: colors.foreground }}
              >
                Active Budgets ({filteredBudgets.length})
              </Text>
              <Pressable
                onPress={() =>
                  Alert.alert("Add Budget", "Add new budget functionality")
                }
                className="px-4 py-2 rounded-lg"
                style={{ backgroundColor: colors.primary }}
              >
                <Text className="text-white font-medium">Add New</Text>
              </Pressable>
            </View>

            {filteredBudgets.length > 0 ? (
              <View className="space-y-3">
                {filteredBudgets.map((item) => (
                  <BudgetItemCard
                    key={item.id}
                    item={item}
                    colors={colors}
                    onPress={() =>
                      Alert.alert(
                        "Budget Details",
                        `View details for ${item.title}`
                      )
                    }
                  />
                ))}
              </View>
            ) : (
              <View
                className="p-8 rounded-xl items-center"
                style={{ backgroundColor: colors.card }}
              >
                <Text
                  className="text-base opacity-70 text-center"
                  style={{ color: colors.foreground }}
                >
                  No budgets found for the selected filter
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}


function BudgetItemCard({
  item,
  colors,
  onPress,
}: {
  item: BudgetItem;
  colors: any;
  onPress: () => void;
}) {
  const statusColor = {
    pending: "#f59e0b",
    approved: "#10b981",
    disbursed: "#3b82f6",
    completed: "#6b7280",
  }[item.status];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Pressable onPress={onPress} className="p-0">
      <View
        className="p-4 rounded-xl border"
        style={{
          backgroundColor: colors.card,
          borderColor: colors.border,
        }}
      >
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-1 mr-3">
            <Text
              className="text-base font-semibold mb-1"
              style={{ color: colors.foreground }}
            >
              {item.title}
            </Text>
            <Text
              className="text-sm opacity-70"
              style={{ color: colors.foreground }}
            >
              {item.category}
            </Text>
          </View>
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: `${statusColor}20` }}
          >
            <Text
              className="text-xs font-medium capitalize"
              style={{ color: statusColor }}
            >
              {item.status}
            </Text>
          </View>
        </View>


        <View className="flex-row justify-between items-center mb-3">
          <View>
            <Text
              className="text-xs opacity-70"
              style={{ color: colors.foreground }}
            >
              Total Budget
            </Text>
            <Text
              className="text-lg font-bold"
              style={{ color: colors.foreground }}
            >
              {formatCurrency(item.amount)}
            </Text>
          </View>
          <View className="items-end">
            <Text
              className="text-xs opacity-70"
              style={{ color: colors.foreground }}
            >
              Spent
            </Text>
            <Text className="text-lg font-bold" style={{ color: statusColor }}>
              {formatCurrency(item.spent)}
            </Text>
          </View>
        </View>


        <View className="mb-3">
          <View className="flex-row justify-between items-center mb-2">
            <Text
              className="text-xs opacity-70"
              style={{ color: colors.foreground }}
            >
              Progress
            </Text>
            <Text
              className="text-xs font-medium"
              style={{ color: colors.foreground }}
            >
              {Math.round(item.progress * 100)}%
            </Text>
          </View>
          <Progress.Bar
            progress={item.progress}
            width={null}
            height={6}
            color={statusColor}
            unfilledColor={colors.muted}
            borderWidth={0}
            borderRadius={3}
          />
        </View>


        <View className="flex-row items-center justify-between">
          <Text
            className="text-xs opacity-70"
            style={{ color: colors.foreground }}
          >
            Deadline: {new Date(item.deadline).toLocaleDateString()}
          </Text>
          <Text
            className="text-xs font-medium"
            style={{ color: colors.primary }}
          >
            View Details →
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
