import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function VisualUpload() {
    return(
        <View>
            <Text style = {styles.border}>Placeholder</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    border: {
        position: 'absolute',
        width: 305,
        height: 192,
        left: 35,
        top: 95,

        borderRadius: 10,
        borderColor: '#aaaaaa',
        borderWidth: 1,
    },
})