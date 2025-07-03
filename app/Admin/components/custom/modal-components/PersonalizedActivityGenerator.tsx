import { User } from "@/lib/auth";
import { Icon } from "@roninoss/icons";
import { useState } from "react";
import { Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";


interface SingleactivityStructure {

    author: string | null,
    created_at: string | null,
    updated_at: string | null,
    id: string | null,
    message: {
        title: string | null,
        text: string | null
    },
    receiver: string | null,
    status: "approved" | "pending" | "declined" | "deleted",
    type: "receipt" | "log" | "activity"

}


export const PersonalizedActivity = ({ userid, onPress }: {userid: string, onPress: Function})=>{

    const [ getActivity, setActivities ] = useState<SingleactivityStructure[]>([])

    
    const userObject = new User()

    const GenerateUserActivities = async () => {
        const transaction = await userObject.getMemberActivity(userid)
        setActivities(transaction)
   }

    // iterate through each and make it dynamic

      return (
        <ScrollView className="h-[70vh] overflow-y-scroll">
            {getActivity.length > 0? getActivity.map((activity, index)=>(
                <PersonalizedActivityComponent
                onPress={async ()=> await GenerateUserActivities()}
                
                key={index} activity={activity} />
            )): <View className="m-auto">
                    <TouchableHighlight 
                        onPress={async ()=> await GenerateUserActivities() }
                    >
                        <View className="flex flex-row items-center justify-center">
                            <Text className="me-4">Load all activities</Text>
                            <Icon name="access-point-network" />
                        </View>
                    </TouchableHighlight>
                </View>
            }
        </ScrollView>
      );
}



const PersonalizedActivityComponent = ({activity, onPress}: {activity: SingleactivityStructure, onPress: Function})=>{

    
    const getStatusColor = (typeOfStatus:any) => {
        switch (typeOfStatus) {
          case "approved":
            return "#28a745";
          case "pending":
            return "#17a2b8";
          case "declined":
            return "#ffc107";
          case "deleted":
            return "#dc3545";
          default:
            return "#6c757d";
        }
      };
    
      const getStatusIcon = (typeOfStatus:any) => {
        switch (typeOfStatus) {
          case "approved":
            return "✓";
          case "pending":
            return "ℹ";
          case "declined":
            return "⚠";
          case "deleted":
            return "✕";
          default:
            return "•";
        }
      };

    return (
        <TouchableOpacity
        onPress={async ()=> await onPress() }
        className="flex-row items-start py-3 px-4 rounded-lg mb-2"
        style={{
            backgroundColor: "#fafbfc",
            borderColor: "#f1f3f4",
            borderWidth: 1,
        }}
        //   onPress={onPress}
        activeOpacity={0.7}
        accessibilityRole="button"
        // accessibilityLabel={`View details for ${action}`}
        >
        {/* Status Indicator */}
        <View
            className="w-6 h-6 rounded-full mr-3 mt-0.5 items-center justify-center"
            style={{
            backgroundColor: getStatusColor(activity.status),
            minWidth: 24,
            minHeight: 24,
            }}
        >
            <Text className="text-xs font-bold" style={{ color: "#ffffff" }}>
            {getStatusIcon(activity.status)}
            </Text>
        </View>
    
        {/* Content */}
        <View className="flex-1">
            <Text className="text-sm font-medium mb-1" style={{ color: "#000000" }}>
            {activity.type}
            </Text>
    
            <View className="flex-row justify-between items-center">
                    <Text className="text-xs" style={{ color: "#6c757d" }}>
                        {/* function that decide whether to present text or text oriented object */}
                        {MessagePersonlizer(JSON.stringify(activity.message['text']))}
                    </Text>
                    <Text className="text-xs" style={{ color: "#6c757d" }}>
                        {activity.message['title']}
                    </Text>
            
                    <Text className="text-xs" style={{ color: "#6c757d" }}>
                        {activity.created_at}
                    </Text>
            </View>
        </View>
    </TouchableOpacity>
    )
}



function MessagePersonlizer(message: string) {
    if (typeof message == 'string' ) {
        let newMessage = message.replace("You", "This account")
        newMessage = newMessage.replace("wait while it's approved", "waiting for approval")
        return newMessage
    }
}