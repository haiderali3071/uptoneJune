import React from "react";
import { StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import RBSheet from "react-native-raw-bottom-sheet";
import HomePageButtonImage from "./HomePageButtonImage";
import CloseButton from "./CloseButton";
import DuetOptionButtonImage from "./DuetOptionButtonImage";
export default function DuetOptionPopUp({ ref2RBSheet, close }: any) {
    //const ref2RBSheet: ref3=useRef(null);
    return (
        <RBSheet
            ref={ref2RBSheet}
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
                    <DuetOptionButtonImage
                        title={"Merge audios"}
                        imgSource={require("../assets/images/merge.png")}
                        
                    />
                    <DuetOptionButtonImage
                        title={"Add new audio to end"}
                        imgSource={require("../assets/images/rightarrow.png")}
                    />
                    <DuetOptionButtonImage
                        title={"Add new audio to beginning"}
                        imgSource={require("../assets/images/leftarrow.png")}
                    />
                    <HomePageButtonImage
                  refRBSheet={ref2RBSheet}
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