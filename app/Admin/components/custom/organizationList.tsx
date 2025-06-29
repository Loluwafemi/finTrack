
import { StyleSheet } from 'nativewind';
import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list';



export default function OrganizationList({ organizationList, validation }: {organizationList: {}, validation: null|any}) {
    const [selected, setSelected] = React.useState<null | string>("");
    const [category, selectedCategory ] = React.useState('')

    const data = [
        {key:'1', value:'Federal University Of Agriculture', category: 'Institution'},
        {key:'2', value:'Micro Finance Banking', category: 'Business'},
    ]

    return (

        <SelectList  
            boxStyles={style.boxShadow} 
                     
            setSelected={(val) => {
                setSelected(val)
                // find the category of selected key
                data.forEach((value, index)=>{
                    if(val == value.value){
                        selectedCategory(value.category)
                    }
                })                
            }}
            onSelect={()=> {                
                if (validation !== null && selected !== null) {
                    validation.setFieldTouched('organization_name', true)
                    validation.setFieldValue('organization_name', selected)
                    validation.setFieldTouched('organization', true)
                    validation.setFieldValue('organization', category)
                }
            }}
            data={data}
            save="value"
        />

    );
}

const style = StyleSheet.create({
    boxShadow: {
        boxShadow: '0'
    }
})