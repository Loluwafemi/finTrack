import { Link } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';


export default function resetPage() {
  return (
    <View style={styles.body}>
        <Text>
            Reset Page
        </Text>
        <Link href={'/(auth)'}>Login</Link>

    </View>
  );
}

const styles = StyleSheet.create({
    body: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        // color: 'black',
        height: '100%'
    }
});
