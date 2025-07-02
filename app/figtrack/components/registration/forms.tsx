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


function Personal (
    { validation }: any ){
    return (
        <View style={formStyle.form}>

            <View style={formStyle.formItem}>
                <Text>First Name</Text>
                <TextInput 
                style={formStyle.formInput}
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
                <Text>Last Name</Text>
                <TextInput 
                style={formStyle.formInput}
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
                <Text>Email</Text>
                <TextInput 
                style={formStyle.formInput}
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
                <Text>Password</Text>
                <TextInput 
                style={formStyle.formInput}
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
            console.log("working", validation.values.organization);
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
                            {key:'Institution', value:'Institution', disabled: true},
                            {key:'Individual', value:'Individual', disabled: false},
                            {key:'Business', value:'Business', disabled: true},
                        ]} 
                        save="key"
                        
                    />
                    {validation.errors.organization || validation.values.organization === undefined? <Text className='text-red-500 font-bold px-2'>
                    Required
                    </Text>: ''}
                </View>
                {
                    organizationSelected == 'Business' ? <Company validation={validation} /> :
                    organizationSelected == 'Individual' ? <Individual validation={validation} /> :
                    organizationSelected == 'Institution'? <Institution validation={validation} />: 
                ''
                }
            </View>

            
          );
}

// for organization
function Institution ({ validation }: any) {
        return (
            <View style={formStyle.form}>
                <View style={formStyle.formItem}>
                    <Text>Institution</Text>
                    <SelectList setSelected={(val) => {
                        console.log("bank selected: ", val);
                            
                        }
                        } 
                        data={institutionList.list()}
                        save="value">

                    </SelectList>
                </View>

                <View style={formStyle.formItem}>
                    <Text>Department</Text>
                    <TextInput 
                    style={formStyle.formInput}
                    placeholder='Computer Science'
                    />
                </View>

                <View style={formStyle.formItem}>
                    <Text>Select Level</Text>
                    <TextInput 
                    style={formStyle.formInput}
                    placeholder='100 level'
                    />
                </View>

                <View style={formStyle.formItem}>
                    <Text>Matric Number</Text>
                    <TextInput 
                    style={formStyle.formInput}
                    placeholder='2020XXXX'
                    />
                </View>
            </View>
            
          );
}

// for organization
function Individual ({ validation }: any) {
        return (
            <View style={formStyle.form}>
                {/* <View style={formStyle.formItem}>
                    <Text>Institution</Text>
                    <TextInput 
                    style={formStyle.formInput}
                    placeholder='Federal University'
                    />
                </View>

                <View style={formStyle.formItem}>
                    <Text>Department</Text>
                    <TextInput 
                    style={formStyle.formInput}
                    placeholder='Computer Science'
                    />
                </View>

                <View style={formStyle.formItem}>
                    <Text>Select Level</Text>
                    <TextInput 
                    style={formStyle.formInput}
                    placeholder='100 level'
                    />
                </View>

                <View style={formStyle.formItem}>
                    <Text>Matric Number</Text>
                    <TextInput 
                    style={formStyle.formInput}
                    placeholder='2020XXXX'
                    />
                </View> */}
                <Text style={{'textAlign': 'center', padding: 4}}>Proceed to the next page</Text>
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
                    <Text>Select Bank</Text>
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

                <View style={formStyle.formItem}>
                    <Text>Bank</Text>
                    <TextInput 
                    style={formStyle.formInput}
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
                    <Text>Account Number</Text>
                    <TextInput 
                    style={formStyle.formInput}
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
                    <Text>Account Name</Text>
                    <TextInput 
                    style={formStyle.formInput}
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
            <SafeAreaView edges={['top']} style={style.container}>

            <ScrollView>
            <Formik
                initialValues={{ }}
                onSubmit={async (res, {setErrors})=>{
                        const response = await signupREQUEST(res)
                        
                        if (!response.status) {
                            await setErrors("error")
                        }else{
                            navigation.navigate('/(auth)')
                        }
                        
                    }}
                
                    
                validationSchema={signupSchema}
            >{(formObjects)=>(
                <ScrollView style={formStyle.form}>


                    <View>
                    {
                    this.state.currentScreen == 3? <Bank validation={formObjects}/> :
                    this.state.currentScreen == 2? <Organization validation={formObjects} /> :
                    // this.state.currentScreen == 1? <Personal/> :
                    this.state.currentScreen == 1? <Personal validation={formObjects} /> :
                    <Text>Done</Text>
                    }
                    </View>

                    <View className='flex flex-row justify-between mx-1'>
                    <TouchableOpacity 
                        onPress={()=> {
                            this.decreaseNav(this.state)
                        }}
                        // go back
                    style={[style.navigator, style.navBack]}>
                    <Text style={[style.navigatorText, style.navigatorBack]}> Back</Text>
                    </TouchableOpacity>
            
                    <TouchableOpacity 
                        onPress={()=> {
                            this.increaseNav(this.state)
                        }}
                        // go forward
                    style={[style.navigator, style.navContinue]}>
                    <Text style={style.navigatorText}>Continue</Text>
                    </TouchableOpacity>
                    </View>

                    <TouchableOpacity 
                    // disabled={true}
                    onPress={(form)=>{
                        formObjects.handleSubmit(form)
                        
                    }}
                    className=' bg-black flex flex-row justify-center rounded-md p-2 m-4'
                    >
                    <Text style={style.navigatorText}>Submit</Text>
                    </TouchableOpacity>

                </ScrollView>

            )}


            </Formik>
            </ScrollView>

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