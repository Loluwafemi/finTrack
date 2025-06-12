import { Link } from 'expo-router';
import { Component, ReactNode, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Pressable, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { BankList } from '../variables/banks';
import { institutionList } from '../variables/institution';


// define tabs here

// Tab A: names, ...

// Tab B: B1 institution / B2 non-institution: unavailble
// B1 institution name, Level, matric Number, Department
// B2 BVN / others 

// Tab C: Bank name, Account Number, Account Name
  

class Personal extends Component{
    
    render(): ReactNode {
        return (
            <View style={formStyle.form}>
                <View style={formStyle.formItem}>
                    <Text>First Name</Text>
                    <TextInput 
                    style={formStyle.formInput}
                    placeholder='Davis'
                    />
                </View>

                <View style={formStyle.formItem}>
                    <Text>Last Name</Text>
                    <TextInput 
                    style={formStyle.formInput}
                    placeholder='Jones'
                    />
                </View>

                <View style={formStyle.formItem}>
                    <Text>Title</Text>
                    <SelectList 
                        setSelected={(val) => console.log(val)
                        } 
                        data={[
                            {key:'Mrs', value:'Mrs'},
                            {key:'Mr', value:'Mr'},
                        ]} 
                        save="value"
                    />
                </View>
            </View>
            
          );
    }
}

class Organization extends Component{
    organization: 'University' |'Company' | 'Individual' | ''
    constructor(props:any){
        super(props);
        this.state = {selectedOrganization: ''};
        this.organization = ''
    }

    changeOraganization(stateValue){
        if (stateValue) {            
            this.setState({selectedOrganization: stateValue})
        }
    }


    
    render(): ReactNode {
        return (
            <View style={formStyle.form}>
                <View style={formStyle.formItem}>
                    <Text>Select Organization</Text>
                    <SelectList 
                        setSelected={(val) => {
                            this.changeOraganization(val)
                        }
                        } 
                        data={[
                            {key:'University', value:'University', disabled: false},
                            {key:'Individual', value:'Individual', disabled: false},
                            {key:'Company', value:'Company'},
                        ]} 
                        save="value"
                    />
                </View>

                {
                    this.state.selectedOrganization == 'Company' ? <Company /> :
                    this.state.selectedOrganization == 'Individual' ? <Individual /> :
                    this.state.selectedOrganization == 'University'? <Institution />: 
                ''
                }
            </View>

            
          );
    }
}


class Institution extends Component {
    render(): ReactNode {
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
}



class Individual extends Component {
    render(): ReactNode {
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
}

class Company extends Component {
    render(): ReactNode {
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
}

class Bank extends Component{
    render(): ReactNode {
        return (
            
            <View style={formStyle.form}>
                <View style={formStyle.formItem}>
                    <Text>Select Bank</Text>
                    <SelectList setSelected={(val) => {
                            console.log("bank selected: ", val);
                            
                        }
                        } 
                        data={BankList.list()}
                        save="value">

                    </SelectList>
                </View>

                <View style={formStyle.formItem}>
                    <Text>Account Number</Text>
                    <TextInput 
                    style={formStyle.formInput}
                    placeholder='12345678900'
                    />
                </View>

                <View style={formStyle.formItem}>
                    <Text>Account Name</Text>
                    <TextInput 
                    style={formStyle.formInput}
                    placeholder='Davis Jones'
                    />
                </View>
            </View>
            
          );
    }
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
    
        return (

            <SafeAreaProvider>
            <SafeAreaView edges={['top']} style={style.container}>
            <ScrollView style={formStyle.form}>

            <View>
                    { 
                    this.state.currentScreen == 3? <Bank/> :
                    this.state.currentScreen == 2? <Organization/> :
                    this.state.currentScreen == 1? <Personal/> :
                    this.state.currentScreen == 1? <Personal/> :
                    <Text>Done</Text>
                    }
                </View>

                <View style={style.navigationsBody}>
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
            </ScrollView>
                </SafeAreaView>
            </SafeAreaProvider>

        );
    }
}



const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      },
    navigationsBody: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 3
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
        backgroundColor: 'pink',
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