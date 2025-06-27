import { SelectList } from "react-native-dropdown-select-list";



export default function GrantPendList({userGrantSpend, validation}) {
    
    return (              
            
        <SelectList 
            placeholder="Select Budget Expense"
            setSelected={(val) => {
                validation.setFieldTouched('expense', true)
                validation.setFieldValue('expense', val)
                console.log(validation.values);
            }}
            data={userGrantSpend} 
            save="key"
        />
            );
}