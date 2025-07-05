import { desc, eq } from "drizzle-orm";
import db from "../db";
import { Budget } from "./budget"
import { user, user_budget, user_data, user_transactions } from "../db/schema";
import { User, type transactionTypes } from "./user";


export class Admin{
    constructor(){

    }

    async registerBuget(budget: {budgetName: string, expenses: [] }, auth: any){
        const budgetObj = new Budget()        
        return budgetObj.register({budgetName: budget.budgetName, expenses: budget.expenses}, auth)
    }



    async admin(userid:any){
        let transaction;

        transaction = await db.query.user.findFirst({
            where: eq(user.userid, userid),
            with: {
                data: true,
                transactions: true
            }
        })

        return transaction
        
    }


    async OrganizationAccounts(organization_name:any){
        let transaction;

        let organization = await db.select().from(user_data)
        .where(eq(user_data.organization_name, organization_name))
        .as("organization");

        let organization_members = await db.select().from(user).leftJoin(organization, eq(user.userid, organization.id)).then((members)=>{
            let validMembers: typeof members = []
            if (members.length > 0) {
                members.forEach((member)=> {
                    if (member.organization !== null) {
                        validMembers.push(member)
                    }
                })

                return validMembers;
            }
            return validMembers;
            
        })        


        organization_members = organization_members.reverse()
        


        if (organization_members.length < 1) return { status: false, message: "No member found yet" }

        return { status: true, data: organization_members }


    }

    async organizationTransactions(organization_name:any){
        
        let transaction;

        // select members only
        let organization_members = await db.select().from(user_data)
        .where(eq(user_data.organization_name, organization_name))
        .as("organization");        
        
        // select members data
        let organization_transaction = await db.select().from(user_transactions).leftJoin(organization_members, eq(user_transactions.author, organization_members.id)).orderBy(desc(user_transactions.created_at))
        // uncomment this later
        .then((members)=>{
            let validMembers: typeof members = []
            if (members.length > 0) {
                members.forEach((member)=> {
                    // tailor output
                    "organization" in member ? delete member['organization']: ''
                    validMembers.push(member)

                })

                return validMembers
            }
            return validMembers;
        })  


        if (organization_transaction.length < 1) return { status: false, message: "No member found yet" }

        return { status: true, data: organization_transaction }        
    }


    // all members organization budget sort by status: pending|approved|declined
    async organizationBudgets(organization_name:any){
        
        let transaction;

        // select members only
        let organization_members = await db.select().from(user_data)
        .where(eq(user_data.organization_name, organization_name)).as("organization");

        // select members data
        let organization_budget = await db.select().from(user_budget).leftJoin(organization_members, eq(user_budget.userid, organization_members.id))
        .orderBy(desc(user_budget.created_at))
        

        if (organization_budget.length < 1) return { status: false, message: "No member found yet" }

        return { status: true, data: organization_budget }        
    }

    // return user with the selected activity
    async findMemberWithActivity(activityId: string, userid: string){
        let transaction;

        // find the user, then switch-case to know the requirement
        let pointedmember = await db.select().from(user).where(eq(user.userid, userid)).as("pointedmember")

        // select specific data
        let selected_transaction = await db.select().from(user_transactions).leftJoin(pointedmember, eq(user_transactions.id, activityId)).orderBy(desc(user_transactions.updated_at))


        if (selected_transaction.length < 1) return { status: false, message: "No member found yet" }

        
        return { status: true, data: selected_transaction }    


    }

    async findMemberWithBudgetAndAcitivity(userid: string){
        let transaction;
        
        transaction = await db.query.user.findFirst({
            where: eq(user.userid, userid),
            with:{
                data: true,
                transactions: true,
                budgets: true,
                banks: true
            },
            orderBy: desc(user.updated_at)
        })

        if (!transaction) return { status: false, message: "No member found yet" }

        
        return { status: true, data: transaction }

    }

    /* 
    Actions on budget and user: unit actions
    */

    async manageSelectedBudget(budgetId: string, status: 'pending'| 'approved'| 'declined'| 'deleted'){
        let transaction;
        let budgetObj = new Budget()

        transaction = await budgetObj.manage(budgetId, status)

        return transaction
    }
    /* 
    Actions on budget and user: bulk actions
    */

    async manageSelectedUser(userid: string, status: 'pending'| 'approved'| 'disabled'| 'deleted'){
        let transaction;
        let userObject = new User()

        transaction = await userObject.manage(userid, status)

        return transaction
    }


    // upgrade admin
    async upgrade(userid: string, role: "admin"|"superadmin"|"system"){
        let transaction;

        try {
            transaction = await db.update(user).set({
                accounttype: role
            }).where(eq(user.userid, userid))
            
            if (!transaction) return { status: false, message: "operation unsuccessful" }

            
            return { status: true, data: transaction }
                
        } catch (error) {
            return { status: false, message: "operation failed", error }
        }
    }

}