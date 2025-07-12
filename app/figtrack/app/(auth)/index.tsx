import * as React from 'react';
import { useRouter, Link } from 'expo-router';
import { Text, View, StyleSheet, TouchableOpacity,ScrollView, TextInput, Button } from 'react-native';
import Checkbox from 'expo-checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { loginSchema } from '~/lib/func/auth';
import { signinREQUEST } from '~/lib/server/server';
import { Auth } from '~/lib/func/tailored';



export default function Authentication() {
    const navigation = useRouter()

        // fetching session
        // const [session, setSession] = React.useState(null)
        const [status, setStatus] = React.useState(false)

        React.useEffect(()=>{
          const getSession = async () => {
            try {
              const response = await Auth.isAlive()
              
              if (response.status) {
                  setStatus(true)
                  return navigation.navigate('/(dashboard)')
                // setStatus(true)
              }else{
                // setSession(null)
                setStatus(false)
              }
            } catch (error) {
              setStatus(false)
            }
          };
          getSession();
        }, [])

        // end fetch
    
        return (

            // <SafeAreaProvider>
            <SafeAreaView className='flex flex-row justify-end items-end h-full bg-gray-700 mt-0'>
            <ScrollView>
            <View className='flex flex-col justify-center items-center bg-white p-2 mx-2 rounded-2xl'>
                    <Text className='text-2xl font-bold text-blue-400 self-start m-3'>
                        FIGTRACK
                    </Text>
                    <View>
                        <Text className='self-start mx-3 text-center font-bold mt-3 text-lg'>Welcome Back</Text>
                        <Text className='text-center text-sm self-start mx-3'>Sign in to your financial aid dashboard</Text>
                        <Formik
                          initialValues={{email: '', password: ''}}

                          onSubmit={async (value, {setErrors, setSubmitting})=>{
                            try {
                              // const jsonString = JSON.stringify(value)
                              let response = await signinREQUEST(value)
                              if (response.status) {
                                
                                return navigation.navigate('/(dashboard)')
                              }else{
                                await setErrors({password: "Invalid Credentials!"})
                              }
                            } catch (error) {
                              console.log("Error: ", error);
                            }finally{
                              setSubmitting(false)
                            }
                          }}
                          validationSchema={loginSchema}
                        
                        >{({handleSubmit, handleChange, handleBlur, values, errors, isValidating})=>(
                        <View style={styles.form}>
                        <View style={styles.formItem}>
                            <Text>Email</Text>
                            {/* <Field name="email" type="email" /> */}
                            <TextInput 
                            className='p-4 border border-gray-500 rounded-xl mt-2'
                            placeholder='name@university.edu.com'
                            value={values.email}
                            onBlur={handleBlur('email')}
                            onChangeText={handleChange('email')}
                            />
                        </View>
                        <View style={styles.formItem}>
                            <Text>Password</Text>
                            <TextInput 
                            className='p-4 border border-gray-500 rounded-xl mt-2'
                            placeholder='********'
                            textContentType='newPassword'
                            value={values.password}
                            onBlur={handleBlur('password')}
                            onChangeText={handleChange('password')}
                            />
                        </View>
                        {errors.email || errors.password? <Text className='text-red-500 font-bold px-2'>
                          Invalid Credential!
                        </Text>: ''}
                        
                        <View style={[styles.formOptionsItems]}>
                            {/* <View style={styles.formOptions}>
                                <Checkbox style={ {margin: 3} } />
                                <Text>Remember me</Text>
                            </View> */}
            
                            <View style={styles.formOptions}>
                                <Link href={'./forgot'}>Forgot password?</Link>
                            </View>
                        </View>
                        <View className='flex flex-col items-center my-2'>
                            <TouchableOpacity 
                              onPress={handleSubmit}
                              className='p-2 bg-gray-700 flex flex-row justify-center w-full rounded-xl'>
                            <Text className='text-white font-bold text-lg'>Sign In</Text>
                            </TouchableOpacity>
                        </View>
            
                        <View className='my-2 border border-gray-700'>
                        </View>
            
                        <View className='flex flex-row justify-between items-center mt-2'>
                            <TouchableOpacity
                            className='p-2 bg-white flex flex-row justify-center w-full rounded-xl border border-gray'
                            onPress={()=> navigation.navigate('./signup')}
                            >
                            <Text className='text-gray-700 font-bold text-lg'>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                        
                        </View>
                        )}
                      </Formik>

            
                    </View>
            </View>

            </ScrollView>
            </SafeAreaView>
            // </SafeAreaProvider>
            
        );
}


const styles = StyleSheet.create({
    body: {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        // height: '100%'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: '100%',
        // backgroundColor: 'pink',
        margin: 5
      },
    login: {
      display: 'flex',
      alignItems: 'center',
      padding: 2,
      // borderWidth: 1,
      // borderRadius: 2,
      borderColor: '#6B6B6B',
      margin: 1,
      width: 'auto'
    },
    
    header: {
        textAlign: 'center',
    },
    
    headerText: {
      fontWeight: '800',
      fontSize: 20
    },
    headerDescription: {
      fontSize: 12
    },

    form: {
      margin: 20,
      height: 'auto',
    },
    formItem: {
      margin: 6
    },
    formInput: {
      borderColor: '#000000',
      borderWidth: .5,
      width: 'auto',
      height: 'auto',
      padding: 5,
      borderRadius: 3
    },
    formOptions: {
      display: 'flex',
      // justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 3,
    },
    formOptionsItems: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 3,
      marginRight: 6,
      marginLeft: 6
    },
    formSubmit: {
      width: 300,
      backgroundColor: '#000000',
      height: 30,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      borderRadius: 2
    },
    formSubmitText: {
      color: '#FEFCFD',
      padding: 4
    },

    formRegister: {
      width: 300,
      backgroundColor: '#FEFCFD',
      height: 30,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row',
      borderRadius: 2,
      borderColor: '#000000',
      borderWidth: 1,
      marginTop: 3
    },
    formRegisterText: {
      color: '#000000',
      padding: 4
    },

    horizontal: {
      margin: 8,
      borderTopWidth: 0.4,
      borderColor: '#000000'

    }
    
});
