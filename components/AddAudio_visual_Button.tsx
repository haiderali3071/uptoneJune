import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default function AddAudioButton() {
    return(
        <TouchableOpacity>
        <View style = {styles.border}>
            <Image source = {require('../assets/images/mic.png')}></Image>
            <Text style = {styles.addAudioText}>Add Audio</Text>
        </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    border: {
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        //position: 'absolute',
        width: 187,
        height: 39,
        // left: 94,
        // top: 300,

        backgroundColor: '#767676',
        borderRadius: 35,
        alignSelf: 'center',
        marginTop: 10,

    }, 
    addAudioText: {
        left: -20,
        fontFamily: 'Montserrat-Bold',
        fontWeight: '800',
        fontSize: 18,
        lineHeight: 22,
        /* identical to box height */


        color: '#FFFFFF',
    }
})