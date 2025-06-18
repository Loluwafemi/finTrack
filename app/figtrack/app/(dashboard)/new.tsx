import '~/global.css';
import { useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { Text,TextInput,TouchableHighlight,View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Icon } from '@roninoss/icons';

import ExpensListCard from '~/components/nativewindui/expenseItem';
import { BottomSheet } from '~/components/nativewindui/bottomDrawer';
import BudgetCategoryDropList from '~/components/nativewindui/budgetRegisteredCategories';
import BudgetExpenseDropList from '~/components/variables/budgetExpense';


export default function UserAddGrant() {
  useInitialAndroidBarSync();
  const navigation = useRouter()

  return (
        <SafeAreaView edges={['top']} className='m-4'
        >
          <View className='flex flex-row items-center'>
            <TouchableHighlight onPress={()=> navigation.back()}>
              <Icon name='chevron-left' />
            </TouchableHighlight>
            <View className='flex-1 flex-row flex justify-center'>
              <Text className='text-xl font-bold'>Start New Budget</Text>
            </View>
          </View>
          <View className='m-2 p-2 bg-gray-700 rounded-md shadow-sm'>
            <Text className='text-white text-xs text-center'>Fill Budget Descriptions and Categories</Text>
          </View>
          <View className='m-2 p-2 rounded-md'>
            {/* Grant Name */}
            <Text className='font-bold mb-2'>Budget Title:</Text>
            <TextInput
              className='border px-2 rounded-xl mb-2'
              placeholder='e.g Travelling to Paris'
            />

            <View className='m-2 p-2 bg-gray-700 rounded-md shadow-md'>
              <Text className='text-white text-xs text-center'>Fill Budget Categories</Text>
            </View>
            {/* Grant Name */}
            <Text className='font-bold'>Category: </Text>
            <View className='my-2'>
              <BudgetCategoryDropList />
            </View>
            <TextInput
              className='border px-2 rounded-xl mb-2'
              placeholder='e.g Vacation Budget'
            />

            <BottomSheet>
              <ExpenseForm /> 
            </BottomSheet>

          </View>
          <ExpensListCard />
          <TouchableHighlight className='p-2 mx-4 bg-black rounded'>
            <View className='flex flex-row justify-center items-center'>
              <Text className='text-white font-bold'>
                Submit
              </Text>
              <Icon name='arrow-right' color='white' size={14} />
            </View>
          </TouchableHighlight>
            
        </SafeAreaView>
  );
}


const ExpenseForm = ()=>{

  return (
    <View className=''>
      <View>
        <Text className='text-lg font-bold'>Add Expense to Budget</Text>
        <BudgetExpenseDropList />
        <TextInput placeholder='Enter Expense' className='border border-grey-300 my-2 rounded-md px-[8px]'/>
        <View className='flex flex-row items-center'>
          <Text className='mx-2 text-lg font-bold'>N</Text>
          <TextInput placeholder='100,000.00' className='border border-grey-300 my-2 rounded-md px-[8px] w-[50%]'/>

        </View>
      </View>


      <TouchableHighlight
        // onPress={closeBottomSheet}
        className='bg-black rounded-md my-2 p-2 flex flex-row justify-center'
        >
          <View className='flex flex-row justify-center items-center'>
            <Text className='text-white font-bold'>
              Add
            </Text>
            <Icon name='plus' color='white' size={14} />
          </View>
      </TouchableHighlight>
    </View>
  );
}