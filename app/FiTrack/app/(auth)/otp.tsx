import { Link } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';


export default function otpPage() {
  return (
    <View style={styles.body}>
        <Text>
            OTP page
        </Text>
        <Link href={'/(auth)'} target='_top'>Login</Link>
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
