import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function VisualPostButton(props: any) {
    return(
        <TouchableOpacity>
        <View style = {styles.visualButton}>
            <Text style = {styles.visualPostText}>{props.title}</Text>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    visualButton: {
        justifyContent: 'center',
        alignItems: 'center',
            position: 'absolute',
            width: 256,
            height: 70,
            left: 59,
            top: 338,

            backgroundColor: '#85FFD8',
            // boxShadow: 0px 4px 4px rgba(0, 0, 0, 0.11);
            borderRadius: 35,
            shadowColor: '#000000',
            shadowOpacity: .2,
            shadowOffset: {
                width: 0,
                height: 3
            }

    }, visualPostText: {
        fontFamily: "Montserrat-Bold",
        fontSize: 28,
        color: '#F07167'
    }
})