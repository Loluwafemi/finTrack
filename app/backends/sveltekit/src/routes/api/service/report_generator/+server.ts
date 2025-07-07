import { REQUESTAUTHENTICATOR } from '$lib/index.server';
import { User } from '$lib/server/models/user';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { ReportGenerator, type AuthenticationTemplate } from '$lib/gen/processor';

export const POST: RequestHandler = async (event) => {

    REQUESTAUTHENTICATOR(event)

    // sender: sender user id
    const {auth, data} = await event.request.json()
    
    // return object with status and message
    
    const user = new User()
    const findUserByID = await user.find(auth.userid)

    const validate = await user.validate(auth.email, data.password)


    // validate the user with password

    
    if (!findUserByID.status || !validate) return json({status: false, message: "Invald Credentails, Enter valid password"})
    
    const reports = await user.getAllBudgetData(data.budget_id, auth.userid)

    if(!reports.status) return json({ status: false, message:  reports.message})

    const currentUser:AuthenticationTemplate = findUserByID.data
    
    const workingReport = reports.data

    const prepareReport = new ReportGenerator(currentUser)

    let generateReport = await prepareReport.extractReport(workingReport)
    


    return json({status: true, message: "Report has been generated. Kindly check your folder [storage/expTracker/report] to retrieve your report", data: generateReport.data})

    
};
