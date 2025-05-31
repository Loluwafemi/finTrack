import { Link } from 'expo-router';
import { Component, ReactNode } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Pressable, TouchableOpacity } from 'react-native';

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
                    <Text>Last Name</Text>
                    <TextInput 
                    style={formStyle.formInput}
                    placeholder='Jones'
                    />
                </View>
            </View>
            
          );
    }
}

class Institution extends Component{
    render(): ReactNode {
        return (
            <View style={formStyle.form}>

                <View style={formStyle.formItem}>
                    <Text>Select Organization</Text>
                    <TextInput
                    readOnly
                    style={formStyle.formInput}
                    placeholder='Institution'
                    />
                </View>

                <View style={formStyle.formItem}>
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
                    <TextInput 
                    style={formStyle.formInput}
                    placeholder='Access Bank'
                    />
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
    constructor(props){
        super(props);
        this.state = {currentScreen: 1};
        this.limit = 3
    }

    increaseNav(stateValue){
        // set limit: limit is 3
        if (stateValue.currentScreen < this.limit) {
            this.setState({currentScreen: stateValue.currentScreen + 1})
        }
    }

    decreaseNav(stateValue){
        if(stateValue.currentScreen <= 1){
        }else{
            this.setState({currentScreen: stateValue.currentScreen - 1})
        }
    }
    
    render(): ReactNode {
        


        return (

            <View>
                {/* on clicking any, it replaces the currentView with the passed view */}
                <View>
                    { 
                    this.state.currentScreen == 3? <Bank/> :
                    this.state.currentScreen == 2? <Institution/> :
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

                <Link href={'/(dashboard)'}> continue</Link>
            </View>

        );
    }
}



const style = StyleSheet.create({
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
        margin: 0
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