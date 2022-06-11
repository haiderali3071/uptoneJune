import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import Followers from './Followers';

const FollowersList = (props: any) => {
  console.log(props.list);
  return (
    <>
      <ScrollView>
        {props.list.map(
          (element: {
            name: string;
            following: boolean;
            followingMe: boolean;
            blocked: boolean;
            profilePhoto: string;
            _id: any;
          }) => {
            return (
              <Followers
                title={element.name}
                following={element.following}
                followingMe={element.followingMe}
                blocked={element.blocked}
                key={element.name} // id to identify
                remove={props.remove}
                unremove={props.unremove}
                add={props.add}
                navigation={props.navigation}
                profilePhoto={element.profilePhoto}
                _id={element._id}
                ></Followers>
            );
          }
        )}
      </ScrollView>
    </>
  );
};

export default FollowersList;
