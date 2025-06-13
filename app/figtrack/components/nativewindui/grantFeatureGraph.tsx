import '~/global.css'
import { Text, View } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';


export function GrantFeatureGraph() {

    const itemsDemo = [1,2,3,4,5,6,7,8]

    return (

     <ScrollView className="h-[70%] p-2 bg-grey-300 mt-2 rounded-xl">
                <GrantFeaturePie key={itemsDemo[1]} />
                <GrantFeatureLineGraph key={itemsDemo[0]} />
    </ScrollView>


    );
}


function GrantFeaturePie(items:any) {
    return (
        <View className='mb-[4px] p-2 border-b-[1px]'>
            <View className='flex flex-row justify-between'>
                <Text className='font-bold'>Maintenance</Text>
                <Text className='font-bold'>-N3,000</Text>
            </View>
            <View className='flex flex-row justify-end'>
                <Text className='text-gray-600 text-sm text-[13px]'>Spent</Text>
            </View>

            <View className='flex flex-row justify-between'>
                <Progress.Bar color='black' className='flex mt-[1px] flex-1' progress={0.3} width={null} />
            </View>
        </View>
    );
}

function GrantFeatureLineGraph(items:any) {
    return (
        <View className='mb-[4px] p-2 border-b-[1px]'>
            <View className='flex flex-row justify-between'>
                <Text className='font-bold'>Maintenance</Text>
                <Text className='font-bold'>-N3,000</Text>
            </View>
            <View className='flex flex-row justify-end'>
                <Text className='text-gray-600 text-sm text-[13px]'>Spent</Text>
            </View>

            <View className='flex flex-row justify-between'>
                <Progress.Bar color='black' className='flex mt-[1px] flex-1' progress={0.3} width={null} />
            </View>
        </View>
    );
}