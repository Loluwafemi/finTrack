import React, { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { useColorScheme } from "../../../lib/useColorScheme";
import { COLORS } from "../../../theme/colors";
import { SkeletonBase } from "../SkeletonBase";
import {
  ActivityItem,
  GridSection,
  KPICard,
  SectionHeader,
} from "./components";
import { DynamicModal, UserDetails, DynamicContent } from "../../DynamicModal";
import { UserAccountModal } from "../../UserAccountModal";

import { SKELETON_SCREEN_META } from "@/components/custom/screenMeta";
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

  // const handleRefreshKPIs = () => {
  //   Alert.alert("Refresh KPIs", "KPIs have been refreshed.");
  // };

  const handleExportReport = () => {
    Alert.alert("Export Report", "Report has been exported.");
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
        userid: activity.userid || activity.id || "unknown",
        id: activity.id || activity.userid || "unknown",
        username: activity.username || "Unknown User",
        firstname: activity.firstname || activity.user?.firstname || "Unknown",
        lastname: activity.lastname || activity.user?.lastname || "User",
        email: activity.email || activity.user?.email || "No email provided",
        accounttype: activity.accounttype || activity.user?.role || "member",
        status: activity.status || activity.user?.status || "active",
        organization: activity.organization || activity.user?.organization,
        organization_name: activity.organization_name || activity.user?.organization_name,
        created_at: activity.created_at || new Date().toISOString(),
        updated_at: activity.updated_at || activity.user?.updated_at,
        data: activity.data || activity.user?.data || {
          bank_name: "Not provided",
          bank_account_name: "Not provided",
          bank_account_number: "Not provided",
          number: activity.phone || activity.user?.phone || "Not provided"
        }
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
    
    switch (activity.category) {
      case "user_creation":
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
        
      case "budget_request":
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
        
      case "receipt_upload":
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
        
      case "expense_approval":
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
        
      case "payment_processing":
        dynamicContent = {
          type: "payment_processing",
          title: "Payment Processing Details",
          data: [
            {
              action: activity.action || "Payment processed",
              description: activity.description || "Payment transaction details",
              timestamp: activity.created_at || new Date().toISOString(),
              category: activity.category,
              status: activity.status,
            },
          ],
          paymentDetails: activity.paymentDetails || {
            paymentId: "PAY-2024-001",
            amount: 100000,
            vendor: "Service Provider",
            method: "Bank Transfer",
            processedDate: activity.created_at || new Date().toISOString(),
            status: "completed" as const,
            reference: "TXN-123456789"
          }
        };
        break;
        

        
      case "role_change":
        dynamicContent = {
          type: "role_change",
          title: "Role Change Details",
          data: [
            {
              action: activity.action || "Role updated",
              description: activity.description || "User role modification",
              timestamp: activity.created_at || new Date().toISOString(),
              category: activity.category,
              status: activity.status,
            },
          ],
          roleDetails: activity.roleDetails || {
            previousRole: "Member",
            newRole: "Manager",
            changeDate: activity.created_at || new Date().toISOString(),
            changedBy: "Administrator",
            reason: "Role update",
            effectiveDate: activity.created_at || new Date().toISOString()
          }
        };
        break;
        
      case "document_verification":
        dynamicContent = {
          type: "document_verification",
          title: "Document Verification Status",
          data: [
            {
              action: activity.action || "Document verified",
              description: activity.description || "Document verification process",
              timestamp: activity.created_at || new Date().toISOString(),
              category: activity.category,
              status: activity.status,
            },
          ],
          documentDetails: activity.documentDetails || {
            documentId: "DOC-2024-001",
            type: "Contract",
            submissionDate: activity.created_at || new Date().toISOString(),
            verificationDate: activity.created_at || new Date().toISOString(),
            status: "pending" as const,
            verifier: "Legal Department"
          }
        };
        break;
        
      case "budget_allocation":
        dynamicContent = {
          type: "budget_allocation",
          title: "Budget Allocation Summary",
          data: [
            {
              action: activity.action || "Budget allocated",
              description: activity.description || "Budget distribution activity",
              timestamp: activity.created_at || new Date().toISOString(),
              category: activity.category,
              status: activity.status,
            },
          ],
          budgetAllocationDetails: activity.budgetAllocationDetails || {
            allocationId: "ALLOC-2024-001",
            totalAmount: 1000000,
            period: "Q1 2024",
            departments: 3,
            allocationDate: activity.created_at || new Date().toISOString(),
            status: "completed" as const
          }
        };
        break;
        

        
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
                    value={members.length.toString()}
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
                      ? activities.map((activity, index) => (
                          <ActivityItem
                            key={index}
                            // action={activity.description || "Activity performed"}
                            action={ "Activity performed"
                            }
                            user={activity.username || "Unknown User"}
                            time={
                              activity.created_at || new Date().toISOString()
                            }
                            type="info"
                            data={activity}
                            onPress={() => handleActivityItemPress(activity)}
                          />
                        ))
                      : // Mock data for demonstration when no real activities are available
                        [
                          // User Creation Activity
                          {
                            id: "act_user_001",
                            action: "New user account created",
                            user: "Sarah Johnson",
                            time: "5 min ago",
                            type: "success" as const,
                            category: "user_creation", // Category to determine modal type
                            data: {
                              id: "act_user_001",
                              description: "New user account created",
                              username: "Sarah Johnson",
                              created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
                              category: "user_creation",
                              status: "completed",
                              user: {
                                name: "Sarah Johnson",
                                email: "sarah.johnson@company.com",
                                phone: "+234 801 234 5678",
                                role: "Finance Member",
                                status: "active",
                                joinDate: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
                                department: "Finance",
                                organization: "TechCorp Nigeria"
                              },
                            },
                          },
                          // Budget Request Activity
                          {
                            id: "act_budget_001",
                            action: "Budget request submitted",
                            user: "Michael Adebayo",
                            time: "15 min ago",
                            type: "warning" as const,
                            category: "budget_request", // Category to determine modal type
                            data: {
                              id: "act_budget_001",
                              description: "Budget request for office equipment",
                              username: "Michael Adebayo",
                              created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
                              category: "budget_request",
                              status: "pending",
                              amount: 250000,
                              user: {
                                name: "Michael Adebayo",
                                email: "michael.adebayo@company.com",
                                phone: "+234 802 345 6789",
                                role: "Operations Manager",
                                status: "active",
                                joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                                department: "Operations",
                                organization: "TechCorp Nigeria"
                              },
                              budgetDetails: {
                                amount: 250000,
                                purpose: "Purchase of new laptops and office furniture for the operations team",
                                requestDate: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
                                status: "pending" as const
                              }
                            },
                          },
                          // Receipt Upload Activity
                          {
                            id: "act_receipt_001",
                            action: "Receipts uploaded",
                            user: "Fatima Bello",
                            time: "32 min ago",
                            type: "info" as const,
                            category: "receipt_upload", // Category to determine modal type
                            data: {
                              id: "act_receipt_001",
                              description: "Multiple receipts uploaded for expense reimbursement",
                              username: "Fatima Bello",
                              created_at: new Date(Date.now() - 32 * 60 * 1000).toISOString(),
                              category: "receipt_upload",
                              status: "completed",
                              user: {
                                name: "Fatima Bello",
                                email: "fatima.bello@company.com",
                                phone: "+234 803 456 7890",
                                role: "Marketing Specialist",
                                status: "active",
                                joinDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
                                department: "Marketing",
                                organization: "TechCorp Nigeria"
                              },
                              receiptDetails: {
                                totalReceipts: 7,
                                totalAmount: 125000,
                                uploadDate: new Date(Date.now() - 32 * 60 * 1000).toISOString()
                              }
                            },
                          },
                          // Expense Approval Activity - For expense report approvals
                          {
                            id: "act_expense_001",
                            action: "Expense report approved",
                            user: "Ahmed Hassan",
                            time: "45 min ago",
                            type: "success" as const,
                            category: "expense_approval", // Category to determine modal type
                            data: {
                              id: "act_expense_001",
                              description: "Travel expense report approved",
                              username: "Ahmed Hassan",
                              created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
                              category: "expense_approval",
                              status: "approved",
                              user: {
                                name: "Ahmed Hassan",
                                email: "ahmed.hassan@company.com",
                                phone: "+234 804 567 8901",
                                role: "Sales Representative",
                                status: "active",
                                joinDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
                                department: "Sales",
                                organization: "TechCorp Nigeria"
                              },
                              expenseDetails: {
                                expenseId: "EXP-2024-001",
                                amount: 85000,
                                category: "Travel",
                                submissionDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                                approvalDate: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
                                status: "approved" as const,
                                approver: "Finance Manager"
                              }
                            },
                          },
                          // Payment Processing Activity - For payment status updates
                          {
                            id: "act_payment_001",
                            action: "Payment processed",
                            user: "Kemi Okafor",
                            time: "1 hour ago",
                            type: "success" as const,
                            category: "payment_processing", // Category to determine modal type
                            data: {
                              id: "act_payment_001",
                              description: "Vendor payment successfully processed",
                              username: "Kemi Okafor",
                              created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
                              category: "payment_processing",
                              status: "completed",
                              user: {
                                name: "Kemi Okafor",
                                email: "kemi.okafor@company.com",
                                phone: "+234 805 678 9012",
                                role: "Accounts Payable",
                                status: "active",
                                joinDate: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
                                department: "Finance",
                                organization: "TechCorp Nigeria"
                              },
                              paymentDetails: {
                                paymentId: "PAY-2024-001",
                                amount: 450000,
                                vendor: "Office Supplies Ltd",
                                method: "Bank Transfer",
                                processedDate: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
                                status: "completed" as const,
                                reference: "TXN-789456123"
                              }
                            },
                          },

                          // Role Change Activity - For user role/permission modifications
                          {
                            id: "act_role_001",
                            action: "User role updated",
                            user: "Blessing Eze",
                            time: "3 hours ago",
                            type: "warning" as const,
                            category: "role_change", // Category to determine modal type
                            data: {
                              id: "act_role_001",
                              description: "User role changed from Member to Manager",
                              username: "Blessing Eze",
                              created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
                              category: "role_change",
                              status: "completed",
                              user: {
                                name: "Blessing Eze",
                                email: "blessing.eze@company.com",
                                phone: "+234 807 890 1234",
                                role: "Project Manager",
                                status: "active",
                                joinDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
                                department: "Operations",
                                organization: "TechCorp Nigeria"
                              },
                              roleDetails: {
                                previousRole: "Team Member",
                                newRole: "Project Manager",
                                changeDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
                                changedBy: "HR Manager",
                                reason: "Promotion based on performance",
                                effectiveDate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
                              }
                            },
                          },
                          // Document Verification Activity - For document approval workflows
                          {
                            id: "act_doc_001",
                            action: "Document verified",
                            user: "Tunde Adeyemi",
                            time: "4 hours ago",
                            type: "success" as const,
                            category: "document_verification", // Category to determine modal type
                            data: {
                              id: "act_doc_001",
                              description: "Contract document verified and approved",
                              username: "Tunde Adeyemi",
                              created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
                              category: "document_verification",
                              status: "verified",
                              user: {
                                name: "Tunde Adeyemi",
                                email: "tunde.adeyemi@company.com",
                                phone: "+234 808 901 2345",
                                role: "Legal Officer",
                                status: "active",
                                joinDate: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
                                department: "Legal",
                                organization: "TechCorp Nigeria"
                              },
                              documentDetails: {
                                documentId: "DOC-2024-001",
                                type: "Service Contract",
                                submissionDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                                verificationDate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
                                status: "verified" as const,
                                verifier: "Legal Department"
                              }
                            },
                          },
                          // Budget Allocation Activity - For budget distribution activities
                          {
                            id: "act_budget_alloc_001",
                            action: "Budget allocated",
                            user: "Ngozi Okonkwo",
                            time: "5 hours ago",
                            type: "info" as const,
                            category: "budget_allocation", // Category to determine modal type
                            data: {
                              id: "act_budget_alloc_001",
                              description: "Q2 budget allocated to departments",
                              username: "Ngozi Okonkwo",
                              created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
                              category: "budget_allocation",
                              status: "completed",
                              user: {
                                name: "Ngozi Okonkwo",
                                email: "ngozi.okonkwo@company.com",
                                phone: "+234 809 012 3456",
                                role: "Finance Director",
                                status: "active",
                                joinDate: new Date(Date.now() - 1000 * 24 * 60 * 60 * 1000).toISOString(),
                                department: "Finance",
                                organization: "TechCorp Nigeria"
                              },
                              budgetAllocationDetails: {
                                allocationId: "ALLOC-2024-Q2",
                                totalAmount: 2500000,
                                period: "Q2 2024",
                                departments: 5,
                                allocationDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
                                status: "completed" as const
                              }
                            },
                          },

                        ].map((mockActivity, index) => (
                          <ActivityItem
                            key={mockActivity.id}
                            action={mockActivity.action}
                            user={mockActivity.user}
                            time={mockActivity.time}
                            type={mockActivity.type}
                            data={mockActivity.data}
                            onPress={() =>
                              handleActivityItemPress(mockActivity.data)
                            }
                          />
                        ))}
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
