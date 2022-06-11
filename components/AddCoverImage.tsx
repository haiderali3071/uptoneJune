import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export default function AddCoverImage() {
    return (
        <TouchableOpacity style={styles.touch}>
            <View style={styles.circle}>
                <Image source={require("../assets/images/camera.png")} />
            </View>
            <View style={styles.verticalalign}>
                <Text style={styles.text}>Add Cover Image</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    circle: {
        backgroundColor: "#414066",
        width: 61,
        height: 61,
        marginRight: 10,
        /* login and sign up button shadow */

        //box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000000",
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 1,
            width: 1,
        },
    },
    text: {
        textAlign: "center",
        position: "relative",
        width: 161,
        fontFamily: "Montserrat",
        fontSize: 18,
        lineHeight: 22,
        color: "#EDEDED",
    },
    touch: {
        position: "absolute",
        top: 218,
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    verticalalign: {
        flexDirection: "column",
        justifyContent: "center",
    },
});
