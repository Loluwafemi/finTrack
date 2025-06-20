import '~/global.css';
import { Text, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import { useState } from 'react';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export function GrantFeatureGraph() {
  const [viewMode, setViewMode] = useState('graphical'); // 'graphical' or 'textual'
  const itemsDemo = [1, 2, 3, 4, 5, 6, 7, 8];

  // Sample data for charts
  const chartData = {
    labels: ['Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        data: [2400, 2200, 2700, 1800, 2400],
        color: (opacity = 1) => `rgba(65, 105, 225, ${opacity})`, // Budget color (blue)
        strokeWidth: 2,
      },
      {
        data: [2200, 2700, 1800, 0, 0],
        color: (opacity = 1) => `rgba(46, 204, 113, ${opacity})`, // Actual color (green)
        strokeWidth: 2,
      },
    ],
    legend: ['Budget', 'Actual'],
  };

  const pieChartData = [
    {
      name: 'Housing',
      population: 40,
      color: '#8A2BE2',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Food',
      population: 25,
      color: '#32CD32',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Transportation',
      population: 15,
      color: '#FFA500',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Books & Supplies',
      population: 12,
      color: '#4169E1',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Research',
      population: 5,
      color: '#FF0000',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Other',
      population: 3,
      color: '#708090',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  const screenWidth = Dimensions.get('window').width - 32; // Adjust for padding

  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#ffa726',
    },
  };

  return (
    <View className="bg-grey-300 mt-2 h-[70%] rounded-xl">
      {/* Toggle buttons */}
      <View className="flex flex-row justify-between border-b-[1px] border-gray-200 p-2">
        <TouchableOpacity
          className={`flex-1 rounded-l-lg px-4 py-2 ${viewMode === 'graphical' ? 'bg-red-600' : 'bg-gray-200'}`}
          onPress={() => setViewMode('graphical')}>
          <Text
            className={`text-center font-medium ${viewMode === 'graphical' ? 'text-white' : 'text-gray-700'}`}>
            Graphical
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`flex-1 rounded-r-lg px-4 py-2 ${viewMode === 'textual' ? 'bg-red-600' : 'bg-gray-200'}`}
          onPress={() => setViewMode('textual')}>
          <Text
            className={`text-center font-medium ${viewMode === 'textual' ? 'text-white' : 'text-gray-700'}`}>
            Textual
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="p-2">
        {viewMode === 'graphical' ? (
          // Graphical Analytics View
          <View>
            <View className="mb-6">
              <Text className="mb-2 text-lg font-bold">Monthly Budget vs. Spending</Text>
              <BarChart
                data={chartData}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                verticalLabelRotation={0}
                fromZero={true}
                showBarTops={true}
                showValuesOnTopOfBars={false}
                withInnerLines={true}
                style={{ borderRadius: 16 }}
                yAxisLabel="N"
                yAxisSuffix=""
              />
            </View>

            <View className="mb-6">
              <Text className="mb-2 text-lg font-bold">Spending by Category</Text>
              <PieChart
                data={pieChartData}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={'population'}
                backgroundColor={'transparent'}
                paddingLeft={'15'}
                center={[10, 0]}
                absolute
              />
            </View>
          </View>
        ) : (
          // Textual Analytics View
          <View>
            <Text className="mb-2 text-lg font-bold">Budget Summary</Text>
            <GrantFeaturePie
              key={itemsDemo[1]}
              title="Housing"
              amount="-N45,000"
              percentage={0.4}
            />
            <GrantFeaturePie key={itemsDemo[2]} title="Food" amount="-N28,000" percentage={0.25} />
            <GrantFeaturePie
              key={itemsDemo[3]}
              title="Transportation"
              amount="-N17,000"
              percentage={0.15}
            />
            <GrantFeaturePie
              key={itemsDemo[4]}
              title="Books & Supplies"
              amount="-N13,500"
              percentage={0.12}
            />
            <GrantFeaturePie
              key={itemsDemo[5]}
              title="Research"
              amount="-N5,600"
              percentage={0.05}
            />
            <GrantFeaturePie key={itemsDemo[6]} title="Other" amount="-N3,400" percentage={0.03} />

            <Text className="mb-2 mt-6 text-lg font-bold">Monthly Spending Trend</Text>
            <GrantFeatureLineGraph
              key={itemsDemo[0]}
              title="August"
              amount="-N112,500"
              percentage={0.9}
            />
            <GrantFeatureLineGraph
              key={itemsDemo[7]}
              title="September"
              amount="-N108,000"
              percentage={0.85}
            />
            <GrantFeatureLineGraph
              key={itemsDemo[8]}
              title="October"
              amount="-N95,000"
              percentage={0.75}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function GrantFeaturePie({
  title,
  amount,
  percentage,
}: {
  title: string;
  amount: string;
  percentage: number;
}) {
  return (
    <View className="mb-[4px] border-b-[1px] p-2">
      <View className="flex flex-row justify-between">
        <Text className="font-bold">{title}</Text>
        <Text className="font-bold">{amount}</Text>
      </View>
      <View className="flex flex-row justify-end">
        <Text className="text-[13px] text-sm text-gray-600">Spent</Text>
      </View>

      <View className="flex flex-row justify-between">
        <Progress.Bar
          color="black"
          className="mt-[1px] flex flex-1"
          progress={percentage}
          width={null}
        />
      </View>
    </View>
  );
}

function GrantFeatureLineGraph({
  title,
  amount,
  percentage,
}: {
  title: string;
  amount: string;
  percentage: number;
}) {
  return (
    <View className="mb-[4px] border-b-[1px] p-2">
      <View className="flex flex-row justify-between">
        <Text className="font-bold">{title}</Text>
        <Text className="font-bold">{amount}</Text>
      </View>
      <View className="flex flex-row justify-end">
        <Text className="text-[13px] text-sm text-gray-600">Spent</Text>
      </View>

      <View className="flex flex-row justify-between">
        <Progress.Bar
          color="black"
          className="mt-[1px] flex flex-1"
          progress={percentage}
          width={null}
        />
      </View>
    </View>
  );
}
