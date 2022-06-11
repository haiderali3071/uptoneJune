import React from "react";
import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { RouteStackParamList } from "../navigation/RouteParameterList";
import { useNavigation } from "@react-navigation/native";

interface HeaderDuetProps {
  titleHeader: string;
  onPressRight: () => void;
  onPressLeft: () => void;
  iconLeftClose?: boolean;
  showIconRight?: boolean;
}

export default function HeaderDuet({
  titleHeader,
  onPressRight,
  onPressLeft,
  iconLeftClose,
  showIconRight,
}: HeaderDuetProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.wrapped}>
        <RectButton onPress={() => onPressLeft()}>
          {iconLeftClose ? (
            <AntDesign style={{ marginLeft: 20 }} name="close" size={24} color="black" />
          ) : (
            <FontAwesome5
              style={{ marginLeft: 20 }}
              name="arrow-left"
              size={24}
              color="black"
            />
          )}
        </RectButton>
        {!showIconRight && (
          <View
            style={{
              width: Dimensions.get("window").width - 88,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 19, fontWeight: "600" }}>{titleHeader}</Text>
          </View>
        )}
        {showIconRight && (
          <Text style={{ fontSize: 19, fontWeight: "600" }}>{titleHeader}</Text>
        )}
        {showIconRight && (
          <RectButton onPress={() => onPressRight()}>
            <View style={{ marginRight: 20 }}>
              <FontAwesome5 name="arrow-right" size={24} color="black" />
            </View>
          </RectButton>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  wrapped: {
    flexDirection: "row",
    alignItems: "center",
    height: 90,
    marginTop: Platform.OS === "ios" ? 15 : 10,
  },
});
