import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import {
  CUSTOM_BRAND_COLORS,
  globalStyles,
  textStyles,
  buttonStyles,
  inputStyles,
  layoutStyles,
  shadowStyles,
  graphStyles,
} from '../../theme';

/**
 * Example component demonstrating proper usage of the new FigTrack theme system
 * This serves as a reference for implementing consistent styling across the app
 */
export const ThemedComponentExample: React.FC = () => {
  return (
    <ScrollView style={globalStyles.container}>
      {/* Header Section */}
      <View style={[layoutStyles.padding]}>
        <Text style={textStyles.title}>FigTrack Dashboard</Text>
        <Text style={textStyles.bodySecondary}>Welcome back to your financial overview</Text>
      </View>

      {/* Balance Card */}
      <View style={[globalStyles.card, shadowStyles.medium, layoutStyles.marginHorizontal]}>
        <Text style={textStyles.subtitle}>Total Balance</Text>
        <Text style={[textStyles.title, { fontSize: 32 }]}>$12,345.67</Text>
        <View style={[layoutStyles.rowBetween, { marginTop: 12 }]}>
          <Text style={textStyles.bodySecondary}>Last updated</Text>
          <Text style={textStyles.notification}>+2.5% this month</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={[layoutStyles.padding]}>
        <Text style={textStyles.heading}>Quick Actions</Text>
        <View style={[layoutStyles.row, { gap: 12, marginTop: 8 }]}>
          <TouchableOpacity style={[buttonStyles.primary, { flex: 1 }]}>
            <Text style={buttonStyles.primaryText}>Add Income</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[buttonStyles.secondary, { flex: 1 }]}>
            <Text style={buttonStyles.secondaryText}>Add Expense</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Transaction Form Example */}
      <View style={[globalStyles.card, layoutStyles.marginHorizontal]}>
        <Text style={textStyles.subtitle}>Add Transaction</Text>
        
        <View style={inputStyles.container}>
          <Text style={inputStyles.label}>Amount</Text>
          <TextInput
            style={inputStyles.input}
            placeholder="Enter amount"
            placeholderTextColor="#B8B8B8"
            keyboardType="numeric"
          />
        </View>

        <View style={inputStyles.container}>
          <Text style={inputStyles.label}>Description</Text>
          <TextInput
            style={inputStyles.input}
            placeholder="What was this for?"
            placeholderTextColor="#B8B8B8"
          />
        </View>

        <TouchableOpacity style={buttonStyles.primary}>
          <Text style={buttonStyles.primaryText}>Save Transaction</Text>
        </TouchableOpacity>
      </View>

      {/* Chart Section */}
      <View style={[graphStyles.container, layoutStyles.marginHorizontal]}>
        <Text style={graphStyles.title}>Monthly Spending</Text>
        <View style={{
          height: 200,
          backgroundColor: CUSTOM_BRAND_COLORS.majorBackground,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={[textStyles.body, { textAlign: 'center' }]}>Chart Component\nWould Go Here</Text>
        </View>
      </View>

      {/* Recent Transactions */}
      <View style={[globalStyles.card, layoutStyles.marginHorizontal]}>
        <Text style={textStyles.subtitle}>Recent Transactions</Text>
        
        {/* Transaction Item */}
        <View style={[globalStyles.subCard]}>
          <View style={layoutStyles.rowBetween}>
            <View>
              <Text style={textStyles.body}>Coffee Shop</Text>
              <Text style={textStyles.caption}>Today, 2:30 PM</Text>
            </View>
            <Text style={[textStyles.warning, { fontSize: 16 }]}>-$4.50</Text>
          </View>
        </View>

        <View style={[globalStyles.subCard]}>
          <View style={layoutStyles.rowBetween}>
            <View>
              <Text style={textStyles.body}>Salary Deposit</Text>
              <Text style={textStyles.caption}>Yesterday, 9:00 AM</Text>
            </View>
            <Text style={[textStyles.notification, { fontSize: 16 }]}>+$3,200.00</Text>
          </View>
        </View>

        <View style={[globalStyles.subCard]}>
          <View style={layoutStyles.rowBetween}>
            <View>
              <Text style={textStyles.body}>Grocery Store</Text>
              <Text style={textStyles.caption}>2 days ago</Text>
            </View>
            <Text style={[textStyles.warning, { fontSize: 16 }]}>-$87.23</Text>
          </View>
        </View>
      </View>

      {/* Warning Section */}
      <View style={[globalStyles.card, layoutStyles.marginHorizontal, { borderLeftWidth: 4, borderLeftColor: CUSTOM_BRAND_COLORS.warning }]}>
        <Text style={textStyles.warning}>Budget Alert</Text>
        <Text style={textStyles.body}>You've spent 85% of your monthly dining budget.</Text>
        <TouchableOpacity style={[buttonStyles.warning, { marginTop: 12 }]}>
          <Text style={buttonStyles.warningText}>View Budget Details</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Spacing */}
      <View style={{ height: 32 }} />
    </ScrollView>
  );
};

export default ThemedComponentExample;