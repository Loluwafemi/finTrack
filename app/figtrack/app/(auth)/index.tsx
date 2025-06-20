import * as React from 'react';
import { useRouter, Link } from 'expo-router';
import { Text, View, StyleSheet, Button, TouchableOpacity, StatusBar } from 'react-native';
import { ScrollView, TextInput } from 'react-native';
import Checkbox from 'expo-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Field, Formik } from 'formik';
import { loginSchema } from '~/lib/func/auth';
import { 
  CUSTOM_BRAND_COLORS, 
  globalStyles, 
  textStyles, 
  buttonStyles, 
  inputStyles, 
  layoutStyles, 
  shadowStyles 
} from '~/theme';



export default function Authentication() {
    const navigation = useRouter()
        return (
            <View style={styles.mainContainer}>
                <StatusBar barStyle="light-content" backgroundColor={CUSTOM_BRAND_COLORS.majorBackground} />
                <SafeAreaView style={styles.safeArea}>
                    <ScrollView 
                        contentContainerStyle={styles.scrollContent}
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={[globalStyles.card, shadowStyles.medium, styles.loginCard]}>
                    <View style={[layoutStyles.center, { marginBottom: 32 }]}>
                        <Text style={[textStyles.title, { fontSize: 28, textAlign: 'center' }]}>Welcome Back</Text>
                        <Text style={[textStyles.bodySecondary, { textAlign: 'center', marginTop: 8 }]}>Sign in to access your financial aid dashboard</Text>
                    </View>

                        <Formik
                          initialValues={{email: '', password: ''}}
                          onSubmit={(res)=>{
                            console.log(res);
                            // For development: Navigate to dashboard on any submit
                            navigation.push('/(dashboard)');
                          }}
                          validationSchema={loginSchema}
                        
                        >{({handleSubmit, handleChange, handleBlur, values, errors})=>(
                        <View style={{ width: '100%' }}>
                        <View style={inputStyles.container}>
                            <Text style={inputStyles.label}>Email</Text>
                            <TextInput 
                            style={inputStyles.input}
                            placeholder='name@university.edu.com'
                            placeholderTextColor='#B8B8B8'
                            value={values.email}
                            onBlur={handleBlur('email')}
                            onChangeText={handleChange('email')}
                            keyboardType='email-address'
                            autoCapitalize='none'
                            />
                        </View>
                        <View style={inputStyles.container}>
                            <Text style={inputStyles.label}>Password</Text>
                            <TextInput 
                            style={inputStyles.input}
                            placeholder='Enter your password'
                            placeholderTextColor='#B8B8B8'
                            secureTextEntry
                            value={values.password}
                            onBlur={handleBlur('password')}
                            onChangeText={handleChange('password')}
                            />
                        </View>
                        {errors.email || errors.password ? (
                          <Text style={[textStyles.alert, { marginVertical: 8, textAlign: 'center' }]}>
                            Invalid Credential!
                          </Text>
                        ) : null}
                        
                        <View style={[layoutStyles.rowBetween, { marginVertical: 16 }]}>
                            <View style={layoutStyles.row}>
                                <Checkbox 
                                  style={{ marginRight: 8 }} 
                                  color={CUSTOM_BRAND_COLORS.accent}
                                />
                                <Text style={textStyles.bodySecondary}>Remember me</Text>
                            </View>
            
                            <Link href={'./forgot'}>
                              <Text style={[textStyles.bodySecondary, { color: CUSTOM_BRAND_COLORS.accent }]}>Forgot password?</Text>
                            </Link>
                        </View>
            
                        <TouchableOpacity 
                          onPress={(e)=>{
                            // For development: Navigate directly to dashboard
                            navigation.push('/(dashboard)');
                          }}
                          style={[buttonStyles.primary, { width: '100%', marginVertical: 8 }]}>
                          <Text style={buttonStyles.primaryText}>Sign In</Text>
                        </TouchableOpacity>
            
                        <View style={[styles.divider, { marginVertical: 24 }]}>
                        </View>
            
                        <TouchableOpacity 
                          style={[buttonStyles.secondary, { width: '100%' }]}
                          onPress={()=> navigation.navigate('./signup')}
                        >
                          <Text style={buttonStyles.secondaryText}>Create Account</Text>
                        </TouchableOpacity>
                        
                        </View>
                        )}
                      </Formik>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
            
        );
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: CUSTOM_BRAND_COLORS.majorBackground,
  },
  
  safeArea: {
    flex: 1,
    backgroundColor: CUSTOM_BRAND_COLORS.majorBackground,
  },
  
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 40, // Extra padding for phone navigation area
    minHeight: '100%',
  },
  
  loginCard: {
    width: '90%',
    maxWidth: 400,
    padding: 32,
    backgroundColor: CUSTOM_BRAND_COLORS.cardBackground,
    marginBottom: 20, // Space above phone navigation
  },
  
  divider: {
    height: 1,
    backgroundColor: '#4A525C',
    width: '100%',
  },
});
