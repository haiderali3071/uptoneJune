import React from "react";
import { View, StyleSheet, Dimensions, Alert } from "react-native";
import { Button, Header, Text, Input } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';


const axios = require('axios');
var qs = require('qs');
const api = require('../api.json');
const change_email_url = api.change_email

const validator = require("validator");

class ChangeEmail extends React.Component {
  state = {
    inputNewEmailBackgroundColor: "#fff",
    inputNewCEmailBackgroundColor: "#fff",
    newEmail: "",
    newConfirmEmail: "",
    newEmailErr: "",
    newConfirmEmailErr: "",
  };
  handleSubmit = () => {
    if (this.state.newEmail === "" || !validator.isEmail(this.state.newEmail)) {
      this.setState({ newEmailErr: "Please enter a valid email" });
    } else if (
      this.state.newConfirmEmail === "" ||
      !validator.isEmail(this.state.newConfirmEmail)
    ) {
      this.setState({ newConfirmEmailErr: "Please enter a valid email" });
    } else if (this.state.newEmail !== this.state.newConfirmEmail) {
      this.setState({
        newConfirmEmailErr: "Confirm email and email must be same",
      });
    }
    else{
    
      AsyncStorage.getItem('accessToken').then((token)=>{
        
          var data = qs.stringify({
              email: this.state.newEmail
          });
          var config = {
            method: 'patch',
            url: change_email_url,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'authorization':token
            },
            data: data,
          };
          axios(config).
          then((json:any) => {
            Alert.alert(json.data.message, '', [
                  {
                    text: 'Ok',
                    onPress: () => {
                      if(json.data.message == 'Done'){
                        this.props.navigation.goBack();
                      }
                      
                    },
                  },
                ]);
            })
            .catch((error:any) => console.log('=========error======', error));

      })

    }
  };

  handleBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={{ marginTop: 30, marginBottom: 30 }}>
            <Header
              style={styles.headerStyle}
              placement="left"
              leftComponent={
                <MaterialIcons
                  className="setting-icon"
                  name="arrow-back"
                  size={30}
                  color="#4F4F4F"
                  onPress={this.handleBack}
                />
              }
              centerComponent={{
                text: "Change Email",
                style: { fontSize: 21, fontWeight: "bold", color: "#4F4F4F" },
              }}
              centerContainerStyle={styles.headerStyle}
              backgroundColor="#fff"
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputTextStyle}>New Email</Text>
            <Input
              containerStyle={styles.inputStyle}
              style={{
                backgroundColor: this.state.inputNewEmailBackgroundColor,
              }}
              value={this.state.newEmail}
              onChangeText={(value) =>
                this.setState({ newEmail: value, newEmailErr: "" })
              }
              onFocus={() => {
                this.setState({ inputNewEmailBackgroundColor: "#F2F2F2" });
              }}
            />
            <Text style={{ color: "red", marginLeft: 40, fontSize: 16 }}>
              {this.state.newEmailErr}
            </Text>
          </View>
          <View style={styles.input}>
            <Text style={styles.inputTextStyle}>New Email Confirmation</Text>
            <Input
              containerStyle={styles.inputStyle}
              style={{
                backgroundColor: this.state.inputNewCEmailBackgroundColor,
              }}
              value={this.state.newConfirmEmail}
              onChangeText={(value) =>
                this.setState({
                  newConfirmEmail: value,
                  newConfirmEmailErr: "",
                })
              }
              onFocus={() => {
                this.setState({ inputNewCEmailBackgroundColor: "#F2F2F2" });
              }}
            />
            <Text style={{ color: "red", marginLeft: 40, fontSize: 16 }}>
              {this.state.newConfirmEmailErr}
            </Text>
          </View>
          <View style={styles.viewButton}>
            <Button
              title="Done"
              buttonStyle={styles.button}
              titleStyle={{
                color: "#fff",
                fontSize: 18,
                fontWeight: "600",
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 50,
                paddingRight: 50,
              }}
              onPress={this.handleSubmit}
            ></Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    // height: height,
    width: width,
    display: "flex",
    marginBottom: 20,
  },
  headerStyle: {
    width: width,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    marginTop: 30,
  },
  inputTextStyle: {
    width: width,
    marginLeft: 40,
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  inputStyle: {
    paddingLeft: 40,
    paddingRight: 40,
    borderColor: "#F2F2F2",
  },
  inputFocusStyle: {
    backgroundColor: "#000",
  },
  viewButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20%",
  },
  button: {
    backgroundColor: "#D2AE9A",
    borderRadius: 60,
    paddingTop: "2%",
    paddingBottom: "2%",
    paddingLeft: "9%",
    paddingRight: "9%",
  },
});

export default ChangeEmail;
