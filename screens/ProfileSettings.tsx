import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
} from "react-native";
import FormData from "form-data";
import { Card, Button, Text, Divider } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { RouteStackParamList } from "../navigation/RouteParameterList";
import Navigation from "../navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
const axios = require("axios");
var qs = require("qs");
const api = require("../api.json");
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";

const logout_url = api.logout;
const upload_profile_url = api.upload_profile;
const photo_url = api.photo;

export default function ProfileSettings(
  props: RouteStackParamList<"ProfileSettings">
) {
  const [image, setImage] = useState("");
  const [user, setUser] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem("user").then((user: any) => {
        user = JSON.parse(user);
        setUser(user);
      });
    }, [])
  );

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (user?.data?.profilePhoto) {
      user.data.profilePhoto = null;
    }
    setUser(user);

    if (!result.cancelled) {
      setImage(result.uri);

      AsyncStorage.getItem("user").then((user: any) => {
        user = JSON.parse(user);

        var formData = new FormData();
        formData.append("profile", {
          uri:
            Platform.OS === "android"
              ? result.uri
              : result.uri.replace("file://", ""),
          type: "image/jpeg",
          name: "_profile_" + user?.data?._id + ".jpg",
        });
        var config = {
          method: "patch",
          url: upload_profile_url + user?.data?._id,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        };
        axios(config)
          .then((json: any) => {
            Alert.alert(json.data.message, "", [
              {
                text: "Ok",
                onPress: () => {
                  if (json.data.message == "Done") {
                  }
                },
              },
            ]);
          })
          .catch((error: any) => console.log("=========error======", error));
      });
    }
  };

  const handleEditProfile = () => {
    props.navigation.navigate("EditProfile");
  };

  const handlePasswordIcon = () => {
    props.navigation.navigate("ChangePassword");
  };

  const handleExitIcon = () => {
    AsyncStorage.getItem("user").then((user: any) => {
      user = JSON.parse(user);

      var data = qs.stringify({});
      var config = {
        method: "post",
        url: logout_url + user?.data?._id,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data,
      };
      axios(config)
        .then((json: any) => {
          Alert.alert(json.data.message, "", [
            {
              text: "Ok",
              onPress: () => {
                if (json.data.message == "Done") {
                  props.navigation.navigate("LoginPage");
                }
              },
            },
          ]);
        })
        .catch((error: any) => console.log("=========error======", error));
    });
  };
  const handleEmailIcon = () => {
    props.navigation.navigate("ChangeEmail");
  };
  const goBack = () => {
    props.navigation.navigate("Profile");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: user?.data?.backgroundPhoto
            ? photo_url + user.data.backgroundPhoto
            : "",
        }}
        style={styles.backgroundImage}
      >
        <View onTouchEnd={() => props.navigation.goBack()}>
          <MaterialIcons
            className="setting-icon"
            name="arrow-back"
            size={30}
            color="white"
            style={{ marginTop: "10%", marginLeft: 20 }}
          />
        </View>
        <ScrollView style={{ paddingBottom: 30 }}>
          <View style={styles.viewImage}>
            <Card containerStyle={styles.cardImage}>
              <ImageBackground
                source={{
                  uri: user?.data?.profilePhoto
                    ? photo_url + user.data.profilePhoto
                    : image,
                }}
                style={styles.image}
                imageStyle={{ borderRadius: 50, resizeMode: "contain" }}
              >
                <View style={styles.imageChangeStyle}>
                  <MaterialIcons
                    className="setting-icon"
                    name="camera-alt"
                    size={24}
                    color="grey"
                    onPress={pickImage}
                  />
                </View>
              </ImageBackground>
            </Card>
          </View>
          <View style={styles.viewImage}>
            <TouchableOpacity style={styles.button}>
              <Text
                style={{ color: "#4F4F4F", fontSize: 16, fontWeight: "600" }}
              >
                Add / Edit Greeting
              </Text>
              <Image
                source={require("../assets/images/speaker1x.png")}
                style={{ marginLeft: 5 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.cardStyle}>
            <Card containerStyle={styles.card}>
              <View style={styles.cardOpener}>
                <View
                  style={{
                    backgroundColor: "lightgrey",
                    height: "100%",
                    width: "10%",
                    borderRadius: 15,
                  }}
                ></View>
              </View>
              <View style={styles.headerStyle}>
                <Text style={styles.headerTextStyle}>Settings</Text>
              </View>
              <Divider style={styles.dividerStyle} />
              <View style={styles.optionViewStyle}>
                <MaterialIcons
                  className="setting-icon"
                  name="account-circle"
                  size={24}
                  color="grey"
                />
                <Text style={styles.optionStyle} onPress={handleEditProfile}>
                  Edit Profile
                </Text>
              </View>
              <View style={styles.optionViewStyle}>
                <Image
                  source={require("../assets/images/lock1x.png")}
                  style={{ width: 21, height: 24 }}
                />
                <Text style={styles.optionStyle} onPress={handlePasswordIcon}>
                  Change Password
                </Text>
              </View>

              <View style={styles.optionViewStyle}>
                <MaterialIcons
                  className="setting-icon"
                  name="email"
                  size={25}
                  color="grey"
                />
                <Text style={styles.optionStyle} onPress={handleEmailIcon}>
                  Change Email
                </Text>
              </View>
              <View style={styles.optionViewStyle}>
                <Image
                  source={require("../assets/images/logout.png")}
                  style={{ width: 21, height: 24 }}
                />
                <Text style={[styles.optionStyle]} onPress={handleExitIcon}>
                  Log Out
                </Text>
              </View>
            </Card>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    height: height,
    width: width,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  viewImage: {
    display: "flex",
    alignItems: "center",
    // justifyContent: "center",
    // marginTop: -30
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  cardImage: {
    // height: 100,
    width: 100,
    borderRadius: 60,
    // display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    // marginTop: "20%",
  },
  button: {
    backgroundColor: "#fff",
    marginTop: "15%",
    borderRadius: 20,
    paddingTop: "3%",
    paddingBottom: "3%",
    paddingLeft: "10%",
    paddingRight: "10%",
    marginBottom: "30%",
    flexDirection: "row",
  },
  cardOpener: {
    width: "100%",
    height: "1%",
    marginTop: "1%",
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  cardStyle: {
    flex: 1,
    height: "100%",
    // paddingBottom: "100%",
  },
  card: {
    // height: height - 300,
    width: "100%",
    margin: 0,
    padding: 0,
    height: "100%",
    marginTop: 90,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  headerStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: -10,
  },
  headerTextStyle: {
    fontSize: 21,
    paddingTop: 20,
    color: "#4F4F4F",
    fontWeight: "600",
    fontFamily: "Montserrat",
  },
  dividerStyle: {
    marginTop: "5%",
    marginLeft: "25%",
    marginRight: "25%",
  },
  optionViewStyle: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: 30,
    marginVertical: 16,
  },
  optionStyle: {
    fontSize: 16,
    marginLeft: 20,
    marginTop: 3,
    color: "#4F4F4F",
  },
  bottomStyle: {
    height: height,
  },
  imageChangeStyle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: 77,
    marginTop: 65,
  },
});
