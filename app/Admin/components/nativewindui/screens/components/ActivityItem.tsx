import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface ActivityItemProps {
  data: any;
  onPress?: () => void;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({
  data,
  onPress,
}) => {

  /* 
  List type of activity and component declaration
  1. activity
  2. receipt
  3. signup
  Note: do not display message

Structures
1. activity
author : "2e95df8a-5188-487f-b4cb-dbf90ebdbac9"
created_at: "2025-06-27T03:29:57.665Z"
deleted_at: null
id: "603c49ef-35bc-4a29-9ee2-62d4387f0b57"
message: 
      {title: 'Receipt Upload', message: 'You updated your budget expense record on [Publishing]'}
receiver: "2e95df8a-5188-487f-b4cb-dbf90ebdbac9"
status: "approved"
type: "receipt"
updated_at: null


2. receipt
receiver: 'f4637785-149b-46d7-949c-f42637a3495c',
message: [Object],
type: 'receipt',
status: 'approved',
author: 'f4637785-149b-46d7-949c-f42637a3495c',
id: 'd0e46cb6-4a37-4807-ba10-03747890389d',
updated_at: null,
created_at: 2025-06-27T11:35:32.566Z,
deleted_at: null
  */

// construct a custom object to hold the data

 const activity = data.user_transaction;

let mytemplate = {
  userid: activity.author,
  activityType: activity.type,
  id: activity.id,
  content: activity.message,
  date: activity.created_at,
  status: activity.status,
  action: activity.type
}


    
const action = activity.type



  const getStatusColor = (typedata:string) => {
    switch (typedata) {
      case "approved":
        return "#28a745";
      case "pending":
        return "#17a2b8";
      case "declined":
        return "#ffc107";
      case "deleted":
        return "#dc3545";
      default:
        return "#6c757d";
    }
  };


  const getStatusIcon = (typedata:string) => {
    switch (typedata) {
      case "approved":
        return "✓";
      case "pending":
        return "ℹ";
      case "declined":
        return "⚠";
      case "deleted":
        return "✕";
      default:
        return "•";
    }
  };


  return (
    <TouchableOpacity
      className="flex-row items-start py-3 px-4 rounded-lg mb-2"
      style={{
        backgroundColor: "#fafbfc",
        borderColor: "#f1f3f4",
        borderWidth: 1,
      }}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`View details for ${action}`}
    >
      {/* Status Indicator */}
      <View
        className="w-6 h-6 rounded-full mr-3 mt-0.5 items-center justify-center"
        style={{
          backgroundColor: getStatusColor(mytemplate.status),
          minWidth: 24,
          minHeight: 24,
        }}
      >
        <Text className="text-xs font-bold" style={{ color: "#ffffff" }}>
          {getStatusIcon(mytemplate.status)}
        </Text>
      </View>

      {/* Content */}
      <View className="flex-1">
        <Text className="text-sm font-medium mb-1" style={{ color: "#000000" }}>
          {action}
        </Text>

        <View className="flex-row justify-between items-center">
          <Text className="text-xs" style={{ color: "#6c757d" }}>
            {mytemplate.content.title}
          </Text>
          <Text className="text-xs" style={{ color: "#6c757d" }}>
           {String(">>>")} {mytemplate.date}
          </Text>
          <Text className="text-xs" style={{ color: "#6c757d" }}>
            
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ActivityItem;
