import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Button from "./button";
import { LinearGradient } from "expo-linear-gradient";

export default function TrendingCard(props: any) {
  let [pause, setPause] = useState(false);
  let playPause = () => {
    setPause(!pause);
    props.playSound();
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={require("./../../assets/vectorlogo.png")}
          style={styles.waveImage}
        />
        <Image
          source={require("./../../assets/vectorlogo.png")}
          style={styles.waveImage}
        />
      </View>
      <View style={styles.playContainer}>
        <TouchableOpacity onPress={playPause}>
          {pause ? (
            <Image
              source={require("./../../assets/images/Pause.png")}
              style={styles.play}
            />
          ) : (
            <Image
              source={require("./../../assets/images/Play.png")}
              style={styles.play}
            />
          )}
        </TouchableOpacity>

        <Text style={styles.time}>3:31</Text>
      </View>
      <Text style={styles.name}>Themoon</Text>
      <Text style={styles.code}>Concerto #347</Text>

      <View style={styles.mainView}>
        <LinearGradient
          start={{ x: 0, y: 0.25 }}
          end={{ x: 1, y: 0.25 }}
          colors={["#b8a646", "#7993a4"]}
          style={styles.button}
        >
          <Text style={styles.buttonText}>BUY FOR 0.1 ETH</Text>
        </LinearGradient>
      </View>
    </View>
  );
}

// #efefef

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#efefef",
    paddingTop: 30,
    paddingHorizontal: 35,
    elevation: 2,
    borderRadius: 30,
    marginRight: 10,
  },
  waveImage: {
    height: 100,
    width: 90,
  },
  play: {
    width: 22,
    height: 25,
  },
  playContainer: {
    flexDirection: "row",
    borderBottomColor: "#cacaca",
    borderBottomWidth: 3,
    marginVertical: 15,
    paddingBottom: 10,
  },
  time: {
    alignSelf: "center",
    marginLeft: 15,
    color: "gray",
    fontWeight: "bold",
  },
  name: {
    fontWeight: "bold",
    color: "gray",
  },
  code: {
    fontWeight: "bold",
    color: "black",
    fontSize: 15,
  },
  mainView: {
    marginVertical: 15,
    borderRadius: 20,
    alignSelf: "center",
    // marginVertical:20,
  },
  button: {
    paddingVertical: 13,
    paddingHorizontal: 25,
    borderRadius: 30,
    elevation: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
});
