import React, { useState, useLayoutEffect, useEffect, useRef } from 'react';
var axios = require('axios');
var qs = require('qs');
import {
  Text,
  TextInput,
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler } from 'react-native';

const CELL_COUNT = 6;

const VerifyEmail = ({ navigation, route }) => {
  const next_screen = route.params?.next_screen;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={styles.view}>
        <Text style={styles.text}>
          Enter the 6-digit code we sent you via email to{' '}
          {route.params?.purpose || 'verify email'}
        </Text>

        <CodeField
          ref={ref}
          {...props}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
          style={{}}
        />

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            if (route.params?.code_details?.code == value) {
              if (next_screen == 'recover') {
                navigation.navigate('ResetPassword',{email:route.params?.email})
              }
            } else if (route.params?.code_details?.code != value) {
              Alert.alert('Entered code is incorrect');
            }
            {
              /*else{}*/
            }
          }}
          disabled={value.length != 6}>
          <Text style={styles.btn_text}>
            {route.params?.btn_name || 'continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: '80%',
    backgroundColor: '#7393B3',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 40,
  },
  btn_text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  view: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-around',
    marginTop: '6%',
    marginBottom: '35%',
    alignItems: 'center',
    margin: '2%',
  },
  text: {
    color: '#454d66',
    fontSize: 35,
    alignSelf: 'left',
    marginLeft: '5%',
  },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: '10%',
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: 'black',
    textAlign: 'center',
    margin: 10,
  },
  focusCell: {
    borderColor: '#00b300',
  }
});

export default VerifyEmail;
