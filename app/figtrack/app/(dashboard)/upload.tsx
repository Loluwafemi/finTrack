import '~/global.css';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { Text,View } from 'react-native';

export default function UsersUpload() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  return (
        <View>
            <Text>Upload Page</Text>
        </View>
  );
}