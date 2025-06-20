import * as React from 'react';
import { Link, useRouter } from 'expo-router';
import { Text, View, StyleSheet, Button, StatusBar } from 'react-native';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@roninoss/icons';
import { FormNav } from '~/components/registration/forms';
import { 
  CUSTOM_BRAND_COLORS, 
  globalStyles, 
  textStyles, 
  buttonStyles, 
  inputStyles, 
  layoutStyles, 
  shadowStyles 
} from '~/theme';

export default function SignUpAuthentication() {
    const navigation = useRouter()
        return (
            <>
            <StatusBar 
              backgroundColor={CUSTOM_BRAND_COLORS.majorBackground} 
              barStyle="light-content" 
            />
            <SafeAreaView style={[globalStyles.container, layoutStyles.center]}>
            

            
            <ScrollView contentContainerStyle={layoutStyles.center}>
            <View style={[globalStyles.card, shadowStyles.medium, styles.signupCard]}>
                    <View style={[layoutStyles.center, { marginBottom: 24 }]}>
                        <Text style={[textStyles.title, { fontSize: 28, textAlign: 'center' }]}>Create Account</Text>
                        <Text style={[textStyles.bodySecondary, { textAlign: 'center', marginTop: 8 }]}>Join us to manage your financial aid journey</Text>
                    </View>
                    
                    {/* Registration Form */}
                    <View style={styles.formContainer}>
                      <FormNav />
                    </View>
                    
                    {/* Sign In Link */}
                    <View style={[layoutStyles.row, layoutStyles.center, { marginTop: 24 }]}>
                        <Text style={[textStyles.bodySecondary]}>Already have an account? </Text>
                        <Link href="./index" style={[textStyles.body, { color: CUSTOM_BRAND_COLORS.accent }]}>Sign In</Link>
                    </View>
            </View>
            </ScrollView>
            </SafeAreaView>
            </>
        );
}

const styles = StyleSheet.create({
  signupCard: {
    width: '90%',
    maxWidth: 500,
    padding: 32,
  },
  
  formContainer: {
    width: '100%',
  },
});
