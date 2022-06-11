import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function MomentSlider(props: any) {
  return (
    <View style={styles.position}>
      <TouchableOpacity>
        <View style={styles.sliderBackground}>
          <View style={styles.slider}></View>
        </View>
      </TouchableOpacity>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  position: {
    flexDirection: "row",
  },
  sliderBackground: {
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
    width: 187,
    height: 39,
    left: 94,
    top: 300,
    backgroundColor: "#767676",
    // box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.11);
    borderRadius: 35,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  slider: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: 74,
    height: 39,
    left: 0,
    backgroundColor: "#85FFD8",
    borderRadius: 35,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  text: {
    textAlign: "center",
    fontFamily: "Montserrat",
    width: 28,
    height: 17,
    left: 288,
    top: 313,
    fontSize: 14,
    lineHeight: 17,
    fontWeight: "500",
    fontStyle: "normal",
    color: "#E5E5E5",
  },
});
