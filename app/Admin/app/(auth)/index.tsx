import { User } from "@/lib/auth";
import { loginSchema } from "@/lib/auth/schema";
import { Label } from "@react-navigation/elements";
import { router } from "expo-router";
import { Formik } from 'formik';
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
  const userObject = new User()
  return (
      <Formik
      initialValues={{
        email: '',
        password: ''
      }}

      onSubmit={async (value, {setErrors, resetForm})=>{
        let transaction = await userObject.login(value)

        console.log(transaction);
        
        if (!transaction.status) {
          resetForm()
          return setErrors({email: '', password: 'Invalid Credentials!'})
        }
        return router.navigate(getRoute('DASHBOARD'));

        
      }}

      validationSchema={loginSchema}

      >{({ values, handleBlur, handleChange, handleSubmit, handleReset, errors })=>(

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
                Welcome
              </Text>
                {/* Header Login */}
                <View>
                  <Text className="text-xl text-gray-800">Login to Continue</Text>
                </View>
              <View className="flex flex-col w-[380px]">
                {/* Form for email password */}
                <View className="my-5 flex flex-col items-start">
                  <Label>Email: </Label>
                  <TextInput 
                  inputMode="email" 
                  placeholder="joe@email.com" 
                  className="px-[10px] py-[10px] border border-black w-full" 
                  onBlur={handleBlur('email')}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  />
                  {errors.email? <Text className="text-red-800 text-xs font-bold">{errors.email}</Text>: <Text></Text>}
                </View>

                <View className="flex flex-col items-start">
                  <Label>Password: </Label>
                  <TextInput 
                  inputMode="text" 
                  passwordRules={''} 
                  placeholder="********" 
                  className="px-[10px] w-full py-[10px] border border-black" 
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  />
                  {errors.password? <Text className="text-red-800 text-xs font-bold">{errors.password}</Text>: <Text></Text>}

                </View>
                <button
                  type="submit"
                  className="bg-black p-2 text-white rounded mt-4"
                  onClick={(e)=> handleSubmit(e)}>
                      Login
              </button>

              <View className="mt-4">
              <Text>
                Do not have an account? Signup now.
              </Text>

              <button
                  className="bg-white border-black border-2 p-2 text-black rounded mt-1"
                  onClick={()=>{
                      router.navigate(getRoute('SIGNUP'));
                  }}>
                      Signup
              </button>
              </View>
              </View>


              {/* end here */}
            </View>
          </View>
      )}

      </Formik>
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
