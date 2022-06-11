import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer, Route } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../screens/Login';
import SignupPage from '../screens/Signup';
import { RouteParamList } from './RouteParameterList';
import BottomApp from '../components/BottomNavigation';
import NotificationPage from '../screens/NotificationPage';
//import DuetPreview from "../screens/DuetPreview";
import DuetRecorder from '../screens/DuetRecorder';
import Chat from '../screens/Chats';
import SingleChat from '../screens/SingleChat';
import Profile from '../screens/Profile';
import ProfileSettings from '../screens/ProfileSettings';
import FollowingPage from '../screens/FollowingPage';
import FollowersPage from '../screens/FollowersPage';
import EditProfile from '../screens/EditProfile';
import ChangePassword from '../screens/ChangePassword';
import ChangeEmail from '../screens/ChangeEmail';
import VisualUpload from '../components/VisualUpload';
import RecordPage from '../screens/RecordPage';
import Recording from '../components/Recording';
import StartRecording from '../components/StartRecording';
import DuetRecordPage from '../screens/RecordPage';
import DuetRecording from '../components/Recording';
import StartDuetRecording from '../components/StartRecording';
import Community from '../screens/Community';
import Chats from '../screens/Chats';
import HomePage from '../screens/homepage';
import HashTagPage from '../screens/hashtagpage';
import OthersProfile from '../screens/OthersProfile';
// import Hashtagpage from "../screens/hashtagpage";
import PostUploadLayout from '../components/PostUploadLayout';
import NftScreen from '../screens/NftScreen';
import UserPosts from '../screens/UserPosts';
import OtherUserPosts from '../screens/OtherUserPosts';
import ResetPassword from '../screens/ResetPassword'
import VerifyEmail from '../screens/VerifyEmail'
import SendOtp from '../screens/SendOtp'
interface RouteProps {}

export const Routes: React.FC<RouteProps> = ({}) => {
  const Stack = createStackNavigator<RouteParamList>();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginPage"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="BottomApp" component={BottomApp} />
        <Stack.Screen name="SignUpPage" component={SignupPage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="Record" component={StartRecording} />
        <Stack.Screen name="Recording" component={Recording} />
        <Stack.Screen name="RecordPage" component={RecordPage} />
        <Stack.Screen name="DuetRecordPage" component={DuetRecordPage} />
        <Stack.Screen name="DuetRecord" component={StartDuetRecording} />
        <Stack.Screen name="DuetRecording" component={DuetRecording} />
        <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="OthersProfile" component={OthersProfile} />
        <Stack.Screen name="Community" component={Community} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="ChangeEmail" component={ChangeEmail} />
        <Stack.Screen name="Chats" component={Chats} />
        <Stack.Screen name="SingleChat" component={SingleChat} />
        <Stack.Screen name="FollowingPage" component={FollowingPage} />
        <Stack.Screen name="FollowersPage" component={FollowersPage} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="NftScreen" component={NftScreen} />
        <Stack.Screen name="HashtagPage" component={HashTagPage} />
        <Stack.Screen name="NotificationPage" component={NotificationPage} />
        <Stack.Screen name="PostUploadLayout" component={PostUploadLayout} />
        <Stack.Screen name="UserPosts" component={UserPosts} />
        <Stack.Screen name="OtherUserPosts" component={OtherUserPosts} />
        <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
        <Stack.Screen name="SendOtp" component={SendOtp} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        {/* <Stack.Screen name = "ProfileSettings" component = {ProfileSettings} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
  // return (
  // <NavigationContainer>
  // <Stack.Navigator initialRouteName="HashtagPage" screenOptions={{ headerShown: false }}>
  // <Stack.Screen name="LoginPage" component={LoginPage} />
  //    <Stack.Screen name="SignUpPage" component={SignupPage} />
  //  <Stack.Screen name="Record" component={StartRecording} />
  //    <Stack.Screen name="Recording" component={Recording} />
  //  <Stack.Screen name="RecordPage" component={RecordPage} />
  //    <Stack.Screen name="DuetRecordPage" component={DuetRecordPage} />
  // <Stack.Screen name="DuetRecord" component={StartDuetRecording} />
  //    <Stack.Screen name="DuetRecording" component={DuetRecording} />
  //  <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
  //    <Stack.Screen name="EditProfile" component={EditProfile} />
  //  <Stack.Screen name="ChangePassword" component={ChangePassword} />
  //    <Stack.Screen name="ChangeEmail" component={ChangeEmail} />
  //  <Stack.Screen name="HomePage" component={HomePage} />
  //    <Stack.Screen name="HashtagPage"  component={Hashtagpage} />
  //  <Stack.Screen name="Chats" component={BottomApp} />
  //    <Stack.Screen name="SingleChat" component={SingleChat} />
  //</Stack.Navigator>
  //</NavigationContainer>
  //)

  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Chat" screenOptions={{headerShown:false}}>
    //     <Stack.Screen name="Chat" component={Chat}/>
    //     <Stack.Screen name="LoginPage" component={LoginPage} />
    //     <Stack.Screen name="SignUpPage" component={SignupPage}/>
    //     <Stack.Screen name="BottomApp" component={BottomApp}/>
    //     <Stack.Screen name = "NotificationPage" component={NotificationPage} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Chats"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Chats" component={BottomApp} />
        <Stack.Screen name="SingleChat" component={SingleChat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
