import '~/global.css';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { Button, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { TextInput } from 'react-native';
import { Icon } from '@roninoss/icons';
import { useEffect, useReducer, useState } from 'react';
import { Auth } from '~/lib/func/tailored';

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

export type UserProfile = { 
  "accounttype": string | null, 
  "created_at": string | null, 
  "data": { 
    "data": object[] | null, 
    "id": string | null, 
    "organization": string | null, 
    "organization_name": string | null 
  }, 
  "deleted_at": string | null, 
  "email": string | null, 
  "firstname": string | null, 
  "id": string | null, 
  "lastname": string | null, 
  "status": string | null, 
  "updated_at": string | null, 
  "userid": string | null, 
  "username": string | null
}



export default function UsersSettings() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [profile, setProfile] = useState<UserProfile>({
    accounttype: null,
    created_at: null,
    data: {
      data: [],
      id: null,
      organization: null,
      organization_name: null
    },
    deleted_at: null,
    email: null,
    firstname: null,
    id: null,
    lastname: null,
    status: null,
    updated_at: null,
    userid: null,
    username: null  
  })

  const userObject = new Auth()

  useEffect(() =>{
    const collectProfile = async () => {
      const profileData = await userObject.profile()
        setProfile(profileData)
    }

    collectProfile();
      // This function will collect user profile information from the backend
  })



  return (
          <SafeAreaView className='p-2 bg-white'>
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
                    <Text className='text-3xl text-gray-500'>Hello, {profile.firstname!}</Text>

                    <View className='mt-8'>
                      <Text>First Name: </Text>
                      <TextInput
                      value={profile.firstname!}
                      readOnly={true} 
                      className='border text-gray-500 py-4 px-2 my-1'
                      placeholder='Enter First name' 
                      />
                    </View>

                    <View className='mt-1'>
                      <Text>Last Name: </Text>
                      <TextInput
                      value={profile.lastname!}
                      readOnly={true} 
                      className='border text-gray-500 py-4 px-2 my-1'
                      placeholder='Enter Last name' />
                    </View>
              
                    <View className='mt-1'>
                      <Text>Email: </Text>
                      <TextInput
                      value={profile.email!}
                      readOnly={true} 
                      className='border text-gray-500 py-4 px-2 my-1'
                      placeholder='Enter email' />
                    </View>

                    <View className='mt-1'>
                      <Text>Status: </Text>
                      <TextInput
                      value={profile.status!}
                      readOnly={true} 
                      className='border text-gray-500 py-4 px-2 my-1'
                      placeholder='Status' />
                    </View>

                    <View className='mt-1'>
                      <Text>Registered as: </Text>
                      <TextInput
                      value={profile.data.organization!}
                      readOnly={true} 
                      className='border text-gray-500 py-4 px-2 my-1'
                      placeholder='Personal or Institution' />
                    </View>

                    <View className='mt-1'>
                      <Text>Organization: </Text>
                      <TextInput
                      value={profile.data.organization_name!}
                      readOnly={true} 
                      className='border text-gray-500 py-4 px-2 my-1'
                      placeholder='Institution name' />
                    </View>

                    <View className='mt-1 flex flex-row items-center w-full justify-start'>
                      <View className='w-[40%] mx-1'>
                        <Text>Joined at: </Text>
                        <TextInput
                        value={new Date(profile.created_at!).toDateString()}
                        readOnly={true} 
                        className='border text-gray-500 py-4 px-2 my-1'
                        placeholder='Date Time' />
                      </View>


                      <View className='w-[40%] mx-1'>
                        <Text>Last Modified at: </Text>
                        <TextInput
                        value={new Date(profile.updated_at!).toDateString()}
                        readOnly={true} 
                        className='border text-gray-500 py-4 px-2 my-1'
                        placeholder='Date Time' />
                      </View>
                    </View>

                    <View className='mt-2'>
                        <TouchableHighlight
                        onPress={()=> console.log()}
                        disabled={true}
                        >
                          <View className='flex flex-row items-center justify-center p-2 bg-black rounded-lg'>
                            <Text className='text-gray-200 mx-1'>Submit Edit</Text>
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
