import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  RouteParamList,
  RouteStackParamList,
} from "../navigation/RouteParameterList";
interface HashtagTitleProps {
  hashtagTitle: string;
}
export default function HashtagTitle({ hashtagTitle }: HashtagTitleProps) {
  const navigation2 = useNavigation();
  return (
    <View>
      <View style={styles.box}>
        <View style={styles.hashtag}>
          <Text style={styles.hashtagText}>{hashtagTitle}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation2.navigate("Chats")}>
          <View style={styles.messageButton}>
            <Image source={require("../assets/images/chat1x.png")}></Image>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    /* Rectangle 178 */
    position: "relative",
    //marginBottom: -45,
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
    left: 75,
    top: 47,
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
    top: 52,
    right: 65,
  },
});
