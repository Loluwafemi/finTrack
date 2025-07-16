import '~/global.css';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { Button, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik } from 'formik';
import { TextInput } from 'react-native';
import { Icon } from '@roninoss/icons';
import { SelectList } from 'react-native-dropdown-select-list';
import Checkbox from 'expo-checkbox';
import GrantDropList from '~/components/nativewindui/grantList';
import { Auth, balacesTemplate, budgetList, expensesTemplate } from '~/lib/func/tailored';
import { useEffect, useState } from 'react';
import { generateOnlyExpenseFromObject } from '../upload';
import { generateReportSchema } from '~/lib/func/auth';
import { date } from 'yup';
import { openFile, showListOfReport } from '~/lib/func/generator';

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
  const userObject = new Auth()
    const [budget, selectBudget] = useState <budgetList[] | []>([])
  const [ selectedBudgetExpenses, selectedBudget ] = useState<expensesTemplate[] | string[]>([])

  const [ accounttype, assignAccounttype ] = useState<"personal"|"institution"|"Institution"|null>(null)

  const [sheetLists, getSheetList] = useState<string[]>([])
    useEffect(()=>{
        const gettTransactions = async () => {
        let transactions: {budgets: budgetList[], expenses: expensesTemplate[], balances: balacesTemplate} = await userObject.records('')  
        
        let profile = await userObject.profile()
        
        assignAccounttype(profile.data.organization)

        selectBudget(transactions.budgets)

        const expenses = generateOnlyExpenseFromObject(transactions.expenses)

        selectedBudget(expenses)

        };

        const getAllGeneratedReport = async () => {
          let list = await showListOfReport()

          getSheetList(list)
        }

        getAllGeneratedReport()
        gettTransactions();
    }, [])

    const [selectedFormat, selectFormat] = useState<"PDF"|"EXCEL">("EXCEL")
    const [ reportMessage, setReportMessage ] = useState('')

  return (
          <SafeAreaView className='p-2 h-full bg-white'>
            {/* container */}
            <View className='w-full rounded-xl'>
              {/* Display all information about user using formik form and add a submit button to allow user to edit and submit at a go */}

              <ScrollView>
                <Formik
                initialValues={{
                  budget_id: null,
                  format: 'EXCEL',
                  foward: false,
                  password: null,
                }}
                onSubmit={async (val, {setErrors})=> {
                    let transaction = await userObject.generateBudgetReport(val)
                    
                    if (!transaction.status) {
                      return await setErrors({password: transaction.message})
                    }else(
                      setReportMessage(transaction.message)
                    )
                    
                    
                }}
                validationSchema={generateReportSchema}
                >
                  {({values, errors, handleBlur, handleChange, handleSubmit, setFieldTouched, setFieldValue, isValid})=>(
                    <View className='p-8 flex flex-col bg-white h-full rounded-xl'>
                      <Text className='text-lg text-gray-500'>Generate Report 📃</Text>

                    {/* Design a layout to show a selection list for budget and for document type */}
                    <View className='mt-2'>
                        <GrantDropList validation={{setFieldTouched, setFieldValue}} userGrant={budget} 
                        
                        innerEvent={async (selected)=>{                        
                              setFieldTouched('budget_id', true)
                              setFieldValue('budget_id', selected)

                            let transactions: {budgets: budgetList[], expenses: expensesTemplate[], balances: balacesTemplate} = await userObject.records(selected)

                            selectBudget(transactions.budgets)
                            const expenses = generateOnlyExpenseFromObject(transactions.expenses)
                            selectedBudget(expenses)

                            // formObject.handleSubmit(selected)                            
                        }}
                        />
                          {errors.budget_id? <Text className='text-red-500 font-bold px-2'>
                          {errors.budget_id}
                        </Text>: <Text></Text>}
                    </View>

                    <View className='mt-4'>
                        <SelectList 
                            data={[
                                { key: "PDF", value: "PDF" },
                                { key: "EXCEL", value: "EXCEL" },
                            
                            ]}
                            save='value'
                            setSelected={(val)=> selectFormat(val)}
                            onSelect={()=>{
                              setFieldTouched('format', true)
                              setFieldValue('format', selectedFormat)
                            }}
                            placeholder='Select Document Type'
                        />
                          {errors.format? <Text className='text-red-500 font-bold px-2'>
                          {errors.format}
                        </Text>: <Text></Text>}
                    </View>
                    
                    {/* Hide if account not institution */}
                    <View>
                      { accounttype !== "personal"? 
                      <View>
                        <View className='mt-8 flex flex-row items-center'>
                            <Text className='mx-4'>Export To Institution</Text>
                            <Checkbox />
                        </View>
                        <Text className='text-gray-600 mt-1'>Report will be downloaded to your storage</Text>
                      </View>
                      : <Text className='text-gray-600 mt-1'>Report will be downloaded to your storage</Text>
                      }
                          {errors.foward? <Text className='text-red-500 font-bold px-2'>
                          {errors.foward}
                        </Text>: <Text></Text>}
                    </View>
                    
                    <View className='mt-8'>
                      <Text>Enter password to continue: </Text>
                      <TextInput
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      className='border text-gray-500 py-2 px-2 my-1'
                      placeholder='******' 
                      secureTextEntry={true}
                      />

                      {errors.password? <Text className='text-red-500 font-bold px-2'>
                      {errors.password}
                        </Text>: <Text></Text>}
                    </View>

                    <View className='mt-2'>
                        <TouchableHighlight
                        onPress={(e)=> handleSubmit(e)}
                        disabled={!isValid}
                        >
                          <View className={`flex flex-row items-center justify-center p-2  rounded-lg ${isValid? "bg-black": "bg-red-500" }`}>
                            <Text className='text-gray-200 mx-1'>Generate Report</Text>
                            <Icon color='gray' name='shield-lock-outline' />
                          </View>
                        </TouchableHighlight>
                    </View>


                  </View>
                  )}


                </Formik>
                {reportMessage?                 
                <Text className='p-4 rounded-xl bg-green-600 mx-3 text-bold text-white'>{reportMessage}</Text>: 
                <Text></Text>}
              </ScrollView>
            </View>


            {/* List file generated sorted descending by date */}
            <View className='h-1/4 bg-white w-full'>
                  <ScrollView className='h-full py-4 rounded-xl bg-gray-100'>
                    {sheetLists.length > 0? 
                    sheetLists.map((value, index)=> {
                        // slice and pick file name only
                        let fileName = value.split('/').at(-1)
                        fileName = fileName?.split('%').at(-1)                        
                      return (
                          <TouchableHighlight
                          onPress={async()=> {
                            // open file
                            await openFile(value)
                          }}
                          key={index} 
                          className='border-[0.5px] border-black mx-2 p-3 my-1 rounded bg-gray-200'>
                            <View className='flex flex-row items-center justify-between'>
                              <Text>{fileName} </Text>
                            </View>
                          </TouchableHighlight>
                      )
                    }): 
                    <Text className='m-auto font-bold'>File list In progress...</Text>
                    }
                  </ScrollView>
            </View>
          </SafeAreaView>
  );
}
