import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { RouteStackParamList } from '../navigation/RouteParameterList';

import Header from '../components/Header';
import Colors from '../constants/Colors';
import Mic from '../components/Mic';
import { Audio } from 'expo-av';
import avatar from '../assets/images/avatarDuet.jpg';
import WaveChatAudio from '../components/WaveChatAudio';
import WaveChatAudio2 from '../components/WaveChatAudio2';

import { Feather, FontAwesome } from '@expo/vector-icons';
import Recording from '../components/Recording';
import StartDuetRecording from '../components/StartDuetRecording';
import { Icon } from 'react-native-elements';

const SingleChat = ({
  navigation,
  route,
}: RouteStackParamList<'SingleChat'>) => {
  const [chatData, setChatData] = useState([
    {
      sentByUser: 1,
      msgTime: '8:30',
      picture: avatar,
      uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      sentByUser: 2,
      msgTime: '5:24',
      picture: avatar,
      uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      sentByUser: 2,
      msgTime: '4:30',
      picture: avatar,
      uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      sentByUser: 2,
      msgTime: '3:22',
      picture: avatar,
      uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      sentByUser: 1,
      msgTime: '2:16',
      picture: avatar,
      uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      sentByUser: 2,
      msgTime: '2:27',
      picture: avatar,
      uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      sentByUser: 1,
      msgTime: '2:16',
      picture: avatar,
      uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      sentByUser: 2,
      msgTime: '2:27',
      picture: avatar,
      uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      sentByUser: 1,
      msgTime: '2:16',
      picture: avatar,
      uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      sentByUser: 2,
      msgTime: '2:27',
      picture: avatar,
      uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      sentByUser: 1,
      msgTime: '2:16',
      picture: avatar,
      uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
    {
      sentByUser: 2,
      msgTime: '2:27',
      picture: avatar,
      uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
  ]);

  const [onRecord, setOnRecord] = useState(false);
  const [audioRecorded, setAudioRecorded] = useState(false);
  const [count, setCount] = useState(0);
  const [recording, setRecording] = useState<Audio.Recording | undefined>(
    undefined
  );
  const [playing, setPlaying] = useState<Audio.Sound | undefined>(undefined);

  const handleGoBack = () => {
    navigation.goBack();
  };

  async function startRecording() {
    setOnRecord(true);
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
    } catch (err) {
      console.log('Recording failed to start');
      console.log(err);
    }
  }

  async function stopRecording() {
    setOnRecord(false);
    setAudioRecorded(true);
    console.log('Stopping recording..');
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log('Recording stopped and stored at', uri);
      setCount(0);
    }
  }
  useEffect(() => {
    const timer = setInterval(() => {
      let paused = false;
      setOnRecord((p) => {
        paused = p;
        return p;
      });
      setCount((seconds) => {
        if (paused) {
          return seconds + 1;
        }
        return seconds;
      });
    }, 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

  // recording: Audio.Recording
  async function playSound(uri: string) {
    console.log('Loading Sound');
    try {
      const { sound } = await Audio.Sound.createAsync({
        // uri: recording.getURI() as string
        uri: uri,
      });
      if (playing === undefined) {
        console.log('audio playing!');
        setPlaying(sound);
        await sound!.playAsync();
      } else {
        console.log('Current Audio stopped, playing new one!');
        playing.stopAsync();
        setPlaying(undefined);
        // await sound!.playAsync();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const dumpAudio = () => {
    setAudioRecorded(false);
  };

  const sent = () => {
    if (recording) {
      let total = Math.round(recording._finalDurationMillis / 1000);
      let min = Math.round(total / 60);
      let sec =
        Math.round(total % 60) >= 10
          ? Math.round(total % 60)
          : '0' + Math.round(total % 60);
      let obj = {
        sentByUser: 1,
        msgTime: min + ':' + sec,
        picture: avatar,
        uri: recording.getURI() as string,
      };
      setChatData((prev) => [...prev, obj]);
      setAudioRecorded(false);
    }
  };

  const chatList = (item: any, index: number) => {
    return (
      <View style={{ flex: 1 }}>
        {item.sentByUser === 1 ? (
          <View style={{ alignSelf: 'flex-end', marginHorizontal: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-end',
              }}
            >
              <Text style={{ marginRight: 15 }}>{item.msgTime}</Text>
              <Image
                style={{ borderRadius: 80, width: 40, height: 40 }}
                source={item.picture}
                width={40}
                height={40}
              />
            </View>
            <TouchableOpacity onPress={() => playSound(item.uri)}>
              <WaveChatAudio2
                style={{
                  marginTop: 10,
                  marginLeft: 10,
                }}
                height={25}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ alignSelf: 'flex-start', marginHorizontal: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {chatData[index + 1]?.sentByUser != item.sentByUser && (
                <>
                  <Image
                    style={{ borderRadius: 80, width: 40, height: 40 }}
                    source={item.picture}
                    width={40}
                    height={40}
                  />
                  <Text style={{ marginLeft: 15 }}>{item.msgTime}</Text>
                </>
              )}
            </View>
            <TouchableOpacity onPress={() => playSound(item.uri)}>
              <WaveChatAudio
                style={{
                  marginTop: 10,
                  marginLeft: 10,
                }}
                height={25}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.light.background }}>
      <Header
        onPressLeft={handleGoBack}
        onPressRight={() => {}}
        titleHeader={route.params.name}
        iconLeftClose={false}
        showIconRight={false}
      />
      <View style={{ flex: 0.8 }}>
        <FlatList
          data={chatData}
          renderItem={({ item, index }) => chatList(item, index)}
        />
      </View>
      {!audioRecorded && (
        <View
          style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}
        >
          <TouchableOpacity
            style={{
              height: 50,
              borderRadius: 25,
              width: '100%',
              paddingHorizontal: 30,
              alignItems: 'center',
              flexDirection: 'row',
              backgroundColor: '#ddd',
            }}
            onPressIn={startRecording}
            onPressOut={stopRecording}
          >
            {onRecord ? (
              <>
                <Mic />
                <Text style={{ marginLeft: 20 }}>Recording... {count}</Text>
              </>
            ) : (
              <>
                <Mic />
                <Text style={{ marginLeft: 20 }}>Press and hold to record</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      )}

      {audioRecorded && (
        <View
          style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }}
        >
          <View
            style={{
              height: 50,
              borderRadius: 25,
              paddingHorizontal: 30,
              flexDirection: 'row',
              backgroundColor: '#ddd',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <TouchableOpacity onPress={dumpAudio}>
              <Feather name="trash-2" size={20} color="red" />
            </TouchableOpacity>
            <Text style={{ marginHorizontal: 25, fontWeight: '600' }}>
              Audio recorded
            </Text>
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 30,
                backgroundColor: Colors.light.tint,
              }}
            >
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 30,
                  paddingLeft: 7,
                  paddingTop: 8,
                }}
                onPress={sent}
              >
                <FontAwesome name="send" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default SingleChat;
