import React, { useState, useMemo } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SkeletonBase } from "../SkeletonBase";
import { Pagination } from "./Pagination";
import { SearchInput } from "../components/SearchInput";

// Mock transaction data - replace with API call
const mockTransactions = [
  {id: 1, firstName: "John", lastName: "Doe", email: "john.doe@example.com", status: "Active", accountType: "Admin", organization: "Acme Corp", lastUpdate: "2024-06-01", amount: 150000},
  {id: 2, firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", status: "Inactive", accountType: "User", organization: "Beta Ltd", lastUpdate: "2024-05-28", amount: 75000},
  {id: 3, firstName: "Samuel", lastName: "Johnson", email: "samuel.johnson@example.com", status: "Pending", accountType: "Manager", organization: "Gamma LLC", lastUpdate: "2024-05-30", amount: 200000},
  {id: 4, firstName: "Linda", lastName: "Williams", email: "linda.williams@example.com", status: "Active", accountType: "User", organization: "Acme Corp", lastUpdate: "2024-06-02", amount: 95000},
  {id: 5, firstName: "Michael", lastName: "Brown", email: "michael.brown@example.com", status: "Suspended", accountType: "Admin", organization: "Beta Ltd", lastUpdate: "2024-05-25", amount: 300000},
  {id: 6, firstName: "Sarah", lastName: "Davis", email: "sarah.davis@example.com", status: "Active", accountType: "Manager", organization: "Delta Inc", lastUpdate: "2024-06-03", amount: 125000},
  {id: 7, firstName: "Robert", lastName: "Wilson", email: "robert.wilson@example.com", status: "Pending", accountType: "User", organization: "Echo Corp", lastUpdate: "2024-05-29", amount: 180000},
];

// Transaction Monitoring Screen
export function TransactionMonitoringScreen() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [accountTypeFilter, setAccountTypeFilter] = useState("All");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showAccountTypeDropdown, setShowAccountTypeDropdown] = useState(false);
  const itemsPerPage = 5;

  // Filter and search logic - O(n) time complexity
  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter(transaction => {
      const matchesSearch = searchQuery === "" || 
        transaction.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.organization.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "All" || transaction.status === statusFilter;
      const matchesAccountType = accountTypeFilter === "All" || transaction.accountType === accountTypeFilter;
      
      return matchesSearch && matchesStatus && matchesAccountType;
    });
  }, [searchQuery, statusFilter, accountTypeFilter]);

  // Pagination logic
  const totalItems = filteredTransactions.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  // Calculate stats from filtered data
  const stats = useMemo(() => {
    const completed = filteredTransactions.filter(t => t.status === "Active").length;
    const pending = filteredTransactions.filter(t => t.status === "Pending").length;
    const failed = filteredTransactions.filter(t => t.status === "Suspended" || t.status === "Inactive").length;
    return { completed, pending, failed };
  }, [filteredTransactions]);

  // Event handlers
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    setCurrentPage(1); // Reset to first page when searching
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
    Alert.alert("Export Data", `Exporting ${filteredTransactions.length} transactions...`);
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
    Alert.alert("View Transaction", `Viewing details for ${transaction.firstName} ${transaction.lastName}`);
  };

  const handleEdit = (transaction: any) => {
    Alert.alert("Edit Transaction", `Editing ${transaction.firstName} ${transaction.lastName}`);
  };



  return (
    <TouchableOpacity activeOpacity={1} onPress={closeDropdowns} style={{flex: 1}}>
      <ScrollView 
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
      >
      <SkeletonBase
        title="Account Management"
        description="Manage accounts within organization"
      >
        <View className="flex-1 bg-gray-50 pb-6">
          {/* Header Section */}
          <View className="bg-white shadow-sm mb-6">
            <View className="p-8">
              <Text className="text-3xl font-light text-gray-800 mb-2">
                Financial Transactions
              </Text>
              <Text className="text-sm text-gray-500 mb-8">
                Track and monitor all transaction activities
              </Text>

              {/* Search and Filters */}
              <View className="flex-row gap-4 mb-4">
                <SearchInput
                  value={searchQuery}
                  onChangeText={handleSearch}
                  placeholder="Search by name, email, or organization..."
                />
                <View className="flex-row gap-3">
                  <View className="relative">
                    <TouchableOpacity 
                      className="bg-gray-100 border border-gray-200 rounded-md px-6 py-3"
                      onPress={() => setShowStatusDropdown(!showStatusDropdown)}
                    >
                      <Text className="text-sm font-medium text-gray-700">
                        Status: {statusFilter}
                      </Text>
                    </TouchableOpacity>
                    {showStatusDropdown && (
                      <View className="absolute top-12 left-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-32">
                        {["All", "Active", "Pending", "Suspended", "Inactive"].map((status) => (
                          <TouchableOpacity
                            key={status}
                            className="px-4 py-2 border-b border-gray-100 last:border-b-0"
                            onPress={() => handleStatusFilter(status)}
                          >
                            <Text className="text-sm text-gray-700">{status}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                  <View className="relative">
                    <TouchableOpacity 
                      className="bg-gray-100 border border-gray-200 rounded-md px-6 py-3"
                      onPress={() => setShowAccountTypeDropdown(!showAccountTypeDropdown)}
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
                            <Text className="text-sm text-gray-700">{type}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                  </View>
                  <TouchableOpacity 
                     className="bg-green-600 rounded-md px-6 py-3"
                     onPress={handleExport}
                   >
                     <Text className="text-sm font-medium text-white">
                       Export Data
                     </Text>
                   </TouchableOpacity>
                   {(searchQuery || statusFilter !== "All" || accountTypeFilter !== "All") && (
                     <TouchableOpacity 
                       className="bg-gray-600 rounded-md px-6 py-3"
                       onPress={clearFilters}
                     >
                       <Text className="text-sm font-medium text-white">
                         Clear Filters
                       </Text>
                     </TouchableOpacity>
                   )}
                </View>
              </View>

              {/* Quick Stats */}
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

          {/* Transaction Table */}
          <View className="bg-white rounded-lg border border-gray-200">
            <View className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold text-gray-900">
                  Transaction Monitoring
                </Text>
                <Text className="text-sm text-gray-600">
                  Showing {paginatedTransactions.length} of {totalItems} transactions
                </Text>
              </View>
            </View>
            {/* Table Header */}
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

            {/* Table Rows */}
            <View className="divide-y divide-gray-200">
              {paginatedTransactions.length === 0 ? (
                <View className="p-8 text-center">
                  <Text className="text-gray-500">No transactions found matching your criteria.</Text>
                </View>
              ) : (
                paginatedTransactions.map((transaction) => {
                  const getStatusColor = (status: string) => {
                    switch (status) {
                      case 'Active': return 'bg-green-100 text-green-800';
                      case 'Pending': return 'bg-yellow-100 text-yellow-800';
                      case 'Suspended': return 'bg-red-100 text-red-800';
                      case 'Inactive': return 'bg-gray-100 text-gray-800';
                      default: return 'bg-gray-100 text-gray-800';
                    }
                  };

                  return (
                    <View key={transaction.id} className="flex-row p-4">
                      <Text className="flex-1 text-sm text-gray-900">
                        {transaction.firstName}
                      </Text>
                      <Text className="flex-1 text-sm text-gray-900">
                        {transaction.lastName}
                      </Text>
                      <Text className="flex-1 text-sm text-gray-500">
                        {transaction.email}
                      </Text>
                      <View className="flex-1">
                        <View className={`px-2 py-1 text-xs font-semibold }`}>
                          <Text className={`text-xs font-bold ${getStatusColor(transaction.status).split(' ')[1]}`}>
                            {transaction.status}
                          </Text>
                        </View>
                      </View>
                      <Text className="flex-1 text-sm text-gray-900">
                        {transaction.accountType}
                      </Text>
                      <Text className="flex-1 text-sm text-gray-900">
                        {transaction.organization}
                      </Text>
                      <Text className="flex-1 text-sm text-gray-500">
                        {transaction.lastUpdate}
                      </Text>
                    </View>
                  );
                })
              )}
            </View>
          </View>
          {/* Pagination */}
          <View className="mt-6 mb-4">
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </View>
        </View>
      </SkeletonBase>
      </ScrollView>
    </TouchableOpacity>
  );
}
