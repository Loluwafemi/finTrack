import '~/global.css';
import { useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from 'react-native';
import { Acivity, Settings, UserHome, UserRecord } from '~/components/nativewindui/bottomTab'
import { Icon } from '@roninoss/icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {  } from 'expo-status-bar';
import { TopNav } from '~/components/nativewindui/TopNav';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { Auth } from '~/lib/func/tailored';
import React, { useMemo }  from 'react';


const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator()

export default function UsersDashboardIndex() {    
    const navigation = useRouter()

    // middleware
    const [isAuth, setStatus] = React.useState(null)
    

    React.useEffect(()=>{
        const getSession = async () => { 

        const response = await Auth.isAlive()      
        if (!response.status) return navigation.navigate('/(auth)')
        setStatus(response.data)
        };
        getSession();
    }, [])
      
  useInitialAndroidBarSync();
  return (
      <View style={style.body}>
        <NavigationIndependentTree>
            <NavigationContainer>
              <Drawer.Navigator
                
                screenOptions={({navigation})=>({
                  headerLeft: ()=>{
                    return <TopNav 
                    firstname={isAuth?.firstname} username={isAuth?.username} navigation={navigation} />
                  },
                  drawerStyle: {
                    backgroundColor: 'pink',
                  },
                  
                  
                })}
                
                
              >
                <Drawer.Screen name='Home' component={TabPage} options={{
                  title: '',
                  drawerLabel: 'Home'
                }}/>

                <Drawer.Screen name='App Settings' component={AppSettings} options={{
                  title: '',
                  drawerLabel: 'App Settings'
                }}/>

                <Drawer.Screen name='Profile Settings' component={ProfileSettings} options={{
                  title: '',
                  drawerLabel: 'Profile Settings'
                }}/>
                <Drawer.Screen name='About' component={AboutPage} 
                options={{
                  title: '',
                  drawerLabel: 'About'
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
      <Text>
        About Page
      </Text>
    </View>
  )
}


function ProfileSettings() {
  return (
    <View className='m-auto'>
      <Text>
        Profile Settings Page
      </Text>
      <Text>Profile Picture</Text>
      <Text>Name</Text>
      <Text>Email</Text>
      <Text>Password</Text>
      <Text>Bank</Text>
      <Text>Finances</Text>
    </View>
  )
}


function AppSettings() {
  return (
    <View className='m-auto'>
      <Text>
        App Settings Page
      </Text>
      <Text>Theme</Text>
      <Text>Notification</Text>
      <Text>Security, etc</Text>
    </View>
  )
}



function TabPage() {
  return (      
        <NavigationIndependentTree>
          <Tab.Navigator 
                initialRouteName='Home'
                safeAreaInsets={{bottom: 10, left: 0, right: 0, top: 0}}
                screenLayout={({children, navigation})=>{
                  return (
                    <SafeAreaProvider>
                      <SafeAreaView edges={['top']} 
                        style={{height: '100%', backgroundColor: 'none', padding: 4}}
                        >
                        {children}
                      </SafeAreaView>
                    </SafeAreaProvider>
                  );
                }}
                
                screenOptions={({navigation, route}) => (
                    {
                      tabBarShowLabel: true,
                      tabBarHideOnKeyboard: true,
                      headerTitle: '',
                      headerShown: false,
                      tabBarIcon: ({focused, color, size})=>{
                        let iconName;
                        if (route.name === 'Home') {
                          iconName = focused
                            ? 'home-circle'
                            : 'home-circle-outline';
                        }else if (route.name === 'Records') {
                          iconName = focused ? 'chart-box' : 'chart-box-outline';
                        }else if (route.name === 'Activities') {
                          iconName = focused ? 'clock' : 'clock-outline';
                        }else if (route.name === 'Settings') {
                          iconName = focused ? 'cog' : 'cog-outline';
                        }
                        return <Icon name={iconName} size={size} color={color} />;
                      },
                }
          )}>
                <Tab.Screen name="Home" component={UserHome} />
                <Tab.Screen name="Records" component={UserRecord} />
                <Tab.Screen name="Activities" component={Acivity} />
                <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
        </NavigationIndependentTree>
      );
}



const style = StyleSheet.create({
  body: {
    height: '100%'
  },
  semiprofile: {
    backgroundColor: 'pink'
  }
})