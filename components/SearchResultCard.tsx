import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  TouchableWithoutFeedback
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from "react-native-elements";
import { Audio } from "expo-av";
const api = require('../api.json')
const photo_url = api.photo
const axios = require('axios');
var qs = require('qs');
const unfollow_user_url = api.unfollow_user;
const follow_user_url = api.follow_user;

export default function SearchResultCard(props: any) {
  let [playingBio, setPlayingBio] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  let [following, setFollowing] = useState(props.following);
  let [playing, setPlaying] = useState(true);

  useEffect(()=>{
    console.log(following)

  },[following])

  async function playSound() {
    try {
      if (!playing) {
        console.log("Loading Sound");
        const { sound } = await Audio.Sound.createAsync({
          // Get audioBio from user
          uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        });

        console.log("Playing Sound");
        await sound.playAsync().then(() => {
          setPlayingBio(true);
          props.setAudioPlaying(true);
          props.setSound(sound);
          setSound(sound);
          props.setSoundOwner(props.title); // this should be some id instead
        });

        sound.setOnPlaybackStatusUpdate(async (status) => {
          if (status.isLoaded) {
            if (status.didJustFinish === true) {
              setPlayingBio(false);
              props.setAudioPlaying(false);
              props.setSound(null);
            }
          }
        });
      } else {
        sound?.pauseAsync().then(() => {
          console.log(props.sound);
          console.log(props.audioPlaying);
          console.log("Other Audio is playing, wait until it's done!");
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleFollow = () => {
    props.follow(props.title);
    setFollowing(true);

     AsyncStorage.getItem('accessToken').then((token: any) => {
        var data = qs.stringify({
          followerid: props.id,
        });
        var config = {
          method: 'patch',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            authorization: token,
          },
          url: follow_user_url,
          data: data,
        };

        axios(config)
          .then((json: any) => {
            // Alert.alert(json.data.message);
            props.Navigation.navigate("OthersProfile",{_id:props.id,following:true,setFollowing:setFollowing});
          })

          .catch((error: any) => console.log('=========error======', error));
      });
    
  };


   const unfollowAtBackend = (_id:any)=>{
     AsyncStorage.getItem('accessToken').then((token:any)=>{

        var data = qs.stringify({
            followerid:_id
        });
       var config = {
        method: 'patch',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'authorization': token,
        },
        url: unfollow_user_url,
        data:data
      };

      axios(config)

      .then((json:any)=>{
        // Alert.alert(json.data.message)
      })

       .catch((error: any) => console.log('=========error======', error));
     })
  }


   const handleUnfollow = (id : any) => { // replace id to identify
      Alert.alert(
          `Unfollow ${props.title}`,
          `Are you sure you want to unfollow ${props.title} `,
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            { text: "Unfollow", onPress: () => {
              unfollowAtBackend(id)
              setFollowing(false)
                props.Navigation.push("OthersProfile",{_id:props.id,following:false,setFollowing:setFollowing});
            } }
          ]
        );
  };


  
  
  return (
    <TouchableWithoutFeedback onPress={()=>{
       props.Navigation.navigate("OthersProfile",{_id:props.id,following:following,setFollowing:setFollowing});
    }}>
    <View
      style={[styles.card, shadowStyle]}
    >
      <Image
        style={styles.profilePic}
        source={{uri:props.profile?photo_url+props.profile:''}}
      />
      <Text style={styles.followText}>{props.title}</Text>
      {following ? (
         <TouchableOpacity onPress={()=> handleUnfollow(props.id)}>
            <Text style={styles.removeText}>Unfollow</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.followicon} onPress={handleFollow}>
          <Icon name="person-add" />
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.audioicon} onPress={playSound}>
        <Icon name="campaign" color={playingBio ? "#0000FF" : "#000"} />
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  );
}

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.5,
  shadowRadius: 3,
  elevation: 2,
};

const styles = StyleSheet.create({
  card: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 2,
    flexDirection: "row",
    width: "99%",
    height: 70,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "#FFF",
  },
  profilePic: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    height: "100%",
    width: "100%",
  },
  followText: {
    flex: 4,
    textAlign: "left",
    paddingTop: 25,
    paddingLeft: 10,
    marginLeft: 1,
  },

  audioicon: {
    alignSelf: "center",
    opacity: 0.7,
    margin: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#c3c3c3",
    padding: 4,
  },

  followicon: {
    alignSelf: "center",
    opacity: 0.7,
    margin: 10,

    padding: 4,
  },
  removeText: {
    color: "red",
    flex: 4,
    fontSize: 14,
    fontWeight: "bold",
    paddingTop: 25,
    paddingRight: 15,
  },
});
