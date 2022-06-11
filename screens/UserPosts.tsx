import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native";
import { HeaderStyleInterpolators } from "@react-navigation/stack";
//import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  NavigationContainer,
  createNavigatorFactory,
  useNavigation,
} from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import VideoPost from "../components/videoPost";
import DefaultPost from "../components/DefaultPost";
import BottomApp from "../components/BottomNavigation";
import HomeTitle from "../components/HomeTitle";
import PostsHeader from "../components/PostsHeader";
import { RouteStackParamList } from "../navigation/RouteParameterList";
import { BackgroundImage } from "react-native-elements/dist/config";
import SmallImage from "../assets/background.png";
import MicButton from "../components/MicButton";
import User from "../classes/User";
const user = new User();
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const axios = require("axios");
var qs = require("qs");
const api = require("../api.json");
const audio_url = api.audio;
const like_post_url = api.like_post;
const unlike_post_url = api.unlike_post;
const get_all_comments_url = api.get_all_comments;
const photo_url = api.photo;

import { Audio } from "expo-av";

export default function UserPosts(props: RouteStackParamList<"HomePage">) {
  // const visual = async()=>{
  //       let hello ={HomePageVisuals, undefined}
  // };
  const posts = props.route.params?.data || [];
  const navigation = useNavigation();
  const arrayOfComponents: any = [];
  const Posts = posts;
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

  function millisToMinutesAndSeconds(millis: any) {
    var minutes: any = Math.floor(millis / 60000);
    var seconds: any = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  async function playSound(
    playingAudio: boolean,
    audioClip: string,
    setPause: any,
    setCurrentTime: any,
    setDuration: any,
    setSlider: any
  ) {
    console.log("Loading Sound");
    try {
      if (playingAudio) {
        const { sound } = await Audio.Sound.createAsync(
          {
            // Get audioBio from user
            uri: audio_url + audioClip,
          },
          {
            shouldPlay: true, //To play the audio when the component is loadded
            isLooping: false,
          }
        );
        setSound(sound);
        console.log("Playing Sound");
        setPause(false);
        await sound.playAsync().then(() => {
          setPlayingAudio(false);
        });

        sound.setOnPlaybackStatusUpdate(async (status) => {
          if (status.isLoaded) {
            if (status.didJustFinish === true) {
              setPause(true);
              setPlayingAudio(true);
            }
            setCurrentTime(millisToMinutesAndSeconds(status.positionMillis));
            setDuration(millisToMinutesAndSeconds(status.durationMillis));
            let sliderValuePart = status.durationMillis
              ? 180 / status.durationMillis
              : 0;
            setSlider(
              parseFloat(
                String(status.positionMillis * sliderValuePart)
              ).toFixed(0)
            );
          }
        });
      } else {
        sound?.pauseAsync().then(() => {
          setPlayingAudio(true);
          setPause(true);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const hashtagit = (caption: string) => {
    const message = [];
    const words = caption.split(" ");
    for (let i = 0; i < words.length; i++) {
      if (words[i].startsWith("#")) {
        message.push(
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("HashtagPage", {
                hashtagTitle: words[i],
                posts: Posts,
              })
            }
          >
            <Text style={styles.hashtag}>{words[i]}</Text>
          </TouchableOpacity>
        );
      } else {
        message.push(" " + words[i]);
      }
    }
    return message;
  };
  {
    Posts.map((e, index) => {
        let arr = []
        let comp
        e.comments.map((item:any)=>{
        arr.push({
          picture: item.userId?.profilePhoto
          ? photo_url + item.userId?.profilePhoto
          : '',
          name: item.userId.name,
          lastMsg: item.duration,
          uri: audio_url + item.audio,
          userId:item.userId._id,
        })
      }) 

      arrayOfComponents.push(
        <VideoPost
          key={index}
          id={e.id}
          userId={e.userId}
          likeStatus={e.likeStatus}
          comments={arr}
          onPress={() => {
            indexOfClicked(index);
            setIndexState(indexState + index);
          }}
          style={
            indexClicked === index
              ? [styles.box, { zIndex: indexState }]
              : [styles.box, { zIndex: Posts.length - index }]
          }
          blurContainer={indexClicked === index ? { flex: 1 } : { flex: 1 }}
          backgroundPhoto={e.backgroundPhoto}
          currentTime={e.currentTime}
          totalTime={e.totalTime}
          usersName={e.userName}
          userCaption={hashtagit(e.userCaption)}
          timeSincePosted={e.timeSincePosted}
          amountLikes={e.amountLikes}
          amountComments={e.amountComments}
          playing={e.playing}
          playSound={playSound}
          audioClip={e.audioClip}
          navigation={props.navigation}
        ></VideoPost>
      );
    });
  }

  return (
    <View style={styles.background}>
      <PostsHeader
        {...(props as unknown as RouteStackParamList<"HomePage">)}
        title="My Posts"
      />

      <SafeAreaView style={styles.container}>
        <ScrollView>{arrayOfComponents}</ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginTop: 20,
    width: "100%",
    height: 400,
    overflow: "hidden",
    backgroundColor: "#EDEDED",
    borderColor: "#000000",
    borderWidth: 0.4,
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderRadius: 37,
    alignSelf: "center",
  },
  background: {
    flex: 1,
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: "white",
    marginHorizontal: 0,
  },
  messageButton: {
    position: "absolute",

    width: 24,
    height: 22,
    left: 330,
    top: 46,
  },
  guideButton: {
    position: "absolute",
    width: 50,
    height: 50,
    left: 310,
    top: 663,
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  bottomspace: {
    position: "absolute",
    width: "100%",
    height: 79,
    left: 0,
    bottom: 0,
    borderRadius: 100,
  },
  hashtag: {
    color: "#D2AE9A",
    fontWeight: "800",
  },
});

{
  // [
  //   {
  //     id: 4,
  //     currentTime: '3:42',
  //     totalTime: '7:32',
  //     userName: 'Jessica Simmons',
  //     userCaption:
  //       'I just learned how to play a new song on the piano! Does anybody recognize it? ',
  //     timeSincePosted: '2h',
  //     amountLikes: 132,
  //     amountComments: 3,
  //     playing: false,
  //   },
  //   {
  //     id: 5,
  //     currentTime: '3:42',
  //     totalTime: '7:32',
  //     userName: 'Jessica Simmons2',
  //     userCaption:
  //       'I just learned how to play a new song on the piano! Does anybody recognize it?',
  //     timeSincePosted: '2h',
  //     amountLikes: 132,
  //     amountComments: 3,
  //     playing: false,
  //   },
  //   {
  //     id: 6,
  //     currentTime: '3:42',
  //     totalTime: '7:32',
  //     userName: 'Jessica Simmons3',
  //     userCaption:
  //       'I just learned how to play a new song on the piano! Does anybody recognize it? #Ocean Waves',
  //     timeSincePosted: '2h',
  //     amountLikes: 132,
  //     amountComments: 3,
  //     backgroundPhoto: SmallImage,
  //     playing: false,
  //   },
  //   {
  //     id: 7,
  //     currentTime: '3:42',
  //     totalTime: '7:32',
  //     userName: 'Jessica Simmons4',
  //     userCaption:
  //       'I just learned how to play a new song on the piano! Does anybody recognize it? #Ocean Waves!',
  //     timeSincePosted: '2h',
  //     amountLikes: 132,
  //     amountComments: 3,
  //     backgroundPhoto: SmallImage,
  //     playing: false,
  //   },
  // ];
}
