import React from 'react';
import { StyleSheet, View,Dimensions, ImageBackground, Alert } from 'react-native';
import {Card, Image, Button, Text, Divider} from 'react-native-elements';
import {MaterialIcons} from '@expo/vector-icons';
import BottomApp from '../components/BottomNavigation';
export default function ProfileSettings() {
    return (
        <View style={styles.container}>
        <ImageBackground source={require('../assets/background.png')} style={styles.backgroundImage}>
            <View style = {styles.viewImage}>
                <Card containerStyle = {styles.cardImage}>
                    <Image source = {require('../assets/images/profile.jpg')} style = {styles.image}></Image>
                </Card>
            </View>  
            <View style = {styles.viewImage}>
                <Button
                    title = "Add / Edit Greeting" 
                    onPress = {handlePress} 
                    buttonStyle = {styles.button}
                    titleStyle = {{color: 'black', fontSize: 18, paddingLeft: 30, paddingRight: 30, textAlign:'center'}}
                >
                </Button>
            </View>  
            <View style={styles.cardOpener}>
              <View style={{backgroundColor: 'white', height:'50%', width:'2%'}}></View>
            </View>
            <View style = {styles.cardStyle}>
                <Card containerStyle = {styles.card}>
                    <View style = {styles.headerStyle}>
                        <Text style = {styles.headerTextStyle}>Settings</Text>
                    </View>
                    <Divider style = {styles.dividerStyle} />
                    <View style = {styles.optionViewStyle}>
                        <MaterialIcons className = "setting-icon" name = "edit" size={24} color='grey'/>
                        <Text style = {styles.optionStyle} onPress={handlePasswordIcon}>Edit Username</Text>
                    </View>
                    <View style = {styles.optionViewStyle}>
                        <MaterialIcons className = "setting-icon" name = "lock" size={24} color='grey'/>
                        <Text style = {styles.optionStyle} onPress={handlePasswordIcon}>Edit Display Name</Text>
                    </View>
                    <View style = {styles.optionViewStyle}>
                        <MaterialIcons className = "setting-icon" name = "lock" size={24} color='grey'/>
                        <Text style = {styles.optionStyle} onPress={handlePasswordIcon}>Change Password</Text>
                    </View>
                    <View style = {styles.optionViewStyle}>
                        <MaterialIcons className = "setting-icon" name = "insert-photo" size={24} color='grey'/>
                        <Text style = {styles.optionStyle} onPress={handleImageIcon}>Edit Background Image</Text>
                    </View>
                    <View style = {styles.optionViewStyle}>
                        <MaterialIcons className = "setting-icon" name = "account-circle" size={24} color='grey'/>
                        <Text style = {styles.optionStyle} onPress={handlePasswordIcon}>Change Profile Picture</Text>
                    </View>
                    <View style = {styles.optionViewStyle}>
                        <MaterialIcons className = "setting-icon" name = "email" size={24} color='grey'/>
                        <Text style = {styles.optionStyle} onPress={handleEmailIcon}>Change Email</Text>
                    </View>
                    <View style = {styles.optionViewStyle}>
                        <MaterialIcons className = "setting-icon" name = "exit-to-app" size={24} color='grey'/>
                        <Text style = {styles.optionStyle} onPress={handleExitIcon}>Log Out</Text>
                    </View>
                </Card>
            </View>
        </ImageBackground>
    </View>
    )
}

const handlePress = () => {
    return null
}

const handleExitIcon = () => {
    return null
}

const handleEmailIcon = () => {
    return null
}

const handleImageIcon = () => {
    return null
}
const handlePasswordIcon = () => {
    return null
}

const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    viewImage: {
        display:'flex',
        alignItems: 'center',
    },
    image: {
        height: 100,
        width: 100,
        borderRadius:50,
    },
    cardImage: {
        height: 100,
        width: 100,
        borderRadius: 60,
        marginTop:'4%',
        marginBottom:'2%',
        display:'flex',
        alignItems: 'center',
        justifyContent:'center',
        padding: 0,
    },
    button: {
        width: '100%',
        marginTop: 30,
        borderRadius: 20,
        backgroundColor: '#fff',       
    },
    cardOpener:{
      width:'100%', 
      height:'1%', 
      marginTop:80, 
      marginBottom:10,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardStyle:{
        flex:1
    },
    card:{
        height: height - 360,
        width: '100%',
        margin: 0,
        padding: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    headerStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    headerTextStyle:{
        width:'100%',
        fontSize: 21, 
        display: 'flex',
        justifyContent:'center',
        paddingTop: 20,
        color:'#4F4F4F',
        fontWeight:'600',
    },
    dividerStyle:{
        marginTop: 20,
        marginLeft: 80,
        marginRight: 80
    },
    optionViewStyle:{
        display: 'flex',
        flexDirection:'row',
        alignItems: 'flex-start',
        marginLeft: 60,
        marginTop: 20,
    },
    optionStyle:{
        fontSize:16,
        marginLeft: 20,
        marginTop:4,
        color:'#4F4F4F'
    },
    bottomStyle:{
        height: height
    },
})
