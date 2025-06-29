import React from 'react';
import { View, Text } from 'react-native';

interface KPICardProps {
  title: string;
  value: string;
  isPositive: boolean;
  trend: string;
}

export const KPICard: React.FC<KPICardProps> = ({ title, value, isPositive, trend }) => {
  return (
    <View
      className="p-6 rounded-xl"
      style={{
        backgroundColor: '#ffffff',
        borderColor: '#f1f3f4',
        borderWidth: 1,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        minHeight: 120,
        justifyContent: 'space-between',
      }}
    >
      {/* Header */}
      <View className="mb-3">
        <Text 
          className="text-sm font-medium mb-1" 
          style={{ color: '#6c757d' }}
        >
          {title}
        </Text>
        <Text 
          className="text-2xl font-bold" 
          style={{ color: '#000000' }}
        >
          {value}
        </Text>
      </View>
      
      {/* Trend Indicator */}
      <View className="flex-row items-center">
        <View
          className="px-2 py-1 rounded-md mr-2"
          style={{
            backgroundColor: isPositive ? '#d4edda' : '#f8d7da',
          }}
        >
          <Text
            className="text-xs font-semibold"
            style={{
              color: isPositive ? '#28a745' : '#dc3545',
            }}
          >
            {trend}
          </Text>
        </View>
        <Text 
          className="text-xs" 
          style={{ color: '#6c757d' }}
        >
          vs last month
        </Text>
      </View>
    </View>
  );
};

export default KPICard;