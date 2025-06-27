import React, { useState, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Animated } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { useColorScheme } from "../../lib/useColorScheme";
import { COLORS } from "../../theme/colors";
import {
  ADMIN_SCREEN_COMPONENTS,
  AdminScreenKey,
} from "../../components/nativewindui";
import {
  UserAccountManagementScreen,
  TransactionMonitoringScreen,
  GrantMonitoringScreen,
  FinancialReportsScreen,
  ReceiptProcessingScreen,
  DocumentApprovalScreen,
  AuditTrailScreen,
  BulkDocumentOperationScreen,
  InstitutionManagementScreen,
  SystemConfigurationScreen,
  CommunicationSupportScreen,
} from "../../components/nativewindui";

const { width: screenWidth } = Dimensions.get('window');

const SCREEN_OPTIONS = [
  { key: "user-account-management", label: "User Account Management" },
  { key: "transaction-monitoring", label: "Transaction Monitoring" },
  { key: "grant-monitoring", label: "Grant Monitoring" },
  { key: "financial-reports", label: "Financial Reports" },
  { key: "receipt-processing", label: "Receipt Processing" },
  { key: "document-approval", label: "Document Approval" },
  { key: "audit-trail", label: "Audit Trail" },
  { key: "bulk-document-operation", label: "Bulk Document Operations" },
  { key: "institution-management", label: "Institution Management" },
  { key: "system-configuration", label: "System Configuration" },
  { key: "communication-support", label: "Communication & Support" },
] as const;

export default function AdminSkeletonDemo() {
  const { isDarkColorScheme } = useColorScheme();
  const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;
  const [selectedScreenIndex, setSelectedScreenIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  const selectedScreen = SCREEN_OPTIONS[selectedScreenIndex].key;
  const SelectedComponent = ADMIN_SCREEN_COMPONENTS[selectedScreen];

  const handleTabPress = (index: number) => {
    setSelectedScreenIndex(index);
    scrollViewRef.current?.scrollTo({ x: index * screenWidth, animated: true });
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: false }
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX, velocityX } = event.nativeEvent;
      const threshold = screenWidth * 0.3;
      
      let newIndex = selectedScreenIndex;
      
      if (translationX > threshold || velocityX > 500) {
        // Swipe right - go to previous screen
        newIndex = Math.max(0, selectedScreenIndex - 1);
      } else if (translationX < -threshold || velocityX < -500) {
        // Swipe left - go to next screen
        newIndex = Math.min(SCREEN_OPTIONS.length - 1, selectedScreenIndex + 1);
      }
      
      if (newIndex !== selectedScreenIndex) {
        setSelectedScreenIndex(newIndex);
        scrollViewRef.current?.scrollTo({ x: newIndex * screenWidth, animated: true });
      }
      
      // Reset animation
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View
      className="flex-1"
      style={{ backgroundColor: currentColors.background }}
    >
      {/* Header */}
      <View
        className="px-4 py-3 border-b"
        style={{ borderBottomColor: currentColors.border }}
      >
        <Text
          className="text-xl font-bold"
          style={{ color: currentColors.foreground }}
        >
          Admin Skeleton Components Demo
        </Text>
        <Text
          className="text-sm mt-1"
          style={{ color: currentColors.textSecondary }}
        >
          Select a component to preview its skeleton layout
        </Text>
      </View>

      {/* Tab Bar */}
      <View
        className="border-b"
        style={{
          borderBottomColor: currentColors.border,
          backgroundColor: currentColors.card,
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-2 py-3"
          contentContainerStyle={{ paddingHorizontal: 8 }}
        >
          {SCREEN_OPTIONS.map((option, index) => (
            <TouchableOpacity
              key={option.key}
              onPress={() => handleTabPress(index)}
              className={`px-4 py-2 mx-1 rounded-full ${
                selectedScreenIndex === index ? "opacity-100" : "opacity-70"
              }`}
              style={{
                backgroundColor:
                  selectedScreenIndex === index
                    ? currentColors.primary
                    : currentColors.muted,
                minWidth: 120,
              }}
            >
              <Text
                className="text-xs font-medium text-center"
                style={{
                  color:
                    selectedScreenIndex === index
                      ? "#ffffff"
                      : currentColors.foreground,
                }}
                numberOfLines={1}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Swipeable Content */}
      <View className="flex-1">
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View className="flex-1">
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}
              onMomentumScrollEnd={(event) => {
                const newIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
                if (newIndex !== selectedScreenIndex) {
                  setSelectedScreenIndex(newIndex);
                }
              }}
            >
              {SCREEN_OPTIONS.map((option, index) => {
                const Component = ADMIN_SCREEN_COMPONENTS[option.key];
                return (
                  <View key={option.key} style={{ width: screenWidth }}>
                    <Component />
                  </View>
                );
              })}
            </ScrollView>
          </Animated.View>
        </PanGestureHandler>
      </View>

      {/* Screen Indicator */}
      <View
        className="flex-row justify-center py-2"
        style={{ backgroundColor: currentColors.card }}
      >
        {SCREEN_OPTIONS.map((_, index) => (
          <View
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              selectedScreenIndex === index ? "opacity-100" : "opacity-30"
            }`}
            style={{
              backgroundColor: currentColors.primary,
            }}
          />
        ))}
      </View>
    </View>
  );
}
