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

const Following = (props: any) => {

  let [following, setFollowing] = useState(props.following);


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
              props.unfollow(id)
              setFollowing(false)
                // props.navigation.push("OthersProfile",{_id:props._id,following:false,setFollowing:setFollowing});
            } }
          ]
        );
  };

  return (
    <>
    <TouchableWithoutFeedback onPress={()=>{
      props.navigation.push("OthersProfile",{_id:props._id,following:following,setFollowing:setFollowing,   userId:props._id, removeFromFollowingList:props.removeFromFollowingList, addInFollowingList:props.addInFollowingList});
    }}>
      <View style={[styles.card, shadowStyle]}>
        <Image style={styles.profilePic} source={{uri:props.profilePhoto?photo_url+props.profilePhoto:''}} />
        <Text style={styles.followText}>{props.title}</Text>

        <TouchableOpacity onPress={()=> handleUnfollow(props._id)}>
            <Text style={styles.removeText}>Unfollow</Text>
        </TouchableOpacity>
      </View>
      </TouchableWithoutFeedback>
    </>
  );
};


const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 2,
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
    paddingLeft: 20,
    marginLeft: 1,
    fontSize: 16,
    
  },
  removeButton: {
    flex: 2,
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

export default Following;
