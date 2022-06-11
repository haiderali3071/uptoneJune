import React from "react";
import { View, TouchableOpacity, Image } from "react-native";

export default function CloseButton({ onPress }: any) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View>
                <Image source={require("../assets/images/close.png")} />
            </View>
        </TouchableOpacity>
    );
}
