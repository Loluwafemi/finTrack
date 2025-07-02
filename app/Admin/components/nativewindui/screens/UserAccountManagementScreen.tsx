import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useColorScheme } from "../../../lib/useColorScheme";
import { COLORS } from "../../../theme/colors";
import { DynamicContent, DynamicModal, UserDetails } from "../../DynamicModal";
import { UserAccountModal } from "../../UserAccountModal";
import { SkeletonBase } from "../SkeletonBase";
import {
  ActivityItem,
  GridSection,
  KPICard,
  SectionHeader,
} from "./components";

import { unitUserType, User } from "@/lib/auth";

export function UserAccountManagementScreen({
  setSelectedScreen,
}: {
  setSelectedScreen?: (screen: any) => void;
}) {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      title: "High Transaction Volume",
      description: "Unusual activity detected - 45 transactions in 10 minutes.",
      priority: "high" as const,
      time: "2 min ago",
    },
    {
      id: 2,
      title: "Failed Login Attempts",
      description: "Multiple failed attempts detected for user account.",
      priority: "medium" as const,
      time: "15 min ago",
    },
  ]);

  // const [ query, writeQuery ] = useState<null|{ row: string, keyword: string }>(null)

  const [members, setMembers] = useState<unitUserType[] | []>([]);
  const [activities, setActivities] = useState<unitUserType[] | []>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] =
    useState<UserDetails | null>(null);
  const [modalDynamicContent, setModalDynamicContent] =
    useState<DynamicContent | null>(null);
  // State for UserAccountModal
  const [userAccountModalVisible, setUserAccountModalVisible] = useState(false);
  const [selectedUserAccount, setSelectedUserAccount] = useState<unitUserType | null>(null);
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

  // a function that restructure the activities

  const handleExportReport = () => {
    Alert.alert("Export Report", "Report has been exported.");
  };


  // Handle activity item click to open modal
  const handleActivityItemPress = async (activity: any) => {    
    // Check if this is a user_creation activity and use UserAccountModal
    if (activity.user_transaction.type === "activity") {
      
      // call an async function that assign the selected user to this
      const userid = activity.user_transaction.author
      
      let currentUser = await userObject.findSelectedMember(userid)
      let selecteduser = currentUser.data
      if (!selecteduser.status){

      }
      
      // For user_creation activities, the user data ✅
      const userAccount: unitUserType = {
        userid: selecteduser.userid || "unknown",
        id: selecteduser.id || "unknown",
        username: selecteduser.username || "Unknown User",
        firstname: selecteduser.firstname || "Unknown",
        lastname: selecteduser.lastname || "User",
        email: selecteduser.email || "No email provided",
        accounttype: selecteduser.accounttype || "member undefined",
        status: selecteduser.status || "active",
        organization: selecteduser.organization || "Not found",
        organization_name: selecteduser.organization_name || "Not found",
        created_at: selecteduser.created_at || "Not found",
        updated_at: selecteduser.updated_at || "Not found",
        data: selecteduser.bank || [
        {
          bank_name: "Not provided",
          bank_account_name: "Not provided",
          bank_account_number: "Not provided",
          number: activity.phone || activity.user?.phone || "Not provided"
        }
        ]
      };
      
      setSelectedUserAccount(userAccount);
      setUserAccountModalVisible(true);
      return;
    }




    // Transform activity data to UserDetails format for other activities
    const userDetails: UserDetails = {
      id: activity.id || activity.user_id || "unknown",
      name: activity.user?.name || activity.username || "Unknown User",
      email: activity.user?.email || activity.email || "No email provided",
      phone: activity.user?.phone || activity.phone,
      role: activity.user?.role || activity.role || "Member",
      status: activity.user?.status || activity.status || "active",
      joinDate:
        activity.user?.joinDate ||
        activity.user?.created_at ||
        activity.created_at ||
        new Date().toISOString(),
      lastLogin: activity.user?.last_login || activity.last_login,
      organization: activity.user?.organization || activity.organization?.name || activity.organization_name,
      department: activity.user?.department || activity.department,
    };

    // Create dynamic content based on activity category
    let dynamicContent: DynamicContent;
    
    
    switch (activity.type) {


      
      case "log":

        dynamicContent = {
          type: "user_creation",
          title: "Account Creation & Activities",
          data: [
            {
              action: activity.action || "User account created",
              description: activity.description || "New user account has been created",
              timestamp: activity.created_at || new Date().toISOString(),
              category: activity.category,
              status: activity.status,
            },
          ],
        };
        break;
      

      case "budgets":
        dynamicContent = {
          type: "budget_request",
          title: "Budget Request Review",
          data: [
            {
              action: activity.action || "Budget request submitted",
              description: activity.description || "Budget request pending approval",
              timestamp: activity.created_at || new Date().toISOString(),
              amount: activity.amount,
              category: activity.category,
              status: activity.status,
            },
          ],
          budgetDetails: activity.budgetDetails || {
            amount: activity.amount || 150000,
            purpose: "Office supplies and equipment",
            requestDate: activity.created_at || new Date().toISOString(),
            status: "pending" as const
          }
        };
        break;
        
      case "receipt":
        dynamicContent = {
          type: "receipt_upload",
          title: "Receipt Upload Summary",
          data: [
            {
              action: activity.action || "Receipts uploaded",
              description: activity.description || "Multiple receipts uploaded for processing",
              timestamp: activity.created_at || new Date().toISOString(),
              category: activity.category,
              status: activity.status,
            },
          ],
          receiptDetails: activity.receiptDetails || {
            totalReceipts: 5,
            totalAmount: 75000,
            uploadDate: activity.created_at || new Date().toISOString()
          }
        };
        break;
        
      case "activity":
        console.log(activity);
        
        dynamicContent = {
          type: "expense_approval",
          title: "Expense Approval Details",
          data: [
            {
              action: activity.action || "Expense report processed",
              description: activity.description || "Expense report approval status",
              timestamp: activity.created_at || new Date().toISOString(),
              category: activity.category,
              status: activity.status,
            },
          ],
          expenseDetails: activity.expenseDetails || {
            expenseId: "EXP-2024-001",
            amount: 50000,
            category: "Travel",
            submissionDate: activity.created_at || new Date().toISOString(),
            approvalDate: activity.created_at || new Date().toISOString(),
            status: "pending" as const,
            approver: "Finance Manager"
          }
        };
        break;
        
      // case "payment_processing":
      //   dynamicContent = {
      //     type: "payment_processing",
      //     title: "Payment Processing Details",
      //     data: [
      //       {
      //         action: activity.action || "Payment processed",
      //         description: activity.description || "Payment transaction details",
      //         timestamp: activity.created_at || new Date().toISOString(),
      //         category: activity.category,
      //         status: activity.status,
      //       },
      //     ],
      //     paymentDetails: activity.paymentDetails || {
      //       paymentId: "PAY-2024-001",
      //       amount: 100000,
      //       vendor: "Service Provider",
      //       method: "Bank Transfer",
      //       processedDate: activity.created_at || new Date().toISOString(),
      //       status: "completed" as const,
      //       reference: "TXN-123456789"
      //     }
      //   };
      //   break;
        

        
      // case "role_change":
      //   dynamicContent = {
      //     type: "role_change",
      //     title: "Role Change Details",
      //     data: [
      //       {
      //         action: activity.action || "Role updated",
      //         description: activity.description || "User role modification",
      //         timestamp: activity.created_at || new Date().toISOString(),
      //         category: activity.category,
      //         status: activity.status,
      //       },
      //     ],
      //     roleDetails: activity.roleDetails || {
      //       previousRole: "Member",
      //       newRole: "Manager",
      //       changeDate: activity.created_at || new Date().toISOString(),
      //       changedBy: "Administrator",
      //       reason: "Role update",
      //       effectiveDate: activity.created_at || new Date().toISOString()
      //     }
      //   };
      //   break;
        
      // case "document_verification":
      //   dynamicContent = {
      //     type: "document_verification",
      //     title: "Document Verification Status",
      //     data: [
      //       {
      //         action: activity.action || "Document verified",
      //         description: activity.description || "Document verification process",
      //         timestamp: activity.created_at || new Date().toISOString(),
      //         category: activity.category,
      //         status: activity.status,
      //       },
      //     ],
      //     documentDetails: activity.documentDetails || {
      //       documentId: "DOC-2024-001",
      //       type: "Contract",
      //       submissionDate: activity.created_at || new Date().toISOString(),
      //       verificationDate: activity.created_at || new Date().toISOString(),
      //       status: "pending" as const,
      //       verifier: "Legal Department"
      //     }
      //   };
      //   break;
    
        


      // case "budget_allocation":
      //   dynamicContent = {
      //     type: "budget_allocation",
      //     title: "Budget Allocation Summary",
      //     data: [
      //       {
      //         action: activity.action || "Budget allocated",
      //         description: activity.description || "Budget distribution activity",
      //         timestamp: activity.created_at || new Date().toISOString(),
      //         category: activity.category,
      //         status: activity.status,
      //       },
      //     ],
      //     budgetAllocationDetails: activity.budgetAllocationDetails || {
      //       allocationId: "ALLOC-2024-001",
      //       totalAmount: 1000000,
      //       period: "Q1 2024",
      //       departments: 3,
      //       allocationDate: activity.created_at || new Date().toISOString(),
      //       status: "completed" as const
      //     }
      //   };
      //   break;
        

        
      default:
        // Fallback for legacy activities or unknown categories
        dynamicContent = {
          type: "activities",
          title: "User Activity Details",
          data: [
            {
              action: activity.action || "Activity performed",
              description: activity.description || "No description available",
              timestamp:
                activity.created_at ||
                activity.timestamp ||
                new Date().toISOString(),
              amount: activity.amount,
              category: activity.category,
              status: activity.status,
            },
          ],
        };
        break;
    }

    setSelectedUserDetails(userDetails);
    setModalDynamicContent(dynamicContent);
    setModalVisible(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setModalVisible(false);
    setSelectedUserDetails(null);
    setModalDynamicContent(null);
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
      title="System Health Dashboard"
      description="Monitor system performance and user activities"
    >
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
                    {true
                      ? activities.map((activity, index) => (
                          <ActivityItem
                            key={index}
                            data={activity}
                            onPress={async () => await handleActivityItemPress(activity)}
                          />
                        ))
                      :   (<Text>No Transaction Found</Text>)}
                  </GridSection>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Dynamic Modal */}
      {selectedUserDetails && modalDynamicContent && (
        <DynamicModal
          visible={modalVisible}
          onClose={handleModalClose}
          userDetails={selectedUserDetails}
          dynamicContent={modalDynamicContent}
          onDynamicContentChange={setModalDynamicContent}
        />
      )}

      {/* User Account Modal for user_creation activities */}
      <UserAccountModal
        visible={userAccountModalVisible}
        onClose={handleUserAccountModalClose}
        userAccount={selectedUserAccount}
      />
    </SkeletonBase>
  );
}
