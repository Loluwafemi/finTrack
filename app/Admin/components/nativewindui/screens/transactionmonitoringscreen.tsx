import { unitUserType, User } from "@/lib/auth";
import React, { useEffect, useMemo, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SearchInput } from "../components/SearchInput";
import { Pagination } from "./Pagination";
import UserAccountModal from "../../UserAccountModal";


/* 

Original:
accounttype : "admin"
created_at: "2025-06-29T21:10:49.752Z"
deleted_at: null
email: "danny@email.com"
firstname: "fasus"
id: 12 
lastname: "daryl"
status: "approved"
updated_at: null
userid: "f465a343-9b33-4c29-9f89-9aa55ba9efca"
username: "f_daryl"
*/

// convert incoming data to this format

// Mock data removed - will be replaced with real API data

/* 
      
accounttype
: 
"admin"
created_at
: 
"2025-06-29T21:11:51.367Z"
data
: 
{bank_name: null, bank_account_name: null, bank_account_number: null, number: '38018281981'}
deleted_at
: 
null
email
: 
"cage@email.com"
firstname
: 
"xander"
id
: 
"596eac44-022c-418b-af01-505510416659"
lastname
: 
"cage"
organization
: 
"Institution"
organization_name
: 
"Federal University Of Agriculture"
status
: 
"approved"
updated_at
: 
null
userid
: 
"596eac44-022c-418b-af01-505510416659"
username
: 
"x_cage"

*/




