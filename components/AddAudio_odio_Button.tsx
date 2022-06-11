import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export default function AddAudioButton_2({ onPress }: any) {
    return (
        <TouchableOpacity style={styles.touch} onPress={onPress}>
            <View style={styles.border}>
                <Image source={require("../assets/images/mic.png")}></Image>
                <Text style={styles.addAudioText}>Add Audio</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    border: {
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        height: "100%",
        backgroundColor: "#414066",
        borderRadius: 35,
    },
    addAudioText: {
        left: -30,
        fontFamily: "Montserrat-Bold",
        fontWeight: "800",
        fontSize: 18,
        lineHeight: 22,
        /* identical to box height */
        color: "#FFFFFF",
    },
    touch: {
        position: "absolute",
        width: 242,
        height: 48,
        alignSelf: "center",
        top: 121,
        borderRadius: 35,
    },
});
