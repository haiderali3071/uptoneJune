import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import Header from "../components/Header";
import avatarDuet from "../assets/images/avatarDuet.jpg";

import SoundWave from "../components/SoundWave";
import MarkerAudio from "../components/MarkerAudio";

import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

export default function DuetRecorder() {
  const [recordingAudio, setRecordingAudio] = useState(false);

  const nav = useNavigation();

  function recordAudio() {
    setRecordingAudio((oldState) => !oldState);
  }

  function goToNextScreen() {
    nav.navigate("DuetPreview");
  }

  function goBack() {
    nav.goBack();
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <StatusBar translucent={true} style="dark" />
      <View style={styles.container}>
        <Header
          onPressLeft={goBack}
          onPressRight={goToNextScreen}
          titleHeader="DuetRecorder"
          iconLeftClose
        />
        <View style={styles.firstCard}>
          <View style={styles.topFirstCard}>
            <Text style={{ marginLeft: 25 }}>0:00</Text>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <RectButton onPress={() => {}}>
                <Image
                  style={{ borderRadius: 80 }}
                  source={avatarDuet}
                  width={90}
                  height={90}
                />
              </RectButton>
              <View style={styles.viewUserName}>
                <Text style={styles.userName}>Jessica Simmons</Text>
                <Text>2h</Text>
              </View>
            </View>

            <Text style={{ marginRight: 25 }}>7:32</Text>
          </View>

          <View style={styles.bottomFirstCard}>
            <Text style={{ position: "absolute", left: 20, top: 0 }}>
              original
            </Text>
            <View style={styles.viewWave}>
              <View style={{ alignItems: "flex-end" }}>
                <MarkerAudio />
              </View>
              <SoundWave width={90} />
              <SoundWave width={90} />
              <SoundWave width={90} />
            </View>
          </View>
        </View>
        <View style={styles.secondCard}>
          <Text style={styles.yourRecord}>
            {recordingAudio ? "recording..." : "your record"}
          </Text>

          {recordingAudio && (
            <View
              style={{ position: "absolute", left: 45, opacity: 0.5, top: 135 }}
            >
              <SoundWave width={100} />
            </View>
          )}

          <RectButton style={styles.circleMic} onPress={recordAudio}>
            {recordingAudio ? (
              <Ionicons name="pause" size={30} color="white" />
            ) : (
              <FontAwesome5 name="microphone" size={30} color="white" />
            )}
          </RectButton>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  firstCard: {
    backgroundColor: "#EDEDED",
    height: 340,
    borderRadius: 30,
    elevation: 5,
    zIndex: 2,

    marginHorizontal: 10,

    shadowColor: "#aaa",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  topFirstCard: {
    height: 150,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userName: {
    fontSize: 17,
    fontWeight: "600",
    marginRight: 5,
  },
  bottomFirstCard: {
    marginTop: 40,
    height: 140,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    height: 100,
    width: 2,
    backgroundColor: "#D2AE9A",
  },
  viewWave: {
    flexDirection: "row",
    alignItems: "center",
    top: 10,
  },
  viewUserName: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  secondCard: {
    backgroundColor: "#EDEDED",
    height: 300,
    borderRadius: 30,
    elevation: 5,
    position: "relative",
    bottom: 60,
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",

    marginHorizontal: 10,

    shadowColor: "#aaa",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  circleMic: {
    marginTop: 30,
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#D2AE9A",

    shadowColor: "#aaa",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  yourRecord: {
    position: "absolute",
    left: 30,
    top: 80,
    opacity: 0.5,
    fontSize: 15,
  },
});
