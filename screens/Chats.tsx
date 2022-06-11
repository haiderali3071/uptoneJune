import React, { useRef, useState } from 'react';
import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
  Animated,
  Dimensions,
} from 'react-native';
import Header from '../components/Header';
import Colors from '../constants/Colors';
import { RouteStackParamList } from '../navigation/RouteParameterList';

import { AntDesign } from '@expo/vector-icons';
import {
  RectButton,
  ScrollView,
  TouchableWithoutFeedback,
  Swipeable,
} from 'react-native-gesture-handler';

import avatar from '../assets/images/avatarDuet.jpg';

import WaveChatAudio from '../components/WaveChatAudio';
import { useEffect } from 'react';
import Icon from 'react-native-ionicons';
import { Searchbar } from 'react-native-paper';

export default function Chats({
  navigation,
  route,
}: RouteStackParamList<'Chats'>) {
  const currPage = route.params;
  console.log(currPage);
  const [fakePeople, setFakePeople] = useState([
    {
      picture: avatar,
      name: 'Jerry Sarkashian',
      lastMsg: '5h',
      muted: false,
    },
    {
      picture: avatar,
      name: 'Evan Matthews',
      lastMsg: '2h',
      muted: false,
    },
    {
      picture: avatar,
      name: 'Hanna Jo',
      lastMsg: '17h',
      muted: false,
    },
    {
      picture: avatar,
      name: 'Jeff Cho',
      lastMsg: '2h',
      muted: false,
    },
    {
      picture: avatar,
      name: 'Jerry Sarkashian',
      lastMsg: '1h',
      muted: false,
    },
    {
      picture: avatar,
      name: 'Jerry Sarkashian',
      lastMsg: '1h',
      muted: false,
    },
    {
      picture: avatar,
      name: 'Jerry Sarkashian',
      lastMsg: '1h',
      muted: false,
    },
    {
      picture: avatar,
      name: 'Jerry Sarkashian',
      lastMsg: '1h',
      muted: false,
    },
    {
      picture: avatar,
      name: 'Jerry Sarkashian',
      lastMsg: '1h',
      muted: false,
    },
  ]);

  const [openedNewChat, setOpenedNewChat] = useState(false);
  const [textSearch, setTextSearch] = useState('');

  const inputRef = useRef<any>();

  const onHandleNewChat = () => {
    inputRef?.current && inputRef?.current?.focus();
    setOpenedNewChat((prev) => !prev);
  };

  const handleGoBack = () => {
    openedNewChat ? setOpenedNewChat(false) : null;
    navigation.goBack();
  };

  const goToSingleChat = (people: any) => {
    navigation.navigate('SingleChat', { name: people.name, picture: avatar });
  };
  // There is some delays but I do not know how these works at the moment
  let row: Array<any> = [];
  let prevOpenedRow: any;
  const closeRow = (index: number) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };
  const handleMute = (id: any, person: any, ref: any) => {
    // id = index
    fakePeople[id].muted = !fakePeople[id].muted;
    setFakePeople(fakePeople);
    ref.close();
  };
  const handleDelete = (id: any, person: any, ref: any) => {
    const newPeople = fakePeople.filter((element) => element !== person);
    setFakePeople(newPeople);
    // close the swipeable
    ref.close();
  };
  const RenderSwipeOptions = ({
    progress,
    dragX,
    id,
    reference,
    person,
    handleMute,
    handleDelete,
  }: any) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0.5],
      outputRange: [1, 0.1],
    });
    const Style = {
      transform: [
        {
          scale,
        },
      ],
    };

    return (
      <View style={styles.swipeOptions}>
        <View
          style={{
            width: 80,
            backgroundColor: 'lightgray',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
          }}
        >
          <Animated.Text
            style={[Style, { fontWeight: '400', fontSize: 12 }]}
            onPress={() => handleMute(id, person, reference)}
          >
            {person.muted ? 'Unmute' : 'Mute'}
          </Animated.Text>
        </View>
        <View
          style={{
            width: 80,
            backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
          }}
        >
          <Animated.Text
            style={[Style, { color: '#fff', fontWeight: '500', fontSize: 12 }]}
            onPress={() => handleDelete(id, person, reference)}
          >
            Delete
          </Animated.Text>
        </View>
      </View>
    );
  };
  let swipeableRef: any = null;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Header
          onPressLeft={handleGoBack}
          onPressRight={() => {}}
          titleHeader={openedNewChat ? 'New chat' : 'Chats'}
          iconLeftClose={false}
          showIconRight={false}
        />
        <View style={styles.viewTop}>
          {/* <TextInput
            ref={inputRef}
            style={[styles.input, { width: openedNewChat ? 340 : 300 }]}
            placeholder="Search"
            placeholderTextColor="#ccc"
            onChangeText={(e) => setTextSearch(e)}
          /> */}
          <Searchbar
            placeholder="Search"
            onChangeText={setTextSearch}
            value={textSearch}
            style={styles.input}
            inputStyle={{ fontSize: 16 }}
          />
          {!openedNewChat && (
            <RectButton onPress={onHandleNewChat}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: '#fff',
                  borderRadius: 150,
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowOpacity: 0.2,
                  shadowOffset: { width: 0, height: 0 },
                  shadowRadius: 10,
                }}
              >
                <AntDesign name="plus" size={24} color="black" />
              </View>
            </RectButton>
          )}
        </View>
        <ScrollView
          // style={styles.containerScroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 320, marginHorizontal: 10 }}
        >
          {fakePeople
            .filter((pep) =>
              textSearch.length > 1 ? pep.name.includes(textSearch) : true
            )
            .map((people, index) => {
              return (
                <Swipeable
                  key={index + people.name}
                  overshootRight={false}
                  ref={(ref) => (row[index] = ref)}
                  onSwipeableOpen={() => closeRow(index)}
                  renderRightActions={(progress, dragX) => (
                    <RenderSwipeOptions
                      progress={progress}
                      dragX={dragX}
                      id={index}
                      reference={row[index]}
                      person={people}
                      handleMute={handleMute}
                      handleDelete={handleDelete}
                    />
                  )}
                >
                  <RectButton
                    key={index + people.name}
                    onPress={() => goToSingleChat(people)}
                    style={styles.containerChat}
                  >
                    {/*  */}

                    <View
                      style={{
                        height: 60,
                        width: 50,
                        alignItems: 'center',
                      }}
                    ></View>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginLeft: -40,
                        }}
                      >
                        <Image
                          style={{ borderRadius: 80, width: 55, height: 55 }}
                          source={people.picture}
                          width={34}
                          height={34}
                        />
                        <Text
                          style={{
                            marginLeft: 15,
                            color: '#4F4F4F',
                            fontSize: 17,
                            marginTop: 0,
                            fontFamily: 'Montserrat-Bold',
                          }}
                        >
                          {people.name}
                        </Text>
                        <Text
                          style={{
                            marginLeft: 15,
                            color: '#4F4F4F',
                            fontSize: 13,
                          }}
                        >
                          {people.lastMsg}
                        </Text>
                      </View>
                      {!openedNewChat && (
                        <>
                          <View style={{ marginTop: 20 }}>
                            <WaveChatAudio
                              style={{
                                marginTop: 0,
                                marginLeft: -50,
                              }}
                              height={35}
                              width={350}
                            />
                          </View>
                        </>
                      )}
                    </View>
                  </RectButton>
                </Swipeable>
              );
            })}
        </ScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    marginLeft: 20,
    marginRight: 15,
    paddingHorizontal: 5,
    height: 35,
    backgroundColor: '#eee',
    width: 300,
    borderRadius: 40,
    fontSize: 17,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0,
    elevation: 1,
  },
  containerScroll: {
    marginTop: 0,
    marginHorizontal: 10,
    paddingBottom: 20,
    // height: "100%",
    //width: '100%'
  },
  containerChat: {
    height: 90,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  swipeOptions: {
    display: 'flex',
    flexDirection: 'row',
  },
});
