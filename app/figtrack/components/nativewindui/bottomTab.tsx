import React, { Component, ReactNode, useEffect, useMemo, useState } from "react";
import { Button, StyleSheet, TouchableHighlight, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {  } from "react-native-safe-area-context";
import { Text } from "./Text";
import '~/global.css'
import { Icon } from "@roninoss/icons";
import { TransactionList } from "./transactionList";
import { SelectList } from "react-native-dropdown-select-list";
import { GrantFeatureList } from "./grantFeatureList";
import { GrantFeatureGraph } from "./grantFeatureGraph";
import { AcivityPage } from "./activitiesPage";
import { useRouter } from "expo-router";
import GrantDropList from "./grantList";
import { Auth, balacesTemplate, budgetList, expensesTemplate, transactionTemplate } from "~/lib/func/tailored";
import { signouREQUEST } from "~/lib/server/server";
import { Formik } from "formik";
import { recordProviderForBudgetSchema } from "~/lib/func/auth";




export function UserHome(){
    const navigation = useRouter()

    // useMemo
    const [balance, setBalances] = useState<number | null>(null)
    const [transactions, setTransaction] = useState([])
    const [currentUser, selectUser] = useState<any>('')

    useEffect(()=>{
        const gettTransactions = async () => {
        const authObject = new Auth()
        let transactions: transactionTemplate = await authObject.transactions() 
        const userObject = await authObject.profile()
        
        selectUser(userObject)
        // assign returned data to those useState
        setBalances(transactions.balance)
        setTransaction(transactions.transactions)

        
        };
        gettTransactions();
    }, [])
    
    return (
        <ScrollView className="p[4px]">
            {/* header */}
            <View className="flex flex-row p-[2px] justify-between items-center">
                <Text className="font-bold text-2xl">Dashboard</Text>
                <Text className="font-bold text-xs ">
                    Account | { currentUser?.data?.organization }
                </Text>
            </View>

            {/* Asset Balance Display */}
            <View className="shadow-2xl p-3 bg-black rounded-md">
                <View className="flex flex-row justify-between items-center">
                    <Text  className="text-gray-200 text-xs">Total Available</Text>
                    <View className="bg-gray-600 p-[3px] px-[8px] rounded-lg">
                        <Text className="flex-row items-center">
                            <Icon color="red" size={15} name="cash" />
                            <Text className="text-gray-300 text-xs">+N0.00 spent this month</Text>
                            </Text>
                    </View>
                </View>

                <View>
                    <Text className="text-gray-200 text-2xl font-bold">
                        N{balance}
                    </Text>
                </View>
                <View>
                    <Text className="text-gray-200 text-[10px]">
                        last updated -- min -- sec ago
                    </Text>
                </View>
            </View>
            
            {/* Transaction actions */}
            <View className="shadow-md flex flex-row justify-between p-3">
                <TouchableHighlight 
                className="p-3 rounded-xl bg-gray-400 flex-1"
                onPress={()=>{
                    navigation.navigate('/(dashboard)/upload')
                }}
                >
                    <Text className="text-md flex items-center flex-row">
                        <Icon name="arrow-up-bold-circle" size={18} />
                        Upload</Text>
                </TouchableHighlight>
            </View>
            {/* <View className="d-none shadow-md bg-gray-400 flex flex-row p-3 h-4">
                <Text>Display News</Text>
            </View> */}

            {/* Display Recent Transactions */}
            <View>
                <View className="flex flex-row justify-between mt-[4px] px-1">
                    <Text className="text-sm">Transactions</Text>
                    <TouchableHighlight>
                        <Text className="text-sm font-bold">View All</Text>
                    </TouchableHighlight>
                </View>

                <View className="p-3">
                    {true? <TransactionList transactions={transactions}  />: 
                    <View className='m-auto p-1'>
                        <Text className="text-gray-400 text-sm">No Record Found</Text>
                    </View>
                    }
                    
                </View>
            </View>
        </ScrollView>
    );
}

export function UserRecord(){

    const userObject = new Auth()


    const [isChart, changeView] = useState(false)


    // this are dynamic space for selectedBudget's expenses and the balances
    const [budget, selectBudget] = useState <budgetList[] | []>([])
    const [balances, setBalaces] = useState<balacesTemplate | { total_a: 0;
    total_s: 0; }>({total_a: 0, total_s: 0})

    const [ selectedBudgetExpenses, selectedBudget ] = useState<expensesTemplate[] | []>([])


    useEffect(()=>{
        const gettTransactions = async () => {
        let transactions: {budgets: budgetList[], expenses: expensesTemplate[], balances: balacesTemplate} = await userObject.records('')    
        
        

        selectBudget(transactions.budgets)
        setBalaces(transactions.balances)
        selectedBudget(transactions.expenses)

        };
        gettTransactions();
    }, [])

    function toggleScreen(){
        changeView(!isChart)
    }
    
    // use formik to present data. on select calls and resond immediately
    if (budget.length > 0) {
        return (
            <Formik
            
            initialValues={{
                selectedBuget: ''       // first element
            }}
            onSubmit={ async (selectedBudgetID)=>{
                // console.log('ready to parse');
                let transactions: {budgets: budgetList[], expenses: expensesTemplate[], balances: balacesTemplate} = await userObject.records(selectedBudgetID.selectedBuget)
                selectedBudget(transactions.expenses)
                selectBudget(transactions.budgets)
                setBalaces(transactions.balances)
                
            }}

            validationSchema={recordProviderForBudgetSchema}
            >
            {/* add error to display a message when a budget is not approved */}
            {({handleSubmit, values, setFieldTouched, setFieldValue})=>(
                <View className="p-2">
                    <Text className="text-sm font-bold">Budget Details</Text>
                    <GrantDropList userGrant={budget} validation={null} 
                        innerEvent={(selected)=>{                        
                            setFieldTouched('selectedBuget', true)
                            setFieldValue('selectedBuget', selected)
                            handleSubmit(selected)                            
                        }}
                    />

                    {/* Display selected grant */}
                    <View>
                        <View className="shadow-2xl mt-3 p-3 bg-black rounded-md">
                            <View className="flex flex-row justify-between items-center">
                                <Text  className="text-gray-200 text-xs">Total </Text>
                                <View className="bg-gray-600 p-[3px] px-[8px] rounded-lg">
                                    <Text className="text-gray-200 text-xs">Total Available</Text>
                                </View>
                            </View>
                            <View className="flex flex-row justify-between">
                                <Text className="text-gray-200 text-2xl font-bold">
                                    N{balances.total_a}
                                </Text>

                                <Text className="text-gray-200 text-2xl font-bold">
                                    N{balances.total_s}
                                </Text>
                            </View>
                            <View className="flex flex-row justify-between">
                                <Text className="text-gray-200 text-[10px]">
                                    Dec 23, 2024
                                </Text>
                                <Text className="text-gray-200 text-[10px]">
                                    N0.00 this week
                                </Text>
                            </View>
                        </View>
                        {/* Filter */}
                        <View className="flex flex-row p-2 mt-2 bg-red-700 rounded-lg justify-between items-center">
                            <TouchableHighlight
                                onPress={toggleScreen}
                            >
                                {
                                isChart? 
                                <Icon color="white" name="chart-pie" size={20}/>: <Icon color="white" name="clipboard-list" size={20}/>
                                }
                            </TouchableHighlight>
                            <TouchableHighlight
                                onPress={()=>{
                                    // console.log("Open date");
                                }}>
                                <Icon color="white" name="calendar-clock" 
                                size={20} />
                            </TouchableHighlight>
                        </View>
                        {/* Display the analysis of selected grant */}
                        {
                        isChart?
                        <ShowChartInterface />: <ShowListInterface expenses={selectedBudgetExpenses} />
                        }
                    </View>
                    
                </View>
            )}

            </Formik>
        );
    }else{
        return (
            <View className="m-auto">
                    <Text className="text-gray-400 text-sm">No Record Found</Text>
            </View>
        )
    }
}

function ShowChartInterface() {
    return (                        
            <GrantFeatureGraph />
    );
}

function ShowListInterface({expenses}) {
    return (
        <GrantFeatureList expensesList={expenses} />
    );
}

export function Acivity(){

    const [notification, setNotification] = useState<[]>([])
    const [notificationType, toggleNotification] = useState<'notification' | 'activity' | 'message'| string>('activity')
    const authObject = new Auth()

    useEffect(()=>{
        const gettTransactions = async () => {
        let transactions = await authObject.activities(notificationType) 
            
        // assign returned data to the useState
        setNotification(transactions)                
        };
        gettTransactions();
    }, [])

    // console.log(notification);
    

    // let pointer = 0
        return (
    <View>
        <View className='px-2 flex flex-row justify-between items-center'>
            <Text>
                100+ unread
            </Text>
            <TouchableHighlight 
            onPress={async ()=>{
                //  to toggle around available notification
                
                // let setOfActivities = ['notification', 'activity', 'message']
                
                // if (pointer >= (setOfActivities.length)) {
                //     pointer = 0
                // }
                // let selecetedNotify = setOfActivities[pointer].toString()    
                
                // toggleNotification(selecetedNotify)
                
                // let transactions = await authObject.activities(notificationType)
                // // assign returned data to the useState
                // // setNotification(transactions)
                // // console.log(transactions);
                
                // pointer += 1
            }}
            >
                <Icon name='format-list-checks' />
            </TouchableHighlight>
        </View>

            {notification.length > 0? 
            <AcivityPage transactions={notification} />: 
            <View className="m-auto">
                <Text className="text-gray-400 text-sm">No Activity Found</Text>
            </View>
            }
        
    </View>
);


}

export function Settings(){
    const navigation = useRouter()

    const [isAuth, setStatus] = React.useState(null)

    React.useEffect(()=>{
        const getSession = async () => { 

        const response = await Auth.isAlive()      
        if (!response.status) return navigation.navigate('/(auth)')
        setStatus(response.data)
        };
        getSession();
    }, [])

    return (
        <View className="m-4">
            <View className="flex flex-row justify-between items-center mb-[10px]">
                <Text className="font-bold">Settings</Text>
                <TouchableHighlight className="bg-gray-800 p-1 rounded-sm"
                    onPress={()=>{
                        navigation.navigate('/(dashboard)/new')

                    }}
                >
                    <View className="flex flex-row items-center">
                            <Text className="flex flex-row items-center text-xs text-white">New </Text>
                            <Icon color="white" size={10} name="plus" />
                    </View>
                </TouchableHighlight>
            </View>

                {/* each row */}
            <ScrollView style={style.scrollScreen} className="bg-gray-100 flex flex-col">
                        <View>
                            <Text className="text-lg text-gray-800 font-bold">Account</Text>
                            <View>
                                <TouchableHighlight>
                                    <View className="flex flex-row items-center p-4 border-b border-black my-2 rounded-lg">
                                        <Icon name="account-circle-outline" />
                                        <Text className="mx-4">Profile</Text>
                                    </View>
                                </TouchableHighlight>

                                <TouchableHighlight>
                                    <View className="flex flex-row items-center p-4 border-b border-black my-2 rounded-lg">
                                        <Icon name="account-key" />
                                        <Text className="mx-4">Privacy & Security</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                        
                        <View>
                            <Text className="text-lg text-gray-800 font-bold">Budget & Expense Management</Text>
                            <View>
                                <TouchableHighlight>
                                    <View className="flex flex-row items-center p-4 border-b border-black my-2 rounded-lg">
                                        <Icon name="chart-box-outline" />
                                        <Text className="mx-4">Budgets</Text>
                                    </View>
                                </TouchableHighlight>

                                <TouchableHighlight>
                                    <View className="flex flex-row items-center p-4 border-b border-black my-2 rounded-lg">
                                        <Icon name="keyboard-settings" />
                                        <Text className="mx-4">Manage Budgets</Text>
                                    </View>
                                </TouchableHighlight>
                            
                                <TouchableHighlight>
                                    <View className="flex flex-row items-center p-4 border-b border-black my-2 rounded-lg">
                                        <Icon name="shield-lock-outline" />
                                        <Text className="mx-4">Privacy & Security</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>


                        <View>
                            <Text className="text-lg text-gray-800 font-bold">Reports and Sheets</Text>
                            <View>
                                <TouchableHighlight>
                                    <View className="flex flex-row items-center p-4 border-b border-black my-2 rounded-lg">
                                        <Icon name="chart-timeline-variant" />
                                        <Text className="mx-4">Generate Reports</Text>
                                    </View>
                                </TouchableHighlight>

                                <TouchableHighlight className="hidden">
                                    <View className="flex flex-row items-center p-4 border-b border-black my-2 rounded-lg">
                                        <Icon name="keyboard-settings" />
                                        <Text className="mx-4">Manage Budgets</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>


                        <View>
                            <Text className="text-lg text-gray-800 font-bold">App Preferences</Text>
                            <View>
                                <TouchableHighlight>
                                    <View className="flex flex-row items-center p-4 border-b border-black my-2 rounded-lg">
                                        <Icon name="weather-sunny" />
                                        <Text className="mx-4">Dark Mood</Text>
                                    </View>
                                </TouchableHighlight>

                                <TouchableHighlight className="hidden">
                                    <View className="flex flex-row items-center p-4 border-b border-black my-2 rounded-lg">
                                        <Icon name="keyboard-settings" />
                                        <Text className="mx-4">Manage Budgets</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>

                        <View>
                            <Text className="text-lg text-gray-800 font-bold">Communication and Supports</Text>
                            <View>
                                <TouchableHighlight>
                                    <View className="flex flex-row items-center p-4 border-b border-black my-2 rounded-lg">
                                        <Icon name="account-question" />
                                        <Text className="mx-4">Get Support</Text>
                                    </View>
                                </TouchableHighlight>

                                <TouchableHighlight className="">
                                    <View className="flex flex-row items-center p-4 border-b border-black my-2 rounded-lg">
                                        <Icon name="script-outline" />
                                        <Text className="mx-4">Terms and Conditions</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>

                        <View className=" justify-self-end-safe outline-green-400 outline">
                            <Button
                            onPress={async ()=>{
                                const responsee = await signouREQUEST()

                                if (responsee.status) return navigation.navigate('/(auth)')

                            }}
                            color={'red'} title="Logout" />
                        </View>
            </ScrollView>
        </View>
    );


}


const style = StyleSheet.create({
    scrollScreen: {
        height: '95%',
        paddingBottom: 50
    }
})


