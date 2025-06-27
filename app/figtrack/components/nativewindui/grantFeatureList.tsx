import '~/global.css'
import { Text, View } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';


export function GrantFeatureList( {expensesList} ) {


    const itemsDemo = expensesList

    return (

     <ScrollView className="h-[70%] p-2 bg-gray-300 mt-2 shadow rounded-xl">
            {itemsDemo.map((item, index)=>{

            return (
                
                <GrantFeatureItem key={index} values={item} />
            )
            })}
    </ScrollView>

    );
}


function GrantFeatureItem({values}) {

    const percentage = values.percentage !== isNaN || values.percentage > 1? 0: Number(values.percentage)
    
    

    return (
        <View className='mb-[4px] p-2 border-b-[0.2px]'>
            <View className='flex flex-row justify-between'>
                <Text className='font-bold'>{values.expenseCategory}</Text>
                <Text className='font-bold'>N{values.cost}</Text>
            </View>
            <View className='flex flex-row justify-end'>
                <Text className='text-gray-600 text-sm text-[13px]'>available</Text>
            </View>

            <View className='flex flex-row justify-between'>
                <Progress.Bar color='black' className='flex mt-[1px] flex-1' progress={percentage} width={null} />
            </View>
        </View>
    );
}