import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Icon } from "@roninoss/icons";
import { useColorScheme } from "../../lib/useColorScheme";
import { CUSTOM_BRAND_COLORS } from "../../theme/colors";

interface AdminTopNavProps {
  navigation: any;
}

export function AdminTopNav({ navigation }: AdminTopNavProps) {
  const { isDarkColorScheme, colors } = useColorScheme();

  const handleMenuPress = () => {
    navigation.openDrawer();
  };

  const handleNotificationPress = () => {
    // Handle notification press
    console.log("Notifications pressed");
  };

  const handleProfilePress = () => {
    // Handle profile press
    console.log("Profile pressed");
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkColorScheme ? "#1e293b" : "#ffffff",
          borderBottomColor: isDarkColorScheme ? "#334155" : "#e2e8f0",
        },
      ]}
    >
      {/* Left side - Menu button */}
      <TouchableOpacity
        onPress={handleMenuPress}
        style={styles.menuButton}
        activeOpacity={0.7}
      >
        <Icon
          name={"list" as any}
          size={24}
          color={isDarkColorScheme ? "#f8fafc" : "#0f172a"}
        />
      </TouchableOpacity>

      {/* Center - Title */}
      <View style={styles.titleContainer}>
        <Text
          style={[
            styles.title,
            { color: isDarkColorScheme ? "#f8fafc" : "#0f172a" },
          ]}
        >
          Coming Soon
        </Text>
      </View>

      {/* Right side - Actions */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={handleNotificationPress}
          style={styles.actionButton}
          activeOpacity={0.7}
        >
          <Icon
            name="bell"
            size={20}
            color={isDarkColorScheme ? "#f8fafc" : "#0f172a"}
          />
          {/* Notification badge */}
          <View
            style={[
              styles.badge,
              { backgroundColor: CUSTOM_BRAND_COLORS.error },
            ]}
          >
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleProfilePress}
          style={styles.actionButton}
          activeOpacity={0.7}
        >
          <Icon
            name="account-circle"
            size={24}
            color={isDarkColorScheme ? "#f8fafc" : "#0f172a"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: Platform.OS === "ios" ? 12 : 16,
    borderBottomWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "600",
  },
});
