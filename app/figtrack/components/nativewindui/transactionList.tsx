import '~/global.css'
import { Text, View } from "react-native";
import numeral from 'numeral';



export function TransactionList({ transactions }) {
// restructure receipt message
    return (

        <View>
            {transactions.map((item, index)=>{                
                if (item) {
                    return (<TransactionItem key={index} items={item} />);
                }
            })}
        </View>

    );
}

function TransactionItem(items:any) {
    let data = items.items
    let date = new Date(data?.message?.date).toLocaleString()
    return (
        <View className='mb-[4px] p-1 border-b-[1px]'>
            <View className='flex flex-row justify-between'>
                <Text className='font-bold'>{data?.message?.text?.expense}</Text>
                <Text className='font-bold'>-N{numeral(data?.message?.text?.cost).format('0,0.00')}</Text>
            </View>
            <View className='flex flex-row justify-between'>
                <Text className='text-gray-600 text-sm text-[13px]'>{data?.message?.text?.desc}</Text>
                <Text className='text-gray-600 text-sm text-[13px]'>{data?.message?.text?.name}</Text>
            </View>

            <View className='flex flex-row justify-between'>
                <Text className='text-gray-600 text-[11px]'>{date}</Text>
            </View>
        </View>
    );
}