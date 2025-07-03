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
  UserAccountManagementScreen
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



/* 
  for user, admin, super-admin and system
*/

const pagenames = Object.keys(SCREEN_COMPONENTS).toString()


export const PAGEMIDDLEWARE = (pagename:string, user_accounttype: "admin" | "super-admin" | "system"): boolean =>{


  const user_accessible_page = []   // nothing

  const admin_accessible_page = ['dashboard', 'account-manager', 'budget-monitoring', 'financial-reports', "communication-support"]  

  const super_admin_accessible_page = ["audit-trail", ].concat(admin_accessible_page)


  const system_accessible_page = ["bulk-operations", "institution-management", "system-configuration", "communication-support", "document-approval"].concat(super_admin_accessible_page)

  // rules responser

  if (user_accounttype === 'admin') {
      let finder = admin_accessible_page.find((value)=> value === pagename)

      return finder === pagename
  }


  if (user_accounttype === 'super-admin') {
      let finder = super_admin_accessible_page.find((value)=> value === pagename)

      return finder === pagename
  }


    if (user_accounttype === 'system') {
      let finder = super_admin_accessible_page.find((value)=> value === pagename)

      return finder === pagename
  }


  return false

  



}