import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import DefaultPost from "../components/DefaultPost";
import BackArrow from "../components/BackArrow";
import VideoPost from "../components/videoPost";
import BottomApp from "../components/BottomNavigation";
import HashTagTitle from "../components/HashtagTitle";
import FollowButton from "../components/FollowButton";
import MicButton from "../components/MicButton";
import { RouteStackParamList } from "../navigation/RouteParameterList";
import SmallImage from "../assets/background.png";
import { useNavigation } from "@react-navigation/native";
import VideoPostHashtag from "../components/videoPostHashtag";
import HashtagTitle from "../components/HashtagTitle";
import { Route } from "react-router-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../classes/User'
const userObj = new User()
import { Audio } from 'expo-av';
const api = require('../api.json');
const audio_url = api.audio;
const photo_url = api.photo;

export default function HashTagPage({
  props,
  route,
}: RouteStackParamList<"Hashtagpage">) {
  // const visual = async()=>{
  //       let hello ={HomePageVisuals, undefined}
  // };
  let navigation = useNavigation();
  let arrayOfComponents = [];
  const [components,setComponents] = useState([])
  // const Posts = route.params.posts; //its just filtering existing posts on feed not fetching all posts of same hashtag from database which I think is flaw
  const [Posts,setPosts] = useState([])
  
  const [indexState, setIndexState] = useState(Posts.length);
  const [indexClicked, setIndexClicked] = useState(0);
  const [playingAudio, setPlayingAudio] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const [hashtagTitle, setHashtagTitle] = useState(route.params.hashtagTitle)

  useEffect(()=>{
     AsyncStorage.getItem('accessToken').then((token)=>{
       userObj.getHashtagPosts(hashtagTitle.substring(1),token).then((json:any)=>{
         AsyncStorage.getItem('hashId').then((hashId)=>{
            setPosts(getPosts(json.data,hashId))
          })
      })
     })
  },[hashtagTitle])

  const hashtagit = (caption: string) => {
    const message = [];
    const words = caption.split(' ');
    for (let i = 0; i < words.length; i++) {
       
      if (words[i].startsWith('#') && words[i] != hashtagTitle) {
        message.push(
          <TouchableOpacity
            onPress={() =>{
              // way 1
              navigation.goBack()
              navigation.navigate('HashtagPage', {
                hashtagTitle: words[i],
                posts: Posts,
              })

              // way 2
              // setHashtagTitle(words[i])
             }
            }
          >
            <Text style={styles.hashtag}>{words[i]}</Text>
          </TouchableOpacity>
        );
      } else {
        message.push(' ' + words[i]);
      }
    }
    return message;
  };


  
function millisToMinutesAndSeconds(millis: any) {
    var minutes: any = Math.floor(millis / 60000);
    var seconds: any = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  
  async function playSound(
    playingAudio: boolean,
    audioClip: string,
    setPause: any,
    setCurrentTime: any,
    setDuration: any
  ) {
    console.log('Loading Sound');
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
        console.log('Playing Sound');
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

  
  function getPosts (postsInsideFunc: any, loginUserId: any){
    let arr: any = [];
    postsInsideFunc?.map((item: any) => {
      arr.push({
        id: item._id,
        audioClip: item.audioClip,
        userId: item.userId._id,
        currentTime: '0:00',
        totalTime: item.duration,
        userName: item.userId.name,
        userCaption: item.description,
        timeSincePosted: userObj.calculatePostTime(item.createdAt),
        amountLikes: item.likes.length,
        amountComments: item.comments.length,
        likeStatus: item.likes.includes(loginUserId),
        playing: false,
        comments:item.comments
      });
    });
    return arr;
  };

  // [indexState,setIndexState]===
  const indexOfClicked = (i) => {
    setIndexClicked(i);
  };

  // This is double check to insure that we re getting only posts 
  // that match selected hashtag but I think there is no need of this filter
  const newPosts = Posts.filter((e) =>
    e.userCaption.includes(hashtagTitle)
  );
  {
    
       newPosts.map(async(e, index) => {

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

           comp =  (
            <VideoPost
              key={index}
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
              navigation={navigation}
              id={e.id}
              userId={e.userId}
              likeStatus={e.likeStatus}
              playing={e.playing}
              audioClip={e.audioClip}
              playSound={playSound} 
              comments={arr}
            ></VideoPost>
          )
          arrayOfComponents.push(comp)
    }); 
    

  }
  return (
    <View style={styles.background}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <BackArrow
            ht={22}
            wd={28}
            mT={23}
            mL={30}
            onPress={() => navigation.goBack()}
          />
          <HashTagTitle hashtagTitle={hashtagTitle} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.postCount}>{newPosts.length} Posts</Text>
          <FollowButton
            {...(props as unknown as RouteStackParamList<"Hashtagpage">)}
            hashtag = {hashtagTitle}
          />
        </View>
      </View>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {arrayOfComponents}
          {/* <View style={{height: 125}}></View> */}
        </ScrollView>
        <MicButton />
      </SafeAreaView>
      <View style={styles.bottomspace}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  // box: {
  //   /* Rectangle 178 */
  //   //left:leftBottom.left,
  //   // bottom:leftBottom.bottom,
  //   // position: 'relative',
  //   // width: 400,
  //   marginTop: 20,
  //   paddingTop: 20,
  //   width: "100%",
  //   height: 450,
  //   // height: `50vh`,
  //   overflow: "hidden",
  //   backgroundColor: "#EDEDED",
  //   borderColor: "#000000",
  //   borderWidth: 0.4,
  //   shadowOpacity: 0.4,
  //   shadowOffset: {
  //     width: 0,
  //     height: 1,
  //   },

  //   borderRadius: 37,
  //   alignSelf: "center",
  //   // marginBottom: -50,
  //   // flex: 1,
  //   // borderRadius: 10,
  //   // // To round image corners
  //   // overflow: 'hidden',
  //   // borderColor: '#999',
  //   // borderWidth: 0.5,
  //   // // https://github.com/facebook/react-native/issues/10049#issuecomment-366426897
  //   // backgroundColor: '#FFF',
  //   // // Android shadow
  //   // elevation: 4
  // },
  box:{
      marginTop: 20,
    width: '100%',
    height: 400,
    overflow: 'hidden',
    backgroundColor: '#EDEDED',
    borderColor: '#000000',
    borderWidth: 0.4,
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderRadius: 37,
    alignSelf: 'center',
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
    // left: '88%',
    // right: '5.6%',
    // top: '5.67%',
    // bottom: '91.63%',
    width: 24,
    height: 22,
    left: 330,
    top: 46,

    /* teal */
    // backgroundColor: '#849CB0',
    // borderColor: '#000000',
    // border: 'border-box',
  },
  guideButton: {
    position: "absolute",
    width: 50,
    height: 50,
    left: 310,
    top: 663,
    //backgroundColor: '#FFFFFF',
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
    //top: 750,
    borderRadius: 100,
  },
  postCount: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 17,
    color: "#4F4F4F",
    marginBottom: 15,
    marginTop: 5,
    marginRight: 5,
    marginLeft: -70,
    position: "relative",
  },
  hashtag: {
    color: '#D2AE9A',
    fontWeight: '800',
  },
});
