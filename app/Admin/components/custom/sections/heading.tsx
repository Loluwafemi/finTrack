
import { Icon } from "@roninoss/icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useColorScheme } from "~/lib/useColorScheme";
import { COLORS } from "~/theme/colors";
import { SKELETON_SCREENS } from "../screenSelector";


export default function DashboardHeader({ data }) {
    const { isDarkColorScheme } = useColorScheme();
    const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;
    const [selectedScreen, setSelectedScreen] = useState(SKELETON_SCREENS[0]);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
    const SelectedComponent = selectedScreen.component;
  

    return (
        <View>

            <View
                className="px-4 py-3 border-b flex-row items-center justify-between"
                style={{
                    borderBottomColor: currentColors.border,
                    backgroundColor: currentColors.card,
                }}
                >
                <View className="flex-row items-center">
                    <TouchableOpacity
                    onPress={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="mr-3 p-2 rounded-lg"
                    style={{ backgroundColor: currentColors.background }}
                    >
                    <Icon
                        name={(sidebarCollapsed ? "menu" : "close") as any}
                        size={20}
                        color={currentColors.foreground}
                    />
                    </TouchableOpacity>

                    <Text
                    className="text-xl font-bold"
                    style={{ color: currentColors.foreground }}
                    >
                    WELCOME {String(data.firstname).toUpperCase()}!
                    </Text>
                </View>
                <View className="flex-row items-center">
                    <View className="mr-2">
                    <Icon name="grid" size={20} color={currentColors.textSecondary} />
                    </View>
                    <Text
                    className="text-sm"
                    style={{ color: currentColors.textSecondary }}
                    >
                    Development Mode
                    </Text>
                </View>
            </View>

        </View>
    )
} 