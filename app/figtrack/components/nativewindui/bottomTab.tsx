import { Component, ReactNode, useState } from "react";
import { TouchableHighlight, View } from "react-native";
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

export class UserHome extends Component{
    render(): ReactNode {

        return (
            <ScrollView className="p[4px]">
                {/* header */}
                <View className="flex flex-row p-[2px] justify-between items-center">
                    <Text className="font-bold text-2xl">Dashboard</Text>
                    <Text className="font-ligth text-xs">Organization | name</Text>
                </View>

                {/* Asset Balance Display */}
                <View className="shadow-2xl p-3 bg-black rounded-md">
                    <View className="flex flex-row justify-between items-center">
                        <Text  className="text-gray-200 text-xs">Total Available</Text>
                        <View className="bg-gray-600 p-[3px] px-[8px] rounded-lg">
                            <Text className="text-gray-200 text-xs">Icon +N2,500 this month</Text>
                        </View>
                    </View>

                    <View>
                        <Text className="text-gray-200 text-2xl font-bold">
                            N12,450.00
                        </Text>
                    </View>
                    <View>
                        <Text className="text-gray-200 text-[10px]">
                            last updated 2 min 12 sec ago
                        </Text>
                    </View>
                </View>
                
                {/* Transaction actions */}
                <View className="shadow-md flex flex-row justify-between p-3">
                    <TouchableHighlight className="p-3 rounded-xl bg-gray-400 flex-1">
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
                        <TransactionList />
                    </View>
                </View>
            </ScrollView>
        );

    }
}

export class UserRecord extends Component{
    constructor(prop){
        super(prop)
        this.state = {
            isChart: false,
        }

    }

    toggleScreen(){
        this.setState({isChart: !this.state.isChart})
    }

    setDate(){

    }
    
    render(): ReactNode {
        return (
            <View className="p-2">
                <Text className="text-sm font-bold">Select Grant</Text>
                <SelectList 
                        setSelected={(val) => {
                            console.log(val);
                            
                        }
                        } 
                        data={[
                            {key:'Enox Grant', value:'Enox Grant', disabled: false},
                            {key:'Green Pact', value:'Green Pact', disabled: false},
                            {key:'Konbil National Grant', value:'Konbil National Grant'},
                        ]} 
                        save="value"
                />
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
                                this.toggleScreen()
                            }}
                        >
                            {
                            this.state.isChart? 
                            <Icon color="white" name="chart-pie" size={20}/>: <Icon color="white" name="clipboard-list" size={20}/>
                            }
                        </TouchableHighlight>
                        <TouchableHighlight
                            onPress={()=>{
                                console.log("Open date");
                            }}>
                            <Icon color="white" name="calendar-clock" size={20}/
                            >
                        </TouchableHighlight>
                    </View>
                    {/* Display the analysis of selected grant */}
                    {
                    this.state.isChart?
                    <ShowChartInterface />: <ShowListInterface />
                    }
                </View>
            </View>
        );

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


export class Acivity extends Component{

    render(): ReactNode {
        return (
            <AcivityPage />
        );

    }
}



export class Settings extends Component{

    render(): ReactNode {
        return (
            <View className="m-auto">
                <Text>Settings</Text>
                <Text>Backup</Text>
                <Text>Generate Report</Text>
                <Text>Export Report</Text>
            </View>
        );

    }
}

