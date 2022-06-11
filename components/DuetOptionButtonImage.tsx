import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export default function DuetOptionButtonImage({ title, imgSource,onPress }: any) {
    return (
        <TouchableOpacity style={{ width: "60%" }} onPress={onPress}>
            <View style={styles.button}>
                <View style={styles.icon}>
                    <Image source={imgSource} />
                </View>
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 30,
        paddingTop: 0,
    },
    text: {
        paddingHorizontal: 10,
        fontWeight: "500",
        fontSize: 18,
        lineHeight: 22,
        color: "#849CB0",
    },
    icon: {
        alignItems: "center",
        width: 40,
    },
});