import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Font from "expo-font";
// import { AppLoading } from "expo";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation"; //??
import RecordPage from "./screens/RecordPage"
import NotificationPage from "./screens/NotificationPage"
// import FollowingPage from './screens/FollowingPage'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RouteParamList } from "./navigation/RouteParameterList";
import NewUsername from './screens/NewUsername';
import NewEmail from './screens/NewEmail';
import SignupPage from './screens/Signup';
import Login from './screens/Login';
import LoginError from './screens/LoginError'
import ChangePassword from "./screens/ChangePassword";
import ChangeEmail from "./screens/ChangeEmail";
import EditProfile from "./screens/EditProfile"; //latest
import UploadPost from "./screens/UploadPost"; //working
import { Routes } from "./navigation/Routes"; //recorder (same as RecordPage)
import Profile from "./screens/Profile";
import HomePage from './screens/homepage'; //not working here
import HashTagPage from './screens/hashtagpage'; //not working here
import Chats from "./screens/Chats";
import Community from "./screens/Community";
import ProfileSettings from "./screens/ProfileSettingsOld";
import BottomApp from "./components/BottomNavigation";
import { SafeAreaView } from "react-native";
import { LogBox } from 'react-native';

export const Stack = createStackNavigator<RouteParamList>();

LogBox.ignoreAllLogs()
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      // <SafeAreaProvider>
      //   <BottomApp /> 
      // </SafeAreaProvider>
      <SafeAreaProvider>
        <Routes/>
      </SafeAreaProvider>
      );
  }
}
