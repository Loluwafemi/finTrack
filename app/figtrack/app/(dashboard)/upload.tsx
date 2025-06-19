import '~/global.css';
import { useInitialAndroidBarSync } from '~/lib/useColorScheme';
import {Button, Text,TextInput,TouchableHighlight,View } from 'react-native';
import { Icon } from '@roninoss/icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import GrantDropList from '~/components/nativewindui/grantList';
import GrantPendList from '~/components/nativewindui/grantSpend';
import * as DocumentPicker from 'expo-document-picker';
import { Formik } from 'formik';
import { receiptUploadingSchema } from '~/lib/func/auth';
import { useState } from 'react';


export default function UsersUpload() {
  useInitialAndroidBarSync();
  const navigation = useRouter()

  // process picked file. either pdf or img and return data blob
  const _pickeDocument = async ()=>{
    let result = await DocumentPicker.getDocumentAsync({
        // define what you want to select here
        multiple: false,
        base64: true,
        copyToCacheDirectory: false,
        // select only images and pdf for tailoring 
        type: ['image/jpeg', 'image/png', 'application/pdf']
    })
    console.log(result);
  }



  // validate form, process form and then change this state if all valid.
  // valid is: readable and sendable
  const [receiptIsReady, processForm ] = useState(false)

  // write processed data
  const [receiptData, processReceiptFunction ] = useState('')


  function processReceiptFromRawToJson(form: any) {
      // external function to process receipt, an api call through cors
      const receiptTailor: {status: boolean, data: string} = {status: true, data: ''}


      if (receiptTailor.status) {
        processForm(true)
        processReceiptFunction(receiptTailor.data)
      }else{
        processForm(false)
      }

  }


  // send data to db
  function submitProcessedReceipts(data: any) {
      console.log("FOrm submitted to database");
  }




  return (
      <SafeAreaView edges={['top']} className='m-4'>
        
          <View className='flex flex-row items-center'>
              <TouchableHighlight onPress={()=> {
                navigation.back()
              }}>
                <Icon name='chevron-left' />
              </TouchableHighlight>
              <Text className='mx-5 font-bold'>Upload Receipts</Text>
          </View>
          <View className='m-4 flex flex-col'>
              {/* Allow User to select grant and spending package */}
              <Formik
                initialValues={{
                  
                }}

                onSubmit={(res)=>{
                  console.log(res);
                  processReceiptFromRawToJson(res)
                }}
                
                validationSchema={receiptUploadingSchema}
              >{(formObject:any)=>(
                <View>
                    <View className='mt-4 mb-3'>
                        <GrantDropList validation={formObject} userGrant={''} />
                        {formObject.errors.budget? <Text className='text-red-500 font-bold px-2'>
                          {formObject.errors.budget}
                        </Text>: ''}
                    </View>

                    {/* Allow User to select grant spending package */}
                    <View className='mt-4 mb-3'>
                        <GrantPendList validation={formObject} userGrantSpend={''} />
                        {formObject.errors.expense? <Text className='text-red-500 font-bold px-2'>
                          {formObject.errors.expense}
                            </Text>: ''}
                    </View>


                    <TouchableHighlight
                      onPress={()=>{
                        const receiptFile = _pickeDocument()
                        formObject.setFieldTouched('receipt', true)
                        formObject.setFieldValue('receipt', receiptFile)
                      }}
                      className='p-4 bg-gray-300 rounded-xl inset-shadow-sm'
                    >
                      <Text className='text-center font-bold'>
                        Select Receipt
                      </Text>
                    </TouchableHighlight>
                    {formObject.errors.receipt? <Text className='text-red-500 font-bold px-2'>
                    {formObject.errors.receipt}
                            </Text>: ''}

                    {/* Form allows user to add more details */}
                    <View className='mt-4'>
                        <TextInput
                          className='border border-gray-500 p-3 rounded-xl'
                          placeholder='Description ...'
                          onChangeText={formObject.handleChange('description')}
                          onBlur={formObject.handleBlur('description')}
                          value={formObject.values.description}
                        />
                        {formObject.errors.description? <Text className='text-red-500 font-bold px-2'>
                          {formObject.errors.description}
                            </Text>: ''}
                    </View>
                    <View className='flex flex-col mt-4'>
                        <Button onPress={(e)=>{
                        formObject.handleSubmit(e)
                        }} color={'black'} title='Process' />
                    </View>
                </View>

              )}

              </Formik>
              {/* Displays Processed Receipts */}
              <Formik
                initialValues={{

                }}
                onSubmit={()=> submitProcessedReceipts(receiptData)}
              >
                {({ handleSubmit })=>(
                  <View>

                    <ProcessedReceiptCard response={'incoming'}/>
                    <View className='flex flex-col mt-4'>
                        <Button disabled={!receiptIsReady} title='Submit' onPress={()=>{
                          handleSubmit()
                        }} />
                    </View>
                  </View>
                )}
              </Formik>
          </View>
      </SafeAreaView>
  );
}


// define expected schema
function ProcessedReceiptCard({response}) {
  
  return (
    <View className='mt-4 bg-gray-200 rounded p-3'>
        <Text className='m-auto'>
          Processed Receipt to JSON
        </Text>
        <Text>
          {response}
        </Text>
    </View>
  );
}