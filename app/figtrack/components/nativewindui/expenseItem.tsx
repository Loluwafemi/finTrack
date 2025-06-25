import { Icon } from "@roninoss/icons";
import { ScrollView, Text, TouchableHighlight, View } from "react-native";





export default function ExpensListCard({expenses, parentAction}) {
                
        return (
                <ScrollView className='m-2 px-2 flex flex-col h-[40vh]'>
                    {expenses.map((item, index) => (
                        <ExpenseItem actionChild={parentAction} index={index} values={item} key={item.id} />
                    ))}

                </ScrollView>
        )


}


function ExpenseItem({actionChild, values, index}) {
    
    return (
        <View className="rounded-md bg-gray-300 p-[8px] my-1">
            <View>
                <View className="flex flex-row justify-between items-center">
                    <Text className="font-bold text-[10px] text-gray-500">
                    Label
                    </Text>
                    <Text className="font-extrabold text-[16px] text-green-700">
                    {values.cost}
                    </Text>
                </View>
                <View className="flex flex-row items-center justify-between">
                    <Text className="font-bold">
                    {values.expenseCategory}
                    </Text>
                    <TouchableHighlight 
                        onPress={()=>{
                            actionChild.remove(index)
                        }}
                    >
                        <Icon color="red" name="minus" />
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
}