import React,{useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  TouchableWithoutFeedback
} from "react-native";

const api = require('../api.json');
const photo_url = api.photo

const Followers = (props: any) => {
  let [following, setFollowing] = useState(props.following);

  const handleRemove = (_id: any) => {
    // replace id to identify
    Alert.alert(
      `Remove ${props.title}`,
      `Are you sure you want to remove ${props.title} `,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Remove", onPress: () => props.remove(_id) },
      ]
    );
  };

  const handleUnremove = (_id: any) => {
    Alert.alert(
      `Remove ${props.title}`,
      `Are you sure you want to Un-Remove ${props.title} `,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Remove", onPress: () => props.unremove(_id) },
      ]
    );
  };

  const handleAdd = (_id: any) => {
    setFollowing(true)
    props.add(_id);
    props.navigation.push("OthersProfile",{_id:props._id,following:true,setFollowing:setFollowing});
  };

  return (
    <>
    <TouchableWithoutFeedback onPress={()=>{
      props.navigation.push("OthersProfile",{_id:props._id,following:following,setFollowing:setFollowing});
    }}>
      <View
        style={[styles.card, shadowStyle]}
      >
        <Image
          style={styles.profilePic}
          source={{uri:props.profilePhoto?photo_url+props.profilePhoto:''}}
        />
        <Text style={styles.followText}>{props.title}</Text>
        {following ? (
          <></>
        ) : (
          <TouchableOpacity
            style={styles.addUserIconContainer}
            onPress={() => handleAdd(props._id)}
          >
            <Image
              style={styles.addUserIcon}
              source={require("../assets/images/user-follow.png")}
            ></Image>
          </TouchableOpacity>
        )}
        {props.blocked ? (
          <TouchableOpacity onPress={() => handleUnremove(props._id)}>
            <Text style={styles.removeText}>Un-Remove</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => handleRemove(props._id)}>
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        )}
      </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 3,
};
const styles = StyleSheet.create({
  card: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 7,
    flexDirection: "row",
    width: "95%",
    height: 70,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "#FFF",
  },
  profilePic: {
    // flex: 1,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    width: 50,
    height: 70,
  },
  followText: {
    flex: 4,
    textAlign: "left",
    paddingTop: 25,
    paddingLeft: 20,
    marginLeft: 1,
    fontSize: 14,
  },
  removeButton: {
    flex: 2,
  },
  removeText: {
    color: "#aaaaaa",
    flex: 4,
    fontSize: 12,
    fontWeight: "bold",
    paddingTop: 25,
    paddingRight: 15,
  },
  addUserIcon: {
    marginTop: 20,
    width: 25,
    height: 25,
  },
  addUserIconContainer: {
    paddingLeft: 0,
    marginRight: 15,
  },
});

export default Followers;
