import * as React from 'react';
import { Link, useRouter } from 'expo-router';
import { Text, View, StyleSheet, Button } from 'react-native';
import { FormNav } from '~/components/registration/forms';

export default function SignUpAuthentication() {
    const navigation = useRouter()
        return (
            <View style={styles.body}>
            {/* tabs message */}
            <View style={styles.message}>
              <Text style={{ color: '#FEFCFD'}}>Display Message</Text>
            </View>
  
            {/* tabs */}
            <View style={styles.form}>
            <Link href={'../(dashboard)'}>continue</Link>
              <Text style={styles.signup}>Sign Up</Text>
              <FormNav />
            </View>
        </View>
        );
}

const styles = StyleSheet.create({
    body: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
        margin: 10,
    },
    
    message: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000000',
      marginBottom: 4,
      borderRadius: 3,
      marginTop: 15
    },
    
    form: {
      flex: 4,
      justifyContent: 'flex-start',
      // alignItems: 'center',
      backgroundColor: '#FEFCFD',
      marginBottom: 4,
      display: 'flex'
    },
    signup: {
      fontSize: 25,
      fontStyle: 'normal',
      fontWeight: '300',
      marginLeft: 5,
      marginTop: 10,
      marginBottom: 20
    }
    
});
