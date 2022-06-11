import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { RouteStackParamList } from "../navigation/RouteParameterList";

export default function PostsHeader({
  navigation,
  route,
  title,
}: RouteStackParamList<"HomePage">) {
  const curr = "HomePage";
  const refRBSheet = useRef<any>();

  // onTouchEnd={() => props.navigation.goBack()}
  return (
    <View>
      <View style={styles.box}>
        <View onTouchEnd={() => navigation.goBack()}>
          <MaterialIcons
            className="setting-icon"
            name="arrow-back"
            size={30}
            color="black"
            style={{ marginTop: "11%", marginLeft: 20 }}
          />
        </View>
        <View style={styles.hashtag}>
          <Text style={styles.hashtagText}>{title}</Text>
        </View>
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
