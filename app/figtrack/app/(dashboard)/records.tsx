import '~/global.css';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { StyleSheet, Text, View } from 'react-native';
import { GrantFeatureGraph } from '~/components/nativewindui/grantFeatureGraph';

export default function UsersRecords() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Financial Analytics</Text>
        <Text style={styles.subHeaderText}>Track your spending patterns and budget allocation</Text>
      </View>
      <GrantFeatureGraph />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subHeaderText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
