import '~/global.css'
import { Text, TouchableHighlight, View } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from '@roninoss/icons';


export function AcivityPage({ transactions }) {

    // 'notification' | 'activity' | 'message'
    
    return (

    // use switch-case



        <ScrollView className="h-[90%] p-2 mt-2 rounded-xl">
                {
                transactions.map((item, index)=>{
                    // use this to sort notification   
                    if (item.type === 'activity') {
                        if (item.status === 'pending') {
                            return (
                            <NotificationOnNewBudget data={item} key={index} />
                            );
                        }
                    
                        if (item.status === 'approved') {
                            return (
                            <NotificationOnBudgetApproval key={index} />

                            );
                        }


                        if (item.status === 'declined') {
                            return (
                            <NotificationOnDeclinedBudget data={item} key={index} />

                            );
                        }
                    }

                    if (item.type === 'message') {
                        return (
                            <MessageNotification key={index} />
                        );
                    }

                    if (item.type === 'notification') {
                        return (
                            <NotificationItem key={index} />
                        );
                    }

                    if (item.type === ''){


                    }

                    if (item.type === 'receipt'){
                        return (
                            <Receipts items={item} key={index} />
                        );
                    } 
                })
                
                }
        </ScrollView>

    );
}


function Receipts({items}) {

    return (
        <View className='mb-[6px] p-2 rounded-md bg-gray-400'>
            <View className='flex flex-row justify-between'>
                <Text className='font-bold'>Withdraw</Text>
                <Text className='font-bold'>N{items.message.text.cost}</Text>
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


function MessageNotification(items:any) {
    return (
        <View className='mb-[4px] p-2 flex flex-row justify-start bg-gray-800 rounded-xl'>
            <View className=''>
                <Icon color='white' name='account-check' />
            </View>
            <View className='flex-1'>
                <View className='flex flex-row justify-between px-2 items-end'>
                    <Text className='text-white'>Message Notification</Text>
                    <Text className='text-white'>date</Text>
                </View>
                <View className='px-2'>
                    <Text className='text-white'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt numquam qam!
                    </Text>
                </View>
                <View className='flex flex-row justify-between px-2 mt-2'>
                    <TouchableHighlight>
                        <Text className='text-white'>Open</Text>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Text className='text-white'>Mark as read</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
}



// Budgets

function NotificationOnNewBudget({ data }) {
    
    const body = {
        title: data.message.title,
        text: data.message.text,
        time: new Date(data.created_at).toLocaleString(),
    }

    return (
        <View className="mb-[4px] p-2 flex flex-row justify-start rounded-md bg-blue-300">
            <View className=''>
                <Icon name='message-question' />
            </View>
            <View className='flex-1'>
                <View className='flex flex-row justify-between px-2 items-end'>
                    <Text className='font-bold'>{body.title}</Text>
                    <TouchableHighlight>
                        <Text>Mark as read</Text>
                    </TouchableHighlight>
                </View>
                <View className='px-2'>
                    <Text>
                        {body.text}
                    </Text>
                </View>
                <View className='flex flex-row justify-between px-2 mt-2'>
                    <TouchableHighlight>
                        <Text>Open</Text>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Text className='text-xs'> {body.time}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
}



function NotificationOnDeclinedBudget({ data }) {
    
    const body = {
        title: data.message.title,
        text: data.message.text,
        time: new Date(data.created_at).toLocaleString(),
    }

    return (
        <View className="mb-[4px] p-2 flex flex-row justify-start rounded-md bg-red-300">
            <View className=''>
                <Icon name='message-question' />
            </View>
            <View className='flex-1'>
                <View className='flex flex-row justify-between px-2 items-end'>
                    <Text className='font-bold'>{body.title}</Text>
                    <TouchableHighlight>
                        <Text>Mark as read</Text>
                    </TouchableHighlight>
                </View>
                <View className='px-2'>
                    <Text>
                        {body.text}
                    </Text>
                </View>
                <View className='flex flex-row justify-between px-2 mt-2'>
                    <TouchableHighlight>
                        <Text>Open</Text>
                    </TouchableHighlight>
                    <TouchableHighlight>
                        <Text className='text-xs'> {body.time}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    );
}



function NotificationOnBudgetApproval(items:any) {
    return (
        <View className='mb-[4px] p-2 flex flex-row justify-start bg-green-600 rounded-md'>
            <View className=''>
                <Icon name='message-question' />
            </View>
            <View className='flex-1'>
                <View className='flex flex-row justify-between px-2 items-end'>
                    <Text>Budget Approved</Text>
                    <Text>date</Text>
                </View>
                <View className='px-2'>
                    <Text>
                        Your project [name] has been approved
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