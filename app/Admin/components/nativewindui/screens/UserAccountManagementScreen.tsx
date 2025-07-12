import ActivityModal from "@/components/ActivityModal";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { useColorScheme } from "../../../lib/useColorScheme";
import { COLORS } from "../../../theme/colors";
import { UserDetails } from "../../DynamicModal";
import { SkeletonBase } from "../SkeletonBase";

import {
  ActivityItem,
  GridSection,
  KPICard,
  SectionHeader
} from "./components";

import { unitUserType, User } from "@/lib/auth";

export function UserAccountManagementScreen({
  setSelectedScreen,
}: {
  setSelectedScreen?: (screen: any) => void;
}) {
  const [alerts, setAlerts] = useState([]);

  // const [ query, writeQuery ] = useState<null|{ row: string, keyword: string }>(null)

  const [members, setMembers] = useState<unitUserType[] | []>([]);
  const [activities, setActivities] = useState<unitUserType[] | []>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] =
    useState<UserDetails | null>(null);
  // State for UserAccountModal
  const [ selectedUser, selectUser  ] = useState<any>(
    // { email: '', id: '', joinDate: '', name: '', role: '', status: 'inactive'}
  )
  const [ isModalActive, changeModalState ] = useState(false)


  const [userAccountModalVisible, setUserAccountModalVisible] = useState(false);
  const [selectedUserAccount, setSelectedUserAccount] =
    useState<unitUserType | null>(null);
  const userObject = new User();


  // reconstructing function
  // function CONSTRUCTUSEROBJECT(UserData:[]) {
  //   let output: unitUserType[] = []
  //   if (UserData.length < 1) return output

  //   UserData.forEach((user:{ user:any, organization: any })=>{
  //     const currentUser = user.user
  //     const currentUserOrg = user.organization

  //     const newUserObjct: unitUserType = { ...currentUser, ...currentUserOrg }

  //     output.push(newUserObjct)
  //   })
  //   return output;
  // }



  useEffect(() => {
    const creatingSpace = async () => {
      /* Import and manage user's here */

      try {
        let transaction = await userObject.organizationMembers(null);
        let activities = await userObject.organizationTransactions();

        if (transaction.status) {
          // const restructured = CONSTRUCTUSEROBJECT(transaction.data)

          setMembers(transaction.data);
          // construct them and send them to
        }

        if (activities.status) {
          // const restructured = CONSTRUCTUSEROBJECT(transaction.data)

          setActivities(activities.data);
          // construct them and send them to
        }
      } catch (error) {
        console.log(error);
      }
    };
    creatingSpace();
  }, []);

  // const handleRefreshKPIs = () => {
  //   Alert.alert("Refresh KPIs", "KPIs have been refreshed.");
  // };

  const [isopen, setIsOpen] = useState(false);
  const [toClose, closerModal] = useState("");

  const handleExportReport = () => {
    Alert.alert("Export Report", "Report has been exported.");
    // call here
    setIsOpen(true);
  };

  // const handleMarkAllRead = () => {
  //   setAlerts([]);
  //   Alert.alert("Mark All Read", "All alerts have been marked as read.");
  // };

  // const handleViewDetails = (alert: any) => {
  //   Alert.alert("View Details", `Viewing details for: ${alert.title}`);
  // };

  // const handleDismissAlert = (alertId: number) => {
  //   setAlerts((prevAlerts) =>
  //     prevAlerts.filter((alert) => alert.id !== alertId)
  //   );
  // };

  // const handleViewAllActivities = () => {
  //   if (setSelectedScreen) {
  //     const transactionScreen = SKELETON_SCREEN_META.find(
  //       (screen) => screen.id === "account-manager"
  //     );
  //     if (transactionScreen) {
  //       setSelectedScreen(transactionScreen);
  //     } else {
  //       Alert.alert(
  //         "Error",
  //         "Could not find the transaction monitoring screen."
  //       );
  //     }
  //   } else {
  //     Alert.alert("View All Activities", "Viewing all activities.");
  //   }
  // };

  // Handle activity item click to open modal
  const handleActivityItemPress = (activity: any) => {
    // Check if this is a user_creation activity and use UserAccountModal
    if (activity.category === "user_creation") {

      // For user_creation activities, open UserAccountModal with the user data
      const userAccount: unitUserType = {
        username: activity.user_transaction.user_id || "unknown",
        id: activity.user_transaction.user_id || "unknown",
        userid: activity.user_transaction.user_id || "unknown",
        firstname: activity.user_transaction.firstname || activity.user_transaction.lastname || "Unknown User",
        email: activity.user_transaction?.email || "No email provided",
        // number: activity.user_transaction?.number || "Not found",
        accounttype: activity.user_transaction?.accounttype || "Member",
        status: activity.user_transaction?.status || "active",
        created_at: activity.user_transaction.created_at,
        updated_at: activity.user?.last_login || activity.last_login,
        organization: '',
        organization_name: '',
        lastname: '',
        data: ''
      };

      setSelectedUserAccount(userAccount);
      setUserAccountModalVisible(true);
      return;
    }

    // Transform activity data to UserDetails format for other activities
    const userDetails: UserDetails = {
      id: activity.user_transaction.user_id || "unknown",
      firstname: activity.user_transaction.firstname || activity.user_transaction.lastname || "Unknown User",
      email: activity.user_transaction?.email || "No email provided",
      number: activity.user_transaction?.number || "Not found",
      accounttype: activity.user_transaction?.accounttype || "Member",
      status: activity.user_transaction?.status || "active",
      created_at: activity.user_transaction.created_at,
      updated_at: activity.user?.last_login || activity.last_login,

      data: {
        organization: '',
        organization_name: ''
      },
      lastname: ''
    };

    setSelectedUserDetails(userDetails);
    setModalVisible(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedUserDetails(null);
  };

  // Handle UserAccountModal close
  const handleUserAccountModalClose = () => {
    setUserAccountModalVisible(false);
    setSelectedUserAccount(null);
  };
  const { isDarkColorScheme } = useColorScheme();
  const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;

  return (
    <SkeletonBase
      title="System Dashboard"
      description="Monitor system and user activities"
    >
      <ActivityModal
        visible={isopen}
        onClose={() => setIsOpen(false)}
        userDetails={selectedUser}
      />

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#fafbfc" }}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View className="px-4 sm:px-6 lg:px-8" style={{ paddingTop: 20 }}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
            }}
            className="w-full flex-col lg:flex-row space-x-0 lg:space-x-8"
          >
            <View style={{ flex: 2, minWidth: 0, marginRight: 16 }}>
              {/* <View
                className="mb-8"
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: 16,
                  padding: 20,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3,
                  marginBottom: 24,
                }}
              >
                <SectionHeader
                  title="Key Performance Indicators"
                  actionLabel="Refresh"
                  actionOnPress={handleRefreshKPIs}
                />
                <View className="mb-4">
                  <GridSection columns={2} gap={16}>
                    <KPICard
                      title="Total Revenue"
                      value="₦2,847,392"
                      isPositive={true}
                      trend="+12%"
                    />
                    <KPICard
                      title="Active Users"
                      value="1,234"
                      isPositive={true}
                      trend="+8%"
                    />
                  </GridSection>
                </View>
                <GridSection columns={2} gap={12}>
                  <KPICard
                    title="Conversion Rate"
                    value="3.2%"
                    isPositive={false}
                    trend="-2%"
                  />
                  <KPICard
                    title="Monthly Growth"
                    value="15.8%"
                    isPositive={true}
                    trend="+5%"
                  />
                </GridSection>
              </View> */}

              <View
                className="mb-8"
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: 16,
                  padding: 20,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.05,
                  shadowRadius: 6,
                  elevation: 2,
                  marginBottom: 24,
                }}
              >
                <SectionHeader
                  title="User Statistics"
                  actionLabel="Export"
                  actionOnPress={handleExportReport}
                />
                <GridSection columns={2} gap={16}>
                  <KPICard
                    title="Total Users"
                    value={members? members.length.toString(): "refresh"}
                    isPositive={true}
                    trend="+8%"
                  />
                  <KPICard
                    title="Active Users"
                    value="0"
                    isPositive={true}
                    trend="+15%"
                  />
                </GridSection>
              </View>
            </View>
            <View
              style={{ flex: 1, minWidth: 0, marginLeft: 16 }}
              className="lg:pl-0"
            >
              {/* <View
                className="mb-8"
                style={{
                  backgroundColor: "#fff5f5",
                  borderRadius: 16,
                  padding: 20,
                  shadowColor: "#dc3545",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.08,
                  shadowRadius: 8,
                  elevation: 3,
                  marginBottom: 24,
                  borderLeftWidth: 4,
                  borderLeftColor: "#dc3545",
                }}
              >
                <SectionHeader
                  title="Alerts & Notifications"
                  actionLabel="Mark All Read"
                  actionOnPress={handleMarkAllRead}
                  badge={alerts.length}
                />
                <GridSection columns={1} gap={12}>
                  {alerts.map((alert) => (
                    <AlertCard
                      key={alert.id}
                      title={alert.title}
                      description={alert.description}
                      priority={alert.priority}
                      time={alert.time}
                      onView={() => handleViewDetails(alert)}
                      onDismiss={() => handleDismissAlert(alert.id)}
                    />
                  ))}
                </GridSection>
              </View> */}

              <ScrollView className="h-[50vh]">
                <View
                  className="mb-8"
                  style={{
                    // backgroundColor: "#f0f9ff",
                    borderRadius: 16,
                    padding: 20,
                    shadowColor: "#3b82f6",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 8,
                    elevation: 3,
                    marginBottom: 24,
                    borderLeftWidth: 4,
                    borderLeftColor: "#3b82f6",
                  }}
                >
                  <SectionHeader
                    title="Activity Feed"
                    actionLabel="View All"
                    actionOnPress={() => console.log("Clicked")}
                  />
                  {/* scrollable */}
                  <GridSection columns={1} gap={6}>
                    {/* Display real activities if available, otherwise show mock data */}
                    {activities.length > 0
                      ? activities.map((activity:any, index) => (
                          <ActivityItem
                              key={index}
                              data={activity.user_transaction}
                              onPress={async ()=>{
                                changeModalState(true)
                                
                                const seekedAccount = await userObject.seekforAccount(activity.user_transaction.author)
                                selectUser(seekedAccount)
                              }}
                          />
                        ))
                      : null}
                  </GridSection>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>
      <ActivityModal
        onClose={()=> {
          selectUser({})
          // unset user
          changeModalState(false)
        }}
        userDetails={selectedUser}
        visible={isModalActive}
      />

      {/* User Account Modal for user_creation activities */}
      {/* <UserAccountModal
        visible={userAccountModalVisible}
        onClose={handleUserAccountModalClose}
        userAccount={selectedUserAccount}
      /> */}
    </SkeletonBase>
  );
}
