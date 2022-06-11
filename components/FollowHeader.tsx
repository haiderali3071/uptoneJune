import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Following from "../components/Following";
import BackArrow from "../components/BackArrow";

const FollowHeader = (props : any) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <TouchableOpacity onPress={()=> props.handleClickBack()}>
                    <Image
                        source={require("../assets/images/backArrow.png")}
                        style={styles.backArrow}
                    />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    { props.title }
                </Text>    
            </View>
        </View>
        
    )
}


const styles = StyleSheet.create({
    container: {
        alignContent: "center",
        justifyContent: "center",
        backgroundColor: "#FFF",
        marginVertical: 10,
        marginTop: 50,
        height: 70,
        marginLeft: 10,
        // paddingLeft: 20
      },
      headerView: {
        backgroundColor: "#FFF",
        marginHorizontal: 20,
        flexDirection: "row",
        height: "80%",
      },
      headerText: {
        marginHorizontal: 80,
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 85
      },
      backArrow: {
        tintColor: "black",
        marginTop: 8,
        width: 20,
        height: 20,
        marginLeft: -10,
      },
      textinput: {
        height: "100%",
        width: "80%",
        alignContent: "center",
        marginLeft: 20,
        flex: 1,
        
        backgroundColor: "#F2F2F2",
      },
});

export default FollowHeader;