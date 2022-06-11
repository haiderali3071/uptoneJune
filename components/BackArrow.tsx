import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";

export default function BackArrow(props: any) {
    return (
        <TouchableOpacity style={styles.border} onPress={props.onPress}>
            <View style={styles.uploadButton}>
                <Image
                    style={[styles.arrow, {height:props.ht, width:props.wd, marginTop:props.mT, marginLeft:props.mL}]}
                    source={require("../assets/images/backArrow.png")}
                    
                />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    uploadButton: {
        //position: "absolute",
        // justifyContent: "center",
        // alignSelf: "flex-start",
        // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.11);
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        top: 15
    },
    arrow: {
        tintColor: "black",

    },
    border: {
        left: 13.67,
        //top: 51.33,
        padding: 10,
        borderRadius: 15,
    },
});
