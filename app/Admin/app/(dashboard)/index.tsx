import { PAGEMIDDLEWARE, SKELETON_SCREENS } from "@/components/custom/screenSelector";
import UserInformationDisplayer from "@/components/custom/sections/detailer";
import DashboardHeader from "@/components/custom/sections/heading";
import { User, unitUserType } from "@/lib/auth";
import { getRoute } from "@/src/constants/routes";
import { Icon } from "@roninoss/icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useColorScheme } from "../../lib/useColorScheme";
import { COLORS } from "../../theme/colors";
/**
 * Dashboard Index Screen
 *
 * This is the main entry point for the admin dashboard.
 * Currently showing "Coming Soon" message while preserving the original styling and layout.
 *
 * The screen is fully responsive and adapts to both light and dark themes.
 */


export default function DashboardIndex() {
  const { isDarkColorScheme } = useColorScheme();
  const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;
  const [selectedScreen, setSelectedScreen] = useState(SKELETON_SCREENS[0]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const userObject = new User()
  const [status, setStatus] = React.useState(false)
  const [ auth, setAuth ] = React.useState<unitUserType|{}>({})

  const SelectedComponent = selectedScreen.component;
  React.useEffect(()=>{
    const getSession = async () => {
      try {
        const response = await User.isAlive()

        if (response.status) {            
            setStatus(true)

            const user = await userObject.user()
            
            if (user.status) {
                setAuth(user.data)
            }

            return router.navigate(getRoute('DASHBOARD'));
        }else{
          setStatus(false)
          return router.navigate(getRoute('AUTH'));

        }
      } catch (error) {
        setStatus(false)
      }
    };
    getSession();
  }, [])  


  return (
  <View
      className="flex-1"
      style={{ backgroundColor: currentColors.background }}
    >
    <UserInformationDisplayer data={auth} />

    <DashboardHeader data={auth} />
  
    <View className="flex-1 flex-row">
      {/* Sidebar */}
      {!sidebarCollapsed && (
        <View
          className="w-80 border-r"
          style={{
            borderRightColor: currentColors.border,
            backgroundColor: currentColors.card,
          }}
        >
          <ScrollView
            className="flex-1 p-4"
            showsVerticalScrollIndicator={false}
          >
            <Text
              className="text-sm font-semibold mb-4 uppercase tracking-wide"
              style={{ color: currentColors.textSecondary }}
            >
              Pages
            </Text>

            {SKELETON_SCREENS.map((screen) => {
            
            /* 
             define rules here
             an object which checks each name and return true or false
            */
              const isAccessible = PAGEMIDDLEWARE(screen.id, auth?.accounttype)
              
              return (
            <TouchableOpacity
                key={screen.id}
                onPress={() => setSelectedScreen(screen)}
                className={`p-3 mb-2 rounded-lg border ${
                  selectedScreen.id === screen.id ? "border-blue-500" : ""
                } 
                ${isAccessible? '': 'hidden'}
                `}
                style={{
                  backgroundColor:
                    selectedScreen.id === screen.id
                      ? currentColors.primary + "10"
                      : currentColors.background,
                  borderColor:
                    selectedScreen.id === screen.id
                      ? currentColors.primary
                      : currentColors.border,
                }}
              >
                <View className="flex-row items-center mb-2">
                  <View className="mr-3">
                    <Icon
                      name={screen.icon as any}
                      size={18}
                      color={
                        selectedScreen.id === screen.id
                          ? currentColors.primary
                          : currentColors.foreground
                      }
                    />
                  </View>
                  <Text
                    className={`font-medium flex-1 ${
                      selectedScreen.id === screen.id ? "text-blue-600" : ""
                    }`}
                    style={{
                      color:
                        selectedScreen.id === screen.id
                          ? currentColors.primary
                          : currentColors.foreground,
                    }}
                  >
                    {screen.title}
                  </Text>
                </View>
                <Text
                  className="text-xs leading-4"
                  style={{ color: currentColors.textSecondary }}
                >
                  {screen.description}
                </Text>
              </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
      )}

      {/* Main Content */}
      <View className="flex-1">
        {/* Current Screen Header */}
        <View
          className="px-6 py-4 border-b"
          style={{
            borderBottomColor: currentColors.border,
            backgroundColor: currentColors.background,
          }}
        >
          <View className="flex-row items-center">
            <View  className="mr-3"> 
            <Icon
              name={selectedScreen.icon as any}
              size={24}
              color={currentColors.primary}
            />
            </View>
            <View className="flex-1">
              <Text
                className="text-lg font-semibold"
                style={{ color: currentColors.foreground }}
              >
                {selectedScreen.title}
              </Text>
              <Text
                className="text-sm mt-1"
                style={{ color: currentColors.textSecondary }}
              >
                {selectedScreen.description}
              </Text>
            </View>
            
            {/* <View
              className="px-3 py-1 rounded-full"
              style={{ backgroundColor: currentColors.primary + "20" }}
            >
              <Text
                className="text-xs font-medium"
                style={{ color: currentColors.primary }}
              >
                Authorized
              </Text>
            </View> */}
          </View>
        </View>

        {/* Component Content */}
        <View className="flex-1">
          <SelectedComponent setSelectedScreen={setSelectedScreen} />
        </View>
      </View>


    </View>


  </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  comingSoonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  comingSoonTitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  comingSoonSubtitle: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.7,
  },
});
