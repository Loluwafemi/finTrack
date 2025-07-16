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
        <View className='mb-4 p-2 border-b-[3px] border-b-blue-700 rounded-lg bg-white shadow shadow-blue-500 '>
            <View className='flex flex-row justify-between'>
                <Text className='font-bold text-black'>{data?.message?.text?.expense}</Text>
                <Text className='font-bold text-black'>-N{numeral(data?.message?.text?.cost).format('0,0.00')}</Text>
            </View>
            <View className='flex flex-row justify-between'>
                <Text className='text-black text-sm text-[13px]'>{data?.message?.text?.desc}</Text>
                <Text className='text-black text-sm text-[13px]'>{data?.message?.text?.name}</Text>
            </View>

            <View className='flex flex-row justify-between'>
                <Text className='text-black text-[11px]'></Text>
                <Text className='text-black text-[11px]'>{date}</Text>
            </View>
        </View>
    );
}


/* 

{
    "author": "a10db433-1885-4f37-bad0-dec943a8a186", 
    "created_at": "2025-07-12T13:24:00.698Z",
    "deleted_at": null, 
    "id": "27699e68-1368-495b-84e2-b1b55875b8c3", 
     "message": {
        "date": 1752326640696, 
        "text": {
            "cost": "8000", 
            "desc": "Starter Fee", 
            "expense": "Custom Makeovera",
            // name: ""
        }, 
        "title": "Receipt Upload"
    }, 
    "receiver": "a10db433-1885-4f37-bad0-dec943a8a186", 
    "status": "approved", 
    "type": "receipt", 
    "updated_at": null
}
*/