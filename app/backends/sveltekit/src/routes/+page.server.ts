import { redirect, type Actions } from "@sveltejs/kit";
import { User } from "$lib/server/models/user";
import { createSession, deleteSessionTokenCookie, generateSessionToken, setSessionTokenCookie } from "$lib/server/auth";
import { Admin } from "$lib/server/models/admin";
import type { PageServerLoad } from "./$types";
import { Budget } from "$lib/server/models/budget";
import { put } from '@vercel/blob';
import { listBlob } from "$lib/gen/processor";


export const prerender = false;

export const load: PageServerLoad = async (event) => {
    
    // const budgets = new Budget()
    // let allBudget = await budgets.templates()   
    
    // // console.log(allBudget);

    
    return {
        // registeredBudget: allBudget,
        values: await listBlob()
    }
};


export const actions: Actions = {
    create: async ({ request }) => {
        const form = await request.formData()
        const username = form.get('firstname')?.toString()[0] + "_" + form.get('lastname')
        const formData = {
            firstname: form.get('firstname'),
            lastname: form.get('lastname'),
            username: username,
            email: form.get('email'),
            password: form.get('password')
        }

        // insert to db but cleans first use superform schema
        const UserModel = new User()

        let transactions = await UserModel.create( { ...formData } )
    },
    delete: async ({ request }) => {
        const form = await request.formData()
        const userid = form.get('userid')

        const UserModel = new User()

        let transaction = await UserModel.remove(userid)
        return transaction
    },
    login: async (event) => {
        const form = await event.request.formData()
        const formData = {
            email: form.get('email'),
            password: form.get('password')
        }

        const UserModel = new User()
        let transaction:any = await UserModel.users(formData.email)
        if (!transaction){
            console.log("authentication error");
            return ''
        }
        
        
        const token = generateSessionToken();
        const session = await createSession(token, transaction.userid);
        setSessionTokenCookie(event, token, session.expiresAt);
        
        return

    },
    logout: async (event) => {
        console.log(event);
        
        if (!event.locals.user) return
        deleteSessionTokenCookie(event)
        return redirect(301, '/')
    },
    addBuget: async (event) => {
        const form = await event.request.formData()
        const budgetFormStructure = JSON.parse(form.get('budgets'))

        const formData = {
            title: budgetFormStructure.title,
            type: budgetFormStructure.name,
            expenses: budgetFormStructure.expenses
        }

        const userObj = new User()
        const auth = await event.locals.user
        let transaction = await userObj.addBudget(formData, auth)


        return
        
    },

    registerBudget: async (event) => {
        const form = await event.request.formData()

        const formData = {
            budgetName: form.get('budgetType'),
            expenses: form.getAll('expenses')
        }
        let transaction;

        const admin = new Admin()
        const auth = await event.locals.user
        transaction = await admin.registerBuget(formData, auth)

    },

    updateTemplate: async (event) => {
        const form = await event.request.formData()

        try {        
            const file = form.get('template') as File;

            if (!file.name) return {  status: false }
            const blob = await put(`report/${file.name}`, file, {
            access: 'public',
            allowOverwrite: true,
            token: process.env.FIGTRACK_READ_WRITE_TOKEN!
            });
        } catch (error) {
            console.log("Error: ", error);
            
        }
                
    }
    
};

