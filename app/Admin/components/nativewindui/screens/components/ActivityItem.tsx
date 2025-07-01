import React from 'react';
import { Text, View } from 'react-native';

interface ActivityItemProps {
  action: string;
  user: string;
  time: string;
  type: 'success' | 'info' | 'warning' | 'error';
  data: any
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ action, user, time, type, data }) => {
  const getStatusColor = () => {
    switch (type) {
      case 'success': return '#28a745';
      case 'info': return '#17a2b8';
      case 'warning': return '#ffc107';
      case 'error': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusIcon = () => {
    switch (type) {
      case 'success': return '✓';
      case 'info': return 'ℹ';
      case 'warning': return '⚠';
      case 'error': return '✕';
      default: return '•';
    }
  };

  return (
    <View
      className="flex-row items-start py-3 px-4 rounded-lg mb-2"
      style={{
        backgroundColor: '#fafbfc',
        borderColor: '#f1f3f4',
        borderWidth: 1,
      }}
    >
      {/* Status Indicator */}
      <View
        className="w-6 h-6 rounded-full mr-3 mt-0.5 items-center justify-center"
        style={{
          backgroundColor: getStatusColor(),
          minWidth: 24,
          minHeight: 24,
        }}
      >
        <Text
          className="text-xs font-bold"
          style={{ color: '#ffffff' }}
        >
          {getStatusIcon()}
        </Text>
      </View>
      
      {/* Content */}
      <View className="flex-1">
        <Text 
          className="text-sm font-medium mb-1" 
          style={{ color: '#000000' }}
        >
          {action}
        </Text>
        
        <View className="flex-row justify-between items-center">
          <Text 
            className="text-xs" 
            style={{ color: '#6c757d' }}
          >
            by {user}
          </Text>
          
          <Text 
            className="text-xs" 
            style={{ color: '#6c757d' }}
          >
            {time}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ActivityItem;