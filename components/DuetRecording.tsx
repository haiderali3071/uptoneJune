//Duet Recording is meant for two functionalities : Add to beginning and Add to end
//this page will work for both the functionalities - A flag(true for beginning, false for end) 
//needs to be passed while 
//navigating from the previous scree ( merge/ add to end/ add to beginning)

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import CountDown from "../components/CountDown";
import { RouteStackParamList } from "../navigation/RouteParameterList";

// import CountDown from "react-native-countdown-component";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
import { Audio } from "expo-av";
import StartRecording from "./StartRecording";

//providing functionality for the start over button
function useForceUpdate() {
  const [, setTick] = useState(0);
  const update = useCallback(() => {
    setTick((tick) => tick + 1);
  }, []);
  return update;
}
//main export function
export default function DuetRecording({
  navigation,
  route,
}: RouteStackParamList<"Recording">) {
  const forceUpdate: () => void = useForceUpdate();
  const [loaded, setLoaded] = useState(false);
  return (
    //countdown starts as soon as the component opens
    <View>
      <CountDown
        maxCount={3}
        onEnd={() => {
          setLoaded(true);
        }}
      />
      {loaded && (
        <RecordNow
          navigation={navigation}
          route={route}
          forceUpdate={forceUpdate}
        />
      )}
    </View>
  );
  //as soon as countdown ends recording starts automatically.
}
//define type for the prop to be passedin the recording function
type RecordNowProps = RouteStackParamList<"Recording"> & {
  forceUpdate: () => void;
};

function RecordNow({ navigation, route, forceUpdate }: RecordNowProps) {
  const [recording, setRecording] =
    useState<Audio.Recording | undefined>(undefined);
  //for counting recording time
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      let paused = false;
      setPauseRecording((p) => {
        paused = p;
        return p;
      });
      setSeconds((seconds) => {
        if (paused) {
          return seconds + 1;
        }
        return seconds;
      });
    }, 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);
  //hook for starting with the start of the component and stopping when the component is exited
  useEffect(() => {
    (async () => {
      await startRecording();
      setPauseRecording(true);
    })();
    return () => {
      (async () => {
        if (!recording?._isDoneRecording) await stopRecording();
      })();
    };
  }, []);
  //async funtion to start recording
  async function startRecording() {
    try {
      console.log("Requesting permissions..");
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setSeconds(0);
      await recording.startAsync();
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }
  //async function to pause recording
  async function pauseRecording_functionality() {
    console.log("Pausing record..");
    try {
      await recording?.pauseAsync();
    } catch (error) {
      console.error(error);
    }
  }
  //async function to resume recording
  async function resumeRecording() {
    console.log("Pausing record..");
    try {
      await recording?.startAsync();
    } catch (error) {
      console.error(error);
    }
  }
  //async function to stop recording
  async function stopRecording() {
    console.log("Stopping recording..");
    try {
      setPauseRecording(false);
      await recording?.stopAndUnloadAsync();
      const uri = recording?.getURI();
      console.log("Recording stopped and stored at", uri);
    } catch (error) {
      console.error(error);
    }
  }
  //for playing the record after recording is done
  const [sound, setSound] = React.useState<Audio.Sound | undefined>(undefined);

  async function playSound(recording: Audio.Recording) {
    console.log("Loading Sound");
    try {
      const { sound } = await Audio.Sound.createAsync({
        uri: recording.getURI() as string,
      });
      // console.log(sound!)
      await sound!.playAsync();
      // console.log("sound set")
      setSound(sound);
    } catch (error) {
      console.error(error);
    }
  }
  //playing stops when the duration is over
  useEffect(() => {
    console.log("unloading....")
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  //for the pause play button
  //functionality of the pausing and resuming of the recorder module is not yet implemented
  //for noe the pause button works as the "stop" button and the record button restarts the recording
  const [pauseRecording, setPauseRecording] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <Icon name="arrow-back" size={25} color="#030303" style={styles.backIcon} />
        <Text style={styles.title}>Duet Record</Text>
        <TouchableOpacity>
          <Icon
            name="arrow-forward"
            size={25}
            color="#030303"
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>
      {/* functionality of the pause play button for the recording implemented 
      (cureently meant to stop not pasue)*/}
      <View style={styles.middleContainer}>
        {/* <Timer
        initialTime={0}
        >
          {({start, resume, pause, stop, reset, timerState}:any) => (
            <View>
              <Timer.Minutes/>
              <Timer.Seconds/>
              <Timer.Milliseconds/> */}
        <TouchableOpacity
          style={styles.recordIcon}
          activeOpacity={0.7}
          onPress={async () => {
            if (!pauseRecording) {
              await resumeRecording();
            } else {
              await pauseRecording_functionality();
            }
            setPauseRecording((pauseRecording) => !pauseRecording);
          }}
        >
          {pauseRecording ? (
            <Icon name="pause" size={(height * 1) / 6} color="#fff" />
          ) : (
            <Icon name="keyboard-voice" size={(height * 1) / 6} color="#fff" />
          )}
        </TouchableOpacity>
        {/* <Text>{timerState}</Text>
            </View>
          )}
        </Timer> */}
        <Text style={styles.timeCounter}>{Math.floor(seconds/60).toString().padStart(2,"0")} : {(seconds%60).toString().padStart(2,"0")}</Text>
      </View>
      {/* play button funtionality : to play after recording is stopped */}
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => stopRecording()}
          disabled={recording?._isDoneRecording}
        >
          
          <Icon name="stop" size={25} color="#cf9a72" style={styles.backIcon} />
          
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => playSound(recording!)}
          disabled={recording?._isDoneRecording}
        >
          
          <Icon name="play-circle-outline" size={25} color="#cf9a72" style={styles.backIcon} />
       
        </TouchableOpacity>
      </View>
      {/* for starting over, refresh the component */}
      <TouchableOpacity style={styles.startButton} onPress={forceUpdate}>
        <Text style={styles.startText}>Start over</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    position: "absolute",
    zIndex: 0,
  },
  titleBar: {
    // flex:1,
    width: width,
    height: (height * 1) / 8,
    paddingTop: (height * 1) / 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    alignSelf: "center",
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    color: "#030303",
    // fontWeight:"bold"
    // width : width*0.14,
  },
  backIcon: {
    // position:'absolute',
    // left : 5,
    // top : 5,
    // width: width*0.07,
    // height : height * 0.04
    margin: 10,
  },
  startButton: {
    width: (width * 2) / 3,
    padding: (height * 1) / 50,
    alignItems: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#cf9a72",
  },
  startText: {
    fontFamily: "Montserrat",
    color: "#cf9a72",
  },
  middleContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: (height * 5.5) / 8,
  },
  recordIcon: {
    height: (height * 1) / 5,
    width: (height * 1) / 5,
    borderRadius: 100,
    backgroundColor: "#cf9a72",
    padding: 10,
  },
  playButton: {
    width: width / 3,
    padding: (height * 1) / 50,
    margin: (height * 1) / 50,
    alignItems: "center",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#cf9a72",
  },
  timeCounter:{
    color : '#b3b3b3',
    margin : 15,
    fontFamily:"Montserrat",
    fontSize:20
  }
})