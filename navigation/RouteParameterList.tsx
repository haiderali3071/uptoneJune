import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type RouteParamList = {
  SignUpPage: undefined;
  LoginPage: undefined;
  Visuals: undefined;
  Record: undefined;
  Recording: undefined;
  RecordPage: undefined;
  PopUp: undefined;
  DuetRecord: undefined;
  DuetRecordPage: undefined;
  DuetRecording: undefined;
  Profile: undefined;
  OthersProfile: undefined;
  ProfileSettings: undefined;
  EditProfile: undefined;
  HomePage: undefined;
  NftScreen: undefined;
  Hashtagpage: {
    hashtagTitle: undefined;
    posts: Array<JSON>;
  };
  CommunityPage: undefined;
  ChangeEmail: undefined;
  ChangePassword: undefined;
  DuetRecorder: undefined;
  DuetPreview: undefined;
  Chats: undefined;
  BottomApp: undefined;
  NotificationPage: undefined;
  Community: undefined;
  SingleChat: {
    picture?: undefined;
    name: string;
    lastMsg?: string;
  };
  FollowingPage: undefined;
  FollowersPage: undefined;
  PostUploadLayout: undefined;
};

export type RouteStackParamList<T extends keyof RouteParamList> = {
  navigation: StackNavigationProp<RouteParamList, T>;
  route: RouteProp<RouteParamList, T>;
};
