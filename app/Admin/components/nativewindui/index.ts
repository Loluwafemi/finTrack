import { ReportsScreen, SystemSettingsScreen } from './AdminScreens';
import { AuditTrailScreen, BulkDocumentOperationScreen, CommunicationSupportScreen, DocumentApprovalScreen, FinancialReportsScreen, GrantMonitoringScreen, InstitutionManagementScreen, ReceiptProcessingScreen, SystemConfigurationScreen, TransactionMonitoringScreen, UserAccountManagementScreen } from './AdminSkeletonScreens';

// Export all admin skeleton screen components
export {
  UserAccountManagementScreen,
  TransactionMonitoringScreen,
  GrantMonitoringScreen,
  FinancialReportsScreen,
  ReceiptProcessingScreen,
  DocumentApprovalScreen,
  AuditTrailScreen,
  BulkDocumentOperationScreen,
  InstitutionManagementScreen,
  SystemConfigurationScreen,
  CommunicationSupportScreen,
} from './AdminSkeletonScreens';

// Export existing components
export { ReportsScreen, SystemSettingsScreen } from './AdminScreens';
export { AdminTopNav } from './AdminTopNav';
export { TopNav } from './TopNav';

// Component mapping for easy navigation
export const ADMIN_SCREEN_COMPONENTS = {
  'user-account-management': UserAccountManagementScreen,
  'transaction-monitoring': TransactionMonitoringScreen,
  'grant-monitoring': GrantMonitoringScreen,
  'financial-reports': FinancialReportsScreen,
  'receipt-processing': ReceiptProcessingScreen,
  'document-approval': DocumentApprovalScreen,
  'audit-trail': AuditTrailScreen,
  'bulk-document-operation': BulkDocumentOperationScreen,
  'institution-management': InstitutionManagementScreen,
  'system-configuration': SystemConfigurationScreen,
  'communication-support': CommunicationSupportScreen,
  'reports': ReportsScreen,
  'system-settings': SystemSettingsScreen,
} as const;

export type AdminScreenKey = keyof typeof ADMIN_SCREEN_COMPONENTS;