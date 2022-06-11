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
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import User from '../classes/User';

const ResetPassword = ({ navigation, route }) => {
  const user = new User();
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'height' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={-70}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
        accessible={false}>
        <SafeAreaView style={styles.view}>
          <Text style={styles.heading_txt}>Reset Password</Text>
          {
            // <Text style={styles.simple_txt}>
            //   In order to best protect your account, please select a strong password
            //   that contains a combination of uppercase and lowercase letters,
            //   numbers and/or symbols.
            // </Text>
          }

          <Text style={styles.label_txt}>New Password</Text>

          <TextInput
            style={styles.input_field}
            placeholder={'Enter new password'}
            onChangeText={(v) => setPassword(v)}
            secureTextEntry={true}></TextInput>

          <Text style={styles.label_txt}>Confirm Password</Text>

          <TextInput
            style={styles.input_field}
            placeholder={'Conform new password'}
            onChangeText={(v) => setConfirmPassword(v)}
            secureTextEntry={true}></TextInput>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              if (password == confirm_password) {
                user.recoverPassword(route.params.email, password).then(
                  ({ data }) => {
                    if (data.result == 'success') {
                      Alert.alert('Successfully password reset', '', [
                        {
                          text: 'Ok',
                          onPress: () => {
                            navigation.navigate('LoginPage');
                          },
                        },
                      ]);
                    }
                  },
                  (err) => {
                    console.error(err.response.data);
                  }
                );
              } else {
                Alert.alert('Please confirm new password');
              }
            }}>
            <Text style={styles.btn_text}>Save</Text>
          </TouchableOpacity>
        </SafeAreaView>
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
  label_txt: {
    color: '#454d66',
    fontSize: 25,
    alignSelf: 'left',
    marginLeft: '5%',
    marginTop: '5%',
    fontWeight: 'bold',
  },
  input_field: {
    fontSize: 20,
    borderWidth: 1,
    width: '90%',
    height: '10%',
    borderRadius: 50,
    paddingLeft: 20,
    marginBottom: '5%',
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
});

export default ResetPassword;
