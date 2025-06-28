import { Icon } from '@roninoss/icons';
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
} from '../../components/nativewindui/AdminSkeletonScreens';


<Icon name='chart-pie' /> 

export const SKELETON_SCREENS = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: "chart-timeline-variant",
      component: UserAccountManagementScreen,
      description: "Monitor and track all transactions",
    },
    {
      id: "account-manager",
      title: "Manage Accounts",
      icon: "account-circle-outline",
      component: TransactionMonitoringScreen,
      description: "Manage organization accounts",
    },
    {
      id: "budget-monitoring",
      title: "Budget Monitoring",
      icon: "note-text-outline",
      component: GrantMonitoringScreen,
      description: "Track and manage budget applications",
    },
    {
      id: "financial-reports",
      title: "Financial Reports",
      icon: "chart-pie",
      component: FinancialReportsScreen,
      description: "Generate comprehensive financial reports",
    },
    {
      id: "receipt-processing",
      title: "Receipt Processing [system users only]",
      icon: "file-document",
      component: ReceiptProcessingScreen,
      description: "Process and validate receipt submissions",
    },
    {
      id: "document-approval",
      title: "[Remove this] Document Approval [make it a modal]",
      icon: "check-circle",
      component: DocumentApprovalScreen,
      description: "Review and approve pending documents",
    },
    {
      id: "audit-trail",
      title: "Audit Trail [FOR SUPER ADMINS ONLY TO CHECK PENDING ORGANIZATION / INSTITUTION AUDIT FOR NEW BUDGET REMOVE THIS TEXT WHEN DONE !]",
      icon: "magnify",
      component: AuditTrailScreen,
      description: "Track system activities and compliance",
    },
    {
      id: "bulk-operations",
      title: "Bulk Document Operations [system user only]",
      icon: "layers-triple",
      component: BulkDocumentOperationScreen,
      description: "Perform batch operations on documents",
    },
    {
      id: "institution-management",
      title: "Institution Management [for super admin only. to manage an institution admin accounts]",
      icon: "office-building",
      component: InstitutionManagementScreen,
      description: "Manage partner institutions",
    },
    {
      id: "system-configuration",
      title: "System Configuration [system user only]",
      icon: "cog",
      component: SystemConfigurationScreen,
      description: "Configure system-wide settings",
    },
    {
      id: "communication-support",
      title: "Communication & Support",
      icon: "message-text",
      component: CommunicationSupportScreen,
      description: "Manage communications and support [all admin]",
    },
  ];