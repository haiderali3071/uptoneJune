import React, { } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function MicButton(props: any){
    return (
        <View style={{position:'absolute',
                          bottom:40,
                          right:20,
                          height:45,
                          width:45,
                          borderRadius:30,
                          backgroundColor:'#FFF',
                          shadowColor: '#000',
                          shadowOffset: { width: 1, height: 1 },
                          shadowOpacity:  0.4,
                          shadowRadius: 3,
                          elevation:5,}}>
                              <TouchableOpacity>
                                    <Image  source={require('../assets/images/micGuidance.png')}
                                                style={styles.micimage} />
                              </TouchableOpacity>
                        </View>
    );
}
const styles = StyleSheet.create({
    micimage: {
        height:50,
        width:50,
        borderRadius:30,
      }
})