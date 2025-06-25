import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { Component, ReactNode } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import '~/global.css'

export function TopNav (props){
          return (
            <View style={style.topNav}>
                <TouchableHighlight
                  onPress={()=>{
                    props.navigation.openDrawer()
                  }}
                >
                  <View className="h-[30px] w-[30px] rounded-full shadow border-[1px] m-[8px] ml-[10px] flex flex-row items-center justify-center">
                      <Text className="font-bold text-lg text-gray-600">{String(props.username).charAt(0).toUpperCase()}</Text>
                  </View>
                </TouchableHighlight>
                <Text className="text-gray-700 text-lg font-bold">Welcome {props.firstname}!</Text>
            </View>
          );
}

const style = StyleSheet.create({
    topNav: {
      margin: 2,
      // backgroundColor: 'grey',
      // borderRadius: 4,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      // borderColor: 'grey',
      // borderWidth: 1,
    }
  });