import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function AudioPostButton(props:any) {
    return(
        <TouchableOpacity>
        <View style = {styles.audioButton}>
            <Text style = {styles.audioPostText}>{props.title}</Text>
        </View>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    audioButton: {
        justifyContent: 'center',
        alignItems: 'center',

            position: 'absolute',
            width: 256,
            height: 70,
            left: 60,
            top: 467,

            backgroundColor: '#F07167',
            // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.11);
            borderRadius: 35,
            shadowColor: '#000000',
            shadowOpacity: .2,
            shadowOffset: {
                width: 0,
                height: 3
            }


    }, audioPostText: {

        fontFamily: "Montserrat-Bold",
        fontSize: 28,
        color: '#FFFFFF'
    }
})