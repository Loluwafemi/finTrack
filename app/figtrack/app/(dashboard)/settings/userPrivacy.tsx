import '~/global.css';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { Button, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { TextInput } from 'react-native';
import { Icon } from '@roninoss/icons';

/* 

This file will comprise every page to appear in the settings sections and it will all fall back to the setting page
Pages are:
1. Profile Page
2. Privacy and Security
3. Manage Budget
4. Budget Privacy and Security
5. Generate Report
6. An exportable function that swaps the app theme insead of a page
7. Get Support to takes user to a web
8. Terms and Condition that as well takes user to a web page

Note all web pagemlink are defined in the google parse link. the button refers to it. This is needed for page link dynamicity


*/

export default function UserPrivacy() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  return (
          <SafeAreaView className='p-2'>
            {/* container */}
            <View className='w-full h-full  rounded-xl'>
              {/* Display all information about user using formik form and add a submit button to allow user to edit and submit at a go */}

              <ScrollView>
                <Formik
                initialValues={{}}
                onSubmit={()=> console.log()}
                >
                  {({dirty, values, errors, handleBlur, handleChange, handleSubmit})=>(
                    <View className='p-8 flex flex-col'>
                    <Text className='text-3xl text-gray-500'>Hello, Abel Levi</Text>
                    <Text className='text-xl text-gray-800 mt-4'>Change Password</Text>
              
                    <View className='mt-1'>
                      <Text>Email: </Text>
                      <TextInput
                      readOnly={true} 
                      className='border text-gray-500 py-4 px-2 my-1'
                      placeholder='Enter email' />
                    </View>

                    <View className='mt-1'>
                      <Text>Enter Old Password: </Text>
                      <TextInput
                      readOnly={true}
                      className='border text-gray-500 py-4 px-2 my-1'
                      placeholder='****' />
                    </View>

                    <View className='mt-1'>
                      <Text>Enter New Password: </Text>
                      <TextInput
                      readOnly={true}
                      className='border text-gray-500 py-4 px-2 my-1'
                      placeholder='****' />
                    </View>

                    <View className='mt-2'>
                        <TouchableHighlight
                        onPress={()=> console.log()}
                        disabled={true}
                        >
                          <View className='flex flex-row items-center justify-center p-2 bg-black rounded-lg'>
                            <Text className='text-gray-200 mx-1'>Change Password</Text>
                            <Icon color='gray' name='shield-lock-outline' />
                          </View>
                        </TouchableHighlight>
                    </View>


                  </View>
                  )}


                </Formik>
              </ScrollView>
            </View>
          </SafeAreaView>
  );
}


function ProfilePage() {
  
}



const styles = StyleSheet.create({

    
});
