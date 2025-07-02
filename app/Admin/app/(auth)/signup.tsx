import OrganizationList from "@/components/custom/organizationList";
import { User } from "@/lib/auth";
import { signupSchema } from "@/lib/auth/schema";
import { Label } from "@react-navigation/elements";
import { router } from "expo-router";
import { Formik } from "formik";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import '~/global.css';
import { useColorScheme } from "~/lib/useColorScheme";
import { getRoute } from "~/src/constants/routes";
import { COLORS } from "~/theme/colors";


/**
 * Dashboard Index Screen
 *
 * This is the main entry point for the admin dashboard.
 * Currently showing "Coming Soon" message while preserving the original styling and layout.
 *
 * The screen is fully responsive and adapts to both light and dark themes.
 */
export default function AuthenticationIndex() {
  const { isDarkColorScheme } = useColorScheme();
  const currentColors = isDarkColorScheme ? COLORS.dark : COLORS.light;

  return (
    <View
      style={[styles.container, { backgroundColor: currentColors.background }]}
    >
      <View
        style={[
          styles.comingSoonContainer,
          { backgroundColor: currentColors.background },
        ]}
      >
        {/* start here */}
        <Text
          style={[styles.comingSoonTitle, { color: currentColors.foreground }]}
        >
          Get started
        </Text>
          {/* Header Login */}
          <Formik
          initialValues={{
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            number: '',
            organization: '',
            organization_name: '',
            invitation_key: ''
          }}

          onSubmit={async (values, {setErrors})=>{
              const userObject = new User()
              let transaction = await userObject.create(values)
              if(transaction.status) return router.navigate(getRoute('AUTH'))
              
              await setErrors({firstname: "Try again"})
          }}
          validationSchema={signupSchema}
          >
            {({values, handleBlur, handleChange, handleSubmit, errors, setFieldTouched, setFieldValue})=>(
              <View className="flex flex-col w-[350px]">
              {/* Form for email password */}
              <View className="flex flex-row items-center justify-center m-2">
                <View className="flex flex-col items-start mx-1 w-full">
                  <Label>First Name: </Label>
                  <TextInput 
                  className="px-[10px] py-[10px] border border-black w-full"
                  onChangeText={handleChange('firstname')}
                  onBlur={handleBlur('firstname')}
                  value={values.firstname}
                  />
                  {errors.firstname? <Text className="text-red-800 text-xs font-bold">{errors.firstname}</Text>: <Text></Text>}
                </View>

                <View className="flex flex-col items-start mx-1 w-full">
                  <Label>Last Name: </Label>
                  <TextInput
                  className="px-[10px] w-full py-[10px] border border-black"
                  onChangeText={handleChange('lastname')}
                  onBlur={handleBlur('lastname')}
                  value={values.lastname}
                  />
                  {errors.lastname? <Text className="text-red-800 text-xs font-bold">{errors.lastname}</Text>: <Text></Text>}
                </View>
              </View>
        
              <View className="flex flex-row items-center justify-center m-2">
                <View className="flex flex-col items-start mx-1 w-full">
                  <Label>Email: </Label>
                  <TextInput inputMode="email" placeholder="joe@email.com" className="px-[10px] py-[10px] border border-black w-full"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  />
                  {errors.email? <Text className="text-red-800 text-xs font-bold">{errors.email}</Text>: <Text></Text>}
                </View>

                <View className="flex flex-col items-start mx-1 w-full">
                  <Label>Phone Number: </Label>
                  <TextInput inputMode="text" placeholder="+234 xxxx xxxxx"
                  className="px-[10px] w-full py-[10px] border border-black"
                  onChangeText={handleChange('number')}
                  onBlur={handleBlur('number')}
                  value={values.number}
                  />
                  {errors.number? <Text className="text-red-800 text-xs font-bold">{errors.number}</Text>: <Text></Text>}
                </View>
              </View>

              <View className="flex flex-row items-center justify-center m-2">
                <View className="flex flex-col items-start mx-1 w-full">
                  <Label>Password: </Label>
                  <TextInput inputMode="text" placeholder="*********" className="px-[10px] py-[10px] border border-black w-full"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}

                  />
                  {errors.password? <Text className="text-red-800 text-xs font-bold">{errors.password}</Text>: <Text></Text>}
                </View>
              </View>

              <View className="flex flex-row items-center justify-center m-2">
                <View className="flex flex-col items-start mx-1 w-full">
                  <Label>Organization: </Label>
                  {/* make sure to feed in all registered organizations from db */}
                  <OrganizationList validation={{setFieldTouched, setFieldValue}} organizationList={[]} />
                  {errors.organization && errors.organization_name? <Text className="text-red-800 text-xs font-bold">{errors.organization}</Text>: <Text></Text>}
                </View>

                <View className="flex flex-col items-start mx-1 w-full">
                  <Label>Organization Invitation Key: </Label>
                  <TextInput 
                  onChangeText={handleChange('invitation_key')}
                  onBlur={handleBlur('invitation_key')}
                  value={values.invitation_key}
                  placeholder="optional"
                  className="px-[10px] w-full py-[10px] border border-black"
                />
                </View>
              </View>

            <button
                className="bg-white border-black border-2 p-2 text-black rounded mt-1"
                type="submit"
                onClick={(e)=> handleSubmit(e)}>
                    Signup
            </button>



            <View className="mt-4">
            <Text>
              Already have an account? Login now.
            </Text>

            <button
                className="bg-black p-2 text-white rounded mt-1"
                onClick={()=>{
                    router.navigate(getRoute('AUTH'));
                }}>
                    Login
            </button>

            </View>
              </View>
            )}
          </Formik>


        {/* end here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  comingSoonContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    borderColor: 'black',
  },
  comingSoonTitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  comingSoonSubtitle: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.7,
  },
});
