import '~/global.css';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { StyleSheet, Text, View } from 'react-native';



export default function UsersRecords() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  return (
        <View>
            <Text>Records Page</Text>
        </View>
  );
}

const styles = StyleSheet.create({

    
});
