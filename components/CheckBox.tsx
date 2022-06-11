import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";

export default function CheckBox(props: any) {
  return (
    <TouchableOpacity>
      <View style={styles.visualButton}>
        <Image
          style={styles.check}
          source={require("../assets/images/check.png")}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  visualButton: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: 187,
    height: 39,
    left: 94,
    top: 300,

    backgroundColor: "#85FFD8",
    // boxShadow: 0px 4px 4px rgba(0, 0, 0, 0.11);
    borderRadius: 35,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  visualPostText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 28,
    color: "#767676",
  },
  check: {
    backgroundColor: "#85FFD8",
  },
});
