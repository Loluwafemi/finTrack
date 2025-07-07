import EXCELJS from 'exceljs';
import fs from 'fs'
import { dirname } from 'path';



/* 
Note: the system generates two worksheet, one for the summary report which follows the reseach template, the other is a comprehensive report which shows how each expenses-awarded is spent over the time.
*/



type ExcelHeaderTemplate = {
    creator: string,
    lastModifiedBy: string,
    created: Date,
    modified: Date,
    lastPrinted: Date
}

export type AuthenticationTemplate = {
id: number,
userid: string,
username: string,
firstname: string,
lastname: string,
email: string,
status: 'disabled'|'approved'|'deleted'|'pending',
accounttype: 'user'|'admin'|'superadmin'|'system',
updated_at: Date,
created_at: Date,
deleted_at: Date,
data: {
id: string,
organization: 'personal'|'institution'|'Institution'|null,
organization_name: string|null,
data: {
    bank_name: string|any,
    bank_account_name: string|any,
    bank_account_number: string|any
} | any
}
}

type rawReportTemplate = {
    receipt: object[],
    budgetInfo: {
      userid: string,
      id: number,
      budgetid: string,
      budgettitle: string,
      budgetname: string,
      status: 'disabled'|'approved'|'deleted'|'pending',
      approvedby: string,
      updated_at: Date,
      created_at: Date,
      deleted_at: Date,
      expense: object[]
    }
}

type expenseTemplate = {
    expenseCategory: string,
    cost: string
}

type receiptExpense = {
    desc: string, expense: string, cost: string
}

type receiptTemplate = {
    receiver: string,
    message: { title: string, text: receiptExpense, date: Date },
    type: string,
    status: 'disabled'|'approved'|'deleted'|'pending',
    author: string,
    id: string,
    updated_at: Date,
    created_at: Date,
    deleted_at: Date
}




export class ReportGenerator{
    private auth: any
    private header: ExcelHeaderTemplate
    private data: any
    constructor(auth:AuthenticationTemplate){
        this.auth = auth

        // automatically use auth to configure header and footer
        this.header = {
            created: new Date(),
            creator: auth.firstname,
            lastModifiedBy: auth.firstname,
            lastPrinted: new Date(),
            modified: new Date()
        }

        

    }


    // use raw report generating
    async extractReport(data:rawReportTemplate, type: 'pdf'|'excel' = 'excel') {
        let userdata = this.auth
        // do all data extraction here
        const workbook = new EXCELJS.Workbook()
        const boilerPlate = await workbook.xlsx.readFile('./template/ExpenseReport.xlsx')


        boilerPlate.eachSheet( async (shet, index)=>{            
            if (shet.name == 'Expense Report') {

            const sheetOneGeneration = await this.generateSummaryReport(data, shet)
                
            }

            if (shet.name == "Expense Express") {
                const sheetTwoGeneration = await this.generateComprehensiveReport(data, shet)
                
            }
                
        })

       const processReport = await boilerPlate.xlsx.writeFile('./template/sample.xlsx');


       const sample = await boilerPlate.xlsx.writeBuffer({ filename: 'processed.xlxs'});

    //     // return as blob data -b64        

        // const myBlob: Blob = new Blob([sample], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });  
                
    
        // let cleaning:any = await myBlob.arrayBuffer()
        // cleaning = Buffer.from(cleaning)


        console.log(sample);

        return { status: true, data:  sample}
        }


    private async generateSummaryReport(raw_data: rawReportTemplate, sheet: EXCELJS.Worksheet){
        const receipts = raw_data.receipt
        const budget = raw_data.budgetInfo
        const expense_object = budget.expense?.expense_object
        const expense_composition = budget.expense?.expense_composition

        this.header.created = budget.created_at
        this.header.modified = budget.updated_at

        let allExpense: expenseTemplate[] = expense_object
        let allSpent: expenseTemplate[] = expense_composition
       
        // RUN ITERATION THROUGH THIS CALL, WHILE POSITION KEEPS ADDING UP BY DATA INDEX

        // const selectedTable = sheet.getTable('Table1')
        // selectedTable/

        
        
        
        

        allExpense.forEach((data, index) => {

            const spent = allSpent[index].cost
            const indexi = (allExpense.length) 

            let editableRow = sheet.addRow( [++index, data.expenseCategory, Number(data.cost), Number(spent)])

        });

       

        

        // REMEMBER TO COMMIT AFTER
    }

    private async generateComprehensiveReport(raw_data: rawReportTemplate, sheet: EXCELJS.Worksheet){
        
        let receipts: receiptTemplate[] = raw_data.receipt
        receipts = receipts.reverse()
        const budget = raw_data.budgetInfo
        const expense_object = budget.expense?.expense_object

        this.header.created = budget.created_at
        this.header.modified = budget.updated_at

        let allExpense: expenseTemplate[] = expense_object
        // get all the sheet in the workbook
    
        
        receipts.forEach((receipt, index) => {


            const date = receipt.created_at
            const expense = receipt.message.text.expense
            const cost = Number(receipt.message.text.cost)
            const desc = receipt.message.text.desc

            sheet.addRow([++index, date, expense, desc, cost])


            sheet.commit
        
        });
        

    }
    

}
