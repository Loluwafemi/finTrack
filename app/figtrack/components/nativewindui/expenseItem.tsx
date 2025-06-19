import { Icon } from "@roninoss/icons";
import { ScrollView, Text, TouchableHighlight, View } from "react-native";





export default function ExpensListCard(expenses?:any) {
    const arr = [1,2,3,4,5,6,7,8,9,0]
    
    return (
                  <ScrollView className='m-2 px-2 flex flex-col h-[40vh]'>
                    {arr.map((item)=>(
                    <ExpenseItem key={item} />
                    ))}
                  </ScrollView>
    )
}


function ExpenseItem(value?:any) {
    
    return (
        <View className="rounded-md bg-gray-300 p-[8px] my-1">
            <View>
                <View className="flex flex-row justify-between items-center">
                    <Text className="font-bold text-[10px] text-gray-500">
                    Label
                    </Text>
                    <Text className="font-extrabold text-[16px] text-green-700">
                    N30,000.00
                    </Text>
                </View>
                <View className="flex flex-row items-center justify-between">
                    <Text className="font-bold">
                    Project Staff Salaries Partitioned to Paris
                    </Text>
                    <TouchableHighlight>
                        <Icon color="red" name="minus" />
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
}