import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RouteStackParamList } from '../navigation/RouteParameterList';
// 
function LoginPage({navigation, route}: RouteStackParamList<"LoginPage">) {
  // state={
  //   username:"",
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
          height: 600,
        }}
      />
      

      <Text style={styles.logo}>Welcome back, {"\n"} Name</Text>
      <View style={styles.inputView} >
        <TextInput  
          style={styles.inputText}
          placeholder="Username" 
          placeholderTextColor="black"
          onChangeText={text => console.log("tbd, setstate for username")}/>
      </View>
      <View style={styles.underline}>
      </View>
      <View style={styles.inputView} >
        <TextInput  
          secureTextEntry
          style={styles.inputText}
          placeholder="Password" 
          placeholderTextColor="black"
          onChangeText={text => console.log("tbd, setstate for password")}/>
      </View>
      <View style={styles.underline}>
      </View>
      <View style={styles.inputView} >
        <TextInput  
          style={styles.errorText}
          placeholder="Incorrect username or password." 
          placeholderTextColor="red"
          onChangeText={text => console.log("tbd, setstate newusername")}/>
      </View>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot your password?</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUpPage')}>
        <Text style={styles.signUpText}>Not your account?{"\n"}Sign Up</Text>
      </TouchableOpacity>

    </View>
    
  );
}

export default LoginPage;


// function GoToButton({ screenName } : {screenName: any}) {
//   const navigation = useNavigation();

//   return (
//     <TouchableOpacity>
//       title={`Go to ${screenName}`}
//       onPress={() => navigation.navigate(screenName)}
//       </TouchableOpacity>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:40,
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
  }
});