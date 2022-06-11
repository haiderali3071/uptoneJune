import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
const api = require('../api.json');

const photo_url = api.photo;

export default function Notification(props: {
  title:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  time:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  profile:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) {
  return (
    <TouchableOpacity style={styles.notificationCard}>
      <Image
        style={styles.profilepic}
        source={{uri:props.profile ? photo_url+props.profile: ''}}
      />
      <View style={styles.notificationButton}>
        <Text style={styles.notificationText}>{props.title}</Text>
        <Text style={styles.timeText}>{props.time}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  profilepic: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  notificationCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    height: 70,
    marginTop: 15,
    width: "90%",
    alignSelf: "center",
    paddingHorizontal: 10,
    alignItems: "center",
    borderRadius: 15,
  },
  notificationText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 12,
    color: "#4F4F4F",
  },
  timeText: {
    fontFamily: "Montserrat",
    fontSize: 12,
    marginTop: 5,
    color: "#4F4F4F",
  },
  notificationButton: {
    marginLeft: 5,
  },
});
