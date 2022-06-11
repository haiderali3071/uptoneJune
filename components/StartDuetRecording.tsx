import React from "react";
import { View, Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { RouteParamList, RouteStackParamList } from "../navigation/RouteParameterList";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

//For the type definitions for this component and the Recording and Countdown components,
//changed have been made in the following files :
// navigation/index.tsx
// RouteParameterList.tsx
// Routes.tsx and the stack navigator for the navigation between thses components. 


export default function StartDuetRecording({navigation, route}:RouteStackParamList<"Record">) {
  return (
    <View style={styles.container}>
      <View style={styles.titleBar}>
        <Icon
          name="arrow-back"
          size={25}
          color="#030303"
          style={styles.backIcon}
        />
        <Text style={styles.title}>Duet Record</Text>
        <Icon
          name="arrow-forward"
          size={25}
          color="#030303"
          style={styles.backIcon}
        />
      </View>
      <View style={styles.middleContainer}>
          <View style={styles.recordIcon}>
              <Icon name="keyboard-voice" size={height*1/6} color="#fff"/>
          </View>
      </View>
      <TouchableOpacity style={styles.startButton} onPress={()=>{navigation.navigate('DuetRecording')}}>
          <Text style={styles.startText}>Start Recording</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center'
  },
  titleBar: {
    // flex:1,
    width:width,
    height: (height * 1) / 8,
    paddingTop: (height * 1) / 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    alignSelf: "center",
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    color: "#030303",
    // width : width*0.14,
  },
  backIcon: {
    margin: 10,
  },
  startButton:{
      width:width*2/3,
      padding:height*1/50,
      alignItems:"center",
      borderRadius:25,
      borderWidth:1,
      borderColor:"#cf9a72"
  },
  startText:{
      fontFamily:"Montserrat",
      color : "#cf9a72",
  },
  middleContainer:{
    justifyContent:'center', 
    alignItems:"center",
    height:height*6.25/8
  },
  recordIcon:{
    height:height*1/5, width:height*1/5, borderRadius:100, backgroundColor:"#cf9a72",padding:10
  }
});
