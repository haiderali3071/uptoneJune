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
import { Icon } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { user } from "../assets/testing_json/user";
import { Audio } from "expo-av";
import Navigation from "../navigation";
import { useNavigation, createNavigatorFactory } from "@react-navigation/native";
import ProfileSettings from '../screens/ProfileSettingsOld';
import { RouteStackParamList } from "../navigation/RouteParameterList";

// import AddCoverImage from '../components/AddCoverImage';
//The user information to be fetched and passed to the ProfileSharedLayout as parameter
//this is self user profile -- hence the data from authentication source is to be passed
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
let flag = 1

const mainHeader = ({ navigation, route }: RouteStackParamList<"HomePage">) => {
  const [playingBio, setPlayingBio] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);

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
  const navigation2=useNavigation();
  return (
    <View style={styles.container}>
      {/*background image to be fetched from user's cover pic from data passed into this export fucntion */}
      <ImageBackground
        source={{
          uri:
            "https://images.pexels.com/photos/1705254/pexels-photo-1705254.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        }}
        style={styles.backgroundImage}
      >
        <TouchableOpacity>
        <View style={styles.ViewIcon}>
          {/* <Icon name="image" color="#fff" style={styles.icon} /> */}
          {/*support to be added for changing cover picture */}
            <Icon name="settings" color="#fff" style={styles.icon}/>
          {/*support to be added for navigating to settings screen */}
        </View>
        </TouchableOpacity>
        {/* profile image to be fetched from user's selected profile picture from data passed into this export fucntion */}
        <View style={styles.viewImage}>
          <Image
            source={require("../assets/images/profile.jpg")}
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
              <Icon name="campaign" color={playingBio? "#0000FF" : "#000"} />
            </TouchableOpacity>
            <Icon name="settings" color="#fff" style={styles.icon} />
            {/*support to be added for navigating to settings screen */}
          </View>
          {/* profile image to be fetched from user's selected profile picture from data passed into this export fucntion */}
          <View style={styles.viewImage}>
            <Image
              source={require("../assets/images/profile.jpg")}
              style={styles.image}
            />
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
              {/*put a audio icon in place of camera and provide support for uploading an audio bio */}
            </View>
            {/*user nickname to be taken from the passed user data */}
            <View>
              <Text style={styles.nickText}>@Andy</Text>
            </View>
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
            <View style={styles.navbar}>
              <TouchableOpacity
                style={styles.navTextBox}
                onPress={() => toggleSaved(false)}
              >
                <Text style={styles.baseText}>My posts</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.navTextBox}
                onPress={() => toggleSaved(true)}
              >
                <Text style={styles.baseText}>Saved</Text>
              </TouchableOpacity>
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

export default function ProfileSharedLayout() {
  const [showSaved, setShowSaved] = React.useState(false);
  const [data, setData] = React.useState(savedPostArray);
  React.useEffect(() => {
    setData(showSaved ? savedPostArray : postArray);
  }, [showSaved]);

  return (
    <View style={styles.flexContainer}>
      <FlatList<Post>
        ListHeaderComponent={(props) => (
          <Header toggleSaved={setShowSaved} {...props} />
        )}
        data={data}
        keyExtractor={(item: Post) => item.post_id}
        renderItem={renderItem}
        numColumns={2}
        horizontal={false}
        extraData={data}
      />
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
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  ViewIcon: {
    // height: height*1/11,
    flex: 1,
    width: "100%",
    marginTop: height*1/30,
    marginBottom: height*1/50,
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
    borderRadius: height / 5,
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
    marginTop: (height * 1) / 20,
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
    opacity: 0.6,
    padding: 5,
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
});

