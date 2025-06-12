import '~/global.css';

import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function AuthRoot() {

  return (
    <Stack 
    screenLayout={()=>{
      return <View></View>
    }}
    
    screenOptions={{
      title: ""
    }}>
        <Stack.Screen name='index' />
        <Stack.Screen name='signup' />
        <Stack.Screen name='onetimepass' />
        <Stack.Screen name='forgot' />
    </Stack>
  );
}