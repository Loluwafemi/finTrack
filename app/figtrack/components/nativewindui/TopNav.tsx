import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { Component, ReactNode } from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";


export function TopNav (props){
          return (
            <View style={style.topNav}>
                <TouchableHighlight
                  onPress={()=>{
                    props.navigation.openDrawer()
                  }}
                >
                  <View style={style.profile}>
                      
                  </View>
                </TouchableHighlight>
                <Text style={{fontWeight: 'bold'}}>Welcome Perryman!</Text>
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
    },

    profile: {
      height: 30,
      width: 30,
      borderRadius: '50%',
      borderWidth: 1,
      margin: 8,
      marginLeft: 10
    }
  });