import React, { useState } from 'react'
import { View, Text, StyleSheet} from 'react-native'
import Slider from '@react-native-community/slider';


export default function Seekbar() {
    let [sliderValuem, setSliderValue] = useState(0)
    return (
        <Slider
          maximumValue={100}
          minimumValue={0}
          minimumTrackTintColor="red"
          maximumTrackTintColor="gray"
          thumbTintColor = "red"
          step={1}
          value={sliderValuem}
          onValueChange={(sliderValue) => setSliderValue(sliderValue)}
          style={{ width: 300, height: 40 }}
        />
    );
  }


  const styles = StyleSheet.create(
    {
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      headerText: {
        fontSize: 25,
        textAlign: "center",
        margin: 10,
        color: 'black',
        fontWeight: "bold"
      },
  
    });
