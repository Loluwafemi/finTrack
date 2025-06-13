import '~/global.css'
import { Text, TouchableHighlight, View } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import { Icon } from '@roninoss/icons';


export function AcivityPage() {

    // for every notification
    const itemsDemo = [1,2,3,4,5,6,7,8,9, 10, 11]

    return (
    <View>
        <View className='px-2 flex flex-row justify-between items-center'>
            <Text>
                100+ unread
            </Text>
            <TouchableHighlight>
                <Icon name='file-upload-outline' />
            </TouchableHighlight>
        </View>
        <ScrollView className="h-[90%] p-2 mt-2 rounded-xl">
                {
                itemsDemo.map((item)=>{
                    // use this to sort notification
                    if (item % 2) {
                        return (
                            <ActivityItem key={item} />
                        );
                    }else{
                        return (
                            <NotificationItem key={item} />
                        );

                    }
                })
                
                }
        </ScrollView>
    </View>


    );
}


function ActivityItem(items:any) {
    return (
        <View className='mb-[6px] p-2 rounded-md bg-gray-400'>
            <View className='flex flex-row justify-between'>
                <Text className='font-bold'>Uploaded</Text>
                <Text className='font-bold'>+N3,000</Text>
            </View>
            <View className='flex flex-row justify-between items-center'>
                <Text className='text-gray-600 text-xs mt-1 text-[13px]'>Status:
                <Icon name='check-circle' color='green' size={15} />
                </Text>
                <Text className='text-gray-600 text-sm text-[13px]'>Spent</Text>
            </View>
        </View>
    );
}

function NotificationItem(items:any) {
    return (
        <View className='mb-[4px] p-2 flex flex-row justify-start bg-gray-300 rounded-md'>
            <View className=''>
                <Icon name='account-check' />
            </View>
            <View className='flex-1'>
                <View className='flex flex-row justify-between px-2 items-end'>
                    <Text>Received Payment</Text>
                    <Text>date</Text>
                </View>
                <View className='px-2'>
                    <Text>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt numquam qam!
                    </Text>
                </View>
                <View className='flex flex-row justify-between px-2 mt-2'>
                    <TouchableHighlight>
                        <Text>Open</Text>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Text>Mark as read</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
}

// define more Notification Items