import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface QuickActionButtonProps {
  label: string;
  icon: string;
  primary?: boolean;
  onPress: () => void;
  disabled?: boolean;
}

export const QuickActionButton: React.FC<QuickActionButtonProps> = ({ 
  label, 
  icon, 
  primary = false, 
  onPress, 
  disabled = false 
}) => {
  return (
    <TouchableOpacity
      className="px-4 py-4 rounded-xl flex-row items-center justify-center"
      style={{
        backgroundColor: disabled 
          ? '#f8f9fa' 
          : primary 
            ? '#28a745' 
            : '#ffffff',
        borderColor: disabled 
          ? '#e9ecef' 
          : primary 
            ? '#28a745' 
            : '#f1f3f4',
        borderWidth: 2,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: disabled 
          ? 0.01 
          : primary 
            ? 0.1 
            : 0.03,
        shadowRadius: 6,
        elevation: disabled ? 1 : primary ? 4 : 2,
        minHeight: 60,
        opacity: disabled ? 0.6 : 1,
      }}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text 
        className="text-lg mr-2"
        style={{ 
          color: disabled 
            ? '#6c757d' 
            : primary 
              ? '#ffffff' 
              : '#6c757d' 
        }}
      >
        {icon}
      </Text>
      
      <Text 
        className="font-semibold text-sm text-center"
        style={{ 
          color: disabled 
            ? '#6c757d' 
            : primary 
              ? '#ffffff' 
              : '#000000',
          flexShrink: 1,
        }}
        numberOfLines={2}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default QuickActionButton;