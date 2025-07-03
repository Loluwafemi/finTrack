import React from "react";
import { Modal, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { ScrollView } from "react-native-gesture-handler";
import { useColorScheme } from "../lib/useColorScheme";
import { COLORS } from "../theme/colors";
import { UserDetails } from "./DynamicModal";
import { BudgetLists } from "./custom/modal-components/BudgetListsGenerator";
import { PersonalizedActivity } from "./custom/modal-components/PersonalizedActivityGenerator";

const ActivityModal = ({ visible, onClose, userDetails }: { visible: true | false, onClose: any, userDetails: any }) => {
  const { isDarkColorScheme } = useColorScheme();
  const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;


  const userDataObject = {...userDetails}
  
  const userData:UserDetails = {
    accounttype: userDataObject?.accounttype,
    banks: userDataObject?.banks,
    budgets: userDataObject?.budgets,
    created_at: userDataObject?.created_at,
    data: {
      organization: userDataObject?.data?.organization,
      organization_name: userDataObject?.data?.organization_name
    },

    email: userDataObject?.email,
    firstname: userDataObject?.firstname,
    id: userDataObject?.id,
    lastname: userDataObject?.lastname,
    number: userDataObject?.number,
    status: userDataObject?.status,
    transactions: userDataObject?.transactions,
    updated_at: userDataObject?.updated_at,
    userid: userDataObject?.userid,
    username: userDataObject?.username
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", padding: 20 }}
      >
        <View
          className="w-full h-5/6 rounded-xl"
          style={{
            backgroundColor: currentColors.background,
            maxWidth: "95%",
            maxHeight: "85%",
          }}
        >
          {/* Header */}
          <View
            className="px-4 py-4 border-b flex-row justify-between items-center"
            style={{
              borderBottomColor: currentColors.border,
              backgroundColor: currentColors.card,
            }}
          >
            <Text className="text-lg font-bold" style={{ color: currentColors.foreground }}>
              User Details
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="p-2 rounded-full"
              style={{ backgroundColor: currentColors.muted }}
              accessibilityLabel="Close modal"
              accessibilityRole="button"
            >
              <Text className="text-lg font-bold" style={{ color: currentColors.foreground }}>
                ×
              </Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View className="p-4 ">
            
            <View className="flex flex-row" 
            // style={{ gap: 16 }}
            >
              {/* Left Section - Static User Details */}
              <View className="w-64 flex-none p-4 border border-black mx-2"
              //   style={{
              //   backgroundColor: currentColors.card,
              //   // borderColor: currentColors.border,
              //   // shadowColor: "#000",
              //   // shadowOffset: { width: 0, height: 2 },
              //   // shadowOpacity: 0.1,
              //   // shadowRadius: 8,
              //   // elevation: 3,
              // }}
              >
                  <Text className="text-lg font-bold mb-4" style={{ color: currentColors.foreground }}>
                    User Information
                  </Text>
                  {/* User Details */}
                  <View className="flex flex-col justify-between items-between">
                    <View className="space-y-3">
                      <View>
                        <Text className="text-xs font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                          Full Name
                        </Text>
                        <Text className="text-sm font-semibold" style={{ color: currentColors.foreground }}>
                          {userData.firstname}
                        </Text>
                      </View>
                      <View>
                        <Text className="text-xs font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                          Email Address
                        </Text>
                        <Text className="text-sm" style={{ color: currentColors.foreground }}>
                          {userData.email}
                        </Text>
                      </View>

                        <View>
                          <Text className="text-xs font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                            Phone Number
                          </Text>
                          <Text className="text-sm" style={{ color: currentColors.foreground }}>
                            {userData.number}
                          </Text>
                        </View>
                      <View>
                        <Text className="text-xs font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                          Role
                        </Text>
                        <Text className="text-sm font-medium" style={{ color: currentColors.foreground }}>
                          {userData.accounttype}
                        </Text>
                      </View>
                      <View>
                        <Text className="text-xs font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                          Status
                        </Text>
                        <View className="flex-row items-center">
                          <View
                            className="w-2 h-2 rounded-full mr-2"
                            style={{ backgroundColor: "#10B981" }}
                          />
                          <Text className="text-sm font-medium capitalize" style={{ color: "#10B981" }}>
                            {userData.status}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text className="text-xs font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                          Join Date
                        </Text>
                        <Text className="text-sm" style={{ color: currentColors.foreground }}>
                          {userData.created_at}
                        </Text>
                      </View>

                        <View>
                          <Text className="text-xs font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                            Last Login
                          </Text>
                          <Text className="text-sm" style={{ color: currentColors.foreground }}>
                            {userData.updated_at}
                          </Text>
                        </View>

                        <View>
                          <Text className="text-xs font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                            Organization
                          </Text>
                          <Text className="text-sm" style={{ color: currentColors.foreground }}>
                            {userData?.data?.organization}
                          </Text>
                        </View>

                        <View>
                          <Text className="text-xs font-medium mb-1" style={{ color: currentColors.textSecondary }}>
                            Department
                          </Text>
                          <Text className="text-sm" style={{ color: currentColors.foreground }}>
                            {userData?.data?.organization_name}
                          </Text>
                        </View>
                    </View>

                    <View className="bg-gray-100 p-4 shadow h-3/6 flex flex-col justify-between">
                      {/* define each row as a control to, change status, generate reports etc */}
                      <View className="border-b border-black">
                        <Text className="text-xs font-medium mb-1">
                          Change Account status:
                        </Text>
                        {/* add select here */}
                        <SelectList
                          data={[
                            {key: "disable", value: "disabled", status: "disable"},
                            {key: "approve", value: "approve", status: "approved"},
                            {key: "delete", value: "delete", status: "deleted"},
                            {key: "pending", value: "pending", status: "pending"},
                          ]}
                          save="value"
                          setSelected={(value)=> console.log(value)}
                        />
                      </View>


                      <TouchableHighlight className="bg-gray-800 p-2 rounded-lg">
                        <Text className="text-white font-bold text-center">Submit</Text>
                      </TouchableHighlight>
                    </View>

                  </View>


              </View>

              {/* Right Section - Activity Content Placeholder */}
              <View className="w-64 flex-1 flex-row">
                <View className="flex-col w-64 flex-1 mx-1">
                  {/* Budget List */}
                   <Text className="text-lg font-bold">
                    {userData.firstname?.toUpperCase()}`S BUDGETS
                    </Text>
                  <ScrollView className="h-[70vh] overflow-y-scroll">
                      {userData.budgets? (
                            userData.budgets.
                            map((budget, index)=> { 
                              return (<BudgetLists budgetObject={budget} key={index} />
                              );
                            })
                          ): <Text>No Budget Found</Text>}
                    </ScrollView>
                </View>



                {/* Activities */}
                <View className="flex-col w-64 flex-1 mx-1">
                    <Text className="text-lg font-bold">
                    {userData.firstname?.toUpperCase()}`S RECENT ACTIVITIES
                    </Text>
                    
                      <PersonalizedActivity onPress={()=> console.log('Refreshing system')} userid={userData.userid!} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ActivityModal;