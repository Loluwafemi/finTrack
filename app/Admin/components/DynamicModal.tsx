import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import { useColorScheme } from "../lib/useColorScheme";
import { COLORS } from "../theme/colors";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface UserDetails {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  status: "active" | "inactive" | "suspended";
  joinDate: string;
  lastLogin?: string;
  organization?: string;
  department?: string;
}

interface DynamicContent {
  type:
    | "transactions"
    | "activities"
    | "documents"
    | "settings"
    | "custom"
    | "user_creation"
    | "budget_request"
    | "receipt_upload"
    | "expense_approval"
    | "payment_processing"
    | "role_change"
    | "document_verification"
    | "budget_allocation";
  title: string;
  data: any[];
  component?: React.ReactNode;
  // Additional properties for specific activity types
  budgetDetails?: {
    amount: number;
    purpose: string;
    requestDate: string;
    status: "pending" | "approved" | "declined";
  };
  receiptDetails?: {
    totalReceipts: number;
    totalAmount: number;
    uploadDate: string;
  };
  expenseApprovalDetails?: {
    expenseId: string;
    submittedBy: string;
    amount: string;
    category: string;
    description: string;
    submissionDate: string;
    approvalStatus: string;
    approverComments?: string;
  };
  paymentProcessingDetails?: {
    paymentId: string;
    recipient: string;
    amount: string;
    paymentMethod: string;
    processingStatus: string;
    scheduledDate: string;
    completionDate?: string;
  };

  roleChangeDetails?: {
    userId: string;
    previousRole: string;
    newRole: string;
    changedBy: string;
    changeDate: string;
    reason: string;
    effectiveDate: string;
  };
  documentVerificationDetails?: {
    documentId: string;
    documentType: string;
    submittedBy: string;
    verificationStatus: string;
    submissionDate: string;
    verifiedBy?: string;
    verificationDate?: string;
    comments?: string;
  };
  budgetAllocationDetails?: {
    allocationId: string;
    department: string;
    allocatedAmount: string;
    budgetPeriod: string;
    allocatedBy: string;
    allocationDate: string;
    purpose: string;
    status: string;
  };
  // Additional properties for missing activity types
  expenseDetails?: {
    expenseId: string;
    amount: number;
    category: string;
    submissionDate: string;
    approvalDate: string;
    status: "pending" | "approved" | "declined";
    approver: string;
  };
  paymentDetails?: {
    paymentId: string;
    amount: number;
    vendor: string;
    method: string;
    processedDate: string;
    status: "pending" | "completed" | "failed";
    reference: string;
  };
  roleDetails?: {
    previousRole: string;
    newRole: string;
    changeDate: string;
    changedBy: string;
    reason: string;
    effectiveDate: string;
  };
  documentDetails?: {
    documentId: string;
    type: string;
    submissionDate: string;
    verificationDate: string;
    status: "pending" | "verified" | "rejected";
    verifier: string;
  };
  budgetAllocationDetails2?: {
    allocationId: string;
    totalAmount: number;
    period: string;
    departments: number;
    allocationDate: string;
    status: "pending" | "completed" | "cancelled";
  };
}

interface DynamicModalProps {
  visible: boolean;
  onClose: () => void;
  userDetails: UserDetails;
  dynamicContent: DynamicContent;
  onDynamicContentChange?: (content: DynamicContent) => void;
}

/**
 * DynamicModal Component
 *
 * A responsive modal with two-column grid layout:
 * - Left column: Static user details (name, email, role, etc.)
 * - Right column: Dynamic content based on prompts/interactions
 *
 * Features:
 * - Mobile-first responsive design
 * - NativeWind styling with dark mode support
 * - Configurable dynamic content types
 * - Accessibility compliant (WCAG 2.1)
 * - Nigerian Naira currency formatting
 *
 * Responsive breakpoints: mobile <640px, tablet 640–1024px, desktop >1024px
 *
 * Time Complexity: O(1) for rendering, O(n) for dynamic content lists
 * Space Complexity: O(n) where n is the number of dynamic content items
 */
