import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function button() {
  return (
    <View style={styles.mainView}>
      <LinearGradient
        start={{ x: 0, y: 0.25 }}
        end={{ x: 1, y: 0.25 }}
        colors={["#b8a646", "#b2a753", "#afa65a"]}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Classical Music</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 20,
    alignSelf: "center",
    // marginVertical:20,
  },
  button: {
    paddingVertical: 13,
    paddingHorizontal: 15,
    borderRadius: 20,
    elevation: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});
