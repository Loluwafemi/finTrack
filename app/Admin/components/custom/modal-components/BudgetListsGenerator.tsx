import { User } from "@/lib/auth";
import { useEffect, useState } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";


/* 

approvedby: "none"
budgetid: "e9e33a94-f73a-4797-93af-e5c940e84aa6"
budgetname: "Tournament [Red Bull]"
budgettitle: "Zero Budget"
created_at: "2025-06-26T16:10:54.911Z"
deleted_at: null
id: 10
status: "pending"
updated_at: null


*/

interface budgetObjectType {
    approvedby: string | null,
    budgetid: string | null,
    budgetname: string | null,
    budgettitle: string | null,
    created_at: string | null,
    status: string | null,
    updated_at: string | null
}


interface expensesStructure {
    
}

interface expenseObjectStructure {
    expense_composition: [], expense_object: []
}



export const BudgetLists = ({budgetObject}: { budgetObject: budgetObjectType })=>{

    const [ getbudgetExpenses, setExpenses ] = useState<expenseObjectStructure| []>({
        expense_composition: [],
        expense_object: []
    })
    const userObject = new User()
    useEffect(()=> {
        const generateExpense = async () => {
            const transaction = await userObject.getMembersExpensesFromBudget(budgetObject.budgetid)
        
            setExpenses(transaction.expense)
            
        }

        generateExpense()
    }, [])
    
    // manage Budget
    const [ budgetManageObj, setbudgetManageObj ] = useState<{budget_id: string | null , status: "pending" | "approved" | "declined" | "deleted" | null}>({ budget_id: null, status: null })

    const ManageSelectedBudget = async (budget_id:string, status: "pending" | "approved" | "declined" | "deleted") => {

        if (budgetManageObj?.budget_id !== null, budgetManageObj?.status !== null) {
            const transaction = await userObject.ManageSelectedBudget(budget_id, status)
            setbudgetManageObj({
                budget_id: null,
                status: null
            })

            console.log(transaction);            
        }
        // set notification after both

    }

    // displays Budget name, title
    return (
            <TouchableHighlight className="w-full flex-col flex p-4 border border-black-400 mb-2 shadow-lg rounded-lg">
                <View>
                    <View>
                        <Text className="text-lg">{budgetObject.budgetname} {">>"} { budgetObject.budgettitle } </Text>
                    </View>
                    <View className="flex-row justify-between">
                            <View className="my-3">
                                <View className="flex flex-row">
                                <Text className="text-md">
                                    status: <Text className="bg-gray-300 p-1 rounded">{budgetObject.status}</Text>
                                </Text>

                                <Text className="text-md mx-4">
                                    approved by?: <Text className="bg-gray-300 p-1 rounded">{budgetObject.approvedby}</Text>
                                </Text>
                            </View>

                            <View className="flex flex-row mt-2">
                                <Text className="text-md">
                                    created at: <Text className="bg-gray-300 p-1 rounded">{budgetObject.created_at}</Text>
                                </Text>

                                <Text className="text-md mx-4">
                                    last modified at: <Text className="bg-gray-300 p-1 rounded">{budgetObject.updated_at}</Text>
                                </Text>
                            </View>
                            </View>
                            <View>
                                <Text className="text-lg font-bold">
                                   Manage Budget
                                </Text>

                                {/* 
                                "pending" | "approved" | "declined" | "deleted"
                                */}
                                <SelectList
                                    onSelect={async () => {
                                        return await ManageSelectedBudget(budgetManageObj?.budget_id!, budgetManageObj?.status!)
                                    }}
                                    data={[
                                        {key: "declined", value: "declined"},
                                        {key: "approved", value: "approved"},
                                        {key: "deleted", value: "deleted"},
                                        {key: "pending", value: "pending"},
                                    ]}
                                    save="value"

                                    setSelected={(value: "pending" | "approved" | "declined" | "deleted")=> setbudgetManageObj({budget_id: budgetObject.budgetid!, status: value})}
                                    />
                            </View>
                    </View>
                    {/* Display content */}
                    <View className="p-3 mt-3 border border-black flex flex-row justify-between bg-gray-200">
                    {/* display two list composition and object as requested and current */}
                        <View className="flex flex-col items-center justify-center">
                        <Text className="text-lg">Requested</Text>
                        <table>
                            <thead>
                                <tr>
                                    <th className="text-sm">Expense</th>
                                    <th className="text-sm">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getbudgetExpenses.expense_object.map((expense, index)=> (
                                    <ExpenseTableRow key={index} expense={expense} />
                                ))}
                            </tbody>
                        </table>
                        </View>

                        <View className="flex flex-col items-center justify-center">
                        <Text className="text-lg">Current</Text>
                        <table>
                            <thead>
                                <tr>
                                    <th className="text-sm">Expense</th>
                                    <th className="text-sm">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getbudgetExpenses.expense_composition.map((expense, index)=> (
                                    <ExpenseTableRow key={index} expense={expense} />
                                ))}
                            </tbody>
                        </table>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
    );
}


const ExpenseTableRow = function ({expense}: { expense: {cost: string, expenseCategory: string} }) {
    
    return (
    <tr>
        <td className="border border-black" p-2>{expense.expenseCategory}</td>
        <td className="border border-black" p-2>{expense.cost}</td>
    </tr>
    )
}