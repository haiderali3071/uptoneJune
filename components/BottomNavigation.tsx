import React, { useRef } from "react";
import { Text, View, TouchableOpacity, Image, Platform } from "react-native";
import { RouteStackParamList } from "../navigation/RouteParameterList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import NotificationPage from "../screens/NotificationPage";
import HomePage from "../screens/homepage";
import { useHistory } from "react-router-dom";
// import PostOptions from "../screens/PostOptions";
import Community from "../screens/Community";
import HomePageAudio from "../screens/homepage";
import Chats from "../screens/Chats";
import NavigationBarPopUp from "../components/NavigationBarPopUp";
import Profile from "../screens/Profile";
import SingleChat from "../screens/SingleChat";
import ProfileSettings from "../screens/ProfileSettingsOld";
import FollowingPage from "../screens/FollowingPage";
import FollowersPage from "../screens/FollowersPage";
import EditProfile from "../screens/EditProfile";
import ChangePassword from "../screens/ChangePassword";
import ChangeEmail from "../screens/ChangeEmail";
import VisualUpload from "../components/VisualUpload";
import RecordPage from "../screens/RecordPage";
import Recording from "../components/Recording";
import StartRecording from "../components/StartRecording";
import DuetRecordPage from "../screens/RecordPage";
import DuetRecording from "../components/Recording";
import StartDuetRecording from "../components/StartRecording";
import Hashtagpage from "../screens/hashtagpage";
import PostUploadLayout from "../components/PostUploadLayout";

import NftScreen from "./../screens/NftScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack({route}:any) {
  return (
    <Stack.Navigator
      initialRouteName="HomePage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="HomePage" component={HomePage} initialParams={route.params} />
      {/* <Stack.Screen name="NftScreen" component={NftScreen} /> */}
      {/* <Stack.Screen name="Chats" component={Chats} /> */}
      <Stack.Screen name="SingleChat" component={SingleChat} />
      <Stack.Screen name="Hashtagpage" component={Hashtagpage} />
    </Stack.Navigator>
  );
}

function ChatsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Chats" component={Chats} />
    </Stack.Navigator>
  );
}

function PostStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="Post" component={PostOptions} /> */}
    </Stack.Navigator>
  );
}

function NotificationStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Notifications" component={NotificationPage} />
    </Stack.Navigator>
  );
}

function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Account" component={NotificationPage} />
    </Stack.Navigator>
  );
}

function BottomApp({route}:any) {
  const refRBSheet = useRef<any>();
  return (
    <Tab.Navigator
      initialRouteName="HomePage"
      tabBarOptions={{
        activeTintColor: "#D2AE9A",
        inactiveTintColor: "#9E9E9E",
        style: {
          borderRadius: 90,
          height: Platform.OS === "ios" ? 80 : 50,
        },
      }}
    >
      <Tab.Screen
        name="HomePage"
        component={HomeStack}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../assets/images/home1x.png")}
              style={{ tintColor: color, width: 40, height: 40 }}
            ></Image>
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={Community}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="public" color={color} size={40} />
          ),
        }}
      />
      {/*<Tab.Screen
          name="PostStack"
          component={PostStack}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ color, size, focused }) => (
              focused ? color = '#A40E83' : color = '#9E9E9E',
              <MaterialIcons name="add-circle" color={color} size={size} />
            ),
          }}
        /> */}
      <Tab.Screen
        name="PostStack"
        component={PostStack}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <View>
              <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                <MaterialIcons name="add-circle" color={color} size={40} />
              </TouchableOpacity>
              <NavigationBarPopUp
                refRBSheet={refRBSheet}
                close={() => refRBSheet.current.close()}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Notification"
        component={NotificationPage}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialIcons name="notifications-none" color={color} size={40} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Profile}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require("../assets/images/person1x.png")}
              style={{ tintColor: color, width: 40, height: 40 }}
            ></Image>
          ),
        }}
      />
    </Tab.Navigator>
   
  );
}

export default BottomApp;
