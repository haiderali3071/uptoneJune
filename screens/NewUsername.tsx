import React from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RouteStackParamList } from '../navigation/RouteParameterList';

export default function SignupPage ({navigation, route}: RouteStackParamList<"SignUpPage">) {
  // state={
  //   name:"",
  //   username:"",
  //   email:"",
  //   password:""
  // }
  return (

    <View style={styles.container}>
      <LinearGradient
        colors={['#FFFFFF', '#FFFFFF']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: height,
          width: width
        }}
      />
      <Text style={styles.logo}>Welcome to Uptone</Text>
      <View style={styles.inputView} >
        <TextInput  
          style={styles.inputText}
          placeholder="Name" 
          placeholderTextColor="black"
          onChangeText={text => console.log("tbd, setstate name")}/>
      </View>
      <View style={styles.underline}>
      </View>
      <View style={styles.inputView} >
        <TextInput  
          style={styles.inputText}
          placeholder="Username" 
          placeholderTextColor="black"
          onChangeText={text => console.log("tbd, setstate username")}/>
      </View>
      <View style={styles.underline}>
      </View>
      <View style={styles.inputView} >
        <TextInput  
          style={styles.errorText}
          placeholder="Username already taken. Try again." 
          placeholderTextColor="red"
          onChangeText={text => console.log("tbd, setstate newusername")}/>
      </View>
      <View style={styles.inputView} >
        <TextInput  
          style={styles.emailText}
          placeholder="Email" 
          placeholderTextColor="black"
          onChangeText={text => console.log("tbd, setstate email")}/>
      </View>
      <View style={styles.underline}>
      </View>
      <View style={styles.inputView} >
        <TextInput  
          secureTextEntry
          style={styles.inputText}
          placeholder="Password" 
          placeholderTextColor="black"
          onChangeText={text => console.log("tbd, setstate password")}/>
      </View>
      <View style={styles.underline}>
      </View>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {navigation.navigate('LoginPage')}}>
        <Text style={styles.signUpText}>Already have an account?{"\n"}Log in</Text>
        {/* onPress={() => navigation.navigate(Signup)} */}
      </TouchableOpacity>

      <ImageBackground
          source = {require('../assets/vectorlogo.png')}
          style = {styles.background}
          >

          </ImageBackground>


    </View>
  );
}

const height = Dimensions.get("screen").height
const width = Dimensions.get('screen').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:33,
    color:"#000000",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"transparent",
    borderRadius:25,
    height:50,
    marginBottom:0,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"black",
    fontWeight:"bold",
  },
  errorText:{
    height:50,
    color:"red",
    fontWeight:"bold",
    marginBottom:30
  },
  emailText:{
    height:50,
    color:"black",
    fontWeight:"bold",
    marginBottom:40
  },
  forgot:{
    color:"black",
    fontSize:16,
    marginBottom:40
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#7393B3",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:100,
    marginBottom:40
  },
  loginText:{
    fontWeight:"bold",
    color:"white",
    fontSize:18
  },
  signUpText:{
    color:"black",
    fontSize:16,
    textAlign: 'center'
  },
  underline:{
    height: 0,
    width: 260,
    borderTopColor: "black",
    borderTopWidth: 2,
    marginTop: 0,
    marginBottom:20
  },
  background: {
    height: '65%',
    width: '65%',
    position: 'absolute',
      left: '58%',
      right: '25%',
      top: '20%',
      bottom: '50.78%',
 },
});