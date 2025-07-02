import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface AlertCardProps {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  time: string;
  onDismiss?: () => void;
  onView?: () => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({ 
  title, 
  description, 
  priority, 
  time, 
  onDismiss, 
  onView 
}) => {
  const getPriorityColor = () => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getPriorityBgColor = () => {
    switch (priority) {
      case 'high': return '#f8d7da';
      case 'medium': return '#fff3cd';
      case 'low': return '#d4edda';
      default: return '#f8f9fa';
    }
  };

  return (
    <View
      className="p-4 rounded-xl mb-3"
      style={{
        backgroundColor: '#ffffff',
        borderLeftWidth: 4,
        borderLeftColor: getPriorityColor(),
        borderColor: '#f1f3f4',
        borderWidth: 1,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      {/* Header with Priority Badge */}
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1 mr-3">
          <View className="flex-row items-center mb-1">
            <Text 
              className="text-base font-semibold mr-2" 
              style={{ color: '#000000' }}
            >
              {title}
            </Text>
            <View
              className="px-2 py-1 rounded-md"
              style={{ backgroundColor: getPriorityBgColor() }}
            >
              <Text
                className="text-xs font-medium capitalize"
                style={{ color: getPriorityColor() }}
              >
                {priority}
              </Text>
            </View>
          </View>
          <Text 
            className="text-sm leading-5" 
            style={{ color: '#6c757d' }}
          >
            {description}
          </Text>
        </View>
      </View>
      
      {/* Footer with Time and Actions */}
      <View className="flex-row justify-between items-center mt-3">
        <Text 
          className="text-xs" 
          style={{ color: '#6c757d' }}
        >
          {time}
        </Text>
        
        <View className="flex-row space-x-2">
          {onView && (
            <TouchableOpacity
              className="px-3 py-1 rounded-md"
              style={{ backgroundColor: '#f8f9fa' }}
              onPress={onView}
            >
              <Text 
                className="text-xs font-medium" 
                style={{ color: '#6c757d' }}
              >
                View
              </Text>
            </TouchableOpacity>
          )}
          
          {onDismiss && (
            <TouchableOpacity
              className="px-3 py-1 rounded-md ml-2"
              style={{ backgroundColor: '#28a745' }}
              onPress={onDismiss}
            >
              <Text 
                className="text-xs font-medium" 
                style={{ color: '#ffffff' }}
              >
                Dismiss
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default AlertCard;