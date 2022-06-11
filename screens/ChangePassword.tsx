import React from "react";
import { View, StyleSheet, Dimensions, Alert } from "react-native";
import { Button, Header, Text, Input } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-async-storage/async-storage';

const axios = require('axios');
var qs = require('qs');
const api = require('../api.json');
const change_password_url = api.change_password

const validator = require("validator");

class ChangePassword extends React.Component {
  state = {
    inputOldPassBackgroundColor: "#fff",
    inputNewPassBackgroundColor: "#fff",
    inputNewCPassBackgroundColor: "#fff",
    oldPass: "",
    newPass: "",
    newConPass: "",
    oldPassErr: "",
    newPassErr: "",
    newConPassErr: "",
    oldIconVisible: false,
    newIconVisible: false,
    newConfirmIconVisible: false,
  };
  OldIconRender = () => {
    if (validator.isStrongPassword(this.state.oldPass)) {
      return (
        <MaterialIcons
          className="setting-icon"
          name="check"
          size={24}
          color="green"
        />
      );
    } else {
      return (
        <MaterialIcons
          className="setting-icon"
          name="not-interested"
          size={24}
          color="red"
        />
      );
    }
  };
  NewIconRender = () => {
    if (validator.isStrongPassword(this.state.newPass)) {
      return (
        <MaterialIcons
          className="setting-icon"
          name="check"
          size={24}
          color="green"
        />
      );
    } else {
      return (
        <MaterialIcons
          className="setting-icon"
          name="not-interested"
          size={24}
          color="red"
        />
      );
    }
  };
  NewConfirmIconRender = () => {
    if (validator.isStrongPassword(this.state.newConPass)) {
      return (
        <MaterialIcons
          className="setting-icon"
          name="check"
          size={24}
          color="green"
        />
      );
    } else {
      return (
        <MaterialIcons
          className="setting-icon"
          name="not-interested"
          size={24}
          color="red"
        />
      );
    }
  };

  
  

  handleSubmit = () => {
    if (
      this.state.oldPass === "" || this.state.oldPass.length != 8
      // ||
      // !validator.isStrongPassword(this.state.oldPass)
    ) {
      this.setState({ oldPassErr: "Please enter a valid password" });
    } else if (
      this.state.newPass === "" || this.state.newPass.length != 8
      // ||
      // !validator.isStrongPassword(this.state.newPass)
    ) {
      this.setState({ newPassErr: "Please enter a valid password" });
    } else if (
      this.state.newConPass === "" || this.state.newConPass.length != 8
      //  ||
      // !validator.isStrongPassword(this.state.newConPass)
    ) {
      this.setState({ newConPassErr: "Please enter a valid password" });
    } else if (this.state.newPass !== this.state.newConPass) {
      this.setState({
        newConPassErr: "Confirm password and password must be same",
      });
    }
    else{


      AsyncStorage.getItem('accessToken').then((token)=>{
        
          var data = qs.stringify({
              currPassword: this.state.oldPass,
              newPassword: this.state.newPass,
          });
          var config = {
            method: 'patch',
            url: change_password_url,
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
                      if(json.data.message == 'Password successfully changed!'){
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
                text: "Change Password",
                style: { fontSize: 21, fontWeight: "bold", color: "#4F4F4F" },
              }}
              centerContainerStyle={styles.headerStyle}
              backgroundColor="#fff"
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputTextStyle}>Old Password</Text>
            <Input
              secureTextEntry={true}
              containerStyle={styles.inputStyle}
              style={{
                backgroundColor: this.state.inputOldPassBackgroundColor,
              }}
              rightIcon={
                this.state.oldIconVisible ? <this.OldIconRender /> : null
              }
              value={this.state.oldPass}
              onChangeText={(value) =>
                this.setState({
                  oldPass: value,
                  oldPassErr: "",
                  oldIconVisible: true,
                })
              }
              onFocus={() => {
                this.setState({ inputOldPassBackgroundColor: "#F2F2F2" });
              }}
            />
            <Text style={{ color: "red", marginLeft: 40, fontSize: 16 }}>
              {this.state.oldPassErr}
            </Text>

            <Text style={styles.inputTextStyle}>New Password</Text>
            <Input
              secureTextEntry={true}
              containerStyle={styles.inputStyle}
              style={{
                backgroundColor: this.state.inputNewPassBackgroundColor,
              }}
              rightIcon={
                this.state.newIconVisible ? <this.NewIconRender /> : null
              }
              value={this.state.newPass}
              onChangeText={(value) =>
                this.setState({
                  newPass: value,
                  newPassErr: "",
                  newIconVisible: true,
                })
              }
              onFocus={() => {
                this.setState({ inputNewPassBackgroundColor: "#F2F2F2" });
              }}
            />
            <Text style={{ color: "red", marginLeft: 40, fontSize: 16 }}>
              {this.state.newPassErr}
            </Text>

            <Text style={styles.inputTextStyle}>New Password Confirmation</Text>
            <Input
              secureTextEntry={true}
              containerStyle={styles.inputStyle}
              style={{
                backgroundColor: this.state.inputNewCPassBackgroundColor,
              }}
              rightIcon={
                this.state.newConfirmIconVisible ? (
                  <this.NewConfirmIconRender />
                ) : null
              }
              value={this.state.newConPass}
              onChangeText={(value) =>
                this.setState({
                  newConPass: value,
                  newConPassErr: "",
                  newConfirmIconVisible: true,
                })
              }
              onFocus={() => {
                this.setState({ inputNewCPassBackgroundColor: "#F2F2F2" });
              }}
            />
            <Text style={{ color: "red", marginLeft: 40, fontSize: 16 }}>
              {this.state.newConPassErr}
            </Text>
          </View>
          <View style={styles.viewButton}>
            <Button
              title="Done"
              buttonStyle={styles.button}
              onPress={this.handleSubmit}
              titleStyle={{
                color: "#fff",
                fontSize: 18,
                fontWeight: "600",
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 50,
                paddingRight: 50,
              }}
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
    backgroundColor: "#fff",
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

export default ChangePassword;
