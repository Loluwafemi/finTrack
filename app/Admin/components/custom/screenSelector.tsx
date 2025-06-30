import { Icon } from "@roninoss/icons";
import {
  AuditTrailScreen,
  BulkDocumentOperationScreen,
  CommunicationSupportScreen,
  DocumentApprovalScreen,
  FinancialReportsScreen,
  GrantMonitoringScreen,
  InstitutionManagementScreen,
  ReceiptProcessingScreen,
  SystemConfigurationScreen,
  TransactionMonitoringScreen,
  UserAccountManagementScreen,
} from "../../components/nativewindui/AdminSkeletonScreens";
import { SKELETON_SCREEN_META } from "./screenMeta";

const SCREEN_COMPONENTS = {
  dashboard: UserAccountManagementScreen,
  "account-manager": TransactionMonitoringScreen,
  "budget-monitoring": GrantMonitoringScreen,
  "financial-reports": FinancialReportsScreen,
  "receipt-processing": ReceiptProcessingScreen,
  "document-approval": DocumentApprovalScreen,
  "audit-trail": AuditTrailScreen,
  "bulk-operations": BulkDocumentOperationScreen,
  "institution-management": InstitutionManagementScreen,
  "system-configuration": SystemConfigurationScreen,
  "communication-support": CommunicationSupportScreen,
};

export const SKELETON_SCREENS = SKELETON_SCREEN_META.map((meta) => ({
  ...meta,
  component: SCREEN_COMPONENTS[meta.id as keyof typeof SCREEN_COMPONENTS],
}));
