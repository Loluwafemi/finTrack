import { User } from "@/lib/auth";
import { useColorScheme } from "@/lib/useColorScheme";
import { getRoute } from "@/src/constants/routes";
import { COLORS } from "@/theme/colors";
import { Icon } from "@roninoss/icons";
import { router } from "expo-router";
import { Formik } from "formik";
import { Text, TouchableHighlight, View } from "react-native";

export default function UserInformationDisplayer({ data }: any) {
  const { isDarkColorScheme } = useColorScheme();
  const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;
  const userObject = new User()

  const user = data
  
    return (

        <View
        className="px-4 py-2 border-t flex-row items-center justify-between"
        style={{
          borderTopColor: currentColors.border,
          backgroundColor: currentColors.card,
        }}
        >

            <Text
            className="text-gray-700"
            > { user?.data?.organization } | { user?.data?.organization_name }
            
            <Text className="py-1 px-4 mx-4 bg-blue-500 rounded-xl text-white">{ data.accounttype }</Text>
            </Text>
            
            {/* <Text className="px-2 py-1 mx-4 bg-green-500 rounded text-white">super -admin</Text> */}
            {/* <Text className="px-2 py-1 mx-4 bg-red-500 rounded text-white">system</Text> */}
            <Formik 
              onSubmit={async ()=>{
                let transaction = await userObject.logout()
                if(transaction.status) return router.navigate(getRoute('AUTH'));
              }}
              initialValues={{}}

            >{({handleSubmit})=>(
              <TouchableHighlight
                onPress={(e)=>{handleSubmit(e)}}
                >
                  <View className="items-center bg-red-800 mx-2 flex flex-row py-1 px-4 rounded-xl">
                  <Text
                  className="text-xs mx-2 text-white"
                  // style={{ color: currentColors.textSecondary }}
                  >
                  Logout
                  </Text>
                  <Icon color="white" namingScheme="material" size={18} name="chevron-right-circle-outline" />
              </View>
              </TouchableHighlight>
              )}


            </Formik>
        </View>
    );
}