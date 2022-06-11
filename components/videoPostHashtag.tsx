import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';
import HomePagePopUp from '../components/HomePagePopUp';
import Draggable from 'react-native-draggable';
import {Icon} from 'react-native-elements';
import CircleSlider from "react-native-circle-slider"; 
import AudioCommentPopUp from '../components/AudioCommentPopUp';

export default function VideoPostHashtag(props: any,) {

      interface ref2 {
            current:any;
      }
      interface ref_audio {
            current:any;
        }
      const refARBSheet: ref_audio = useRef(null);

      // const state = {
      //       like: 'Unlike', 
      //       liked : false,
      // }

      // const selectLike = () => {
      //       setState((prevstate: { liked: any; }) => {
      //             return {
      //             ...prevstate, 
      //             like: (prevstate.liked ? 'Unlike' : 'like'), liked: !prevstate.liked
      //             }
      //       })
      // };
      const [liked, setLiked] = useState<boolean>(false);
      const selectLike = () => setLiked(!liked);
      const [paused,setPause]=useState<boolean>(true);
      const selectPause = () => setPause(!paused);
      let message=[]
      const hashtagit = (caption: string) => {
            const words=caption.split(' ')
            for (let i=0; i < words.length; i++){
                  if (words[i].startsWith("#")){
                  message.push(
                        <TouchableOpacity>
                              <Text style={styles.hashtag}>{' ' + words[i] }</Text>
                        </TouchableOpacity>
                        )
                  }
                  else{
                        message.push(' ' + words[i])
                  }
            }
            return message
      }
      const refRBSheet: ref2 = useRef(null);
      return (
            <View style = {props.style}>
            <ImageBackground
      source={props.backgroundPhoto}
      style ={{flex: 1}}
  >
        <BlurView intensity = {100} style={props.blurContainer}>
        {/* <Draggable onDrag = {props.onPress} onPressIn = {props.onPress} minX={0} minY={0} maxX={0} maxY={0}> */}
      <TouchableOpacity style={styles.flag} >
      <Image source = {require('../assets/images/Vector2.png')}></Image>
      </TouchableOpacity>
      <View style={{
            // flex:1,
            flexDirection:"row",
            justifyContent: "space-between",
            height:"55%",
            paddingHorizontal:20
      }}>
      <View style={styles.timeOnSpot}>
            <Text style={styles.timeText}>{props.currentTime}</Text>
      </View>
      <View style={{ flex:1, position: "relative",marginHorizontal:20}}>
      <View style={styles.circle}>
                  <CircleSlider
                  onValueChange = {(x) => console.log("kfndnknkdnfkn",x)}
                  dialWidth	={5} value = {180} dialRadius={107} btnRadius={6.5} strokeColor={"grey"} strokeWidth={.5} meterColor={"black"} textSize={-25} textColor={"black"}/>
      </View>
      <TouchableOpacity style={{position: "absolute", alignSelf:"center", justifyContent:"center", alignItems: "center", marginTop :"25%"}}
      //  onPress= {()=> alert("dfj")} 
      onPress = { selectPause}
      >
            {paused ?
                        <Image source={
                              require('../assets/images/Play.png')
                        } style={
                              styles.playButton
                        }
                  
                        /> :
                        <Image source={
                              require('../assets/images/Pause.png')
                        } style={
                              styles.pauseButton
                        }
                        />
            }
      </TouchableOpacity>
      </View>
      <View style={styles.timeTotalSpot}>
            <Text style={styles.timeText}>{props.totalTime}</Text>
      </View>
</View>

      <View style={styles.name}
         onTouchEnd={() => {
            props.navigation.navigate("OthersProfile");
          }}
      >
            <Text style={styles.nameText}>{props.usersName}
            <Text style={styles.timeAgoText}>{ props.timeSincePosted}</Text>
            </Text>
      </View>
      <View style={styles.caption}>
            <Text style={styles.captionText}>{hashtagit(props.userCaption)}</Text>
            <TouchableOpacity style={styles.tripleLook} onPress={()=> {
                  refRBSheet.current.open()
            }
            }>
                  <Text style={styles.tripleLookText}>...</Text>
            </TouchableOpacity>
      </View>
      <View style={{flex: 1, flexDirection: "row" , marginTop: "10%"}}>
      <TouchableOpacity style={styles.numLikes} 
      onPress = {selectLike}
      >
            {liked ?
                  <View>
                        <Image source={
                        require('../assets/images/redheartIcon.png')
                        } style={
                              [styles.heart,{width:12, height:12}]
                        }
                        /></View> :
                  <View>
                        <Image source={
                              require('../assets/images/heartIcon.png')
                        } style={
                              styles.heart
                        }
                        /></View>
            }
               <Text style={styles.reactionText}>{liked ?
                  props.amountLikes+1 : props.amountLikes
            } likes</Text>
      </TouchableOpacity>
      <View>
      <TouchableOpacity style={styles.numComments} onPress={()=>{refARBSheet.current.open()}}>

            <Image source={require('../assets/images/commentIcon.png')}></Image>
            <Text style={styles.reactionText}>{props.amountComments} comments</Text>
      </TouchableOpacity>
    </View>
      </View>
     
      <HomePagePopUp
            refRBSheet={refRBSheet}
            close={()=>refRBSheet.current.close()}/>
            {/* </Draggable> */}
            </BlurView>
            </ImageBackground>
            <AudioCommentPopUp refARBSheet={refARBSheet} close={()=>refARBSheet.current.close()} /> 

      </View>
      );
}
const boxHeight=415;
const figmaHeight=375;
const styles = StyleSheet.create({
      container: {
            width: '100%',
            height: '100%',
            borderRadius: 37,
      },
      flag: {
            alignSelf:"flex-end",
            marginRight:40
            
      },
      timeOnSpot: {
            // position: 'absolute', 
            width: 28,
            // height: 17,
            justifyContent:"center"

            // left: (25/375)*boxHeight,
            // top: 130,

            /* small text */

      },
      timeText:{
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: 12,
            lineHeight: 15,
            textAlign: 'center',
            justifyContent: "center",
            /* darkgrey */
            color: '#4F4F4F',
      },
      timeTotalSpot:{
            // position: 'absolute',
            width: 26,
            justifyContent:"center"
            // left: 310,
            // top: 130, 

      },
      circle:{
            position: 'absolute',
            // width:"50%",
            // height: "30%",
            // left: 70,
            // marginLeft: "17%",
            // marginTop: "5%",
            alignSelf:"center",
            alignItems:"center",
            transform: [{ rotate: '270deg'}],

      },
      highlightedCircle:{
            position: 'absolute',
            width: 214,
            height: 107,
            left: 101,
            top: 50,
      },
      dotButton: {
            position: 'absolute',
            width: 13,
            height: 14,
            left: 309,
            // top: 155,
            borderRadius: 50,
            backgroundColor: '#4F4F4F',
            transform: ([{ rotate: '-90deg' }]),
      },
      pauseButton: {
            // position: 'absolute',
            // width: 42,
            // height: 46.36,
            // left: 160,
            // top: 80,
      },
      playButton: {
            // position: 'absolute',
            // width: 42,
            // height: 46.36,
            // left: 160,
            // top: 80,
      },
      name:{
            // width: 420,
            // height: 22,
            // top: 347-83,
            // left: 90,
            alignSelf:"center"
            // alignSelf:"center"
      },
      nameText:{
            fontFamily:'Montserrat',
            fontStyle:'normal',
            fontWeight:'bold',
            fontSize:22,
            // lineHeight: 27,
            color: '#4F4F4F',
            // textAlign: "center"
      },
      caption:{
            display: "flex",
            flexDirection: "row",
            // width: 308,
            // height: 30,
            // top: 403-83,
            alignSelf: "center",
      },
      captionText:{
            fontFamily: 'Montserrat',
            fontStyle:'normal',
            fontWeight:'500',
            fontSize: 12,
            lineHeight: 15,
            color: '#4F4F4F',
            width: "80%"
      },
      timeAgo:{
            position:'absolute',
            width: 26,
            height: 22,
            top: 347-83,
            left: 110,
      },
      timeAgoText:{
            fontFamily:'Montserrat',
            fontStyle:'normal',
            fontWeight:'400',
            fontSize:12,
            // lineHeight: 27,
            color: '#4F4F4F',
      },
      heart:{
            // position: 'absolute',
            // width: 14,
            // height: 14,
            // left: 27,
            // left: (25/375)*boxHeight,
            // top: 441-83,
      },
      chatPic: {
            position: 'absolute',
            width: 12,
            height: 12,
            // left: 103,
            left: (103/figmaHeight)*boxHeight,
            top: 441-83,

      },
      numLikes:{
            display: "flex",
            flexDirection: "row",
            justifyContent :"space-between",
            position: 'absolute',
            width: 60,
            height: 12,
            left: 20,
            // top: 441-83,
            // top : 80
      },
      reactionText:{
            fontFamily: 'Montserrat',
            fontStyle:'normal',
            fontWeight: '500',
            fontSize: 10,
            lineHeight: 12,
      },
      numComments:{
            display: "flex",
            flexDirection: "row",
            justifyContent :"space-between",
            position: 'absolute',
            width: 80,
            height: 12,
            // left: (121/figmaHeight)*boxHeight,
            left: 90,
            // top: 441-83,
      },
      tripleDot:{
            position: 'absolute',
            width: 18,
            height: 45,
            // left: 300
            // left: 415-(25/375)*boxHeight,
            // top: 303,
      },
      tripleLook:{
            // marginLeft: 10,
            // width: "10%",
            paddingHorizontal: 10,
            // flex:1
            // fontFamily: 'Montserrat',
            // fontStyle: 'normal',
            // fontWeight: '500',
            // fontSize: 25,
            // lineHeight: 30,
            // color: '#4F4F4F',
            // transform: ([{ rotate: '90deg' }]),
      },
      tripleLookText : {
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: 25,
            // lineHeight: 30,
            color: '#4F4F4F',
            transform: ([{ rotate: '90deg' }]),
      },
      hashtag: {
            color: '#D2AE9A',
            fontWeight: '800'
      }



})