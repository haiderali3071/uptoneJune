import React, { useRef } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { RouteStackParamList } from "../navigation/RouteParameterList";
import { CommonActions } from "@react-navigation/native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import NavigationBarPopUp from "./NavigationBarPopUp";

export default function HomeTitle({
  navigation,
  route,
  title
}: RouteStackParamList<"HomePage">) {
  const curr = "HomePage";
  const refRBSheet = useRef<any>();

  return (
    <View>
      <View style={styles.box}>
        <View style={styles.hashtag}>
          <Text style={styles.hashtagText}>{title}</Text>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("NftScreen")}
            style={styles.addButton}
          >
            <MaterialCommunityIcons name="waveform" size={28} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.messageButton}
          onPress={() => {
            navigation.navigate("Chats", { currPage: "HomePage" });
          }}
        >
          <Image source={require("../assets/images/Vector.png")}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 375,
    height: 80,
    left: 0,
    top: 0,
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderRadius: 37,
    alignSelf: "center",
  },
  hashtag: {
    position: "absolute",
    width: 158,
    height: 27,
    left: 109,
    top: 43,
  },
  hashtagText: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 22,
    lineHeight: 27,
    textAlign: "center",
    /* darkgrey */
    color: "#4F4F4F",
  },
  messageButton: {
    position: "absolute",
    width: 24,
    height: 22,
    top: 48,
    left: 330,
  },
  addButton: {
    position: "absolute",
    width: 30,
    height: 22,
    top: 43,
    left: 290,
  },
});
