import { Component, ReactNode } from 'react';
import { Button, TouchableHighlight, View, ScrollView } from 'react-native';
import {} from 'react-native-safe-area-context';
import { Text } from './Text';
import '~/global.css';
import { Icon } from '@roninoss/icons';
import { TransactionList } from './transactionList';
import { SelectList } from 'react-native-dropdown-select-list';
import { GrantFeatureList } from './grantFeatureList';
import { GrantFeatureGraph } from './grantFeatureGraph';
import { AcivityPage } from './activitiesPage';
import { useRouter } from 'expo-router';
import GrantDropList from './grantList';
import { COLORS } from '~/theme/colors';

// TypeScript interfaces for better type safety
interface UserRecordState {
  isChart: boolean;
}

interface UserRecordProps {}

interface ComponentProps {}

interface ComponentState {}

export function UserHome() {
  const navigation = useRouter();

  return (
    <ScrollView className="px-1 py-2" showsVerticalScrollIndicator={false}>
      {/* header */}
      <View className="flex flex-row items-center justify-between px-2 py-4">
        <Text
          className="text-3xl font-bold tracking-tight"
          style={{ color: COLORS.dark.foreground }}>
          Dashboard
        </Text>
        <Text
          className="text-xs font-medium tracking-wide opacity-70"
          style={{ color: COLORS.dark.textSecondary }}>
          Organization | name
        </Text>
      </View>

      {/* Asset Balance Display */}
      <View
        className="mx-1 mb-2 rounded-2xl p-6 shadow-2xl"
        style={{ backgroundColor: COLORS.dark.card }}>
        <View className="mb-4 flex flex-row items-center justify-between">
          <Text
            className="text-sm font-medium tracking-wide"
            style={{ color: COLORS.dark.textSecondary }}>
            Total Available
          </Text>
          <View className="rounded-xl px-3 py-2" style={{ backgroundColor: COLORS.dark.grey3 }}>
            <Text className="text-xs font-medium" style={{ color: COLORS.dark.accent }}>
              Icon +N2,500 this month
            </Text>
          </View>
        </View>

        <View className="mb-3">
          <Text
            className="text-3xl font-bold tracking-tight"
            style={{ color: COLORS.dark.foreground }}>
            N12,450.00
          </Text>
        </View>
        <View>
          <Text
            className="text-xs font-medium opacity-80"
            style={{ color: COLORS.dark.textSecondary }}>
            last updated 2 min 12 sec ago
          </Text>
        </View>
      </View>

      {/* Transaction actions */}
      <View className="flex flex-row justify-between px-1 py-4">
        <TouchableHighlight
          className="flex-1 rounded-2xl p-4 shadow-sm"
          style={{ backgroundColor: COLORS.dark.accent }}
          onPress={() => {
            navigation.push('/(dashboard)/upload');
            console.log('Button clicked');
          }}>
          <Text
            className="flex flex-row items-center text-base font-semibold tracking-wide"
            style={{ color: COLORS.white }}>
            <Icon name="arrow-up-bold-circle" size={20} color={COLORS.white} />
            Upload
          </Text>
        </TouchableHighlight>
      </View>
      {/* <View className="d-none shadow-md bg-gray-400 flex flex-row p-3 h-4">
                     <Text>Display News</Text>
                 </View> */}

      {/* Display Recent Transactions */}
      <View className="mt-2">
        <View className="mb-4 flex flex-row justify-between px-2">
          <Text
            className="text-lg font-semibold tracking-tight"
            style={{ color: COLORS.dark.foreground }}>
            Transactions
          </Text>
          <TouchableHighlight
            className="rounded-lg px-3 py-1"
            style={{ backgroundColor: `${COLORS.dark.accent}15` }}
            onPress={() => {
              const navigation = useRouter();
              navigation.navigate('/(dashboard)/records');
            }}>
            <Text className="text-sm font-bold" style={{ color: COLORS.dark.accent }}>
              View All
            </Text>
          </TouchableHighlight>
        </View>

        <View className="px-1">
          <TransactionList />
        </View>
      </View>
    </ScrollView>
  );
}

export class UserRecord extends Component<UserRecordProps, UserRecordState> {
  constructor(props: UserRecordProps) {
    super(props);
    this.state = {
      isChart: false,
    };
  }

