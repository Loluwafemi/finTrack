import '~/global.css';
import { Component, ReactNode, useState } from "react";
import { Dimensions, View, Modal, StyleSheet, TouchableHighlight, Text } from "react-native";
import { Icon } from '@roninoss/icons';

const windowHeight = Dimensions.get('window').height

export function BottomSheet ({ children, CallisVisible }: Readonly<{children: any, CallisVisible:boolean}>) {
        
    const [isVisible, changeVisibility] = useState(false);

    const openBottomSheet = ()=>{
        changeVisibility(true)
    }

    const closeBottomSheet = ()=>{
        changeVisibility(false)
    }    

    const handleClose = () => {
        changeVisibility(false);
        // if (funcClose) {
        //     funcClose();
        // }
    }
    return (
        <View>
            <TouchableHighlight
            onPress={openBottomSheet}
            >
                <View className='p-1 flex flex-row justify-center items-center bg-gray-500 rounded'>
                    <Text className='text-white font-bold'>
                    Open Bottom Sheet
                    </Text>
                    <Icon color='white' name='plus' />
                </View>
            </TouchableHighlight>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
                onRequestClose={handleClose}
            >
                <View style={styles.bottomSheet}>

                        <View className="flex w-[100%] flex-row justify-end">
                            <TouchableHighlight
                                onPress={closeBottomSheet}
                                className='px-2'
                                >
                                    <Icon name='close' />
                                </TouchableHighlight>
                        </View>

                    <View className='w-[100%] mx-2 p-[10px] bg-white'>
                        {children}
                    </View>
                </View>
            </Modal>
        </View>
    )
}


const styles = StyleSheet.create({
    bottomSheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        paddingVertical: 23,
        bottom: 0,
        borderWidth: 1,
        borderColor: 'gray',
        height: windowHeight * 0.4,
    }
})
