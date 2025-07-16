import '~/global.css';
import { useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { Text,TextInput,TouchableHighlight,View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Icon } from '@roninoss/icons';

import ExpensListCard from '~/components/nativewindui/expenseItem';
import { BottomSheet } from '~/components/nativewindui/bottomDrawer';
import BudgetCategoryDropList from '~/components/nativewindui/budgetRegisteredCategories';
import BudgetExpenseDropList from '~/components/variables/budgetExpense';
import React, { useState } from 'react';
import { Auth } from '~/lib/func/tailored';
import { FieldArray, Formik } from 'formik';
import { expenseSchema, newBudgetSchema } from '~/lib/func/auth';


export default function UserAddGrant() {
  useInitialAndroidBarSync();
  const navigation = useRouter()

  const [selectedTemplate, changeTemplate] = useState('')

  const [isAuth, setStatus] = React.useState(null)

  React.useEffect(()=>{
      const getSession = async () => { 

      const response = await Auth.isAlive()
      if (!response.status) return navigation.navigate('/(auth)')
      setStatus(response.data)
      };
      getSession();
  }, [])

  /*
  Add formik, Session to push data since we neee user credential for that action
  */

  // remove later
  const [sheetstatus, changeSheetStatus] = useState(false)
  const chainFunctionFromChildtoParent = ()=>{
      changeSheetStatus(false)
  }

  const userObject = new Auth()
  return (
        <SafeAreaView className='p-4 bg-white h-full'
        >
          <Formik
          initialValues={{
            title: '',
            category: '',
            customcatogory: '',
            expenses: [],

          }}
          onSubmit={async (values, {setErrors})=>{

            const response = await userObject.addBudget({
              title: values.title,
              type: values.category,
              expenses: values.expenses
            })

            if (!response.status) return await setErrors({title: "error"})
              navigation.navigate('/(dashboard)')
          }}

          validationSchema={newBudgetSchema}

          >
          {({handleBlur, handleReset, handleChange, values, errors, handleSubmit, setFieldValue, setFieldTouched})=>(
            <View className='mt-8 h-full'>
                <View className='flex flex-row items-center'>
                <TouchableHighlight onPress={()=> navigation.back()}>
                  <Icon name='chevron-left' />
                </TouchableHighlight>
                <View className='flex-1 flex-row flex justify-center'>
                  <Text className='text-xl font-bold'>Start New Budget</Text>
                </View>
              </View>
              <View className='m-2 p-2 bg-gray-700 flex flex-row items-center justify-center rounded-md shadow-sm'>
                <Text className='text-white text-xs text-center me-5'>Fill Budget Descriptions and Categories</Text>
                <TouchableHighlight
                onPress={handleReset}
                >
                  <Icon name='trash-can-outline' color='white' size={15} />
                </TouchableHighlight>
              </View>
              <View className='m-2 p-2 rounded-md'>
                {/* Grant Name */}
                <Text className='font-bold mb-2'>Budget Title:</Text>
                <TextInput
                  className='border px-2 rounded-xl mb-2'
                  placeholder='e.g Travelling to Paris'
                  value={values.title}
                  onBlur={handleBlur('title')}
                  onChangeText={handleChange('title')}
                  
                />
                  {errors.title || errors.title? <Text className='text-red-500 font-bold px-2'>
                  {errors.title}
                </Text>: ''}
                <View className='m-2 p-2 bg-gray-700 rounded-md shadow-md'>
                  <Text className='text-white text-xs text-center'>Fill Budget Categories</Text>
                </View>
                {/* Grant Name */}
                <Text className='font-bold'>Category: </Text>
                <View className='my-2'>
                  <BudgetCategoryDropList validation={{setFieldTouched, setFieldValue}}  onSelect={(value)=>{
                    changeTemplate(value)
                  }} />
                    {errors.category || errors.category? <Text className='text-red-500 font-bold px-2'>
                    {errors.category}
                </Text>: ''}
                </View>
                
                {selectedTemplate === 'Custom'? 
                  <TextInput
                  className='border px-2 rounded-xl mb-2'
                  placeholder='e.g Vacation Budget'
                  value={values.customcatogory}
                  onBlur={handleBlur('customcatogory')}
                  onChangeText={handleChange('customcatogory')}
                />
                :
                ""  
              }
              {errors.customcatogory || errors.customcatogory? <Text className='text-red-500 font-bold px-2'>
              {errors.customcatogory}
                </Text>: ''}

              </View>
              <FieldArray
              name='expenses'
              >
                {(arrayFunction)=>(
                  <View>
                    <BottomSheet 
                    CallisVisible={sheetstatus}
                    >
                          <ExpenseForm 
                            output={(incoming)=>{
                              // remove duplicate expense
                              const isDuplicate = values.expenses.some(expense => expense.expenseCategory === incoming.expenseCategory);

                              if (isDuplicate) {
                                return arrayFunction.replace(values.expenses.findIndex(expense => expense.expenseCategory === incoming.expenseCategory), incoming);
                              }
                              arrayFunction.push(incoming);

                            }}
                            onSubmitCloseModal={chainFunctionFromChildtoParent}
                            />
                      
                    </BottomSheet>
                    {errors.expenses || errors.expenses? <Text className='text-red-500 font-bold px-2'>
                      Add at least 2 expense to your budget
                        </Text>: ''}
                    <ExpensListCard 
                        expenses={values.expenses} 
                        parentAction={arrayFunction}

                        />
                  </View>
                )}
                
              </FieldArray>    
              
              <TouchableHighlight
                onPress={handleSubmit}
              
              className='p-2 mx-4 bg-black rounded'>
                <View className='flex flex-row justify-center items-center'>
                  <Text className='text-white font-bold'>
                    Submit
                  </Text>
                  <Icon name='arrow-right' color='white' size={14} />
                </View>
              </TouchableHighlight>
            </View>
          )}

          </Formik>
            
        </SafeAreaView>
  );
}


const ExpenseForm = ({output, onSubmitCloseModal})=>{
  const [expenseCatType, changeCat] = useState('')
  
  return (
    <Formik
    initialValues={{
      expenseCategory: '',
      cost: ''
    }}

    onSubmit={async (expenseData, {resetForm, setErrors})=>{

        console.log(expenseData);
        if (!expenseData.expenseCategory) return setErrors({expenseCategory: 'Please select a category'})
        if (!expenseData.cost) return setErrors({cost: 'Please enter a cost'})  
        output(expenseData)
        resetForm()
        onSubmitCloseModal()      // not working fix
        

        
    }}

    validationSchema={expenseSchema}
    >{({errors, values, handleBlur, handleChange, handleReset, handleSubmit, setFieldTouched, setFieldValue})=>(
        <View className=''>
          <View>
            <Text className='text-lg font-bold'>Add Expense to Budget</Text>
            <BudgetExpenseDropList ExpensesFromBudget={[]} selectedBudget={(value)=>{
                setFieldTouched('expenseCategory', true)
                setFieldValue('expenseCategory', value)
                changeCat(value)
            }} />
            {
              expenseCatType === 'Custom'?
                  <TextInput
                  onBlur={handleBlur('expenseCategory')}
                  onChangeText={handleChange('expenseCategory')}
                  value={values.expenseCategory}
                  placeholder='Enter Expense' className='border border-grey-300 my-2 rounded-md px-[8px]'/>:
                  ''  
          }
              {errors.expenseCategory || errors.expenseCategory? <Text className='text-red-500 font-bold px-2'>
                  {errors.expenseCategory}
                </Text>: ''}
            <View className='flex flex-row items-center'>
              <Text className='mx-2 text-lg font-bold'>N</Text>
              <TextInput
                  inputMode='numeric'
                  onBlur={handleBlur('cost')}
                  onChangeText={handleChange('cost')}
                  value={values.cost}
              
              placeholder='100,000.00' className='border border-grey-300 my-2 rounded-md px-[8px] w-[50%]'/>
              {errors.cost || errors.cost? <Text className='text-red-500 font-bold px-2'>
                  {errors.cost}
                </Text>: ''}
            </View>
            
          </View>


          <TouchableHighlight
              onPress={handleSubmit}
            className='bg-black rounded-md my-2 p-2 flex flex-row justify-center'
            >
              <View className='flex flex-row justify-center items-center'>
                <Text className='text-white font-bold'>
                  Add
                </Text>
                <Icon name='plus' color='white' size={14} />
              </View>
          </TouchableHighlight>
        </View>
    )}

    </Formik>
  );
}