  toggleScreen() {
    this.setState({ isChart: !this.state.isChart });
  }

  render(): ReactNode {
    return (
      <ScrollView className="px-2 py-2" showsVerticalScrollIndicator={false}>
        <Text
          className="mb-3 text-lg font-bold tracking-tight"
          style={{ color: COLORS.dark.foreground }}>
          Budget Details
        </Text>
        <GrantDropList
          userGrant={''}
          validation={{
            setFieldTouched: () => {},
            setFieldValue: () => {},
            values: {},
          }}
        />
        {/* Display selected grant */}
        <View>
          <View
            className="mt-3 rounded-xl p-4 shadow-lg"
            style={{ backgroundColor: COLORS.dark.card }}>
            <View className="mb-3 flex flex-row items-center justify-between">
              <Text
                className="text-xs font-medium tracking-wide"
                style={{ color: COLORS.dark.textSecondary }}>
                Total Available
              </Text>
              <View className="rounded-lg px-2 py-1" style={{ backgroundColor: COLORS.dark.grey3 }}>
                <Text className="text-xs font-medium" style={{ color: COLORS.dark.destructive }}>
                  Total Spent
                </Text>
              </View>
            </View>
            <View className="mb-2 flex flex-row justify-between">
              <Text
                className="text-xl font-bold tracking-tight"
                style={{ color: COLORS.dark.foreground }}>
                ₦12,450.00
              </Text>

              <Text
                className="text-xl font-bold tracking-tight"
                style={{ color: COLORS.dark.destructive }}>
                ₦8,200.00
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text
                className="text-xs font-medium opacity-70"
                style={{ color: COLORS.dark.textSecondary }}>
                Dec 23, 2024
              </Text>
              <Text
                className="text-xs font-medium opacity-70"
                style={{ color: COLORS.dark.textSecondary }}>
                ₦3,000 this week
              </Text>
            </View>
          </View>
          {/* Filter */}
          <View
            className="mt-3 flex flex-row items-center justify-between rounded-xl px-3 py-2 shadow-sm"
            style={{ backgroundColor: COLORS.dark.accent }}>
            <TouchableHighlight
              className="rounded-lg p-2"
              style={{ backgroundColor: COLORS.white, opacity: 0.2 }}
              onPress={() => {
                this.toggleScreen();
              }}>
              {this.state.isChart ? (
                <Icon color={COLORS.white} name="chart-pie" size={18} />
              ) : (
                <Icon color={COLORS.white} name="clipboard-list" size={18} />
              )}
            </TouchableHighlight>
            <TouchableHighlight
              className="rounded-lg p-2"
              style={{ backgroundColor: COLORS.white, opacity: 0.2 }}
              onPress={() => {
                console.log('Open date');
              }}>
              <Icon color={COLORS.white} name="calendar-clock" size={18} />
            </TouchableHighlight>
          </View>
          {/* Display the analysis of selected grant */}
          {this.state.isChart ? <ShowChartInterface /> : <ShowListInterface />}
        </View>
      </ScrollView>
    );
  }
}

function ShowChartInterface() {
  return <GrantFeatureGraph />;
}

function ShowListInterface() {
  return <GrantFeatureList />;
}

export class Acivity extends Component<ComponentProps, ComponentState> {
  render(): ReactNode {
    return <AcivityPage />;
  }
}

export class Settings extends Component<ComponentProps, ComponentState> {
  render(): ReactNode {
    return (
      <View className="m-3">
        <View className="flex flex-row items-center justify-between">
          <Text className="font-bold" style={{ color: COLORS.dark.foreground }}>
            Settings
          </Text>
          <TouchableHighlight
            className="rounded-sm p-1"
            style={{ backgroundColor: COLORS.dark.card }}
            onPress={() => {
              const navigation = useRouter();
              navigation.navigate('/(dashboard)/new');
            }}>
            <View className="flex flex-row items-center">
              <Text
                className="flex flex-row items-center text-xs"
                style={{ color: COLORS.dark.accent }}>
                New{' '}
              </Text>
              <Icon color={COLORS.dark.accent} size={10} name="plus" />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
