import { Label } from "@react-navigation/elements";
import { router } from "expo-router";
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
        <View className="flex flex-col w-[350px]">
          {/* Form for email password */}
          <View className="flex flex-row items-center justify-center m-2">
            <View className="flex flex-col items-start mx-1 w-full">
              <Label>First Name: </Label>
              <TextInput 
              className="px-[10px] py-[10px] border border-black w-full"
              />

            </View>

            <View className="flex flex-col items-start mx-1 w-full">
              <Label>Last Name: </Label>
              <TextInput
              className="px-[10px] w-full py-[10px] border border-black"
              />

            </View>
          </View>
    
          <View className="flex flex-row items-center justify-center m-2">
            <View className="flex flex-col items-start mx-1 w-full">
              <Label>Email: </Label>
              <TextInput inputMode="email" placeholder="joe@email.com" className="px-[10px] py-[10px] border border-black w-full"
              />

            </View>

            <View className="flex flex-col items-start mx-1 w-full">
              <Label>Phone Number: </Label>
              <TextInput inputMode="text" placeholder="+234 xxxx xxxxx"
              className="px-[10px] w-full py-[10px] border border-black"
              />

            </View>
          </View>

          <View className="flex flex-row items-center justify-center m-2">
            <View className="flex flex-col items-start mx-1 w-full">
              <Label>Password: </Label>
              <TextInput inputMode="text" placeholder="*********" className="px-[10px] py-[10px] border border-black w-full"
              />

            </View>

            <View className="flex flex-col items-start mx-1 w-full">
              <Label>Confirm Password: </Label>
              <TextInput placeholder="********" 
              className="px-[10px] w-full py-[10px] border border-black"
              />

            </View>
          </View>
  
          <View className="flex flex-row items-center justify-center m-2">
            <View className="flex flex-col items-start mx-1 w-full">
              <Label>Organization: </Label>
              <TextInput inputMode="text" placeholder="Drop Down" className="px-[10px] py-[10px] border border-black w-full"
              />

            </View>

            <View className="flex flex-col items-start mx-1 w-full">
              <Label>Organization Invitation Key: </Label>
              <TextInput placeholder="optional"
              className="px-[10px] w-full py-[10px] border border-black"
              />

            </View>
          </View>

          {/* <View className="flex flex-row items-center justify-center m-2">
            <View className="flex flex-col items-start mx-1 w-full">
              <Label>Invitation Key: </Label>
              <TextInput inputMode="text" placeholder="***********" className="px-[10px] py-[10px] border border-black w-full"
              />

            </View>

            <View className="flex flex-col items-start mx-1 w-full">
              <Label>Organization Name: </Label>
              <TextInput placeholder="" 
              className="px-[10px] w-full py-[10px] border border-black"
              />

            </View>
          </View> */}

        <button
            className="bg-white border-black border-2 p-2 text-black rounded mt-1"
            onClick={()=>{
                // router.navigate(getRoute('SIGNUP'));
            }}>
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


        {/* end here */}
      </View>

      <button
        className="bg-black p-2 text-white rounded mt-4"
        onClick={()=>{
            router.navigate(getRoute('DASHBOARD'));
        }}>
            Continue to dashboad
        </button>
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
