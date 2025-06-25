import React, { Component, ReactNode, useEffect, useMemo, useState } from "react";
import { Button, TouchableHighlight, View } from "react-native";
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
import { Auth } from "~/lib/func/tailored";
import { signouREQUEST } from "~/lib/server/server";




export function UserHome(){
    const navigation = useRouter()

    // useMemo
    const [balance, setBalances] = useState('')
    const [transactions, setTransaction] = useState([])
    const [spentInterval, setSpentInterval] = useState('')
    const [user, setUser] = useState({})

    useEffect(()=>{
        const gettTransactions = async () => {
        const userObject = await Auth.isAlive()
        const authObject = new Auth()
        let transactions: { tranactions: [], balance: string, spentInterval: string } = await authObject.transactions() 

        // assign returned data to those useState
        setUser(userObject.data)
        setBalances(transactions.balance)
        setTransaction(transactions.tranactions)
        setSpentInterval(transactions.spentInterval)
        };
        gettTransactions();
    }, [])

    // console.log(user);
    

    return (
        <ScrollView className="p[4px]">
            {/* header */}
            <View className="flex flex-row p-[2px] justify-between items-center">
                <Text className="font-bold text-2xl">Dashboard</Text>
                <Text className="font-bold text-xs ">
                    Account | Personal
                </Text>
            </View>

            {/* Asset Balance Display */}
            <View className="shadow-2xl p-3 bg-black rounded-md">
                <View className="flex flex-row justify-between items-center">
                    <Text  className="text-gray-200 text-xs">Total Available</Text>
                    <View className="bg-gray-600 p-[3px] px-[8px] rounded-lg">
                        <Text className="flex-row items-center">
                            <Icon color="red" size={15} name="cash" />
                            <Text className="text-gray-300 text-xs">+N{spentInterval} spent this month</Text>
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
                    {transactions.length > 0? <TransactionList transactions={transactions}  />: 
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
    const [isChart, changeView] = useState(false)
    const [budget, selectBudget] = useState([])
    const [expense, selectExpense] = useState([])
    const [balances, setBalaces] = useState({})

    useEffect(()=>{
        const gettTransactions = async () => {
        const userObject = new Auth()
        let transactions: {budgets: [], expenses: [], balances: {}} = await userObject.records('put-first-on-list') 

        // assign returned data to those useState
        selectBudget(transactions.budgets)
        selectExpense(transactions.expenses)
        setBalaces(transactions.balances)

        };
        gettTransactions();
    }, [])

    function toggleScreen(){
        changeView(!isChart)
    }
    
    if (budget.length == 0) {
        return (
            <View className="p-2">
                <Text className="text-sm font-bold">Budget Details</Text>
                <GrantDropList userGrant={[]} validation={null} />
                {/* Display selected grant */}
                <View>
                    <View className="shadow-2xl mt-3 p-3 bg-black rounded-md">
                        <View className="flex flex-row justify-between items-center">
                            <Text  className="text-gray-200 text-xs">Total Available</Text>
                            <View className="bg-gray-600 p-[3px] px-[8px] rounded-lg">
                                <Text className="text-gray-200 text-xs">Total Spent</Text>
                            </View>
                        </View>
                        <View className="flex flex-row justify-between">
                            <Text className="text-gray-200 text-2xl font-bold">
                                N12,450.00
                            </Text>

                            <Text className="text-gray-200 text-2xl font-bold">
                                N12,450.00
                            </Text>
                        </View>
                        <View className="flex flex-row justify-between">
                            <Text className="text-gray-200 text-[10px]">
                                Dec 23, 2024
                            </Text>
                            <Text className="text-gray-200 text-[10px]">
                                N3,000 this week
                            </Text>
                        </View>
                    </View>
                    {/* Filter */}
                    <View className="flex flex-row p-2 mt-2 bg-red-700 rounded-lg justify-between items-center">
                        <TouchableHighlight
                            onPress={()=>{
                                toggleScreen()
                            }}
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
                    <ShowChartInterface />: <ShowListInterface />
                    }
                </View>
                
            </View>
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

function ShowListInterface() {
    return (
        <GrantFeatureList />
    );
}


export function Acivity(){

    const [notification, setNotification] = useState([])

    useEffect(()=>{
        const gettTransactions = async () => {
        const authObject = new Auth()
        let transactions: {activities: []} = await authObject.activities() 

        // assign returned data to the useState
        setNotification(transactions.activities)

        };
        gettTransactions();
    }, [])


    if (notification.length > 0) {
        return (
            <AcivityPage />
        );
    }else{
        return (
            <View className="m-auto">
                    <Text className="text-gray-400 text-sm">No Activity Found</Text>
            </View>
        )
    }

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
        <View className="m-3">
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

            <View className="bg-gray-200 flex flex-col justify-end h-[90%] mt-[10px]">
                
               <View className=" justify-self-end-safe outline-green-400 outline">
                 <Button
                 onPress={async ()=>{
                    const responsee = await signouREQUEST()

                    if (responsee.status) return navigation.navigate('/(auth)')

                 }}
                 color={'red'} title="Logout" />
               </View>
            </View>
        </View>
    );


}

