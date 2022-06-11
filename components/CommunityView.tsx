import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import LikeCommentBar from "./LikeCommentBar";
import { LinearGradient } from "expo-linear-gradient";
import CircleSlider from "react-native-circle-slider";
import { ScrollView } from "react-native-gesture-handler";

const CommunityView = (props: any) => {
  const [paused, setPause] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<string>('0:00');
  const [duration, setDuration] = useState<string>(props.totalTime);
  const [slider, setSlider] = useState<number>(180)
  
    const selectPause = () => {
    if (paused) {
      props.playSound(
        true,
        props.audioClip,
        setPause,
        setCurrentTime,
        setDuration,
        setSlider
      );
    } else {
      props.playSound(
        false,
        props.audioClip,
        setPause,
        setCurrentTime,
        setDuration,
        setSlider
      );
    }
  };

  return (
    <ScrollView>
      <View style={styles.containerView}>
        <ImageBackground
          source={{uri:props.imageSource}}
          style={styles.ImageBackground}
          imageStyle={{ borderRadius: 30 }}
        >
          <LinearGradient
            colors={["transparent", "#FFF"]}
            style={{ flex: 1, borderRadius: 30 }}
          />
          <View style={styles.audioplayer}>
            {/* <View style={styles.timeOnSpot}>
                  <Text style={styles.timeText}>{props.currentTime}</Text>
            </View>
            <View style={styles.timeTotalSpot}>
                  <Text style={styles.timeText}>{props.totalTime}</Text>
            </View> */}
            <View style={styles.circle}>
              <CircleSlider
                dialWidth={5}
                value={180}
                dialRadius={107}
                btnRadius={6.5}
                strokeColor={"grey"}
                strokeWidth={0.5}
                meterColor={"black"}
                textSize={-25}
                textColor={"black"}
              />
            </View>
            <TouchableOpacity
              style={{
                flex: 1,
                marginTop: "35%",
                width: "20%",
                marginLeft: "50%",
              }}
              onPress={selectPause}
            >
              {paused ? (
                <Image
                  source={require("../assets/images/Play.png")}
                  style={styles.playButton}
                />
              ) : (
                <Image
                  source={require("../assets/images/Pause.png")}
                  style={styles.pauseButton}
                />
              )}
            </TouchableOpacity>
          </View>
          <LikeCommentBar
            likes={props.likes}
            numOfComments={props.numOfComments}
            timePassed={props.timePassed}
            id={props.id}
            postAuthor={props.postAuthor}
            profilePhoto={props.profilePhoto}
            userCaption={props.userCaption}
            handleLike={props.handleLike}
            likedFromUser={props.likedFromUser}
            navigation={props.navigation}
            postId={props.postId}
            comments={props.comments}
            follower={props.follower}
            userId={props.userId}
          />
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: "#808080",
    width: 340,
    height: "100%",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 7 },
    shadowRadius: 10,
    shadowOpacity: 0.4,
    elevation: 5,
    borderRadius: 30,
  },
  audioplayer: {
    opacity: 1,
    padding: 5,
    width: "88%",
    position: "relative",

    marginVertical: "10%",
    height: 250,
  },
  circle: {
    // flex: 1,
    position: "absolute",
    // width:"50%",
    // height: "30%",
    // left: 70,
    marginLeft: "17%",
    marginTop: "5%",
    transform: [{ rotate: "270deg" }],
  },

  timeOnSpot: {
    position: "absolute",
    width: 28,
    height: 17,
    top: 130,

    /* small text */
  },
  timeText: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 15,
    textAlign: "center",
    // color: "black",

    /* darkgrey */
    color: "#4F4F4F",
  },
  timeTotalSpot: {
    position: "absolute",
    width: 26,
    height: 16,
    left: 310,
    top: 130,
  },
  pauseButton: {
    width: 42,
  },
  playButton: {
    width: 42,
  },
  ImageBackground: {
    flex: 1,
    // width: 340,
    // alignSelf: "center",
    // borderRadius: 30,
  },
});

export default CommunityView;
