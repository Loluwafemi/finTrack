import fs, { readFileSync } from 'fs'
import { cwd } from 'process';
import { join } from 'path';
import { readFile, write, set_fs, utils, writeFile, read } from 'xlsx';
import type { WorkSheet, WorkBook } from 'xlsx';
import { list } from '@vercel/blob';




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
    receipt: receiptTemplate[],
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
    desc: string, expense: string, cost: string, bank: string, date: string
}

type receiptTemplate = {
    receiver: string,
    message: { title: string, text: receiptExpense, date: Date, bid: string },
    type: string,
    status: 'disabled'|'approved'|'deleted'|'pending',
    author: string,
    id: string,
    updated_at: Date,
    created_at: Date,
    deleted_at: Date
}


export const listBlob = async () => {

    try {
        const blobData = await list({ 
            token: process.env.FIGTRACK_READ_WRITE_TOKEN!,
        })
        return blobData.blobs
    } catch (error) {
        console.log("Error detected.");
        console.log("Error: ", error);
        return []
    }
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


        /* 
        Comment out before you deploy
        */
        try {
            set_fs(await import("fs"))
            // const workbook = readFile(join(cwd(), "template", "expense_report_template.xlsx"), { cellFormula: true });


            /* 
            Read template from link
            1. find the template from cloud if exist. then continue, 
            always remember to return a message for any cause
            */
           
            const streamableBlob = await listBlob()
            /* 
            find the elemeent that matches: report/expense_report_template.xlsx
            and return the url
            */
            const templateURL = streamableBlob.find((blob)=> blob.pathname === 'report/expense_report_template.xlsx')

            if(!templateURL) return { status: false, message: "Report resource missing. Kindly contact admin for support." }

            const file = await (await fetch(templateURL.url)).arrayBuffer();
            const workbook = read(file);


            
            const f_wsheetTable: WorkSheet = workbook.Sheets[workbook.SheetNames[0]]
            const s_wsheetTable: WorkSheet = workbook.Sheets[workbook.SheetNames[1]]

            // send them to function and save to new file/stream

            // let processed: EXCELJS.Workbook;
            workbook.SheetNames.forEach( async (sheet, index)=>{   

                let transaction;
                
                switch (sheet) {
                    case 'summary':
                        transaction = await this.writeToSummaryTable(data, workbook.Sheets[sheet])
                    break;

                    case 'express':
                        transaction = await this.writeToExpressTable(data, workbook.Sheets[sheet])
                    break;
                
                    default:
                    // pack everything and save in one place with a message
                    break;
                }
                
                // process and save
                writeFile(workbook, join(cwd(), 'template', 'output.xlsx'))
                
                // encode file for transmission



                    
            })
            
            const transmission = write(workbook, { type: 'base64', bookType: 'xlsx' })

            return { status: true, data:  transmission}
            
        } catch (error) {
            console.log("Error detection reading");
            console.log("Error: ", error);
            
        }
        
    
    }

    async LocalextractReport(data:rawReportTemplate, type: 'pdf'|'excel' = 'excel') {
        let userdata = this.auth


        /* 
        Comment out before you deploy
        */
        try {
            set_fs(await import("fs"))

            /* Find local template */
            const workbook = readFile(join(cwd(), "template", "expense_report_template.xlsx"), { cellFormula: true });
            
            const f_wsheetTable: WorkSheet = workbook.Sheets[workbook.SheetNames[0]]
            const s_wsheetTable: WorkSheet = workbook.Sheets[workbook.SheetNames[1]]

            // send them to function and save to new file/stream

            // let processed: EXCELJS.Workbook;
            workbook.SheetNames.forEach( async (sheet, index)=>{   

                let transaction;
                
                switch (sheet) {
                    case 'summary':
                        transaction = await this.writeToSummaryTable(data, workbook.Sheets[sheet])
                    break;

                    case 'express':
                        transaction = await this.writeToExpressTable(data, workbook.Sheets[sheet])
                    break;
                
                    default:
                    // pack everything and save in one place with a message
                    break;
                }
                
                // process and save
                writeFile(workbook, join(cwd(), 'template', 'output.xlsx'))
                
                // encode file for transmission



                    
            })
            
            const transmission = write(workbook, {
                type: 'base64',
                bookType: 'xlsx'
            })

            return { status: true, data:  transmission}
            
        } catch (error) {
            console.log("Error detection reading");
            console.log("Error: ", error);
            
        }
        
    
    }

    private async writeToSummaryTable(raw_data: rawReportTemplate, table:WorkSheet){
        const budget = raw_data.budgetInfo
        const expense_object:expenseTemplate[] = budget.expense?.expense_object
        const expense_composition:expenseTemplate[] = budget.expense?.expense_composition

        this.header.created = budget.created_at
        this.header.modified = budget.updated_at
        try {
            
            expense_object.forEach((data, index) => {
                const expense = data.expenseCategory
                const cost = Number(data.cost)
                const spent = cost - Number(expense_composition[index].cost)
                const balance = 0
                const date = budget.created_at.toString()

                const ws = utils.sheet_add_aoa(table, [
                    [1+index, date, expense, cost, Math.abs(spent), { t: "n", val: balance, f: `D${2 + index} - E${2 + index}` }]
                ], { origin: `A${2 + index}`, UTC: true, cellStyles: true, password: 'figtrack-enckey' , dense: true})

                // formatting
                ws[`D${2 + index}`].z = '"NGN "#,##0.00'
                ws[`E${2 + index}`].z = '"NGN "#,##0.00'
                ws[`F${2 + index}`].z = '"NGN "#,##0.00'

                // width size
                if (!ws['!cols']) ws['!cols'] = []
                ws['!cols'][1] = { width: 25 } 
                ws['!cols'][2] = { width: 30 }
                ws['!cols'][3] = { width: 30 }
                ws['!cols'][4] = { width: 30 }
                ws['!cols'][5] = { width: 30 } 
        });

        // make table add formatting

            return table
        } catch (error) {
            console.log("Error detected");
            console.log("Error: ", error);
            
        }
    }


    private async writeToExpressTable(raw_data: rawReportTemplate, table: WorkSheet){
        
        let receipts: receiptTemplate[] = raw_data.receipt
        const budget = raw_data.budgetInfo
        const expense_object:expenseTemplate[] = budget.expense?.expense_object
        
        this.header.created = budget.created_at
        this.header.modified = budget.updated_at

        // get all the sheet in the workbook

        /* 
        Receipt now contains receipt.message budgetid which is used to compare with the expense object
        If expense budget.bid === receipt.message.bid
        */
    
        
        try {
            let rowCount: number = 0

            receipts.forEach((receipt, index) => {
                

                if (receipt.message.bid === budget.budgetid) {
                /* 
                Every iteration. Scan into the budget object and find the cost using the category as a pointer and return just the cost, which goes through dynamic change from the cost for every express
                */
                let overdraft = {
                    status: "False",
                    amount: 0
                }

                const currentCategoryCost = (receipt:receiptTemplate):Number=>{
                        let assigned = 0

                        expense_object.forEach((expense, index) => {
                            if (expense.expenseCategory === receipt.message.text.expense) {
                                assigned = Number(expense.cost)
                                const cost = Number(receipt.message.text.cost)
                                if(cost > assigned) {
                                    overdraft.status = "True"
                                    overdraft.amount = Math.abs(assigned - cost)
                                }
                                assigned = assigned - cost
                                expense_object[index].cost = String(assigned)
                            }
                        });

                        return assigned
                }


                const date = String(receipt.created_at).toString()
                const expense = receipt.message.text.expense
                const cost = Number(receipt.message.text.cost)
                const desc = receipt.message.text.desc
                const balance = currentCategoryCost(receipt)
                const bank = receipt.message.text.bank
                const receiptDate = receipt.message.text.date

                const ws = utils.sheet_add_aoa(table, [
                    [1+rowCount, date, expense, desc, cost, balance, overdraft.amount, receiptDate, bank]
                ], { origin: `A${2 + rowCount}`, UTC: true, cellStyles: true, password: 'figtrack-enckey', dense: false,  })

                
                // formatting
                ws[`E${2 + rowCount}`].z = '"NGN "#,##0.00'
                ws[`F${2 + rowCount}`].z = '"NGN "#,##0.00'
                ws[`G${2 + rowCount}`].z = '"NGN "#,##0.00'

                // width size
                if (!ws['!cols']) ws['!cols'] = []

                ws['!cols'][1] = { width: 25 } 
                ws['!cols'][2] = { width: 40 } 
                ws['!cols'][3] = { width: 30 }
                ws['!cols'][4] = { width: 30 }
                ws['!cols'][5] = { width: 30 }
                ws['!cols'][6] = { width: 30 }
                ws['!cols'][7] = { width: 30 }
                ws['!cols'][8] = { width: 60 }

                ++rowCount
            }

            });



            return table
        } catch (error) {
            console.log("Error detected");
            console.log("Error: ", error);
        }
        

    }
    

}
