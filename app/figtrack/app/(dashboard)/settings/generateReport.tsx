import '~/global.css';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { Button, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { TextInput } from 'react-native';
import { Icon } from '@roninoss/icons';
import { SelectList } from 'react-native-dropdown-select-list';
import Checkbox from 'expo-checkbox';

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

export default function UsersSettings() {
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
                    <Text className='text-lg text-gray-500'>Generate Report</Text>

                    {/* Design a layout to show a selection list for budget and for document type */}
                    <View className='mt-2'>
                        <Text>Select date</Text>
                        <TouchableHighlight
                            onPress={()=> console.log()}
                            className='p-4 bg-gray-800 rounded-xl my-1'
                        >
                            <View className='flex flex-row items-center justify-center'>
                                <Text className='text-white text-center font-bold'>Pick a date </Text>
                                <Icon color='white' name='calendar-plus' />
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View className='mt-2'>
                        <SelectList 
                            data={[
                                { key: "B1", value: "B1" },
                                { key: "B2", value: "B2" },
                                { key: "B3", value: "B3" },
                            
                            ]}
                            save='value'
                            setSelected={()=> console.log()}
                            placeholder='Select Budget'
                        />
                    </View>

                    <View className='mt-4'>
                        <SelectList 
                            data={[
                                { key: "PDF", value: "PDF" },
                                { key: "EXCEL", value: "EXCEL" },
                            
                            ]}
                            save='value'
                            setSelected={()=> console.log()}
                            placeholder='Select Document Type'
                        />
                    </View>
                    
                    {/* Hide if account not institution */}
                    <View className='mt-8 flex flex-row items-center'>
                        <Text className='mx-4'>Export To Institution</Text>
                        <Checkbox />
                    </View>
                    <View className='mt-8'>
                      <Text>Enter password to continue: </Text>
                      <TextInput
                      readOnly={true} 
                      className='border text-gray-500 py-2 px-2 my-1'
                      placeholder='******' />
                    </View>

                    <View className='mt-2'>
                        <TouchableHighlight
                        onPress={()=> console.log()}
                        disabled={true}
                        >
                          <View className='flex flex-row items-center justify-center p-2 bg-black rounded-lg'>
                            <Text className='text-gray-200 mx-1'>Generate Report</Text>
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
