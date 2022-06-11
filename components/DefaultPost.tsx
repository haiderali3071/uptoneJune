import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import HomePagePopUp from './HomePagePopUp';
import AudioCommentPopUp from './AudioCommentPopUp';
export default function DefaultPost(props: any,) {

      interface ref2 {
            current: any;
      }
      interface ref_audio {
            current: any;
      }

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
      const [leftBottom, setLeftBottom] = useState({left:props.left, bottom: props.bottom, display:'inline'});
      const refRBSheet: ref2 = useRef(null);
      const refARBSheet: ref_audio = useRef(null);
      return (
            <View style = {props.style}>
            <View style={styles.flag}>
            <Image source = {require('../assets/images/Vector2.png')}></Image>
            </View>
            <View style={styles.timeOnSpot}>
                  <Text style={styles.timeText}>{props.currentTime}</Text>
            </View>
            <View style={styles.timeTotalSpot}>
                  <Text style={styles.timeText}>{props.totalTime}</Text>
            </View>
            <View style={styles.circle}>
                  <Image source={require('../assets/images/Ellipse.png')}></Image>
            </View>
            <View style={styles.highlightedCircle}>
                  <Image source={require('../assets/images/EllipseHeight.png')}></Image>
            </View>
            <TouchableOpacity >
            <View style={styles.dotButton}></View>
            </TouchableOpacity>
            <TouchableOpacity >
            <View style={styles.pauseButton}>
                  <Image source={require('../assets/images/Pause.png')}></Image>
            </View>
            </TouchableOpacity>
            <View style={styles.name}>
                  <Text style={styles.nameText}>{props.usersName}</Text>
            </View>
            <View style={styles.timeAgo}>
                  <Text style={styles.timeAgoText}>{props.timeSincePosted}</Text>
            </View>
            <View style={styles.caption}>
                  <Text style={styles.captionText}>{props.userCaption}</Text>   
            </View>
            <TouchableOpacity onPress = {selectLike}>
                  {liked ?
                        <View>
                              <Image source={
                              require('../assets/images/redheartIcon.png')
                              } style={
                                    styles.heart
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
            </TouchableOpacity>
            <TouchableOpacity >
            <View style={styles.numLikes}>
                  <Text style={styles.reactionText}>{liked ?
                        props.amountLikes+1 : props.amountLikes
                  } likes</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity >
            <View style={styles.chatPic}>
                  <Image source={require('../assets/images/commentIcon.png')}></Image>
            </View>
            <View style={styles.numComments}>
                  <Text style={styles.reactionText}>{props.amountComments} comments</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>refRBSheet.current.open()}>
                  <View style={styles.tripleDot}>
                        <Text style={styles.tripleLook}>...</Text>
                  </View>
            </TouchableOpacity>
            <HomePagePopUp
                  refRBSheet={refRBSheet}
                  close={()=>refRBSheet.current.close()}/>
            </View>

      );
}

const styles = StyleSheet.create({
      flag: {
            position: 'absolute',
            left: '75.47%',
            right: '17.33%',
            top: '0%',
            bottom: '85.59%',

      },
      timeOnSpot: {
            position: 'absolute',
            width: 28,
            height: 17,
            left: 25,
            top: 138,

            /* small text */

      },
      timeText: {
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: 12,
            lineHeight: 15,
            textAlign: 'center',

            /* darkgrey */
            color: '#4F4F4F',
      },
      timeTotalSpot: {
            position: 'absolute',
            width: 26,
            height: 16,
            left: 330,
            top: 142,
      },
      circle: {
            position: 'absolute',
            width: 214,
            height: 214,
            left: 77,
            top: 50,
      },
      highlightedCircle: {
            position: 'absolute',
            width: 212,
            height: 107,
            left: 75,
            top: 50,
      },
      dotButton: {
            position: 'absolute',
            width: 13,
            height: 14,
            left: 283,
            top: 155,
            borderRadius: 50,
            backgroundColor: '#4F4F4F',
            transform: ([{ rotate: '-90deg' }]),
      },
      pauseButton: {
            position: 'absolute',
            width: 30,
            height: 46.36,
            left: 169,
            top: 210 - 83,
      },
      name: {
            position: 'absolute',
            width: 216,
            height: 22,
            top: 347 - 83,
            left: 96,
      },
      nameText: {
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: 22,
            lineHeight: 27,
            color: '#4F4F4F',
      },
      caption: {
            position: 'absolute',
            width: 308,
            height: 30,
            top: 403 - 83,
            left: 27,
      },
      captionText: {
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: 12,
            lineHeight: 15,
            color: '#4F4F4F',
      },
      timeAgo: {
            position: 'absolute',
            width: 26,
            height: 22,
            top: 347 - 83,
            left: 82 + 216,
      },
      timeAgoText: {
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: 12,
            lineHeight: 27,
            color: '#4F4F4F',
      },
      heart: {
            position: 'absolute',
            width: 14,
            height: 14,
            left: 27,
            top: 441 - 83,
      },
      chatPic: {
            position: 'absolute',
            width: 12,
            height: 12,
            left: 103,
            top: 441 - 83,

      },
      numLikes: {
            position: 'absolute',
            width: 50,
            height: 12,
            left: 45,
            top: 441 - 83,
      },
      reactionText: {
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: 10,
            lineHeight: 12,
      },
      numComments: {
            position: 'absolute',
            width: 80,
            height: 12,
            left: 103 + 12 + 5,
            top: 441 - 83,
      },
      tripleDot: {
            position: 'absolute',
            width: 18,
            height: 45,
            left: 350,
            top: 412 - 83,
      },
      tripleLook: {
            fontFamily: 'Montserrat',
            fontStyle: 'normal',
            fontWeight: '500',
            fontSize: 25,
            lineHeight: 30,
            color: '#4F4F4F',
            transform: ([{ rotate: '90deg' }]),
      }



})
