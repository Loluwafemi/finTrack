import '~/global.css';
import { Text, View } from 'react-native';
import { Icon } from '@roninoss/icons';
import { COLORS } from '~/theme/colors';

// Sample transaction data with varied types
const sampleTransactions = [
  {
    id: 1,
    title: 'Office Supplies',
    amount: -2500,
    category: 'Equipment',
    grant: 'Enox Grant',
    date: 'Dec 23, 2024',
    type: 'expense',
  },
  {
    id: 2,
    title: 'Research Materials',
    amount: -4200,
    category: 'Books & Supplies',
    grant: 'Green Pact',
    date: 'Dec 22, 2024',
    type: 'expense',
  },
  {
    id: 3,
    title: 'Grant Disbursement',
    amount: 15000,
    category: 'Funding',
    grant: 'Konbil National',
    date: 'Dec 21, 2024',
    type: 'income',
  },
  {
    id: 4,
    title: 'Software License',
    amount: -1800,
    category: 'Technology',
    grant: 'Enox Grant',
    date: 'Dec 20, 2024',
    type: 'expense',
  },
  {
    id: 5,
    title: 'Conference Fee',
    amount: -3500,
    category: 'Training',
    grant: 'Green Pact',
    date: 'Dec 19, 2024',
    type: 'expense',
  },
  {
    id: 6,
    title: 'Equipment Purchase',
    amount: -5200,
    category: 'Equipment',
    grant: 'Enox Grant',
    date: 'Dec 18, 2024',
    type: 'expense',
  },
  {
    id: 7,
    title: 'Travel Allowance',
    amount: -2800,
    category: 'Travel',
    grant: 'Konbil National',
    date: 'Dec 17, 2024',
    type: 'expense',
  },
  {
    id: 8,
    title: 'Maintenance',
    amount: -1500,
    category: 'Operations',
    grant: 'Green Pact',
    date: 'Dec 16, 2024',
    type: 'expense',
  },
];

<<<<<<< HEAD
export function TransactionList({ transactions }) {

    return (

        <View>
            {transactions.map((item)=>{
                if (item) {
                    return (<TransactionItem key={item} />);
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
=======
export function TransactionList() {
  // Show only top 7 transactions for the home screen
  const displayTransactions = sampleTransactions.slice(0, 7);

  return (
    <View
      className="rounded-xl bg-white p-3 shadow-sm"
      style={{ backgroundColor: COLORS.dark.card }}>
      {displayTransactions.map((transaction, index) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          isLast={index === displayTransactions.length - 1}
        />
      ))}
    </View>
  );
}

function TransactionItem({ transaction, isLast }: { transaction: any; isLast: boolean }) {
  const isIncome = transaction.type === 'income';
  const amountColor = isIncome ? COLORS.dark.success : COLORS.dark.destructive;
  const iconName = isIncome ? 'arrow-down-circle' : 'arrow-up-circle';
  const iconColor = isIncome ? COLORS.dark.success : COLORS.dark.destructive;

  return (
    <View
      className={`px-2 py-3 ${!isLast ? 'border-b border-opacity-10' : ''}`}
      style={!isLast ? { borderBottomColor: COLORS.dark.border } : {}}>
      <View className="mb-1 flex flex-row items-center justify-between">
        <View className="flex flex-1 flex-row items-center">
          <View className="mr-3 rounded-full p-1.5" style={{ backgroundColor: `${iconColor}15` }}>
            <Icon name={iconName} size={14} color={iconColor} />
          </View>
          <View className="flex-1">
            <Text
              className="text-sm font-semibold tracking-tight"
              style={{ color: COLORS.dark.foreground }}>
              {transaction.title}
            </Text>
            <Text
              className="mt-0.5 text-xs opacity-75"
              style={{ color: COLORS.dark.textSecondary }}>
              {transaction.category}
            </Text>
          </View>
>>>>>>> Admin
        </View>
        <View className="items-end">
          <Text className="text-sm font-bold tracking-tight" style={{ color: amountColor }}>
            {isIncome ? '+' : ''}₦{Math.abs(transaction.amount).toLocaleString()}
          </Text>
          <Text className="mt-0.5 text-xs opacity-60" style={{ color: COLORS.dark.textSecondary }}>
            {transaction.grant}
          </Text>
        </View>
      </View>
      <View className="flex flex-row items-center justify-between">
        <Text className="text-xs opacity-50" style={{ color: COLORS.dark.textSecondary }}>
          {transaction.date}
        </Text>
      </View>
    </View>
  );
}
