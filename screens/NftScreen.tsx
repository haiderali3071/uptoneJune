import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
//import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";

import { RouteStackParamList } from "../navigation/RouteParameterList";
import SmallImage from "../assets/background.png";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";

import Button from "./../components/NftComponents/button";
import TrendingCard from "./../components/NftComponents/TrendingCard";
import Artist from "./../components/NftComponents/AtristCard";

export default function NftScreen(props: any) {
  const arrayOfComponents: any = [];
  const Posts = [
    {
      id: 4,
      currentTime: "3:42",
      totalTime: "7:32",
      userName: "Jessica Simmons",
      userCaption:
        "I just learned how to play a new song on the piano! Does anybody recognize it? ",
      timeSincePosted: "2h",
      amountLikes: 132,
      amountComments: 3,
      playing: false,
    },
    {
      id: 5,
      currentTime: "3:42",
      totalTime: "7:32",
      userName: "Jessica Simmons2",
      userCaption:
        "I just learned how to play a new song on the piano! Does anybody recognize it?",
      timeSincePosted: "2h",
      amountLikes: 132,
      amountComments: 3,
      playing: false,
    },
    {
      id: 6,
      currentTime: "3:42",
      totalTime: "7:32",
      userName: "Jessica Simmons3",
      userCaption:
        "I just learned how to play a new song on the piano! Does anybody recognize it? #Ocean Waves",
      timeSincePosted: "2h",
      amountLikes: 132,
      amountComments: 3,
      backgroundPhoto: SmallImage,
      playing: false,
    },
    {
      id: 7,
      currentTime: "3:42",
      totalTime: "7:32",
      userName: "Jessica Simmons4",
      userCaption:
        "I just learned how to play a new song on the piano! Does anybody recognize it? #Ocean Waves!",
      timeSincePosted: "2h",
      amountLikes: 132,
      amountComments: 3,
      backgroundPhoto: SmallImage,
      playing: false,
    },
  ];
  const [indexState, setIndexState] = useState(Posts.length);
  const [indexClicked, setIndexClicked] = useState(0);
  const [playingAudio, setPlayingAudio] = useState(false);

  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const [Pause, setPause] = useState<Audio.Sound | Boolean>(false);

  const [isPressed, setIsPressed] = useState({
    val: true,
  });
  // [indexState,setIndexState]===
  const indexOfClicked = (i) => {
    setIndexClicked(i);
  };
  async function playSound() {
    console.log("Loading Sound");
    try {
      if (!playingAudio) {
        const { sound } = await Audio.Sound.createAsync(
          {
            // Get audioBio from user
            uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          },
          {
            shouldPlay: true, //To play the audio when the component is loadded
            isLooping: false,
          }
        );
        setSound(sound);
        console.log("Playing Sound");
        await sound.playAsync().then(() => {
          setPlayingAudio(true);
        });

        sound.setOnPlaybackStatusUpdate(async (status) => {
          if (status.isLoaded) {
            if (status.didJustFinish === true) {
              setPlayingAudio(false);
            }
          }
        });
      } else {
        sound?.pauseAsync().then(() => {
          setPlayingAudio(false);
          setPause(true);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Uptone NFT</Text>
        <TouchableOpacity>
          <Ionicons name="add-circle-outline" size={35} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.inputBox}>
          <Ionicons name="search" size={25} color="gray" />
          <TextInput
            style={styles.input}
            placeholder="Search"
            selectionColor={"gray"}
          />
        </View>
        <View style={styles.Buttoncontainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Button />
            <Button />
            <Button />
            <Button />
            <Button />
          </ScrollView>
        </View>

        <View style={styles.ViewAll}>
          <Text style={styles.ViewallLeft}>Trending</Text>
          <View style={styles.ViewallRight}>
            <Text style={styles.ViewAllText}>View All</Text>
            <AntDesign name="arrowright" size={18} color="gray" />
          </View>
        </View>
        <View style={styles.Buttoncontainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TrendingCard playSound={playSound} />
            <TrendingCard playSound={playSound} />
            <TrendingCard playSound={playSound} />
            <TrendingCard playSound={playSound} />
            <TrendingCard playSound={playSound} />
            <TrendingCard playSound={playSound} />
          </ScrollView>
        </View>
        <View style={styles.ViewAll}>
          <Text style={styles.ViewallLeft}>Featured Artists</Text>
          <View style={styles.ViewallRight}>
            <Text style={styles.ViewAllText}>View All</Text>
            <AntDesign name="arrowright" size={18} color="gray" />
          </View>
        </View>
        <View style={styles.Buttoncontainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Artist navigation={props.navigation} />
            <Artist navigation={props.navigation} />
            <Artist navigation={props.navigation} />
            <Artist navigation={props.navigation} />
            <Artist navigation={props.navigation} />
            <Artist navigation={props.navigation} />
          </ScrollView>
        </View>
        <View style={styles.ViewAll}>
          <Text style={styles.ViewallLeft}>All NFTs</Text>
          <View style={styles.ViewallRight}>
            <Text style={styles.ViewAllText}>View All</Text>
            <AntDesign name="arrowright" size={18} color="gray" />
          </View>
        </View>
        <View style={styles.Buttoncontainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TrendingCard playSound={playSound} />
            <TrendingCard playSound={playSound} />
            <TrendingCard playSound={playSound} />
            <TrendingCard playSound={playSound} />
            <TrendingCard playSound={playSound} />
            <TrendingCard playSound={playSound} />
            <TrendingCard playSound={playSound} />
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: "white",
  },
  Buttoncontainer: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  headerText: {
    textAlign: "center",
    // alignSelf: "center",
    fontWeight: "bold",
    fontSize: 22,
  },
  inputBox: {
    backgroundColor: "#f0f0f0",
    marginHorizontal: 15,
    marginVertical: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: "row",
  },
  input: {
    fontSize: 15,
    marginLeft: 20,
  },
  ViewAll: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginVertical: 10,
    alignContent: "center",
  },
  ViewallLeft: {
    fontSize: 20,
    fontWeight: "bold",
  },
  ViewallRight: {
    flexDirection: "row",
    alignSelf: "center",
  },
  ViewAllText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "gray",
  },
});
