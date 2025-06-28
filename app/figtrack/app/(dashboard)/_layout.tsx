import '~/global.css';
import * as React from 'react';
import { Slot, useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaFrameContext, SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UsersDashboardIndex from '.';
import { Button } from '~/components/Button';


const Tab = createBottomTabNavigator();

export default function UsersDashboardLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const inset = useSafeAreaInsets()
  return (
          <View >
              <StatusBar
                key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
                style={isDarkColorScheme ? 'light' : 'dark'}
              />
            <Slot />
          </View>

        );
}


const styles = StyleSheet.create({

})