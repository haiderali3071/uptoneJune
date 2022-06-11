import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { BlurView } from "expo-blur";
import RBSheet from "react-native-raw-bottom-sheet";
import HomePageButtonImage from "./HomePageButtonImage";
import CloseButton from "./CloseButton";
import { RouteStackParamList } from "../navigation/RouteParameterList";
import RecordPage from '../screens/RecordPage';
export default function NavigationBarPopUp({ refRBSheet, close }: any) {
    let navigation = useNavigation();
//     const ref2RBSheet: ref3=useRef(null);
    const handleRecordButton = () => {
        navigation.navigate("RecordPage");
        refRBSheet.current.close();
        console.log("Testing")
    }
    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={false}
            closeOnPressMask={true}
            customStyles={{
                container: {
                    backgroundColor: "transparent",
                },
                wrapper: {
                    backgroundColor: "transparent",
                },
            }}
        >
                <View style={[StyleSheet.absoluteFill, styles.theme]}>
                    <View style={styles.close}>
                        <CloseButton onPress={close} />
                    </View>
                    <HomePageButtonImage
                        title={"Record Audio"}
                        onPress={handleRecordButton}
                        imgSource={require("../assets/images/mic1x.png")}
                        
                    />
                    <HomePageButtonImage
                        title={"Upload Audio"}
                        imgSource={require("../assets/images/upload1x.png")}
                    />
                </View>
        </RBSheet>
    );
}

const styles = StyleSheet.create({
    theme: {
        flex:1,
        top:70,
        height: "70%",
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        
    },
    close: {
        alignItems: "flex-end",
        paddingTop: 15,
        paddingRight: 15,
    },
});