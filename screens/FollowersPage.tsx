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
import FollowersList from "../components/FollowersList";
import { Searchbar } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
const axios = require('axios');
var qs = require('qs');
const api = require('../api.json');

const follow_user_url = api.follow_user

export default function FollowersPage(props: any) {




  let [followersData, setFollowersData] = useState(props.route.params.data);
  let [followers, setFollowers] = useState(
    followersData.filter((element) => element.followingMe === true)
  );
  let [text, setText] = useState("");

  const handleClickBack = () => {
    props.navigation.goBack();
    console.log("Clicked Back!"); // Clicking back
  };

  const remove = (_id: string) => {

    // API is not create yet

    // this should be id
    let index = followers.findIndex((element) => element._id === _id);
    followers[index].blocked = true;
    setFollowers(followers.filter((element) => element.followingMe === true));
  };

  const unremove = (_id: string) => {

    // API is not create yet

    let index = followers.findIndex((element) => element._id === _id);
    followers[index].blocked = false;
    setFollowers(followers.filter((element) => element.followingMe === true));
  };

  const add = (_id: string) => {
    
    followAtBackend(_id)

    let index = followers.findIndex((element) => element._id === _id);
    followers[index].following = true;
    setFollowers(followers.filter((element) => element.followingMe === true));
  };

  const followAtBackend = (_id:any)=>{
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
        url: follow_user_url,
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
          title={"Followers"}
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
          <FollowersList
            list={followers.filter((element) =>
              element.name.toUpperCase().includes(text.toUpperCase())
            )}
            remove={remove}
            unremove={unremove}
            add={add}
            navigation={props.navigation}
          ></FollowersList>
        ) : (
          <FollowersList
            list={followers}
            remove={remove}
            unremove={unremove}
            add={add}
            navigation={props.navigation}
          ></FollowersList>
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
