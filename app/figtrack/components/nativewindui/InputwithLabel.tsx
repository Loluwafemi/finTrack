import { useState } from "react"
import { Text, TextInput, View } from "react-native";



export const InputWithLabel = ()=>{
    const [text, setText] = useState('');

    return (

        <View>
            <Text className="text-[16px] mb-[5px]">Title: </Text>
            <TextInput
                className="border-w-1 border-grey-500 p-[10px] rounded-sm"
                value={text}
                // onChange={setText}
                placeholder="Label"
            />
        </View>
    );
}