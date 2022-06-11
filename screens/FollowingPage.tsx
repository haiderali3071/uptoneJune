import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import Following from "../components/Following";
import BackArrow from "../components/BackArrow";
import FollowHeader from "../components/FollowHeader";
import { baseProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlers";
import FollowingList from "../components/FollowingList";
import { Searchbar } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');
var qs = require('qs');
import { useFocusEffect } from '@react-navigation/native';
const api = require('../api.json');

const get_follow_status_url = api.get_follow_status
const get_user_by_id_url = api.get_user_by_id
const unfollow_user_url = api.unfollow_user

export default function FollowingPage(props: any) {

  let [followingData, setFollowingData] = useState(props.route.params.data);
  let [following, setFollowing] = useState(
    followingData.filter((element) => element.following === true)
  );
  let [text, setText] = useState("");

  const handleClickBack = () => {
    props.navigation.goBack();

    console.log("Clicked Back!"); // Clicking back
  };

  const unfollow = (_id: string) => {
    
    unfollowAtBackend(_id)
    // this should be id
    let index = following.findIndex((element) => element._id === _id);
    following[index].following = false;
    setFollowing(following.filter((element) => element.following === true));

// // added this to change follow / following text on OthersProfile page
//      props.navigation.pop()
//      props.navigation.push("OthersProfile",{_id:_id,following:false});
  };

  const removeFromFollowingList = (_id:string)=>{
    let index = following.findIndex((element) => element._id === _id);
    following[index].following = false;
    setFollowing(following.filter((element) => element.following === true));
  }

  const addInFollowingList = (_id:string)=>{
    let index = following.findIndex((element) => element._id === _id);
    following[index].following = true;
    setFollowing(following.filter((element) => element.following === true));
  }

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

  return (
    <>
      <View style={{ backgroundColor: "white" }}>
        <FollowHeader
          title={"Following"}
          text={text}
          setText={setText}
          handleClickBack={handleClickBack}
        ></FollowHeader>
        <Searchbar
          placeholder="Search"
          onChangeText={() => {}}
          value={""}
          style={styles.input}
          inputStyle={{ fontSize: 16 }}
        />

        {text.length > 0 ? (
          <FollowingList
            list={following.filter((element) =>
              element.name.toUpperCase().includes(text.toUpperCase())
            )}
            unfollow={unfollow}
            removeFromFollowingList={removeFromFollowingList}
            addInFollowingList={addInFollowingList}
            navigation={props.navigation}
          ></FollowingList>
        ) : (
          <FollowingList
            list={following}
            unfollow={unfollow}
            removeFromFollowingList={removeFromFollowingList}
            addInFollowingList={addInFollowingList}
            navigation={props.navigation}
          ></FollowingList>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    height: 30,
    width: "90%", //
    alignSelf: "center",
    backgroundColor: "#F2F2F2",
    marginBottom: 20,
    marginTop: -20,
    borderRadius: 50,
    paddingLeft: 20,
  },
  input: {
    alignSelf: "center",
    marginLeft: 10,
    marginRight: 10,
    paddingHorizontal: 5,
    height: 35,
    backgroundColor: "#eee",
    width: 350,
    borderRadius: 40,
    marginBottom: 20,
    fontSize: 17,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0,
    elevation: 1,
  },
});
