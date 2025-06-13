import '~/global.css';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { StyleSheet, Text, View } from 'react-native';



export default function UsersSettings() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  return (
        <View>
            <Text>Settings Page</Text>
        </View>
  );
}


const styles = StyleSheet.create({

    
});
