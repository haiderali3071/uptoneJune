import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  TextInput,
  Switch,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import FormData from 'form-data';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import Navigation from '../navigation';
import { useNavigation } from '@react-navigation/native';
import CircleSlider from 'react-native-circle-slider';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');
var qs = require('qs');
const api = require('../api.json');

const upload_audio_url = api.upload_audio;
const add_post_url = api.add_post;
const upload_photo_url = api.upload_photo;

//   import  TextInput  from 'react-native-paper';

export default function PostUploadLayout(props: any) {
  let navigation = useNavigation();
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const [isEnabled4, setIsEnabled4] = useState(false);
  const toggleSwitch1 = () => setIsEnabled1((previousState) => !previousState);
  const toggleSwitch2 = () => setIsEnabled2((previousState) => !previousState);
  const toggleSwitch3 = () => setIsEnabled3((previousState) => !previousState);
  const toggleSwitch4 = () => setIsEnabled4((previousState) => !previousState);
  const refRBSheet = useRef<RBSheet>(null);
  const ref2RBSheet = useRef<RBSheet>(null);
  const ref3RBSheet = useRef<RBSheet>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const selectLike = () => setLiked(!liked);
  const [paused, setPause] = useState<boolean>(true);
  const [sound, setSound] = React.useState<Audio.Sound | undefined>(undefined);

  const [image, setImage] = useState('');
  const [describe, setDescribe] = useState(' ');

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const removeImage = async () => {
    setImage('');
  };
  const [clickedHashtag, setClickedHashtag] = useState(null);
  const addHashtag = (hashtag) => {
    setClickedHashtag(hashtag);
  };

  const selectPause = async () => {
    try {
      if (paused) {
        const { sound } = await Audio.Sound.createAsync({
          uri: props.route.params.recording.getURI() as string,
        });
        // console.log(sound!)
        await sound!.playAsync();
        // console.log("sound set")
        setSound(sound);
        setPause(false);
      } else {
        sound?.pauseAsync().then(() => {
          setPause(true);
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  function millisToMinutesAndSeconds(millis: any) {
    var minutes: any = Math.floor(millis / 60000);
    var seconds: any = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  function findHashtags(searchText: String) {
    let regexp = /\B\#\w\w+\b/g;
    let result: any = searchText.match(regexp);
    if (result) {
      return result.map((s:any) => s.slice(1));
    } else {
      return [];
    }
  }

  const upload_post = (privacy: string) => {
    let min = millisToMinutesAndSeconds(
      props?.route?.params?.recording?._finalDurationMillis
    );
    let hashtags: any = findHashtags(describe);
    let recording_url = props?.route?.params?.recording?.getURI() as string;
    recording_url =
      Platform.OS === 'android'
        ? recording_url
        : recording_url.replace('file://', '');
    const image_url =
      Platform.OS === 'android' ? image : image.replace('file://', '');

    let arr = recording_url.split('/');
    let audio_name = arr[arr.length - 1];
    arr = arr[arr.length - 1].split('.');

    AsyncStorage.getItem('accessToken').then((token: any) => {
      var formData = new FormData();
      formData.append('audiofile', {
        uri: recording_url,
        type: 'audio/' + arr[1],
        name: audio_name,
      });
      console.log(formData);
      var config = {
        method: 'post',
        url: upload_audio_url,
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: token,
        },
        data: formData,
      };
      axios(config)
        .then((json: any) => {
          //  audio uploaded successfully

          if (image != '') {
            AsyncStorage.getItem('user').then((user: any) => {
              user = JSON.parse(user);

              var formData = new FormData();
              formData.append('profile', {
                uri:
                  Platform.OS === 'android'
                    ? image
                    : image.replace('file://', ''),
                type: 'image/jpeg',
                name: 'post_thumbnail.jpg',
              });
              var config = {
                method: 'patch',
                url: upload_photo_url,
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
                data: formData,
              };
              axios(config)
                .then((json: any) => {
                  // thumbnail uploaded successfully
                  var data = qs.stringify({
                    status: privacy,
                    allowComments: isEnabled1,
                    audioClip: audio_name,
                    description: describe,
                    thumbnail: json.data.name,
                    duration: min,
                    hashtags: JSON.stringify(hashtags),
                  });
                  var config = {
                    method: 'post',
                    url: add_post_url,
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                      authorization: token,
                    },
                    data: data,
                  };
                  axios(config)
                    .then((json: any) => {
                      Alert.alert(json.data.message, '', [
                        {
                          text: 'Ok',
                          onPress: () => {
                            if (json.data.message == 'Post Added!') {
                              navigation.navigate('BottomApp');
                            }
                          },
                        },
                      ]);
                    })

                    .catch((error: any) =>
                      console.log('=========error======', error)
                    );
                })
                .catch((error: any) =>
                  console.log('=========error======', error)
                );
            });
          } else {
            var data = qs.stringify({
              status: privacy,
              allowComments: isEnabled1,
              audioClip: audio_name,
              description: describe,
              duration: min,
              hashtags: JSON.stringify(hashtags),
            });
            var config = {
              method: 'post',
              url: add_post_url,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                authorization: token,
              },
              data: data,
            };
            axios(config)
              .then((json: any) => {
                Alert.alert(json.data.message, '', [
                  {
                    text: 'Ok',
                    onPress: () => {
                      if (json.data.message == 'Post Added!') {
                        navigation.navigate('BottomApp');
                      }
                    },
                  },
                ]);
              })

              .catch((error: any) =>
                console.log('=========error======', error)
              );
          }
        })
        .catch((error: any) =>
          console.log('=========error======', error.response.data)
        );
    });

    // navigation.navigate("BottomApp")
  };

  // const selectPause = () => {
  //   setPause(!paused);
  // };
  console.log(props.route.params);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.titleBar}>
          {/*  */}
          <Icon
            name="arrow-back"
            size={25}
            color="#030303"
            style={styles.backIcon}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.title}>Post</Text>
          <Text style={styles.title}></Text>
          {/* <Icon
            name="arrow-back"
            size={25}
            color="#fff"
            style={styles.backIcon}
          /> */}
        </View>
        <View style={styles.secondContainer}>
          <View style={styles.postText}>
            <TextInput
              style={styles.placeholder}
              placeholderTextColor="grey"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              // mode={"outlined"}
              placeholder="Describe your audio..."
              allowFontScaling={false}
              onChangeText={(text) => setDescribe(text)}></TextInput>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.tagButtons}
                onPress={() => ref2RBSheet.current?.open()}>
                <Text style={styles.tagText}>#Hashtags</Text>
                {/* support must be there to show recent hashtags */}
              </TouchableOpacity>
              <RBSheet
                // ref={refRBSheet}
                ref={ref2RBSheet}
                closeOnDragDown={false}
                closeOnPressMask={true}
                height={(height * 1) / 2}
                customStyles={{
                  wrapper: {
                    backgroundColor: 'transparent',
                  },
                  container: {
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                  },
                  draggableIcon: {
                    backgroundColor: '#000',
                  },
                }}>
                <ScrollView style={styles.hashtagPopup}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.tagsRow}
                    onPress={addHashtag}>
                    <Icon name="access-time" size={20} color="grey" />
                    <Text style={styles.privacy}>#justsaying</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.7} style={styles.tagsRow}>
                    <Icon name="access-time" size={20} color="grey" />
                    <Text style={styles.privacy}>#letstalk</Text>
                  </TouchableOpacity>
                </ScrollView>
              </RBSheet>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.tagButtons}
                onPress={() => ref3RBSheet.current?.open()}>
                <Text style={styles.tagText}>@Friends</Text>
                {/* support must be there to show friends */}
              </TouchableOpacity>
              <RBSheet
                // ref={refRBSheet}
                ref={ref3RBSheet}
                closeOnDragDown={false}
                closeOnPressMask={true}
                height={(height * 1) / 2}
                customStyles={{
                  wrapper: {
                    backgroundColor: 'transparent',
                  },
                  container: {
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                  },
                  draggableIcon: {
                    backgroundColor: '#000',
                  },
                }}>
                <ScrollView style={styles.hashtagPopup}>
                  <TouchableOpacity activeOpacity={0.7} style={styles.tagsRow}>
                    <Image
                      style={styles.smallAvatar}
                      source={{
                        uri: 'https://images.pexels.com/photos/4693311/pexels-photo-4693311.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
                      }}
                    />
                    <Text style={styles.privacy}>Friend 1</Text>
                    <Icon name="access-time" size={20} color="grey" />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.7} style={styles.tagsRow}>
                    <Image
                      style={styles.smallAvatar}
                      source={{
                        uri: 'https://images.pexels.com/photos/4729378/pexels-photo-4729378.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
                      }}
                    />
                    <Text style={styles.privacy}>Friend 2</Text>
                    <Icon name="access-time" size={20} color="grey" />
                  </TouchableOpacity>
                </ScrollView>
              </RBSheet>
            </View>
          </View>

          {/*support to show audio duration */}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: '40%',
              paddingHorizontal: 20,
            }}>
            <View style={styles.timeOnSpot}>
              <Text style={styles.timeText}>0:00</Text>
            </View>
            <View
              style={{ flex: 1, position: 'relative', marginHorizontal: 10 }}>
              <View style={styles.circle}>
                <CircleSlider
                  dialWidth={5}
                  dialRadius={107}
                  btnRadius={6.5}
                  strokeColor={'grey'}
                  strokeWidth={0.5}
                  meterColor={'black'}
                  textSize={-25}
                  textColor={'black'}
                />
              </View>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: '24%',
                  marginLeft: 20,
                }}
                onPress={selectPause}>
                {paused ? (
                  <Image source={require('../assets/images/Play.png')} />
                ) : (
                  <Image source={require('../assets/images/Pause.png')} />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.timeTotalSpot}>
              <Text style={styles.timeText}>
                {millisToMinutesAndSeconds(
                  props?.route?.params?.recording?._finalDurationMillis
                )}
              </Text>
            </View>
          </View>

          <View style={styles.timeContainer}>
            <View style={styles.toggleContainer}>
              {/* states and functinalities to be separately implemented for each toggle switch */}
              <View style={styles.toggleLines}>
                <Text style={styles.baseText}>Allow Comments</Text>
                <Switch
                  trackColor={{ false: '#767577', true: '#0489B1' }}
                  thumbColor={'#f4f3f4'}
                  ios_backgroundColor="#ffffff"
                  onValueChange={toggleSwitch1}
                  value={isEnabled1}
                />
              </View>
              <View style={styles.toggleLines}>
                <Text style={styles.baseText}>Allow Duets</Text>
                <Switch
                  trackColor={{ false: '#767577', true: '#0489B1' }}
                  thumbColor={'#f4f3f4'}
                  ios_backgroundColor="#ffffff"
                  onValueChange={toggleSwitch2}
                  value={isEnabled2}
                />
              </View>
              <View style={styles.toggleLines}>
                <Text style={styles.baseText}>Save to device</Text>
                <Switch
                  trackColor={{ false: '#767577', true: '#0489B1' }}
                  thumbColor={'#f4f3f4'}
                  ios_backgroundColor="#ffffff"
                  onValueChange={toggleSwitch3}
                  value={isEnabled3}
                />
              </View>
              <View style={styles.toggleLines}>
                <Text style={styles.baseText}>Get Notifications</Text>
                <Switch
                  trackColor={{ false: '#767577', true: '#0489B1' }}
                  thumbColor={'#f4f3f4'}
                  ios_backgroundColor="#ffffff"
                  onValueChange={toggleSwitch4}
                  value={isEnabled4}
                />
              </View>
            </View>
            {image != '' ? (
              <>
                <ImageBackground style={styles.cover2} source={{ uri: image }}>
                  <TouchableOpacity
                    onPress={removeImage}
                    style={styles.removeButton}>
                    {/* <Text style={styles.imageState}>&#10006;</Text> */}
                    <Icon
                      name="remove-circle-outline"
                      size={15}
                      color="#939393"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={pickImage}
                    style={styles.removeButton}>
                    {/* <Text style={styles.imageState}>&#128247;</Text> */}
                    <Icon name="camera-alt" size={15} color="#939393" />
                  </TouchableOpacity>
                </ImageBackground>
              </>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.cover}
                onPress={pickImage}>
                <Text style={styles.title1}>Optional Cover</Text>
                <Text style={styles.basetext2}>Image/Video</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.PostButton}
          onPress={() => refRBSheet.current?.open()}>
          <Text style={styles.ButtonTitle}>Post</Text>
        </TouchableOpacity>

        {/* <Button title="Post" onPress={()=>refRBSheet.current?.open()}/> */}
        <RBSheet
          // ref={refRBSheet}
          ref={refRBSheet}
          closeOnDragDown={false}
          closeOnPressMask={true}
          height={(height * 1) / 5}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            container: {
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <View style={styles.popup}>
            <TouchableOpacity
              onPress={() => {
                upload_post('friends');
              }}
              activeOpacity={0.7}
              style={styles.popupRow}>
              <Icon name="people" size={25} color="grey" />
              <Text style={styles.privacy}>Friends only</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                upload_post('public');
              }}
              activeOpacity={0.7}
              style={styles.popupRow}>
              <Icon name="public" size={25} color="grey" />
              <Text style={styles.privacy}>Public</Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>
    </ScrollView>
  );
}
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
  },
  titleBar: {
    // flex:1,
    height: (height * 1) / 8,
    paddingTop: (height * 1) / 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  popup: {
    height: (height * 1) / 5,
    width: width,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  hashtagPopup: {
    height: (height * 1) / 2,
    width: width,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOffset: { width: width, height: (height * 1) / 10 },
  },
  backIcon: {
    // position:'absolute',
    // left : 5,
    // top : 5,
    // width: width*0.07,
    // height : height * 0.04
    margin: 10,
  },
  title: {
    alignSelf: 'center',
    fontFamily: 'Montserrat-Bold',
    fontSize: 20,
    color: '#030303',
  },
  title1: {
    alignSelf: 'center',
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    color: '#ffffff',
    // width : width*0.14,
  },
  tagText: {
    fontFamily: 'Montserrat',
    fontWeight: '400',
    lineHeight: 13.41,
    fontSize: 11,
  },
  secondContainer: {
    height: (height * 4) / 5,
    backgroundColor: '#e3e3e3',
    borderRadius: 25,
    shadowColor: '#a3a3a3',
    borderColor: '#b3b3b3',
    borderBottomWidth: 4,
  },
  PostButton: {
    backgroundColor: '#cf9a72',
    borderRadius: 25,
    justifyContent: 'center',
    width: (width * 2) / 3,
    alignSelf: 'center',
    marginTop: (height * 1) / 40,
    // padding : 10
  },
  ButtonTitle: {
    color: '#ffffff',
    //fontFamily: "Montserrat-Bold",
    fontSize: 20,
    textAlign: 'center',
    marginTop: (height * 1) / 60,
    marginBottom: (height * 1) / 60,
  },
  postText: {
    alignSelf: 'center',
    width: width * 0.96,
    borderBottomColor: '#a3a3a3',
    borderBottomWidth: 1,
    borderRadius: 20,
    height: (height * 1) / 5,
  },
  placeholder: {
    //
    lineHeight: 17.07,
    fontFamily: 'Montserrat',
    flex: 1,
    width: width * 0.92,
    fontWeight: '500',
    alignSelf: 'center',
    opacity: 1,

    color: '#4F4F4F',
  },

  timeOnSpot: {
    // position: 'absolute',
    width: 28,
    // height: 17,
    justifyContent: 'center',

    // left: (25/375)*boxHeight,
    // top: 130,

    /* small text */
  },
  timeTotalSpot: {
    // position: 'absolute',
    width: 26,
    justifyContent: 'center',
    // left: 310,
    // top: 130,
  },

  timeText: {
    fontFamily: 'Montserrat',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 15,
    textAlign: 'center',
    justifyContent: 'center',
    /* darkgrey */
    color: '#4F4F4F',
  },

  tagButtons: {
    height: (height * 1) / 30,
    borderRadius: 5,
    borderColor: 'grey',
    alignSelf: 'flex-end',
    borderWidth: 1,
    marginRight: (width * 1) / 50,
    marginBottom: (height * 1) / 70,
    marginTop: (height * 1) / 70,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  timeContainer: {
    flex: 1,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  toggleLines: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    alignItems: 'center',
  },

  circle: {
    position: 'absolute',
    // width:"50%",
    // height: "30%",
    // left: 70,
    // marginLeft: "17%",
    // marginTop: "5%",
    alignSelf: 'center',
    alignItems: 'center',

    transform: [{ rotate: '270deg' }],
  },

  toggleContainer: {
    width: width * 0.45,
    padding: 5,
    justifyContent: 'center',
  },
  cover: {
    width: width * 0.4,
    backgroundColor: 'grey',
    justifyContent: 'center',
    borderRadius: 20,
    marginVertical: (height * 1) / 60,
  },
  cover2: {
    width: width * 0.4,
    borderRadius: 25,
    marginVertical: (height * 1) / 60,
    justifyContent: 'space-between',
  },
  baseText: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    width: 100,

    marginRight: 10,
    // marginTop : height*1/60,
  },
  basetext2: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    marginTop: (height * 1) / 100,
    color: '#ffffff',

    alignSelf: 'center',
  },
  popupRow: {
    height: (height * 1) / 10,
    flexDirection: 'row',
    padding: (height * 1) / 40,
    alignItems: 'center',
  },
  tagsRow: {
    height: (height * 1) / 12,
    flexDirection: 'row',
    padding: (height * 1) / 50,
    alignItems: 'center',
  },
  privacy: {
    //fontFamily: "Montserrat",
    fontSize: 14,
    color: 'grey',
    marginLeft: (width * 1) / 10,
    marginRight: (width * 1) / 20,
    // marginTop : height * 1/120,
  },
  smallAvatar: {
    height: (height * 1) / 15,
    width: (height * 1) / 15,
    borderRadius: 50,
  },
  removeButton: {
    backgroundColor: '#b3b3b3',
    borderRadius: 5,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    // borderBottomColor : "#a3a3a3",
    alignSelf: 'flex-end',
    margin: 3,
    paddingLeft: 3,
    paddingRight: 3,
  },
  imageState: {
    //fontFamily:"Montserrat",
    fontSize: 14,
    // color : "#e3e3e3"
  },
});
