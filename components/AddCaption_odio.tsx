import React from "react";
import { StyleSheet, TextInput } from "react-native";

export default function AddCaption_odio() {
    const [value, onChangeText] = React.useState("");
    return (
        <TextInput
            style={styles.border}
            placeholder={"Add Caption"}
            placeholderTextColor={"white"}
            onChangeText={(text) => onChangeText(text)}
            value={value}
            multiline={true}
            autoFocus={true}
            numberOfLines={6}
        />
    );
}

const styles = StyleSheet.create({
    border: {
        backgroundColor: "#ffffff0f",
        position: "absolute",
        width: 303,
        alignSelf: "center",
        top: 340,
        textAlignVertical: "top",

        borderRadius: 14,
        borderWidth: 1,
        borderTopWidth: 3,
        borderColor: "#F07167",
        color: "white",
        padding: 12,
    },
});
