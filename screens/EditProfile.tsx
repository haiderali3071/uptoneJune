import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import {
  Button,
  Header,
  Text,
  Input,
  Card,
  Image,
  Icon
} from 'react-native-elements';
import FormData from 'form-data';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');
var qs = require('qs');
const api = require('../api.json');
import User from '../classes/User'
const user = new User()

const upload_bg_url = api.upload_bg;
const update_user_url = api.update_user;

class EditProfile extends React.Component {
  state = {
    displayName: '',
    username: '',
    inputDisplayName: '#fff',
    inputUsername: '#fff',
    displayNameErr: '',
    usernameErr: '',
    image: '',
    auth:null
  };

  /*
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  */

  componentDidMount(){
    AsyncStorage.getItem('accessToken').then((token)=>{
      this.setState({auth:token})
    })
  }

  pickImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      console.log(status);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });

      AsyncStorage.getItem('user').then((user: any) => {
        user = JSON.parse(user);

        var formData = new FormData();
        formData.append('profile', {
          uri:
            Platform.OS === 'android'
              ? result.uri
              : result.uri.replace('file://', ''),
          type: 'image/jpeg',
          name: '_bg_' + user?.data?._id + '.jpg',
        });
        var config = {
          method: 'patch',
          url: upload_bg_url + user?.data?._id,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          data: formData,
        };
        axios(config)
          .then((json: any) => {
            Alert.alert(json.data.message, '', [
              {
                text: 'Ok',
                onPress: () => {
                  if (json.data.message == 'Done') {
                  }
                },
              },
            ]);
          })
          .catch((error: any) => console.log('=========error======', error));
      });
    }
  };

  removeImage = async () => {
    this.setState({ image: '' });
  };

  handleSubmit = () => {
    if (this.state.displayName === '') {
      this.setState({ displayNameErr: 'Please enter a valid display name' });
    } else if (this.state.username === '') {
      this.setState({ usernameErr: 'Please enter a valid username' });
    } else {
      AsyncStorage.getItem('accessToken').then((auth) => {
        var data = qs.stringify({
          displayname: this.state.displayName,
          username: this.state.username,
        });
        var config = {
          method: 'patch',
          url: update_user_url,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'authorization': auth,
          },
          data: data,
        };
        axios(config)
          .then((json: any) => {
            Alert.alert(json.data.message, '', [
              {
                text: 'Ok',
                onPress: () => {
                  if (json.data.message == 'Done') {
                    this.props.navigation.goBack();
                  }
                },
              },
            ]);
          })
          .catch((error: any) => console.log('=========error======', error));
      });
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
                text: 'Edit Profile',
                style: { fontSize: 21, fontWeight: 'bold', color: '#4F4F4F' },
              }}
              centerContainerStyle={styles.headerStyle}
              backgroundColor="#fff"
            />
          </View>
          <View>
            <Text style={styles.inputTextStyle}>Background Image</Text>
            <Card containerStyle={styles.cardImage}>
              {this.state.image != '' ? (
                <>
                  <ImageBackground
                    style={styles.image}
                    source={{ uri: this.state.image }}>
                    <TouchableOpacity
                      onPress={this.removeImage}
                      style={styles.removeButton}>
                      <Icon
                        name="remove-circle-outline"
                        size={25}
                        color="white"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={this.pickImage}
                      style={styles.removeButton}>
                      <Icon name="camera-alt" size={25} color="white" />
                    </TouchableOpacity>
                  </ImageBackground>
                </>
              ) : (
                <TouchableOpacity activeOpacity={0.7} onPress={this.pickImage}>
                  <Image
                    source={require('../assets/images/profile.jpg')}
                    style={styles.image}>
                    <View style={styles.imageChangeStyle}>
                      <MaterialIcons
                        className="setting-icon"
                        name="camera-alt"
                        size={40}
                        color="white"
                      />
                    </View>
                  </Image>
                </TouchableOpacity>
              )}
            </Card>
            
              <Text style={styles.inputTextStyle}>Display Name</Text>
              
            
            <View style={{flexDirection:'row', marginRight:40}}>
            <Input
              containerStyle={styles.inputStyle}
              value={this.state.displayName}
              style={{ backgroundColor: this.state.inputDisplayName }}
              onChangeText={(value) =>
                this.setState({ displayName: value, displayNameErr: '' })
              }
              onFocus={() => {
                this.setState({ inputDisplayName: '#F2F2F2' });
              }}
            />
            <TouchableOpacity style={{marginRight:130}} onPress={()=>{
              user.updateDisplayName(this.state.displayName,this.state.auth).then((res)=>{
                alert(res.data.message)
              }).catch((err)=>{
                console.log(err)
              })
            }} disabled={this.state.displayName == ''}>
             <MaterialIcons name="done" size={24} color="black" style={{padding:5}} />
            </TouchableOpacity>
            </View>
            
          
            
            <Text style={{ color: 'red', marginLeft: 40, fontSize: 16 }}>
              {this.state.displayNameErr}
            </Text>

            <Text style={styles.inputTextStyle}>Username</Text>

            <View style={{flexDirection:'row', marginRight:40}}>
            <Input
              containerStyle={styles.inputStyle}
              value={this.state.username}
              style={{ backgroundColor: this.state.inputUsername }}
              onChangeText={(value) =>
                this.setState({ username: value, usernameErr: '' })
              }
              onFocus={() => {
                this.setState({ inputUsername: '#F2F2F2' });
              }}
            />
             <TouchableOpacity style={{marginRight:130}} onPress={()=>{
               user.updateUsername(this.state.username,this.state.auth).then((res)=>{
                alert(res.data.message)
              })
            }} disabled={this.state.displayName == ''}>
             <MaterialIcons name="done" size={24} color="black" style={{padding:5}} />
            </TouchableOpacity>
            </View>

            <Text style={{ color: 'red', marginLeft: 40, fontSize: 16 }}>
              {this.state.usernameErr}
            </Text>
          </View>
          <View style={styles.viewButton}>
            <Button
              title="Done"
              buttonStyle={styles.button}
              onPress={this.handleSubmit}
              titleStyle={{
                color: '#fff',
                fontSize: 18,
                fontWeight: '600',
                paddingTop: 5,
                paddingBottom: 5,
                paddingLeft: 50,
                paddingRight: 50,
              }}></Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // height: height,
    width: width,
    display: 'flex',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  removeButton: {
    backgroundColor: '#D2AE9A',
    borderRadius: 5,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    alignSelf: 'flex-end',
    margin: 3,
    paddingLeft: 3,
    paddingRight: 3,
  },
  headerStyle: {
    width: width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputTextStyle: {
    width: width,
    marginLeft: 40,
    fontSize: 18,
    marginBottom: 10,
  },
  inputStyle: {
    paddingLeft: 40,
    paddingRight: 40,
    borderColor: '#F2F2F2',
  },
  inputFocusStyle: {
    backgroundColor: '#000',
  },
  viewButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },
  button: {
    backgroundColor: '#D2AE9A',
    borderRadius: 60,
    paddingTop: '2%',
    paddingBottom: '2%',
    paddingLeft: '9%',
    paddingRight: '9%',
  },
  image: {
    height: 200,
    width: 320,
    borderRadius: 20,
  },
  cardImage: {
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    marginLeft: 40,
    marginBottom: 40,
    marginRight: 40,
  },
  imageChangeStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

export default EditProfile;
