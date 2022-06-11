import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

const SearchBar = (props: any) => {
  let [searchBar, toggleSearchBar] = useState(true);

  const handleToggleSearchBar = () => {
    toggleSearchBar(!searchBar);
    props.handle("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={handleToggleSearchBar}>
          <Image
            source={require("../assets/images/searchIcon.jpeg")}
            style={styles.searchImageStyle}
          />
        </TouchableOpacity>
        {searchBar ? (
          <>
            <Text style={styles.headerText}>{props.title}</Text>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Chats", { currPage: "Community" });
              }}
            >
              <Image
                source={require("../assets/images/chatIcon.png")}
                style={styles.chatImageStyle}
              />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View
              style={{
                borderRadius: 50,
                flex: 1,
                backgroundColor: "#F2F2F2",
                marginHorizontal: 15,
              }}
            >
              <TextInput
                placeholder="Search"
                style={styles.textinput}
                onChangeText={(text) => props.handle(text)}
              />
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "white",
    marginVertical: 10,
    // width:300,
    width: "100%",
    marginTop: 50,
    height: 50,
  },
  searchImageStyle: {
    marginVertical: 8,
    width: 22,
    height: 25,
    marginLeft: 0,
  },
  chatImageStyle: {
    marginVertical: 5,
    height: 28,
    width: 28,
    resizeMode: "contain",
  },

  headerView: {
    backgroundColor: "#FFF",
    marginLeft: 5,
    marginRight: 10,
    flexDirection: "row",
    height: "100%",
    justifyContent: "space-between",
  },

  headerText: {
    marginHorizontal: 80,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "montserrat-regular",
    marginVertical: 0,
  },

  textinput: {
    height: "100%",
    width: "80%",
    alignContent: "center",
    marginLeft: 15,
    // flex: 1,
    backgroundColor: "#F2F2F2",
  },
});

export default SearchBar;
