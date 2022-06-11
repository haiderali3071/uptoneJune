import React,{useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import RNGestureHandlerButton from "react-native-gesture-handler/lib/typescript/components/GestureHandlerButton";
import {
  RouteParamList,
  RouteStackParamList,
} from "../navigation/RouteParameterList";
import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');
var qs = require('qs');
const api = require('../api.json');
const follow_hashtag_url = api.follow_hashtag;
const unfollow_hashtag_url = api.unfollow_hashtag;
const get_following_hashtags_url = api.get_following_hashtags

export default function FollowButton(props:any) {
  const [isPressed, setIsPressed] = React.useState(props.isPressed);
  const hashtag = props?.hashtag.substring(1);

  useEffect(()=>{
     AsyncStorage.getItem('hashId').then((id)=>{
       var config = {
          method: 'get',
          url: get_following_hashtags_url+id,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        };
        axios(config).then((json:any)=>{
          if(json.data.includes(hashtag)){
            setIsPressed(false)
          }
          else{
            setIsPressed(true)
          }
        })
    })
  },[])

  const updateFollow = () => {
    setIsPressed(!isPressed);
    AsyncStorage.getItem('accessToken').then((token:any)=>{
      var config
      if(isPressed){
         config = {
          method: 'patch',
          url: follow_hashtag_url+hashtag,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            authorization: token,
          },
        };
        
      }
      else{
         config = {
          method: 'patch',
          url: unfollow_hashtag_url+hashtag,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            authorization: token,
          },
        };
        
      }

      axios(config).then((json:any)=>{
       alert(json.data.data.message)
      })
    })
  };

  return (
    <View>
      {isPressed ? (
        <TouchableOpacity
          onPress={() => updateFollow()}
          style={[
            styles.followOutline,
            { backgroundColor: "white", width: 91 },
          ]}
        >
          <Text
            style={[
              styles.followingButtonText,
              { color: "rgba(132,156,176,1)" },
            ]}
          >
            Follow
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => updateFollow()}
          style={[
            styles.followOutline,
            { backgroundColor: "rgba(132,156,176,1)", width: 91 },
          ]}
        >
          <Text style={[styles.followingButtonText, { color: "white" }]}>
            Following
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  followingButtonText: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 17,
  },
  followOutline: {
    borderRadius: 35,
    borderWidth: 1,
    height: 30,
    left: 5,
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(132,156,176,1)",
    position: "absolute",
  },
});
