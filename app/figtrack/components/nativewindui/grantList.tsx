import { SelectList } from "react-native-dropdown-select-list";



export default function GrantDropList({userGrant, validation = null}: {userGrant: any, validation: any|null}) {
    
    return (
        <SelectList
        placeholder="Select Budget" 
        setSelected={(val) => {
            if (validation) {
                validation.setFieldTouched('budget', true)
                validation.setFieldValue('budget', val)
                console.log(validation.values);
            }
            console.log(val);
            
            
        }} 
        data={[
            {key:'Enox Grant', value:'Enox Grant', disabled: false},
            {key:'Green Pact', value:'Green Pact', disabled: false},
            {key:'Konbil National Grant', value:'Konbil National Grant'},
        ]} 
        save="key"
/>
    );
}