import '~/global.css'
import { Text, View } from "react-native";



export function TransactionList({ transactions }) {
// restructure receipt message
    return (

        <View>
            {transactions.map((item, index)=>{
                console.log(item);
                
                if (item) {
                    return (<TransactionItem key={index} items={item} />);
                }
            })}
        </View>

    );
}

function TransactionItem(items:any) {

    return (
        <View className='mb-[4px] p-1 border-b-[1px]'>
            <View className='flex flex-row justify-between'>
                <Text className='font-bold'>Maintenance</Text>
                <Text className='font-bold'>-N3,000</Text>
            </View>
            <View className='flex flex-row justify-between'>
                <Text className='text-gray-600 text-sm text-[13px]'>Books & Supplies</Text>
                <Text className='text-gray-600 text-sm text-[13px]'>Enox Grant</Text>
            </View>

            <View className='flex flex-row justify-between'>
                <Text className='text-gray-600 text-[11px]'>Dec 23, 2030</Text>
            </View>
        </View>
    );
}