import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Button from "./button";
import { LinearGradient } from "expo-linear-gradient";

export default function TrendingCard(props: any) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("OthersProfile")}
      >
        <Image
          source={require("./../../assets/images/profile.jpg")}
          style={styles.waveImage}
        />
      </TouchableOpacity>
      <Text style={styles.name}>Post Malone</Text>
      <Text style={styles.code}>Just a guy who likes Music</Text>
      <Text style={styles.items}>11 Items for Sale</Text>
    </View>
  );
}

// #efefef

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#efefef",
    paddingTop: 10,
    paddingHorizontal: 10,
    elevation: 2,
    borderRadius: 30,
    marginRight: 10,
    // width: "100%",
  },
  waveImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginVertical: 10,
  },

  name: {
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    fontSize: 18,
    marginVertical: 10,
  },
  code: {
    fontWeight: "bold",
    color: "gray",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 10,
    width: 220,
    alignSelf: "center",
  },
  items: {
    fontWeight: "bold",
    color: "#b8a646",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 15,
    width: 220,
    alignSelf: "center",
  },
});
