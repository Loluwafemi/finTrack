<<<<<<< HEAD
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
import { Auth, balacesTemplate, budgetList, expensesTemplate, transactionTemplate } from "~/lib/func/tailored";
import { signouREQUEST } from "~/lib/server/server";
import { Formik } from "formik";
import { recordProviderForBudgetSchema } from "~/lib/func/auth";




export function UserHome(){
    const navigation = useRouter()

    // useMemo
    const [balance, setBalances] = useState<number | null>(null)
    const [transactions, setTransaction] = useState([])

    useEffect(()=>{
        const gettTransactions = async () => {
        const authObject = new Auth()
        let transactions: transactionTemplate = await authObject.transactions() 

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
=======
import { Component, ReactNode } from 'react';
import { Button, TouchableHighlight, View, ScrollView } from 'react-native';
import {} from 'react-native-safe-area-context';
import { Text } from './Text';
import '~/global.css';
import { Icon } from '@roninoss/icons';
import { TransactionList } from './transactionList';
import { SelectList } from 'react-native-dropdown-select-list';
import { GrantFeatureList } from './grantFeatureList';
import { GrantFeatureGraph } from './grantFeatureGraph';
import { AcivityPage } from './activitiesPage';
import { useRouter } from 'expo-router';
import GrantDropList from './grantList';
import { COLORS } from '~/theme/colors';

// TypeScript interfaces for better type safety
interface UserRecordState {
  isChart: boolean;
}

interface UserRecordProps {}

interface ComponentProps {}

interface ComponentState {}

export function UserHome() {
  const navigation = useRouter();

  return (
    <ScrollView className="px-1 py-2" showsVerticalScrollIndicator={false}>
      {/* header */}
      <View className="flex flex-row items-center justify-between px-2 py-4">
        <Text
          className="text-3xl font-bold tracking-tight"
          style={{ color: COLORS.dark.foreground }}>
          Dashboard
        </Text>
        <Text
          className="text-xs font-medium tracking-wide opacity-70"
          style={{ color: COLORS.dark.textSecondary }}>
          Organization | name
        </Text>
      </View>

      {/* Asset Balance Display */}
      <View
        className="mx-1 mb-2 rounded-2xl p-6 shadow-2xl"
        style={{ backgroundColor: COLORS.dark.card }}>
        <View className="mb-4 flex flex-row items-center justify-between">
          <Text
            className="text-sm font-medium tracking-wide"
            style={{ color: COLORS.dark.textSecondary }}>
            Total Available
          </Text>
          <View className="rounded-xl px-3 py-2" style={{ backgroundColor: COLORS.dark.grey3 }}>
            <Text className="text-xs font-medium" style={{ color: COLORS.dark.accent }}>
              Icon +N2,500 this month
            </Text>
          </View>
        </View>

        <View className="mb-3">
          <Text
            className="text-3xl font-bold tracking-tight"
            style={{ color: COLORS.dark.foreground }}>
            N12,450.00
          </Text>
        </View>
        <View>
          <Text
            className="text-xs font-medium opacity-80"
            style={{ color: COLORS.dark.textSecondary }}>
            last updated 2 min 12 sec ago
          </Text>
        </View>
      </View>

      {/* Transaction actions */}
      <View className="flex flex-row justify-between px-1 py-4">
        <TouchableHighlight
          className="flex-1 rounded-2xl p-4 shadow-sm"
          style={{ backgroundColor: COLORS.dark.accent }}
          onPress={() => {
            navigation.push('/(dashboard)/upload');
            console.log('Button clicked');
          }}>
          <Text
            className="flex flex-row items-center text-base font-semibold tracking-wide"
            style={{ color: COLORS.white }}>
            <Icon name="arrow-up-bold-circle" size={20} color={COLORS.white} />
            Upload
          </Text>
        </TouchableHighlight>
      </View>
      {/* <View className="d-none shadow-md bg-gray-400 flex flex-row p-3 h-4">
                     <Text>Display News</Text>
                 </View> */}

      {/* Display Recent Transactions */}
      <View className="mt-2">
        <View className="mb-4 flex flex-row justify-between px-2">
          <Text
            className="text-lg font-semibold tracking-tight"
            style={{ color: COLORS.dark.foreground }}>
            Transactions
          </Text>
          <TouchableHighlight
            className="rounded-lg px-3 py-1"
            style={{ backgroundColor: `${COLORS.dark.accent}15` }}
            onPress={() => {
              const navigation = useRouter();
              navigation.navigate('/(dashboard)/records');
            }}>
            <Text className="text-sm font-bold" style={{ color: COLORS.dark.accent }}>
              View All
            </Text>
          </TouchableHighlight>
        </View>

        <View className="px-1">
          <TransactionList />
        </View>
      </View>
    </ScrollView>
  );
}

export class UserRecord extends Component<UserRecordProps, UserRecordState> {
  constructor(props: UserRecordProps) {
    super(props);
    this.state = {
      isChart: false,
    };
  }

  toggleScreen() {
    this.setState({ isChart: !this.state.isChart });
  }

  render(): ReactNode {
    return (
      <ScrollView className="px-2 py-2" showsVerticalScrollIndicator={false}>
        <Text
          className="mb-3 text-lg font-bold tracking-tight"
          style={{ color: COLORS.dark.foreground }}>
          Budget Details
        </Text>
        <GrantDropList
          userGrant={''}
          validation={{
            setFieldTouched: () => {},
            setFieldValue: () => {},
            values: {},
          }}
        />
        {/* Display selected grant */}
        <View>
          <View
            className="mt-3 rounded-xl p-4 shadow-lg"
            style={{ backgroundColor: COLORS.dark.card }}>
            <View className="mb-3 flex flex-row items-center justify-between">
              <Text
                className="text-xs font-medium tracking-wide"
                style={{ color: COLORS.dark.textSecondary }}>
                Total Available
              </Text>
              <View className="rounded-lg px-2 py-1" style={{ backgroundColor: COLORS.dark.grey3 }}>
                <Text className="text-xs font-medium" style={{ color: COLORS.dark.destructive }}>
                  Total Spent
                </Text>
              </View>
            </View>
            <View className="mb-2 flex flex-row justify-between">
              <Text
                className="text-xl font-bold tracking-tight"
                style={{ color: COLORS.dark.foreground }}>
                ₦12,450.00
              </Text>

              <Text
                className="text-xl font-bold tracking-tight"
                style={{ color: COLORS.dark.destructive }}>
                ₦8,200.00
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text
                className="text-xs font-medium opacity-70"
                style={{ color: COLORS.dark.textSecondary }}>
                Dec 23, 2024
              </Text>
              <Text
                className="text-xs font-medium opacity-70"
                style={{ color: COLORS.dark.textSecondary }}>
                ₦3,000 this week
              </Text>
            </View>
          </View>
          {/* Filter */}
          <View
            className="mt-3 flex flex-row items-center justify-between rounded-xl px-3 py-2 shadow-sm"
            style={{ backgroundColor: COLORS.dark.accent }}>
            <TouchableHighlight
              className="rounded-lg p-2"
              style={{ backgroundColor: COLORS.white, opacity: 0.2 }}
              onPress={() => {
                this.toggleScreen();
              }}>
              {this.state.isChart ? (
                <Icon color={COLORS.white} name="chart-pie" size={18} />
              ) : (
                <Icon color={COLORS.white} name="clipboard-list" size={18} />
              )}
            </TouchableHighlight>
            <TouchableHighlight
              className="rounded-lg p-2"
              style={{ backgroundColor: COLORS.white, opacity: 0.2 }}
              onPress={() => {
                console.log('Open date');
              }}>
              <Icon color={COLORS.white} name="calendar-clock" size={18} />
            </TouchableHighlight>
          </View>
          {/* Display the analysis of selected grant */}
          {this.state.isChart ? <ShowChartInterface /> : <ShowListInterface />}
        </View>
      </ScrollView>
    );
  }
>>>>>>> Admin
}

function ShowChartInterface() {
  return <GrantFeatureGraph />;
}

<<<<<<< HEAD
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



=======
function ShowListInterface() {
  return <GrantFeatureList />;
}

export class Acivity extends Component<ComponentProps, ComponentState> {
  render(): ReactNode {
    return <AcivityPage />;
  }
}

export class Settings extends Component<ComponentProps, ComponentState> {
  render(): ReactNode {
    return (
      <View className="m-3">
        <View className="flex flex-row items-center justify-between">
          <Text className="font-bold" style={{ color: COLORS.dark.foreground }}>
            Settings
          </Text>
          <TouchableHighlight
            className="rounded-sm p-1"
            style={{ backgroundColor: COLORS.dark.card }}
            onPress={() => {
              const navigation = useRouter();
              navigation.navigate('/(dashboard)/new');
            }}>
            <View className="flex flex-row items-center">
              <Text
                className="flex flex-row items-center text-xs"
                style={{ color: COLORS.dark.accent }}>
                New{' '}
              </Text>
              <Icon color={COLORS.dark.accent} size={10} name="plus" />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
>>>>>>> Admin
