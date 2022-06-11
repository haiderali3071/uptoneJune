import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  Text,
} from "react-native";
const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
interface CountDownPropTypes {
  maxCount: number;
  onEnd?: () => void;
}
export default function CountDown(props: CountDownPropTypes) {
  const [visible, setVisible] = useState(true);
  const [seconds, setSeconds] = useState(props.maxCount);
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((seconds) => {
        if (seconds == 0) {
          setVisible(false);
          if (props.onEnd) props.onEnd();
          clearInterval(timer);
        }
        return seconds - 1;
      });
    }, 1500);
    return () => {
      if (seconds != 0) clearInterval(timer);
    };
  }, []);
  return (
    <View
      style={{
        height: height,
        width: width,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        opacity: 0.6,
        display: visible ? "flex" : "none",
        zIndex: 1,
      }}
    >
      {seconds != 0 ? (
        <Text
          style={{
            fontFamily: "Montserrat",
            fontWeight: "bold",
            fontSize: 50,
            color: "black",
          }}
        >
          {seconds}
        </Text>
      ) : (
        <Text
          style={{
            fontFamily: "Montserrat",
            fontWeight: "bold",
            opacity: 0.9,
            fontSize: 50,
            color: "black",
          }}
        >
          recording !
        </Text>
      )}
    </View>
  );
}
