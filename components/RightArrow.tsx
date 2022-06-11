import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";

export default function RightArrow(props: any) {
  return (
    <TouchableOpacity>
      <View style={styles.uploadButton}>
        <Image source={require("../assets/images/right_arrow.png")} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  uploadButton: {
    position: "absolute",
    left: 351.26,
    top: 172.92,
    bottom: 616.91,
  },
});
