import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Notification from '../components/Notification';
import User from '../classes/User'
const user = new User();

import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios');
var qs = require('qs');
const api = require('../api.json');

const get_user_notifications_url = api.get_user_notifications;

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('accessToken').then((token: any) => {
        // get user posts
        var config = {
          method: 'get',
          url: get_user_notifications_url,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            authorization: token,
          },
        };

        axios(config)
          .then((json: any) => {
            setNotifications(json.data.data);
          })
          .catch((error: any) => console.log('=========error======', error));
      });
    }, [])
  );

  return (
    <View>
      <SafeAreaView style={styles.background}>
        <Text style={styles.postText}>Notifications</Text>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 160 }}
          showsVerticalScrollIndicator={false}>
          {notifications.map((item: any) => {
            return (
              <Notification
                title={item.message}
                time={user.calculateTime(item.updatedAt)}
                profile={item.url?.profilePhoto}></Notification>
            );
          })}

          {/*
          <Notification
            title={'Jordan Gonzalez is now following you'}
            time={'15 minutes ago'}
          ></Notification>

          <Notification
            title={'Jordan Gonzalez is now following you'}
            time={'17 minutes ago'}
          ></Notification>

          <Notification
            title={'Jordan Gonzalez is now following you'}
            time={'20 minutes ago'}
          ></Notification>

          <Notification
            title={'Jordan Gonzalez is now following you'}
            time={'27 minutes ago'}
          ></Notification>
          <Notification
            title={'Jordan Gonzalez is now following you'}
            time={'27 minutes ago'}
          ></Notification>
          <Notification
            title={'Jordan Gonzalez is now following you'}
            time={'27 minutes ago'}
          ></Notification>
          <Notification
            title={'Jordan Gonzalez is now following you'}
            time={'27 minutes ago'}
          ></Notification>
          <Notification
            title={'Jordan Gonzalez is now following you'}
            time={'27 minutes ago'}
          ></Notification>
          <Notification
            title={'Jordan Gonzalez is now following you'}
            time={'27 minutes ago'}
          ></Notification>
          <Notification
            title={'Jordan Gonzalez is now following you'}
            time={'27 minutes ago'}
          ></Notification>
          */}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  background: {},
  postText: {
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'Montserrat-Bold',
    fontSize: 25,
    color: '#4F4F4F',
    marginTop: 40,
  },
});
