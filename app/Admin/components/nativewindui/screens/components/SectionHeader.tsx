import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  actionOnPress?: () => void;
  badge?: number;
  subtitle?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  actionLabel, 
  actionOnPress, 
  badge, 
  subtitle 
}) => {
  return (
    <View className="flex-row justify-between items-center mb-4">
      {/* Title Section */}
      <View className="flex-1">
        <View className="flex-row items-center">
          <Text 
            className="text-xl font-bold" 
            style={{ color: '#000000' }}
          >
            {title}
          </Text>
          
          {/* Badge */}
          {badge !== undefined && badge > 0 && (
            <View
              className="ml-2 px-2 py-1 rounded-full"
              style={{
                backgroundColor: '#dc3545',
                minWidth: 20,
                minHeight: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                className="text-xs font-bold"
                style={{ color: '#ffffff' }}
              >
                {badge > 99 ? '99+' : badge.toString()}
              </Text>
            </View>
          )}
        </View>
        
        {/* Subtitle */}
        {subtitle && (
          <Text 
            className="text-sm mt-1" 
            style={{ color: '#6c757d' }}
          >
            {subtitle}
          </Text>
        )}
      </View>
      
      {/* Action Button */}
      {actionLabel && actionOnPress && (
        <TouchableOpacity
          className="px-3 py-2 rounded-lg"
          style={{ 
            backgroundColor: '#f8f9fa',
            borderColor: '#e9ecef',
            borderWidth: 1,
          }}
          onPress={actionOnPress}
          activeOpacity={0.7}
        >
          <Text 
            className="text-sm font-medium" 
            style={{ color: '#6c757d' }}
          >
            {actionLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;