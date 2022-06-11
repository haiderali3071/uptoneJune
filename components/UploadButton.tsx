import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export default function UploadButton(props: any) {
  return (
    <TouchableOpacity>
      <View style={styles.uploadButton}>
        <Text style={styles.uploadText}>{props.title}</Text>
        <View style={styles.camera}>
          <Image source={require("../assets/images/camera.png")} />
          <Image
            style={styles.camera_circ}
            source={require("../assets/images/camera_piece.png")}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  uploadButton: {
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",
    width: 323,
    height: 53,
    left: 26,
    top: 309,
    flexDirection: "row",
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
  uploadText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "600",
    lineHeight: 22,
    left: 24,
    top: 2,
  },
  camera: {
    position: "absolute",
    left: 28,
    right: "8.33%",
    top: "20.33%",
    bottom: "16.67%",
  },
  camera_circ: {
    position: "relative",
    left: 10,
    top: -19,
    right: 10,
    bottom: 10,
  },
});
