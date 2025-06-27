import { DrawerContentScrollView, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { Slot } from "expo-router";
import * as React from "react";
import { StyleSheet } from "react-native";
import "../../global.css";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {/* Add custom items here if needed */}
    </DrawerContentScrollView>
  );
}

export default function DashboardScreen() {
  return <Slot />;
}

// export default function AdminDashboardLayout() {
//   useInitialAndroidBarSync();
//   const { isDarkColorScheme } = useColorScheme();
//   const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;

//   return (
//     <SafeAreaProvider>
//       <View style={[styles.body, { backgroundColor: currentColors.background }]}> 
//         <StatusBar key={`root-status-bar-${isDarkColorScheme ? "light" : "dark"}`} style={isDarkColorScheme ? "light" : "dark"} />
//         <Drawer.Navigator
//           initialRouteName="Dashboard"
//           drawerContent={props => <CustomDrawerContent {...props} />}
//           screenOptions={{
//             headerShown: false,
//             drawerStyle: { 
//               backgroundColor: currentColors.background,
//               width: 400,
//             },
//             drawerActiveTintColor: currentColors.foreground,
//             drawerInactiveTintColor: currentColors.textSecondary,
//             drawerType: 'permanent',
//             swipeEnabled: false,
//           }}
//         >
//           <Drawer.Screen 
//             name="Dashboard" 
//             component={DashboardScreen} 
//             options={{ title: 'Dashboard' }} 
//           />
//           <Drawer.Screen 
//             name="SkeletonDemo" 
//             component={SkeletonDemoScreen} 
//             options={{ title: 'Skeleton Components Demo' }} 
//           />
//           {/* Add more Drawer.Screen items for other pages as needed */}
//         </Drawer.Navigator>
//       </View>
//     </SafeAreaProvider>
//   );
// }

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});
