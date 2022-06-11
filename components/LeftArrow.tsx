import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";

export default function RightArrow(props: any) {
  return (
    <TouchableOpacity>
      <View style={styles.uploadButton}>
        <Image
          style={styles.image}
          source={require("../assets/images/right_arrow.png")}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  uploadButton: {
    position: "absolute",
    right: 351.26,
    top: 172.92,
    bottom: 616.91,
    left: 12.65,
  },
  image: {
    transform: [{ rotate: "180deg" }],
  },
});
