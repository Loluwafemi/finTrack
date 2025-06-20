import '~/global.css';
import * as React from 'react';
import { Slot, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { SafeAreaFrameContext, SafeAreaProvider, useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Acivity, Settings, UserHome, UserRecord } from '~/components/nativewindui/bottomTab';
import { Icon } from '@roninoss/icons';
import { TopNav } from '~/components/nativewindui/TopNav';
import ThemedComponentExample from '~/components/examples/ThemedComponentExample';
import { CUSTOM_BRAND_COLORS } from '../../theme/colors';
import { hexToRgba } from '../../lib/utils';


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function UsersDashboardLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const inset = useSafeAreaInsets();

  return (
    <View style={styles.body}>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />
      <NavigationIndependentTree>
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={({ navigation }) => ({
              headerLeft: () => {
                return <TopNav navigation={navigation} />;
              },
              drawerStyle: {
                backgroundColor: 'pink',
              },
            })}
          >
            <Drawer.Screen
              name="Home"
              component={TabPage}
              options={{
                title: '',
                drawerLabel: 'Home',
              }}
            />

            <Drawer.Screen
              name="App Settings"
              component={AppSettings}
              options={{
                title: '',
                drawerLabel: 'App Settings',
              }}
            />

            <Drawer.Screen
              name="Profile Settings"
              component={ProfileSettings}
              options={{
                title: '',
                drawerLabel: 'Profile Settings',
              }}
            />
            <Drawer.Screen
              name="About"
              component={AboutPage}
              options={{
                title: '',
                drawerLabel: 'About',
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </NavigationIndependentTree>
    </View>
  );
}

function AboutPage() {
  return (
    <View>
      <Text>About Page</Text>
    </View>
  );
}

function ProfileSettings() {
  return (
    <View className="m-auto">
      <Text>Profile Settings Page</Text>
      <Text>Profile Picture</Text>
      <Text>Name</Text>
      <Text>Email</Text>
      <Text>Password</Text>
      <Text>Bank</Text>
      <Text>Finances</Text>
    </View>
  );
}

function AppSettings() {
  return (
    <View className="m-auto">
      <ThemedComponentExample />
      <Text>App Settings Page</Text>
      <Text>Theme</Text>
      <Text>Notification</Text>
      <Text>Security, etc</Text>
    </View>
  );
}

function TabPage() {
  const { colors, isDarkColorScheme } = useColorScheme();

  return (
    <NavigationIndependentTree>
      <Tab.Navigator
        initialRouteName="Records"
        safeAreaInsets={{ bottom: 0, left: 0, right: 0, top: 0 }}
        screenLayout={({ children, navigation }) => {
          return (
            <SafeAreaProvider>
              <SafeAreaView
                edges={['top']}
                style={{ height: '100%', backgroundColor: colors.background, padding: 4 }}
              >
                {children}
              </SafeAreaView>
            </SafeAreaProvider>
          );
        }}
        screenOptions={({ navigation, route }) => ({
          tabBarShowLabel: true,
          tabBarHideOnKeyboard: true,
          headerTitle: '',
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.card,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            height: Platform.OS === 'ios' ? 85 : 65,
            paddingBottom: Platform.OS === 'ios' ? 25 : 10,
            paddingTop: 8,
            paddingHorizontal: 16,
            elevation: 8,
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          },
          tabBarActiveTintColor: CUSTOM_BRAND_COLORS.accent,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
            marginTop: 4,
          },
          tabBarIconStyle: {
            marginBottom: 2,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            const iconSize = focused ? 28 : 24;

            if (route.name === 'Home') {
              iconName = focused ? 'home-circle' : 'home-circle-outline';
            } else if (route.name === 'Records') {
              iconName = focused ? 'chart-box' : 'chart-box-outline';
            } else if (route.name === 'Activities') {
              iconName = focused ? 'clock' : 'clock-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'cog' : 'cog-outline';
            }

            return (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: focused ? hexToRgba(CUSTOM_BRAND_COLORS.accent, 0.15) : 'transparent',
                }}
              >
                <Icon
                  name={iconName as "home-circle" | "home-circle-outline" | "chart-box" | "chart-box-outline" | "clock" | "clock-outline" | "cog" | "cog-outline"}
                  size={iconSize}
                  color={color}
                />
              </View>
            );
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={UserHome}
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name="Records"
          component={UserRecord}
          options={{
            tabBarLabel: 'Records',
          }}
        />
        <Tab.Screen
          name="Activities"
          component={Acivity}
          options={{
            tabBarLabel: 'Activities',
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: 'Settings',
          }}
        />
      </Tab.Navigator>
    </NavigationIndependentTree>
  );
}


const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});