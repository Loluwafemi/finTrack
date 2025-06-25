import { SelectList } from "react-native-dropdown-select-list";

export default function BudgetExpenseDropList({ExpensesFromBudget, selectedBudget}) {
    
    const ListOfBudget:[] = ExpensesFromBudget


    return (
        <SelectList
        placeholder="Select Budget Category" 
        setSelected={(val) => {
            selectedBudget(val)
        }
        } 
        data={[
            {key:'Transportation', value:'Transportation', disabled: false},
            {key:'Publishing', value:'Publishing', disabled: false},
            {key:'Custom', value:'Custom'}
        ]} 
        save="value"
/>
    );
}



const budgetCategory = [
            {key:'Couples Budget', value:'Couples Budget', disabled: false},
            {key:'Grocery Budget', value:'Grocery Budget', disabled: false},
            {key:'Zero Budget', value:'Zero Budget'},
            {key:'Startup Budget', value:'Startup Budget'},
            {key:'Trade Show Budget', value:'Trade Show Budget'},
            {key:'Film Budget', value:'Film Budget'},
            {key:'Grant Budget', value:'Grant Budget'},
            {key:'Vacation Budget', value:'Vacation Budget'},
            {key:'Sales Budget', value:'Sales Budget'},
            {key:'Project Budget', value:'Project Budget'},
            {key:'IT Budget', value:'IT Budget'},
            {key:'Clinical Budget', value:'Clinical Budget'},
            {key:'Moving Budget', value:'Moving Budget'},
            {key:'Custom', value:'CUstom'}
        ]
    
// add expense to each registered category


const CouplesBudget = [
    {key: "Transportation", value: "Transportation"},
    {key: "Reception", value: "Reception"},
    {key: '', value: ''},
    {key: '', value: ''},
    {key: '', value: ''},
]
