import { useEffect, useState } from "react";
import { SelectList } from "react-native-dropdown-select-list";
import { budgetList } from "~/lib/func/tailored";
// import { budgetList } from "~/lib/func/tailored";



export default function GrantDropList({innerEvent, userGrant, validation = null}: {userGrant:budgetList[], validation: any|null, innerEvent: Function}) {

    const [userGrantList, setList] = useState([])

    useEffect(()=>{
        setList(userGrant)
    })


    return (
        <SelectList
        placeholder="Select Budget" 
        setSelected={(val) => {
            if (validation) {
                validation.setFieldTouched('budget', true)
                validation.setFieldValue('budget', val)
            }
            
            userGrantList.forEach(budget => {
                if (budget.key === val) {
                    innerEvent(budget.bid)

                }
            });



        }} 
        data={userGrantList} 
        save="key"
/>
    );
}