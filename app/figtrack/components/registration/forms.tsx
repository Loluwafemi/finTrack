import { Link, useRouter } from 'expo-router';
import { Component, ReactNode, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Pressable, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { BankList } from '../variables/banks';
import { institutionList } from '../variables/institution';
import { Formik } from 'formik';
import { signupSchema } from '~/lib/func/auth';
import { signupREQUEST } from '~/lib/server/server';
import ExpoCheckbox from 'expo-checkbox/build/ExpoCheckbox';


function Personal (
    { validation }: any ){
    return (
        <View className='p-1'>

            <View style={formStyle.formItem}>
                <Text className='font-bold text-md'>First Name</Text>
                <TextInput 
                className='p-4 border border-gray-500 rounded-xl mt-2'
                placeholder='Davis'
                onBlur={validation.handleBlur('firstname')}
                onChangeText={validation.handleChange('firstname')}
                value={validation.values.firstname}
                />
                {validation.errors.firstname? <Text className='text-red-500 font-bold px-2'>
                {validation.errors.firstname}
                </Text>: ''}
            </View>

            <View style={formStyle.formItem}>
                <Text className='font-bold text-md'>Last Name</Text>
                <TextInput 
                className='p-4 border border-gray-500 rounded-xl mt-2'
                placeholder='Jones'
                onBlur={validation.handleBlur('lastname')}
                onChangeText={validation.handleChange('lastname')}
                value={validation.values.lastname}
                />
                {validation.errors.lastname? <Text className='text-red-500 font-bold px-2'>
                {validation.errors.lastname}
                </Text>: ''}
            </View>

            <View style={formStyle.formItem}>
                <Text className='font-bold text-md'>Email</Text>
                <TextInput 
                className='p-4 border border-gray-500 rounded-xl mt-2'
                placeholder='youremail@email.com'
                onBlur={validation.handleBlur('email')}
                onChangeText={validation.handleChange('email')}
                value={validation.values.email}
                />
                {validation.errors.email? <Text className='text-red-500 font-bold px-2'>
                {validation.errors.email}
                </Text>: ''}
            </View>

            <View style={formStyle.formItem}>
                <Text className='font-bold text-md'>Password</Text>
                <TextInput 
                className='p-4 border border-gray-500 rounded-xl mt-2'
                placeholder='********'
                onBlur={validation.handleBlur('password')}
                onChangeText={validation.handleChange('password')}
                value={validation.values.password}
                />

                {validation.errors.password? <Text className='text-red-500 font-bold px-2'>
                {validation.errors.password}
                </Text>: ''}
            </View>
        </View>
    
    );
}

// organization page
function Organization ({ validation }: any){

    let organization: 'Institution' |'Company' | 'Individual' | '' = 'Individual';

    const [organizationSelected, switchOraganization] = useState('')

    const changeOraganization = (stateValue: typeof organization)=>{
        if (stateValue) {            
            switchOraganization(stateValue)
            validation.setFieldValue('organization', stateValue)
            validation.setFieldTouched('organization', true)
        }
    }

        return (
            <View style={formStyle.form}>
                <View style={formStyle.formItem}>
                    <Text>Select Organization</Text>
                    <SelectList
                        setSelected={(val:any) => {                            
                            changeOraganization(val)
                        }
                        } 
                        data={[
                            {key:'Institution', value:'Institution', disabled: false},
                            {key:'Personal', value:'Personal', disabled: false},
                            // {key:'Business', value:'Business', disabled: false},
                        ]} 
                        save="key"
                        
                    />
                    {validation.errors.organization || validation.values.organization === undefined? <Text className='text-red-500 font-bold px-2'>
                    Required
                    </Text>: ''}
                </View>
                {
                    organizationSelected == 'Business' ? <Company validation={validation} /> :
                    organizationSelected == 'Personal' ? <Individual validation={validation} /> :
                    organizationSelected == 'Institution'? <Institution validation={validation} />: 
                ''
                }
            </View>

            
          );
}

// for organization
function Institution ({ validation }: any) {

        const [ selectedInstitution, selectInstitution ] = useState('')
        return (
            <View style={formStyle.form}>
                <View style={formStyle.formItem}>
                    <Text>Institution</Text>
                    <SelectList 
                        setSelected={(val) =>  selectInstitution(val)}
                        onSelect={()=>{
                            if (validation) {
                                validation.setFieldTouched('organizationname', true)
                                validation.setFieldValue('organizationname', selectedInstitution)
                            }

                        }}
                        data={institutionList.list()}
                        save="value">

                    </SelectList>
                    {validation.errors.organizationname? <Text className='text-red-500 font-bold px-2'>
                    {validation.errors.organizationname}
                    </Text>: <Text></Text>}
                </View>
                <View style={formStyle.formItem}>
                    <Text>Institution ID</Text>
                    <TextInput 
                    className='p-3 border border-black p-2 rounded-lg'
                    onChangeText={validation.handleChange('organizationid')}
                    onBlur={validation.handleBlur('organizationid')}
                    value={validation.values.organizationid}

                    />
                    {validation.errors.organizationid? <Text className='text-red-500 font-bold px-2'>
                    {validation.errors.organizationid}
                    </Text>: <Text></Text>}
                </View>


            </View> 
          );
}

// for pernal
function Individual ({ validation }: any) {

    /* 
    
        if (validation) {
        validation.setFieldTouched('organizationname', true)
        validation.setFieldValue('organizationname', "Personal")


        validation.setFieldTouched('organizationid', true)
        validation.setFieldValue('organizationid', "Personal")
    }
    */
        const [ isTouched, touch ] = useState(false)

        
        return (
            <View style={formStyle.form}>
                <View className='flex flex-row justify-start items-center'>
                    <ExpoCheckbox 
                    onTouchStart={()=> {
                        validation.setFieldTouched('organizationname', true)
                        validation.setFieldValue('organizationname', "Personal")
                
                        validation.setFieldTouched('organizationid', true)
                        validation.setFieldValue('organizationid', "Personal")
                        
                        touch(true)

                    } }
                    value={isTouched}
                    />
                    <Text style={{'textAlign': 'center', padding: 4}}>
                        Check the box twice then continue
                    </Text>
                </View>


                {validation.errors.organizationname || validation.errors.organizationid? <Text className='text-red-500 font-bold px-2'>
                    Required!
                 </Text>: <Text></Text>}
            </View>
            
        );
}

// for organization
function Company ({ validation }: any) {
    return (
        <View style={formStyle.form}>
            <View style={formStyle.formItem}>
                <Text>Name</Text>
                <TextInput 
                style={formStyle.formInput}
                placeholder='e.g Finance & Grant Tracker'
                />
            </View>

            <View style={formStyle.formItem}>
                <Text>Address</Text>
                <TextInput 
                style={formStyle.formInput}
                placeholder=''
                />
            </View>

            <View style={formStyle.formItem}>
                <Text>Phone Number</Text>
                <TextInput 
                style={formStyle.formInput}
                placeholder=''
                />
            </View>

            <View style={formStyle.formItem}>
                <Text>Registration Number</Text>
                <TextInput 
                style={formStyle.formInput}
                placeholder=''
                />
            </View>
        </View>
        
        );
}

function Bank ({ validation }){
        let [selectedBank, changeBank ] = useState('')

        const changeSelectedBank = (bank)=>{
            changeBank(bank)
        }
        return (
            
            <View style={formStyle.form}>
                <View style={formStyle.formItem}>
                    <Text className='font-bold text-md'>Select Bank</Text>
                    <SelectList 
                        setSelected={(val) => {
                                changeSelectedBank(val)
                                validation.setFieldTouched('bank', true)
                                validation.setFieldValue('bank', val)
                            }}
                        data={BankList.list()}
                        save="key"
                        placeholder='Select Bank'
                        >
                    </SelectList>
                </View>

                <View>
                    <Text className='font-bold text-md'>Bank</Text>
                    <TextInput 
                    className='p-4 border border-gray-500 rounded-xl mt-2'
                    placeholder=''
                    readOnly={true}
                    onBlur={validation.handleBlur('bank')}
                    onChangeText={validation.handleChange('bank')}
                    value={selectedBank}

                    />
                    {validation.errors.bank? <Text className='text-red-500 font-bold px-2'>
                    {validation.errors.bank}
                    </Text>: ''}
                </View>

                <View style={formStyle.formItem}>
                    <Text className='font-bold text-md'>Account Number</Text>
                    <TextInput 
                    className='p-4 border border-gray-500 rounded-xl mt-2'
                    placeholder='12345678900'
                    onBlur={validation.handleBlur('accountnumber')}
                    onChangeText={validation.handleChange('accountnumber')}
                    value={validation.values.accountnumber}
                    />
                    {validation.errors.accountnumber? <Text className='text-red-500 font-bold px-2'>
                    {validation.errors.accountnumber}
                    </Text>: ''}
                </View>

                <View style={formStyle.formItem}>
                    <Text className='font-bold text-md'>Account Name</Text>
                    <TextInput 
                    className='p-4 border border-gray-500 rounded-xl mt-2'
                    placeholder='Davis Jones'
                    onBlur={validation.handleBlur('accountname')}
                    onChangeText={validation.handleChange('accountname')}
                    value={validation.values.accountname}
                    />

                    {validation.errors.accountname? <Text className='text-red-500 font-bold px-2'>
                    {validation.errors.accountname}
                    </Text>: ''}
                </View>
            </View>
            
          );
}

export class FormNav extends Component{
    limit: number
    constructor(props:any){
        super(props);
        this.state = {currentScreen: 1};
        this.limit = 3
    }

    increaseNav(stateValue:any){
        // set limit: limit is 3
        if (stateValue.currentScreen < this.limit) {
            this.setState({currentScreen: stateValue.currentScreen + 1})
        }
    }

    decreaseNav(stateValue:any){
        if(stateValue.currentScreen <= 1){
        }else{
            this.setState({currentScreen: stateValue.currentScreen - 1})
        }
    }
    
    render(): ReactNode {
        const validationSchema = signupSchema
        const navigation = useRouter()

        return (

            <SafeAreaProvider>
            <SafeAreaView className=''>
                
                <Formik
                    initialValues={{ displayer: '' }}
                    onSubmit={async (res, {setErrors})=>{
                            const response = await signupREQUEST(res)
                            
                            if (!response.status) {
                                return await setErrors({displayer: response.message})
                            }else{
                            return navigation.navigate('/(auth)')
                            }
                            
                        }}
                    
                        
                    validationSchema={signupSchema}
                >{(formObjects)=>(
                    <ScrollView contentContainerClassName='h-full flex flex-col justify-center'>
                        <Text className='text-4xl mb-8 px-3'>Sign Up</Text>

                        <View>
                        {
                        this.state.currentScreen == 3? <Bank validation={formObjects}/> :
                        this.state.currentScreen == 2? <Organization validation={formObjects} /> :
                        // this.state.currentScreen == 1? <Personal/> :
                        this.state.currentScreen == 1? <Personal validation={formObjects} /> :
                        <Text>Done</Text>
                        }
                        </View>

                        <View className='flex flex-row mx-1'>
                        <TouchableOpacity
                            className='p-3 flex-1 border border-gray-700 m-1 rounded-xl'
                            onPress={()=> {
                                this.decreaseNav(this.state)
                            }}
                            // go back
                        >
                        <Text className='text-center' style={[style.navigatorText, style.navigatorBack]}> Back</Text>
                        </TouchableOpacity>
                
                        <TouchableOpacity 
                        className='p-3 bg-gray-700 m-1 flex-1 rounded-xl'
                            onPress={()=> {
                                this.increaseNav(this.state)
                            }}
                            // go forward
                        >
                        <Text className='text-white text-center'>Continue</Text>
                        </TouchableOpacity>
                        </View>

                        <TouchableOpacity 
                        // disabled={true}
                        onPress={(form)=>{
                            formObjects.handleSubmit(form)
                            
                        }}
                        // disabled={formObjects.isValid}
                        
                        
                        className={`flex ${formObjects.isValid? 'bg-green-800 p-3': 'bg-red-800'} flex-row justify-center rounded-xl p-2 m-1 mt-4`}
                        >
                        <Text className='font-bold' style={style.navigatorText}>Submit </Text>
                        </TouchableOpacity>
    {/* 
                        {!formObjects.isValid? <Text className='text-red-500 font-bold px-2'>
                        Form incomplete, continue....
                        </Text>: <Text>validating.....</Text>} */}
                    </ScrollView>

                )}


                </Formik>
            </SafeAreaView>
            </SafeAreaProvider>

        );
    }
}



const style = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: StatusBar.currentHeight,
      },
    navigator: {
        padding: 8
    },
    navigatorText: {
        color: '#FEFCFD',
    },
    navBack: {
        flex: 2,
        borderColor: '#050304',
        borderWidth: 1,
        margin: 1
    },
    navContinue: {
        flex: 8,
        backgroundColor: '#050304',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    navigatorBack: {
        color: '#050304'
    },
})

const formStyle = StyleSheet.create({
    body: {
        padding: 8,
        borderWidth: 0.1,
        borderColor: '#050304',
        display: 'flex',
        flexDirection: 'column'
    },
    form: {
        margin: 0,
        backgroundColor: '',
        padding: 8
      },
    formItem: {
        margin: 6
    },
    formInput: {
    borderColor: '#000000',
    borderWidth: .5,
    // width: 300,
    height: 33,
    padding: 5,
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'column',
    // flex: 2
    },
})