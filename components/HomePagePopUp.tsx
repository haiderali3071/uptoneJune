import React,{useRef} from "react";
import { StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import RBSheet from "react-native-raw-bottom-sheet";
import HomePageButtonImage from "./HomePageButtonImage";
import CloseButton from "./CloseButton";
import DuetOptionPopUp from './DuetOptionPopUp';
export default function HomePagePopUp({ refRBSheet, close }: any) {
    interface ref3 {
        current:any;
  }
    const ref2RBSheet: ref3=useRef(null);
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
            <BlurView
                intensity={100}
                style={[StyleSheet.absoluteFill, styles.theme]}
            >
                <View style={styles.theme}>
                    <View style={styles.close}>
                        <CloseButton onPress={close} />
                    </View>
                    <HomePageButtonImage
                        title={"Duet"}
                        imgSource={require("../assets/images/duet.png")}
                        onPress={()=>ref2RBSheet.current.open()}
                    />
                    <HomePageButtonImage
                        title={"Share"}
                        imgSource={require("../assets/images/share.png")}
                    />
                    <HomePageButtonImage
                        title={"Save"}
                        imgSource={require("../assets/images/save.png")}
                    />
                    <HomePageButtonImage
                        title={"Report"}
                        imgSource={require("../assets/images/report.png")}
                    />
                    <DuetOptionPopUp
                  ref2RBSheet={ref2RBSheet}
                  close={()=>ref2RBSheet.current.close()}/>
                </View>
            </BlurView>
        </RBSheet>
    );
}

const styles = StyleSheet.create({
    theme: {
        height: "100%",
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