export const DynamicModal: React.FC<DynamicModalProps> = ({
  visible,
  onClose,
  userDetails,
  dynamicContent,
  onDynamicContentChange,
}) => {
  const { isDarkColorScheme } = useColorScheme();
  const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;
  const [selectedTab, setSelectedTab] = useState<string>("overview");

  // Format currency in Nigerian Naira
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Format date for Nigerian locale
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status color based on user status
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "active":
        return "#10B981"; // green-500
      case "inactive":
        return "#6B7280"; // gray-500
      case "suspended":
        return "#EF4444"; // red-500
      default:
        return "#6B7280";
    }
  };

  // Render dynamic content based on type
  const renderDynamicContent = () => {
    switch (dynamicContent.type) {
      case "transactions":
        return (
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {dynamicContent.data.map((transaction, index) => (
              <View
                key={index}
                className="p-4 mb-3 rounded-lg border"
                style={{
                  backgroundColor: currentColors.card,
                  borderColor: currentColors.border,
                }}
              >
                <View className="flex-row justify-between items-start mb-2">
                  <Text
                    className="font-semibold text-sm"
                    style={{ color: currentColors.foreground }}
                  >
                    {transaction.description || "Transaction"}
                  </Text>
                  <Text
                    className="font-bold text-sm"
                    style={{
                      color: transaction.amount > 0 ? "#10B981" : "#EF4444",
                    }}
                  >
                    {formatCurrency(transaction.amount)}
                  </Text>
                </View>
                <Text
                  className="text-xs"
                  style={{ color: currentColors.textSecondary }}
                >
                  {formatDate(transaction.date)}
                </Text>
              </View>
            ))}
          </ScrollView>
        );

      case "activities":
        return (
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {dynamicContent.data.map((activity, index) => (
              <View
                key={index}
                className="p-4 mb-3 rounded-lg border"
                style={{
                  backgroundColor: currentColors.card,
                  borderColor: currentColors.border,
                }}
              >
                <Text
                  className="font-medium text-sm mb-1"
                  style={{ color: currentColors.foreground }}
                >
                  {activity.action || "Activity"}
                </Text>
                <Text
                  className="text-xs mb-2"
                  style={{ color: currentColors.textSecondary }}
                >
                  {activity.description}
                </Text>
                <Text
                  className="text-xs"
                  style={{ color: currentColors.textSecondary }}
                >
                  {formatDate(activity.timestamp)}
                </Text>
              </View>
            ))}
          </ScrollView>
        );

      case "user_creation":
        return (
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {/* User Activities Section */}
            <View
              className="p-4 rounded-lg border mb-4"
              style={{
                backgroundColor: currentColors.card,
                borderColor: currentColors.border,
              }}
            >
              <Text
                className="font-semibold text-lg mb-3"
                style={{ color: currentColors.foreground }}
              >
                Recent Activities
              </Text>
              {/* Mock activities - TODO: Replace with real API data */}
              {[
                {
                  action: "Budget Request Submitted",
                  description: "Requested ₦150,000 for office supplies",
                  timestamp: new Date(
                    Date.now() - 2 * 60 * 60 * 1000
                  ).toISOString(),
                  status: "pending",
                },
                {
                  action: "Profile Updated",
                  description: "Updated contact information",
                  timestamp: new Date(
                    Date.now() - 5 * 60 * 60 * 1000
                  ).toISOString(),
                  status: "completed",
                },
                {
                  action: "Receipt Uploaded",
                  description: "Uploaded 3 receipts totaling ₦45,000",
                  timestamp: new Date(
                    Date.now() - 24 * 60 * 60 * 1000
                  ).toISOString(),
                  status: "completed",
                },
              ].map((activity, index) => (
                <View
                  key={index}
                  className="p-3 mb-2 rounded border"
                  style={{
                    backgroundColor: currentColors.background,
                    borderColor: currentColors.border,
                  }}
                >
                  <View className="flex-row justify-between items-start mb-1">
                    <Text
                      className="font-medium text-sm"
                      style={{ color: currentColors.foreground }}
                    >
                      {activity.action}
                    </Text>
                    <View
                      className="px-2 py-1 rounded"
                      style={{
                        backgroundColor:
                          activity.status === "pending" ? "#FEF3C7" : "#D1FAE5",
                      }}
                    >
                      <Text
                        className="text-xs font-medium"
                        style={{
                          color:
                            activity.status === "pending"
                              ? "#92400E"
                              : "#065F46",
                        }}
                      >
                        {activity.status}
                      </Text>
                    </View>
                  </View>
                  <Text
                    className="text-xs mb-1"
                    style={{ color: currentColors.textSecondary }}
                  >
                    {activity.description}
                  </Text>
                  <Text
                    className="text-xs"
                    style={{ color: currentColors.textSecondary }}
                  >
                    {formatDate(activity.timestamp)}
                  </Text>
                </View>
              ))}
            </View>

            {/* Budget List Section */}
            <View
              className="p-4 rounded-lg border"
              style={{
                backgroundColor: currentColors.card,
                borderColor: currentColors.border,
              }}
            >
              <Text
                className="font-semibold text-lg mb-3"
                style={{ color: currentColors.foreground }}
              >
                Budget List
              </Text>

              {/* Mock budget data - TODO: Replace with real API data */}
              {[
                {
                  id: 1,
                  budgetName: "Office Supplies Budget",
                  totalPrice: 250000,
                  expenseCategories: [
                    { name: "Stationery", price: 75000 },
                    { name: "Equipment", price: 125000 },
                    { name: "Software Licenses", price: 50000 },
                  ],
                },
                {
                  id: 2,
                  budgetName: "Marketing Budget",
                  totalPrice: 500000,
                  expenseCategories: [
                    { name: "Digital Advertising", price: 200000 },
                    { name: "Print Materials", price: 150000 },
                    { name: "Events & Promotions", price: 150000 },
                  ],
                },
                {
                  id: 3,
                  budgetName: "Training & Development",
                  totalPrice: 180000,
                  expenseCategories: [
                    { name: "Online Courses", price: 80000 },
                    { name: "Workshops", price: 60000 },
                    { name: "Certification Programs", price: 40000 },
                  ],
                },
              ].map((budget) => {
                const [isExpanded, setIsExpanded] = React.useState(false);

                return (
                  <View
                    key={budget.id}
                    className="mb-3 rounded border"
                    style={{
                      backgroundColor: currentColors.background,
                      borderColor: currentColors.border,
                    }}
                  >
                    {/* Accordion Header */}
                    <TouchableOpacity
                      className="p-3 flex-row justify-between items-center"
                      onPress={() => setIsExpanded(!isExpanded)}
                    >
                      <View className="flex-1">
                        <Text
                          className="font-medium text-base mb-1"
                          style={{ color: currentColors.foreground }}
                        >
                          {budget.budgetName}
                        </Text>
                        <Text
                          className="text-lg font-bold"
                          style={{ color: currentColors.primary }}
                        >
                          {formatCurrency(budget.totalPrice)}
                        </Text>
                      </View>
                      <Text
                        className="text-xl font-bold"
                        style={{ color: currentColors.textSecondary }}
                      >
                        {isExpanded ? "−" : "+"}
                      </Text>
                    </TouchableOpacity>

                    {/* Accordion Content */}
                    {isExpanded && (
                      <View
                        className="px-3 pb-3 border-t"
                        style={{ borderTopColor: currentColors.border }}
                      >
                        <Text
                          className="font-medium text-sm mb-2 mt-2"
                          style={{ color: currentColors.textSecondary }}
                        >
                          Expense Categories
                        </Text>
                        {budget.expenseCategories.map((category, index) => (
                          <View
                            key={index}
                            className="flex-row justify-between items-center py-2 px-2 mb-1 rounded"
                            style={{ backgroundColor: currentColors.card }}
                          >
                            <Text
                              className="text-sm"
                              style={{ color: currentColors.foreground }}
                            >
                              {category.name}
                            </Text>
                            <Text
                              className="text-sm font-semibold"
                              style={{ color: currentColors.primary }}
                            >
                              {formatCurrency(category.price)}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </ScrollView>
        );

      case "budget_request":
        return (
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View
              className="p-4 mb-4 rounded-lg border"
              style={{
                backgroundColor: currentColors.card,
                borderColor: currentColors.border,
              }}
            >
              <Text
                className="font-semibold text-lg mb-3"
                style={{ color: currentColors.foreground }}
              >
                Budget Request Details
              </Text>
              <View className="mb-4">
                <Text
                  className="text-sm font-medium mb-1"
                  style={{ color: currentColors.textSecondary }}
                >
                  Purpose
                </Text>
                <Text
                  className="text-base mb-3"
                  style={{ color: currentColors.foreground }}
                >
                  {dynamicContent.budgetDetails?.purpose ||
                    "Office supplies and equipment"}
                </Text>

                <Text
                  className="text-sm font-medium mb-1"
                  style={{ color: currentColors.textSecondary }}
                >
                  Requested Amount
                </Text>
                <Text
                  className="text-xl font-bold mb-3"
                  style={{ color: currentColors.primary }}
                >
                  {formatCurrency(
                    dynamicContent.budgetDetails?.amount || 150000
                  )}
                </Text>

                <Text
                  className="text-sm font-medium mb-1"
                  style={{ color: currentColors.textSecondary }}
                >
                  Request Date
                </Text>
                <Text
                  className="text-base mb-4"
                  style={{ color: currentColors.foreground }}
                >
                  {formatDate(
                    dynamicContent.budgetDetails?.requestDate ||
                      new Date().toISOString()
                  )}
                </Text>
              </View>

              {/* Action Buttons */}
              <View className="flex-row" style={{ gap: 12 }}>
                <TouchableOpacity
                  className="flex-1 py-3 rounded-lg"
                  style={{ backgroundColor: "#EF4444" }}
                  onPress={() => {
                    // TODO: Implement decline logic with API call
                    console.log("Budget request declined");
                  }}
                >
                  <Text className="text-white text-center font-semibold">
                    Decline
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-1 py-3 rounded-lg"
                  style={{ backgroundColor: "#10B981" }}
                  onPress={() => {
                    // TODO: Implement approve logic with API call
                    console.log("Budget request approved");
                  }}
                >
                  <Text className="text-white text-center font-semibold">
                    Approve
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        );

      case "receipt_upload":
        return (
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View
              className="p-4 mb-4 rounded-lg border"
              style={{
                backgroundColor: currentColors.card,
                borderColor: currentColors.border,
              }}
            >
              <Text
                className="font-semibold text-lg mb-3"
                style={{ color: currentColors.foreground }}
              >
                Receipt Upload Summary
              </Text>

              <View className="mb-4">
                <View className="flex-row justify-between items-center mb-3">
                  <Text
                    className="text-sm font-medium"
                    style={{ color: currentColors.textSecondary }}
                  >
                    Total Receipts Uploaded
                  </Text>
                  <Text
                    className="text-2xl font-bold"
                    style={{ color: currentColors.primary }}
                  >
                    {dynamicContent.receiptDetails?.totalReceipts || 5}
                  </Text>
                </View>

                <View className="flex-row justify-between items-center mb-3">
                  <Text
                    className="text-sm font-medium"
                    style={{ color: currentColors.textSecondary }}
                  >
                    Total Amount
                  </Text>
                  <Text
                    className="text-xl font-bold"
                    style={{ color: currentColors.foreground }}
                  >
                    {formatCurrency(
                      dynamicContent.receiptDetails?.totalAmount || 75000
                    )}
                  </Text>
                </View>

                <View className="flex-row justify-between items-center mb-4">
                  <Text
                    className="text-sm font-medium"
                    style={{ color: currentColors.textSecondary }}
                  >
                    Upload Date
                  </Text>
                  <Text
                    className="text-base"
                    style={{ color: currentColors.foreground }}
                  >
                    {formatDate(
                      dynamicContent.receiptDetails?.uploadDate ||
                        new Date().toISOString()
                    )}
                  </Text>
                </View>
              </View>

              {/* Mock Receipt List - TODO: Replace with real API data */}
              <Text
                className="font-semibold text-base mb-3"
                style={{ color: currentColors.foreground }}
              >
                Receipt Details
              </Text>
              {[
                {
                  id: "rec_001",
                  description: "Office Supplies - Staples",
                  amount: 15000,
                  date: new Date(
                    Date.now() - 1 * 24 * 60 * 60 * 1000
                  ).toISOString(),
                },
                {
                  id: "rec_002",
                  description: "Lunch Meeting - Restaurant",
                  amount: 25000,
                  date: new Date(
                    Date.now() - 2 * 24 * 60 * 60 * 1000
                  ).toISOString(),
                },
                {
                  id: "rec_003",
                  description: "Transportation - Uber",
                  amount: 8000,
                  date: new Date(
                    Date.now() - 3 * 24 * 60 * 60 * 1000
                  ).toISOString(),
                },
                {
                  id: "rec_004",
                  description: "Equipment - USB Cables",
                  amount: 12000,
                  date: new Date(
                    Date.now() - 4 * 24 * 60 * 60 * 1000
                  ).toISOString(),
                },
                {
                  id: "rec_005",
                  description: "Software License - Adobe",
                  amount: 15000,
                  date: new Date(
                    Date.now() - 5 * 24 * 60 * 60 * 1000
                  ).toISOString(),
                },
              ].map((receipt, index) => (
                <View
                  key={receipt.id}
                  className="p-3 mb-2 rounded border"
                  style={{
                    backgroundColor: currentColors.background,
                    borderColor: currentColors.border,
                  }}
                >
                  <View className="flex-row justify-between items-start mb-1">
                    <Text
                      className="font-medium text-sm flex-1"
                      style={{ color: currentColors.foreground }}
                    >
                      {receipt.description}
                    </Text>
                    <Text
                      className="font-bold text-sm"
                      style={{ color: currentColors.primary }}
                    >
                      {formatCurrency(receipt.amount)}
                    </Text>
                  </View>
                  <Text
                    className="text-xs"
                    style={{ color: currentColors.textSecondary }}
                  >
                    {formatDate(receipt.date)}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        );

      case "expense_approval":
        return (
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View
              className="p-4 mb-4 rounded-lg border"
              style={{
                backgroundColor: currentColors.card,
                borderColor: currentColors.border,
              }}
            >
              <Text
                className="font-semibold text-lg mb-3"
                style={{ color: currentColors.foreground }}
              >
                Expense Approval Review
              </Text>

              <View className="mb-4">
                <Text
                  className="text-sm font-medium mb-1"
                  style={{ color: currentColors.textSecondary }}
                >
                  Expense ID
                </Text>
                <Text
                  className="text-base mb-3"
                  style={{ color: currentColors.foreground }}
                >
                  {dynamicContent.expenseApprovalDetails?.expenseId ||
                    "EXP-2024-001"}
                </Text>

                <Text
                  className="text-sm font-medium mb-1"
                  style={{ color: currentColors.textSecondary }}
                >
                  Submitted By
                </Text>
                <Text
                  className="text-base mb-3"
                  style={{ color: currentColors.foreground }}
                >
                  {dynamicContent.expenseApprovalDetails?.submittedBy ||
                    "John Doe"}
                </Text>

                <Text
                  className="text-sm font-medium mb-1"
                  style={{ color: currentColors.textSecondary }}
                >
                  Amount
                </Text>
                <Text
                  className="text-xl font-bold mb-3"
                  style={{ color: currentColors.primary }}
                >
                  {dynamicContent.expenseApprovalDetails?.amount || "₦25,000"}
                </Text>

                <Text
                  className="text-sm font-medium mb-1"
                  style={{ color: currentColors.textSecondary }}
                >
                  Category
                </Text>
                <Text
                  className="text-base mb-3"
                  style={{ color: currentColors.foreground }}
                >
                  {dynamicContent.expenseApprovalDetails?.category || "Travel"}
                </Text>

                <Text
                  className="text-sm font-medium mb-1"
                  style={{ color: currentColors.textSecondary }}
                >
                  Description
                </Text>
                <Text
                  className="text-base mb-4"
                  style={{ color: currentColors.foreground }}
                >
                  {dynamicContent.expenseApprovalDetails?.description ||
                    "Business trip to Lagos for client meeting"}
                </Text>
              </View>

              {/* Action Buttons */}
              <View className="flex-row" style={{ gap: 12 }}>
                <TouchableOpacity
                  className="flex-1 py-3 rounded-lg"
                  style={{ backgroundColor: "#EF4444" }}
                  onPress={() => {
                    console.log("Expense declined");
                  }}
                >
                  <Text className="text-white text-center font-semibold">
                    Decline
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-1 py-3 rounded-lg"
                  style={{ backgroundColor: "#10B981" }}
                  onPress={() => {
                    console.log("Expense approved");
                  }}
                >
                  <Text className="text-white text-center font-semibold">
                    Approve
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        );

      case "payment_processing":
        return (
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View
              className="p-4 mb-4 rounded-lg border"
              style={{
                backgroundColor: currentColors.card,
                borderColor: currentColors.border,
              }}
            >
              <Text
                className="font-semibold text-lg mb-3"
                style={{ color: currentColors.foreground }}
              >
                Payment Processing Status
              </Text>

              <View className="mb-4">
                <Text
                  className="text-sm font-medium mb-1"
                  style={{ color: currentColors.textSecondary }}
                >
                  Payment ID
                </Text>
                <Text
                  className="text-base mb-3"
                  style={{ color: currentColors.foreground }}
                >
                  {dynamicContent.paymentProcessingDetails?.paymentId ||
                    "PAY-2024-001"}
                </Text>

                <Text
                  className="text-sm font-medium mb-1"
                  style={{ color: currentColors.textSecondary }}
                >
                  Recipient
                </Text>
                <Text
                  className="text-base mb-3"
                  style={{ color: currentColors.foreground }}
                >
                  {dynamicContent.paymentProcessingDetails?.recipient ||
                    "Vendor ABC Ltd"}
                </Text>

                <Text
                  className="text-sm font-medium mb-1"
                  style={{ color: currentColors.textSecondary }}
                >
                  Amount
                </Text>
                <Text
                  className="text-xl font-bold mb-3"
                  style={{ color: currentColors.primary }}
                >
                  {dynamicContent.paymentProcessingDetails?.amount ||
                    "₦150,000"}
                </Text>

                <Text
                  className="text-sm font-medium mb-1"
                  style={{ color: currentColors.textSecondary }}
                >
                  Payment Method
                </Text>
                <Text
                  className="text-base mb-3"
                  style={{ color: currentColors.foreground }}
                >
                  {dynamicContent.paymentProcessingDetails?.paymentMethod ||
                    "Bank Transfer"}
                </Text>

                <Text
                  className="text-sm font-medium mb-1"
                  style={{ color: currentColors.textSecondary }}
                >
                  Status
                </Text>
                <View
                  className="px-3 py-1 rounded-full mb-3 self-start"
                  style={{
                    backgroundColor:
                      dynamicContent.paymentProcessingDetails
                        ?.processingStatus === "completed"
                        ? "#D1FAE5"
                        : dynamicContent.paymentProcessingDetails
                              ?.processingStatus === "processing"
                          ? "#DBEAFE"
                          : dynamicContent.paymentProcessingDetails
                                ?.processingStatus === "pending"
                            ? "#FEF3C7"
                            : "#FEE2E2",
                  }}
                >
                  <Text
                    className="text-xs font-medium"
                    style={{
                      color:
                        dynamicContent.paymentProcessingDetails
                          ?.processingStatus === "completed"
                          ? "#065F46"
                          : dynamicContent.paymentProcessingDetails
                                ?.processingStatus === "processing"
                            ? "#1E40AF"
                            : dynamicContent.paymentProcessingDetails
                                  ?.processingStatus === "pending"
                              ? "#92400E"
                              : "#991B1B",
                    }}
                  >
                    {dynamicContent.paymentProcessingDetails
                      ?.processingStatus || "pending"}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        );

      // Role Change - Used for managing user role and permission modifications
      case "role_change":
        return (
          <View className="space-y-4">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              User Role Change
            </Text>

            <View className="bg-indigo-50 p-4 rounded-lg">
              <Text className="text-sm font-medium text-gray-600 mb-2">
                Role Modification Details
              </Text>
              <View className="space-y-2">
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600">User ID:</Text>
                  <Text className="text-sm font-medium text-gray-800">
                    {dynamicContent.roleChangeDetails?.userId || "USR-001"}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600">Previous Role:</Text>
                  <Text className="text-sm font-medium text-gray-800">
                    {dynamicContent.roleChangeDetails?.previousRole || "Member"}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600">New Role:</Text>
                  <Text className="text-sm font-medium text-gray-800">
                    {dynamicContent.roleChangeDetails?.newRole || "Admin"}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600">Changed By:</Text>
                  <Text className="text-sm font-medium text-gray-800">
                    {dynamicContent.roleChangeDetails?.changedBy ||
                      "Super Admin"}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600">Change Date:</Text>
                  <Text className="text-sm font-medium text-gray-800">
                    {dynamicContent.roleChangeDetails?.changeDate ||
                      "2024-12-20"}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600">Effective Date:</Text>
                  <Text className="text-sm font-medium text-gray-800">
                    {dynamicContent.roleChangeDetails?.effectiveDate ||
                      "2024-12-21"}
                  </Text>
                </View>
              </View>
            </View>

            <View className="bg-gray-50 p-4 rounded-lg">
              <Text className="text-sm font-medium text-gray-600 mb-2">
                Reason for Change
              </Text>
              <Text className="text-sm text-gray-700">
                {dynamicContent.roleChangeDetails?.reason ||
                  "Promotion to administrative role due to excellent performance"}
              </Text>
            </View>
          </View>
        );

      // Document Verification - Used for document approval and verification workflows
      case "document_verification":
        return (
          <View className="space-y-4">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Document Verification
            </Text>

            <View className="bg-cyan-50 p-4 rounded-lg">
              <Text className="text-sm font-medium text-gray-600 mb-2">
                Document Information
              </Text>
              <View className="space-y-2">
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600">Document ID:</Text>
                  <Text className="text-sm font-medium text-gray-800">
                    {dynamicContent.documentVerificationDetails?.documentId ||
                      "DOC-2024-001"}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600">Document Type:</Text>
                  <Text className="text-sm font-medium text-gray-800">
                    {dynamicContent.documentVerificationDetails?.documentType ||
                      "Identity Verification"}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600">Submitted By:</Text>
                  <Text className="text-sm font-medium text-gray-800">
                    {dynamicContent.documentVerificationDetails?.submittedBy ||
                      "Jane Smith"}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600">
                    Submission Date:
                  </Text>
                  <Text className="text-sm font-medium text-gray-800">
                    {dynamicContent.documentVerificationDetails
                      ?.submissionDate || "2024-12-18"}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600">Status:</Text>
                  <View
                    className={`px-2 py-1 rounded-full ${
                      dynamicContent.documentVerificationDetails
                        ?.verificationStatus === "verified"
                        ? "bg-green-100"
                        : dynamicContent.documentVerificationDetails
                              ?.verificationStatus === "pending"
                          ? "bg-yellow-100"
                          : "bg-red-100"
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        dynamicContent.documentVerificationDetails
                          ?.verificationStatus === "verified"
                          ? "text-green-800"
                          : dynamicContent.documentVerificationDetails
                                ?.verificationStatus === "pending"
                            ? "text-yellow-800"
                            : "text-red-800"
                      }`}
                    >
                      {dynamicContent.documentVerificationDetails
                        ?.verificationStatus || "pending"}
                    </Text>
                  </View>
                </View>
                {dynamicContent.documentVerificationDetails?.verifiedBy && (
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-gray-600">Verified By:</Text>
                    <Text className="text-sm font-medium text-gray-800">
                      {dynamicContent.documentVerificationDetails.verifiedBy}
                    </Text>
                  </View>
                )}
                {dynamicContent.documentVerificationDetails
                  ?.verificationDate && (
                  <View className="flex-row justify-between">
                    <Text className="text-sm text-gray-600">
                      Verification Date:
                    </Text>
                    <Text className="text-sm font-medium text-gray-800">
                      {
                        dynamicContent.documentVerificationDetails
                          .verificationDate
                      }
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {dynamicContent.documentVerificationDetails?.comments && (
              <View className="bg-gray-50 p-4 rounded-lg">
                <Text className="text-sm font-medium text-gray-600 mb-2">
                  Verification Comments
                </Text>
                <Text className="text-sm text-gray-700">
                  {dynamicContent.documentVerificationDetails.comments}
                </Text>
              </View>
            )}
          </View>
        );

      // Budget Allocation - Used for budget distribution and allocation management
      case "budget_allocation":
        return (
          <View className="space-y-4">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Budget Allocation
            </Text>

            <View className="bg-emerald-50 p-4 rounded-lg">
              <Text className="text-sm font-medium text-gray-600 mb-2">
                Allocation Details
              </Text>
              <View className="space-y-2">
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600">Allocation ID:</Text>
                  <Text className="text-sm font-medium text-gray-800">
                    {dynamicContent.budgetAllocationDetails?.allocationId ||
                      "ALLOC-2024-001"}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600">Department:</Text>
                  <Text className="text-sm font-medium text-gray-800">
                    {dynamicContent.budgetAllocationDetails?.department ||
                      "Marketing"}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600">
                    Allocated Amount:
                  </Text>
                  <Text className="text-sm font-medium text-gray-800">
                    {dynamicContent.budgetAllocationDetails?.allocatedAmount ||
                      "₦500,000"}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600">Budget Period:</Text>
                  <Text className="text-sm font-medium text-gray-800">
                    {dynamicContent.budgetAllocationDetails?.budgetPeriod ||
                      "Q1 2025"}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600">Allocated By:</Text>
                  <Text className="text-sm font-medium text-gray-800">
                    {dynamicContent.budgetAllocationDetails?.allocatedBy ||
                      "Finance Manager"}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600">
                    Allocation Date:
                  </Text>
                  <Text className="text-sm font-medium text-gray-800">
                    {dynamicContent.budgetAllocationDetails?.allocationDate ||
                      "2024-12-20"}
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-sm text-gray-600">Status:</Text>
                  <View
                    className={`px-2 py-1 rounded-full ${
                      dynamicContent.budgetAllocationDetails?.status ===
                      "approved"
                        ? "bg-green-100"
                        : dynamicContent.budgetAllocationDetails?.status ===
                            "pending"
                          ? "bg-yellow-100"
                          : "bg-red-100"
                    }`}
                  >
                    <Text
                      className={`text-xs font-medium ${
                        dynamicContent.budgetAllocationDetails?.status ===
                        "approved"
                          ? "text-green-800"
                          : dynamicContent.budgetAllocationDetails?.status ===
                              "pending"
                            ? "text-yellow-800"
                            : "text-red-800"
                      }`}
                    >
                      {dynamicContent.budgetAllocationDetails?.status ||
                        "pending"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="bg-gray-50 p-4 rounded-lg">
              <Text className="text-sm font-medium text-gray-600 mb-2">
                Purpose
              </Text>
              <Text className="text-sm text-gray-700">
                {dynamicContent.budgetAllocationDetails?.purpose ||
                  "Digital marketing campaign and promotional activities"}
              </Text>
            </View>
          </View>
        );

      case "custom":
        return (
          dynamicContent.component || (
            <View className="flex-1 justify-center items-center">
              <Text
                className="text-sm"
                style={{ color: currentColors.textSecondary }}
              >
                Custom content will appear here
              </Text>
            </View>
          )
        );

      default:
        return (
          <View className="flex-1 justify-center items-center">
            <Text
              className="text-sm"
              style={{ color: currentColors.textSecondary }}
            >
              Select content type to display
            </Text>
          </View>
        );
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View
        className="flex-1 justify-center items-center"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: 20,
        }}
      >
        <View
          className="w-full h-5/6 rounded-xl"
          style={{
            backgroundColor: currentColors.background,
            maxWidth: screenWidth > 1024 ? "90%" : "95%",
            maxHeight: screenHeight * 0.85,
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
            <Text
              className="text-lg font-bold"
              style={{ color: currentColors.foreground }}
            >
              User Details
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="p-2 rounded-full"
              style={{ backgroundColor: currentColors.muted }}
              accessibilityLabel="Close modal"
              accessibilityRole="button"
            >
              <Text
                className="text-lg font-bold"
                style={{ color: currentColors.foreground }}
              >
                ×
              </Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View className="flex-1 p-4">
            <View className="flex-1 flex-row" style={{ gap: 16 }}>
              {/* Left Section - Static User Details */}
              <View className="flex-1">
                <View
                  className="p-6 rounded-lg border"
                  style={{
                    backgroundColor: currentColors.card,
                    borderColor: currentColors.border,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 3,
                  }}
                >
                  <Text
                    className="text-lg font-bold mb-4"
                    style={{ color: currentColors.foreground }}
                  >
                    User Information
                  </Text>

                  {/* User Details */}
                  <View className="space-y-3">
                    <View>
                      <Text
                        className="text-xs font-medium mb-1"
                        style={{ color: currentColors.textSecondary }}
                      >
                        Full Name
                      </Text>
                      <Text
                        className="text-sm font-semibold"
                        style={{ color: currentColors.foreground }}
                      >
                        {userDetails.name}
                      </Text>
                    </View>

                    <View>
                      <Text
                        className="text-xs font-medium mb-1"
                        style={{ color: currentColors.textSecondary }}
                      >
                        Email Address
                      </Text>
                      <Text
                        className="text-sm"
                        style={{ color: currentColors.foreground }}
                      >
                        {userDetails.email}
                      </Text>
                    </View>

                    {userDetails.phone && (
                      <View>
                        <Text
                          className="text-xs font-medium mb-1"
                          style={{ color: currentColors.textSecondary }}
                        >
                          Phone Number
                        </Text>
                        <Text
                          className="text-sm"
                          style={{ color: currentColors.foreground }}
                        >
                          {userDetails.phone}
                        </Text>
                      </View>
                    )}

                    <View>
                      <Text
                        className="text-xs font-medium mb-1"
                        style={{ color: currentColors.textSecondary }}
                      >
                        Role
                      </Text>
                      <Text
                        className="text-sm font-medium"
                        style={{ color: currentColors.foreground }}
                      >
                        {userDetails.role}
                      </Text>
                    </View>

                    <View>
                      <Text
                        className="text-xs font-medium mb-1"
                        style={{ color: currentColors.textSecondary }}
                      >
                        Status
                      </Text>
                      <View className="flex-row items-center">
                        <View
                          className="w-2 h-2 rounded-full mr-2"
                          style={{
                            backgroundColor: getStatusColor(userDetails.status),
                          }}
                        />
                        <Text
                          className="text-sm font-medium capitalize"
                          style={{ color: getStatusColor(userDetails.status) }}
                        >
                          {userDetails.status}
                        </Text>
                      </View>
                    </View>

                    <View>
                      <Text
                        className="text-xs font-medium mb-1"
                        style={{ color: currentColors.textSecondary }}
                      >
                        Join Date
                      </Text>
                      <Text
                        className="text-sm"
                        style={{ color: currentColors.foreground }}
                      >
                        {formatDate(userDetails.joinDate)}
                      </Text>
                    </View>

                    {userDetails.lastLogin && (
                      <View>
                        <Text
                          className="text-xs font-medium mb-1"
                          style={{ color: currentColors.textSecondary }}
                        >
                          Last Login
                        </Text>
                        <Text
                          className="text-sm"
                          style={{ color: currentColors.foreground }}
                        >
                          {formatDate(userDetails.lastLogin)}
                        </Text>
                      </View>
                    )}

                    {userDetails.organization && (
                      <View>
                        <Text
                          className="text-xs font-medium mb-1"
                          style={{ color: currentColors.textSecondary }}
                        >
                          Organization
                        </Text>
                        <Text
                          className="text-sm"
                          style={{ color: currentColors.foreground }}
                        >
                          {userDetails.organization}
                        </Text>
                      </View>
                    )}

                    {userDetails.department && (
                      <View>
                        <Text
                          className="text-xs font-medium mb-1"
                          style={{ color: currentColors.textSecondary }}
                        >
                          Department
                        </Text>
                        <Text
                          className="text-sm"
                          style={{ color: currentColors.foreground }}
                        >
                          {userDetails.department}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>

              {/* Right Section - Dynamic Content */}
              <View className="flex-1">
                <View
                  className="flex-1 p-6 rounded-lg border"
                  style={{
                    backgroundColor: currentColors.card,
                    borderColor: currentColors.border,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 3,
                  }}
                >
                  {/* Dynamic Content Header */}
                  <View className="flex-row justify-between items-center mb-4">
                    <Text
                      className="text-lg font-bold"
                      style={{ color: currentColors.foreground }}
                    >
                      {dynamicContent.title}
                    </Text>
                    <View
                      className="px-3 py-1 rounded-full"
                      style={{ backgroundColor: currentColors.muted }}
                    >
                      <Text
                        className="text-xs font-medium capitalize"
                        style={{ color: currentColors.foreground }}
                      >
                        {dynamicContent.type}
                      </Text>
                    </View>
                  </View>

                  {/* Dynamic Content Body */}
                  <View className="flex-1">{renderDynamicContent()}</View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Export types for external use
export type { UserDetails, DynamicContent, DynamicModalProps };
