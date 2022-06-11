import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Text,
  FlatList,
  Image,
} from "react-native";
import { Icon, Card } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { user } from "../assets/testing_json/user";
import { Audio } from "expo-av";

// import AddCoverImage from '../components/AddCoverImage';
//The user information to be fetched and passed to the ProfileSharedLayout as parameter
//this is others profile so the user data will be recieved from the onPress call of this person's profile
interface Post {
  post_id: string;
  image: string;
}
type renderItemPropType = { item: Post };
let postArray: Post[] = [
  //to hold all the existing posts of the user now represented with dummy images
  {
    post_id: "1",
    image:
      "https://images.pexels.com/photos/1680140/pexels-photo-1680140.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  },
  {
    post_id: "2",
    image:
      "https://images.pexels.com/photos/2602545/pexels-photo-2602545.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  },
  {
    post_id: "3",
    image:
      "https://images.pexels.com/photos/1705254/pexels-photo-1705254.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  },
  {
    post_id: "4",
    image:
      "https://images.pexels.com/photos/673865/pexels-photo-673865.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
  },
];
let flag = 1;
let optionShow = false;
const mainHeader = () => {
  const [playingBio, setPlayingBio] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const [isPressed, setIsPressed] = useState({
    val:true
  })
  const updateFollow = () => {
    setIsPressed({
      ...isPressed,
      val: !isPressed.val
    })
  }
  async function playSound() {
    console.log("Loading Sound");
    try {
      const { sound } = await Audio.Sound.createAsync({
        // Get audioBio from user
        uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
      });

      setSound(sound);
      console.log("Playing Sound");
      await sound.playAsync().then(() => {
        setPlayingBio(true);
      });

      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded) {
          if (status.didJustFinish === true) {
            setPlayingBio(false);
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log("unloading....");
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handleMoreOptions = () => {
    optionShow = true;
  };

  return (
    <View style={styles.container}>
      {/*background image to be fetched from user's cover pic from data passed into this export fucntion */}
      <ImageBackground
        source={{
          uri: "https://images.pexels.com/photos/1705254/pexels-photo-1705254.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        }}
        style={styles.backgroundImage}
      >
        <View style={styles.ViewIcon}>
            <Icon
              name="dots-three-vertical"
              type="entypo"
              color="#fff"
              style={styles.icon}
              size={24}
              onPress={handleMoreOptions}
            />
          {/*support to be added to begin a chat with this person */}
        </View>
        {/* profile image to be fetched from user's selected profile picture from data passed into this export fucntion */}
        <View style={styles.viewImage}>
          <Image
            source={require("../assets/images/profile.jpg")}></Image>
          {/* <Image
            style={styles.image}
          ></Image>
        </View>
        <View style={styles.scrollview}>
          {/*user name to be taken from the passed user data */}
          <View style={styles.usernamewrap}>
            <Text style={styles.username}>Full Username</Text>
            <TouchableOpacity
              style={styles.audioicon}
              onPress={() => playSound()}
            >
              <Icon name="campaign" color={playingBio ? "#0000FF" : "#000"} />
            </TouchableOpacity>
            {/*support must be there to play the audio stored as audio-bio of this person */}
          </View>
          {/*user nickname to be taken from the passed user data */}
          <View>
            <Text style={styles.nickText}>@Andy</Text>
          </View>
          <TouchableOpacity onPress={()=>updateFollow()}>
            {isPressed.val ? 
              <View style={[styles.followButton]}>
                <Text style={styles.baseText}>Follow</Text>
              </View> : 
              <View style={[styles.followButton, {backgroundColor:'rgba(132,156,176,1)'}]}>
                <Text style={[styles.baseText, {color:'white'}]}>Following</Text>
              </View>
            }
          </TouchableOpacity>
          {/* onPress => forwared to the follow route and button will be changed to unfollow button */}

          {/* <TouchableOpacity style={styles.followButton}>
              <Text style={styles.baseText}>Follow</Text>
          </TouchableOpacity> */}
          {/* onPress() => forwards to the unfollow route  and button changed to follow button */}

          <View style={styles.statbox}>
            <View style={styles.block}>
              {/* number of posts to be taken from the passed user data */}
              <Text style={styles.titleText}>10</Text>
              <Text style={styles.baseText}>Posts</Text>
            </View>
            <View style={styles.block}>
              {/*number of follows to be taken from the passed user data */}
              <Text style={styles.titleText}>210</Text>
              <Text style={styles.baseText}>Following</Text>
            </View>
            <View style={styles.block}>
              {/* number of followers to be taken from the passed user data */}
              <Text style={styles.titleText}>2040</Text>
              <Text style={styles.baseText}>Followers</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const renderItem = ({ item }: renderItemPropType) => (
  <TouchableOpacity style={styles.card}>
    {/*onPress = should contain support to play the post */}
    <Image style={styles.postImage} source={{ uri: item.image }} />
  </TouchableOpacity>
);

const MoreOptions = () => {
  return (
    <>
      <Card containerStyle={styles.Morecard}>
        <View style={styles.optionViewStyle}>
          <ImageBackground
            source={require("../assets/images/mic.png")}
            style={{ width: 24, height: 24, marginTop: 7 }}
          ></ImageBackground>
          <Text style={styles.optionStyle}>Message User</Text>
        </View>
        <View style={styles.optionViewStyle}>
          <Icon name="block" size={24} color="grey" />
          <Text style={styles.optionStyle}>Block User</Text>
        </View>
      </Card>
    </>
  );
};

export default function OthersProfileLayout() {
  return (
    <View style={styles.flexContainer}>
      <FlatList<Post>
        ListHeaderComponent={mainHeader}
        data={postArray}
        keyExtractor={(item: Post) => item.post_id}
        renderItem={renderItem}
        numColumns={2}
        horizontal={false}
      />
      {optionShow ? (
        <View style={{ flex: 1 }}>
          <MoreOptions />
        </View>
      ) : null}
    </View>
  );
}

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  flexContainer: {
    flex: 1,
    flexDirection: "column",
  },
  followButton: {
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    borderColor: "#c3c3c3",
    alignSelf: "center",
    width: (width * 1) / 3,
    marginTop: (height * 1) / 35,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  ViewIcon: {
    // height: height*1/11,
    flex: 1,
    width: "100%",
    marginTop: (height * 1) / 15,
    marginBottom: (height * 1) / 50,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  navbar: {
    flex: 1,
    width: "100%",
    marginTop: (height * 1) / 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 10,
  },
  icon: {
    marginRight: 20,
  },
  viewImage: {
    display: "flex",
    alignItems: "center",
  },
  image: {
    height: (height * 1) / 5,
    width: (height * 1) / 5,
    borderRadius: (height * 1) / 10,
    backgroundColor: "#fff",
  },
  scrollview: {
    width: "100%",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: "#fff",
    flexDirection: "column",
    marginTop: (height * 1) / 12,
  },
  nameAndBio: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
  username: {
    fontSize: 25,
    fontFamily: "Montserrat-Bold",
    color: "black",
    alignSelf: "center",
    textAlign: "center",
    opacity: 0.7,
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
  usernamewrap: {
    marginTop: (height * 1) / 25,
    // marginBottom: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  statbox: {
    flexDirection: "row",
    // // borderTopColor: '#e3e3e3',
    // borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f3f3",
    marginTop: (height * 1) / 50,
  },
  titleText: {
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    color: "grey",
    alignSelf: "center",
    textAlign: "center",
    opacity: 0.8,
  },
  nickText: {
    fontSize: 18,
    fontFamily: "Montserrat",
    color: "grey",
    alignSelf: "center",
    textAlign: "center",
    opacity: 0.8,
  },
  baseText: {
    fontFamily: "Montserrat",
    fontSize: 14,
    textAlign: "center",
    opacity: 1,
    fontWeight:'500'
  },
  navTextBox: {
    width: width * 0.5,
  },
  block: {
    flexDirection: "column",
    justifyContent: "center",
    // padding: 10,
    height: Dimensions.get("window").width * (1 / 4),
    width: Dimensions.get("window").width * (1 / 3),
  },
  card: {
    height: width * 0.5,
    width: width * 0.5,
    // marginLeft : width*0.04/3
    // borderRadius: 5,
    // flex: 1,
  },
  postImage: {
    width: width * 0.5,
    height: width * 0.5,
    // borderRadius: 5,
    // flex: 1,
  },
  Morecard: {
    height: 100,
    width: width,
    margin: 0,
    padding: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: "absolute",
    top: height - 650,
  },
  Morecardstyle: {
    position: "absolute",
    bottom: "-100%",
  },
  optionViewStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: 60,
    marginTop: 20,
  },
  optionStyle: {
    fontSize: 16,
    marginLeft: 20,
    marginTop: 3,
    color: "#4F4F4F",
  },
});
