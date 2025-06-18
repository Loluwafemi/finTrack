import { SelectList } from "react-native-dropdown-select-list";



export default function GrantDropList({userGrant, validation}) {
    
    return (
        <SelectList
        placeholder="Select Budget" 
        setSelected={(val) => {
            validation.setFieldTouched('budget', true)
            validation.setFieldValue('budget', val)
            console.log(validation.values);
            
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