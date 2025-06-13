import * as React from 'react';
import { useRouter } from 'expo-router';
import { Text, View, StyleSheet, Button } from 'react-native';

export default function OTPAuthentication() {
    const navigation = useRouter()
        return (
            <View style={styles.body}>
                <Text>Otp Card</Text>
            </View>
        );
}


const styles = StyleSheet.create({
    body: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%'
    }
});