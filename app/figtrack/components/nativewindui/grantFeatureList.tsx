import '~/global.css'
import { Text, View } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import numeral from 'numeral';


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

    const percentage = values.percentage === isNaN || values.percentage > values.percentage? 1: values.percentage
    const displayablePercentage = Math.round(percentage * 100)    
    // make progress bar color red if percentage is greater than 1
    const progressColor = percentage > 1 ? 'red' : 'black'


    

    return (
        <View className='mb-[4px] p-2 border-b-[0.2px]'>
            <View className='flex flex-row justify-between'>
                <Text className='font-bold'>{values.expenseCategory}</Text>
                <Text className='font-bold'>N{numeral(values.cost).format('0,0.00')}</Text>
            </View>
            <View className='flex flex-row justify-between'>
                <Text className='px-2 bg-gray-700 text-gray-100 text-xs pt-[0.8px] rounded-xl mb-1'>{displayablePercentage}% used</Text>
                <Text className='text-gray-600 text-sm text-[13px]'>approved</Text>
            </View>

            <View className='flex flex-row justify-between'>
                <Progress.Bar color={progressColor} className='flex mt-[1px] flex-1' progress={percentage} width={null}
                />
            </View>
        </View>
    );
}