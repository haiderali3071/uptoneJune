import React, { useState, useLayoutEffect, useEffect } from 'react';
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
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import User from '../classes/User';

const SendOTP = ({ navigation }) => {
  const user = new User();
  const [screen, setScreen] = useState('auto');
  const [indicator, setIndicator] = useState(false);
  const [email, setEmail] = useState('');

  

  const secure_email = (email) => {
    return email.replace(/(.{2})(.*)(?=@)/, function (gp1, gp2, gp3) {
      for (let i = 0; i < gp3.length; i++) {
        gp2 += '*';
      }
      return gp2;
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'height' : 'height'}
      style={{ flex: 1 }}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
        accessible={false}>
        <View style={styles.view} pointerEvents={screen}>
          <View style={styles.loading}>
            <ActivityIndicator size="large" animating={indicator} />
          </View>
          <Text style={styles.heading_txt}>Recover Password</Text>

          <Text style={styles.simple_txt}>
            If you do not know your current password, you may change it.
          </Text>

          <Text style={styles.label_txt}>Enter email</Text>

          <TextInput
            style={styles.input_field}
            placeholder="Enter Email"
            placeholderTextColor="black"
            onChangeText={(v) => {
              setEmail(v);
            }}></TextInput>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setIndicator(true);
              setScreen('none');

                  user.send_email(email).then(
                    ({ data }) => {
                      setScreen('auto');
                      setIndicator(false);
                      Alert.alert(
                        'OTP is being sent to your email '+secure_email(email),
                        '',
                        [
                          {
                            text: 'Ok',
                            onPress: () => {
                              navigation.navigate('VerifyEmail', {
                                purpose: 'recover password',
                                code_details: data,
                                next_screen: 'recover',
                                email:email
                              });
                            },
                          },
                        ]
                      );
                    },
                    (err) => {
                      setScreen('auto');
                      setIndicator(false);
                      if(err.response.data?.message){
                        alert(err.response.data?.message)
                      }
                      else{
                        console.error(
                          "Email didn't send due to " + err.response.data
                        );
                        Alert.alert("Verification email didn't send");
                      }
                    }
                  );
                
            }}
            disabled={email == ''}>
            <Text style={styles.btn_text}>Submit</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '10%',
    marginBottom: '25%',
  },
  heading_txt: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  simple_txt: {
    fontSize: 22,
  },
  label_txt: {
    color: '#454d66',
    fontSize: 25,
    alignSelf: 'left',
    marginLeft: '5%',
    marginTop: '10%',
    fontWeight:'bold'
  },
  input_field: {
    fontSize: 20,
    borderWidth: 1,
    width: '90%',
    height: '12%',
    borderRadius: 50,
    paddingLeft: 20,
    marginBottom: '10%',
  },
  inputText: {
    height: 50,
    color: 'black',
    fontWeight: 'bold',
  },
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
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SendOTP;