export function TransactionMonitoringScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [accountTypeFilter, setAccountTypeFilter] = useState("All");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showAccountTypeDropdown, setShowAccountTypeDropdown] = useState(false);
  const itemsPerPage = 5;
  const [ query, writeQuery ] = useState<null|{ row: string, keyword: string }>(null)

  const [ members, setMembers  ] = useState<unitUserType[] | []>([])
  const userObject = new User()

  // Modal state
  const [selectedUser, setSelectedUser] = useState<unitUserType | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // reconstructing function
  function CONSTRUCTUSEROBJECT(UserData:[]) {
    let output: unitUserType[] = []
    if (UserData.length < 1) return output

    UserData.forEach((user:{ user:any, organization: any })=>{
      const currentUser = user.user
      const currentUserOrg = user.organization
      
      const newUserObjct: unitUserType = { ...currentUser, ...currentUserOrg }
      
      output.push(newUserObjct)
    })    
    return output;
  }
  
  useEffect(()=>{

    const creatingSpace = async ()=> {
        /* Import and manage user's here */

        try {
            let transaction = await userObject.organizationMembers(null)
            
            if (transaction.status) {                
              const restructured = CONSTRUCTUSEROBJECT(transaction.data)
                            
              setMembers(restructured)
              // construct them and send them to
            }
        } catch (error) {
            console.log(error);
            
        }
  }
  creatingSpace()
  }, [])
  


  // search function
  const filteredTransactions = useMemo(() => {

    return members.filter((transaction: unitUserType) => {
      
      
      const matchesSearch =
        searchQuery === "" ||
        transaction.firstname
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        transaction.lastname
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        transaction.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.accounttype
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || transaction.status === statusFilter;
      const matchesAccountType =
        accountTypeFilter === "All" ||
        transaction.accounttype === accountTypeFilter;

      return matchesSearch && matchesStatus && matchesAccountType;
    });
  }, [searchQuery, statusFilter, accountTypeFilter]);


  
  const totalItems = filteredTransactions.length;

  
  const startIndex = (currentPage - 1) * itemsPerPage;
  


  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const stats = useMemo(() => {
    const completed = filteredTransactions.filter(
      (t) => t.status === "approved"
    ).length;
    const pending = filteredTransactions.filter(
      (t) => t.status === "pending"
    ).length;
    const failed = filteredTransactions.filter(
      (t) => t.status === "disabled" || t.status === "deleted"
    ).length;
    return { completed, pending, failed };
  }, [filteredTransactions]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setShowStatusDropdown(false);
    setCurrentPage(1);
  };

  const handleAccountTypeFilter = (type: string) => {
    setAccountTypeFilter(type);
    setShowAccountTypeDropdown(false);
    setCurrentPage(1);
  };

  const handleExport = () => {
    Alert.alert(
      "Export Data",
      `Exporting ${filteredTransactions.length} transactions...`
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setAccountTypeFilter("All");
    setCurrentPage(1);
    setShowStatusDropdown(false);
    setShowAccountTypeDropdown(false);
  };

  const closeDropdowns = () => {
    setShowStatusDropdown(false);
    setShowAccountTypeDropdown(false);
  };

  const handleView = (transaction: any) => {
    Alert.alert(
      "View Transaction",
      `Viewing details for ${transaction.firstname} ${transaction.lastname}`
    );
  };

  const handleEdit = (transaction: any) => {
    Alert.alert(
      "Edit Transaction",
      `Editing ${transaction.firstname} ${transaction.lastname}`
    );
  };

  // Handle user account click
  const handleUserClick = (user: unitUserType) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  function dummyfunction() {
    
  }
  return (
    <TouchableOpacity
      activeOpacity={1}
      // onPress={closeDropdowns}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* <SkeletonBase
          title="Account Management"
          description="Manage accounts within organization"
        >

        </SkeletonBase> */}
  
          <View className="flex-1 bg-gray-50 pb-6">

            <View className="bg-white shadow-sm mb-6">
              <View className="p-8">
                <Text className="text-3xl font-light text-gray-800 mb-2">
                  Financial Transactions
                </Text>
                <Text className="text-sm text-gray-500 mb-8">
                  Track and monitor all transaction activities
                </Text>


                <View className="flex-row gap-4 mb-4">
                  <SearchInput
                    value={searchQuery}
                    onChangeText={dummyfunction}
                    placeholder="Search by name, email, or organization..."
                  />
                  <View className="flex-row gap-3">
                    <View className="relative">
                      <TouchableOpacity
                        className="bg-gray-100 border border-gray-200 rounded-md px-6 py-3"
                        onPress={() =>
                          setShowStatusDropdown(!showStatusDropdown)
                        }
                      >
                        <Text className="text-sm font-medium text-gray-700">
                          Status: {statusFilter}
                        </Text>
                      </TouchableOpacity>
                      {showStatusDropdown && (
                        <View className="absolute top-12 left-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-32">
                          {[
                            "All",
                            "Active",
                            "Pending",
                            "Suspended",
                            "Inactive",
                          ].map((status) => (
                            <TouchableOpacity
                              key={status}
                              className="px-4 py-2 border-b border-gray-100 last:border-b-0"
                              onPress={() => handleStatusFilter(status)}
                            >
                              <Text className="text-sm text-gray-700">
                                {status}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>
                    <View className="relative">
                      <TouchableOpacity
                        className="bg-gray-100 border border-gray-200 rounded-md px-6 py-3"
                        onPress={() =>
                          setShowAccountTypeDropdown(!showAccountTypeDropdown)
                        }
                      >
                        <Text className="text-sm font-medium text-gray-700">
                          Type: {accountTypeFilter}
                        </Text>
                      </TouchableOpacity>
                      {showAccountTypeDropdown && (
                        <View className="absolute top-12 left-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-32">
                          {["All", "Admin", "Manager", "User"].map((type) => (
                            <TouchableOpacity
                              key={type}
                              className="px-4 py-2 border-b border-gray-100 last:border-b-0"
                              onPress={() => handleAccountTypeFilter(type)}
                            >
                              <Text className="text-sm text-gray-700">
                                {type}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>
                    <TouchableOpacity
                      className="bg-green-600 rounded-md px-6 py-3"
                      // onPress={handleExport}
                    >
                      <Text className="text-sm font-medium text-white">
                        Export Data
                      </Text>
                    </TouchableOpacity>
                    {(searchQuery ||
                      statusFilter !== "All" ||
                      accountTypeFilter !== "All") && (
                      <TouchableOpacity
                        className="bg-gray-600 rounded-md px-6 py-3"
                        // onPress={clearFilters}
                      >
                        <Text className="text-sm font-medium text-white">
                          Clear Filters
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>


                <View className="flex-row gap-6 mt-4">
                  <View className="bg-green-50 px-4 py-2 rounded-md border border-green-200">
                    <Text className="text-xs text-green-600 font-medium">
                      ACTIVE
                    </Text>
                    <Text className="text-lg font-semibold text-green-700">
                      {stats.completed}
                    </Text>
                  </View>
                  <View className="bg-yellow-50 px-4 py-2 rounded-md border border-yellow-200">
                    <Text className="text-xs text-yellow-600 font-medium">
                      PENDING
                    </Text>
                    <Text className="text-lg font-semibold text-yellow-700">
                      {stats.pending}
                    </Text>
                  </View>
                  <View className="bg-red-50 px-4 py-2 rounded-md border border-red-200">
                    <Text className="text-xs text-red-600 font-medium">
                      SUSPENDED/INACTIVE
                    </Text>
                    <Text className="text-lg font-semibold text-red-700">
                      {stats.failed}
                    </Text>
                  </View>
                </View>
              </View>
            </View>


            <View className="bg-white rounded-lg border border-gray-200">
              <View className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-lg font-semibold text-gray-900">
                    Account
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Showing {paginatedTransactions.length} of {totalItems}{" "}
                    transactions
                  </Text>
                </View>
              </View>

              <View className="flex-row bg-gray-50 p-4 border-b border-gray-200">
                <Text className="flex-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  First Name
                </Text>
                <Text className="flex-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Name
                </Text>
                <Text className="flex-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </Text>
                <Text className="flex-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </Text>
                <Text className="flex-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account Type
                </Text>
                <Text className="flex-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organization
                </Text>
                <Text className="flex-1 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Update
                </Text>
              </View>


              <View className="divide-y divide-gray-200">
                {members.length === 0 ? (
                  <View className="p-8 text-center">
                    <Text className="text-gray-500">
                      No transactions found matching your criteria.
                    </Text>
                  </View>
                ) : (
                  members.map((transaction:unitUserType) => {

                    // function to generate color
                    const getStatusColor = (status: string) => {
                      switch (status) {
                        case "Active":
                          return "bg-green-100 text-green-800";
                        case "Pending":
                          return "bg-yellow-100 text-yellow-800";
                        case "Suspended":
                          return "bg-red-100 text-red-800";
                        case "Inactive":
                          return "bg-gray-100 text-gray-800";
                        default:
                          return "bg-gray-100 text-gray-800";
                      }


                    };

                    return (
                      <TouchableOpacity
                        key={transaction.id}
                        className="flex-row p-4 hover:bg-gray-50"
                        onPress={() => handleUserClick(transaction)}
                        activeOpacity={0.7}
                      >
                        <Text className="flex-1 text-sm text-gray-900">
                          {transaction.firstname}
                        </Text>
                        <Text className="flex-1 text-sm text-gray-900">
                          {transaction.lastname}
                        </Text>
                        <Text className="flex-1 text-sm text-gray-500">
                          {transaction.email}
                        </Text>
                        <View className="flex-1">
                          <View className={`px-2 py-1 text-xs font-semibold }`}>
                            <Text
                              className={`text-xs font-bold ${getStatusColor(transaction.status).split(" ")[1]}`}
                            >
                              {transaction.status}
                            </Text>
                          </View>
                        </View>
                        <Text className="flex-1 text-sm text-gray-900">
                          {transaction.accounttype}
                        </Text>
                        <Text className="flex-1 text-sm text-gray-900">
                          {transaction.organization}
                        </Text>
                        <Text className="flex-1 text-sm text-gray-500">
                          {transaction.updated_at}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                )}
              </View>
            </View>

            <View className="mt-6 mb-4">
              <Pagination
                currentPage={currentPage}
                totalItems={10}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            </View>
          </View>

          {/* User Account Modal */}
          <UserAccountModal
            visible={isModalVisible}
            onClose={handleCloseModal}
            userAccount={selectedUser}
          />
      </ScrollView>
    </TouchableOpacity>
  );
}
