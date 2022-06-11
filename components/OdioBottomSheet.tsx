import React from "react";
import { StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import RBSheet from "react-native-raw-bottom-sheet";
import TransparentButtonWithImage from "./TransparentButtonWithImage";
import CloseButton from "./CloseButton";

export default function OdioBottomSheet({ refRBSheet, close }: any) {
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
                    <TransparentButtonWithImage
                        title={"Record"}
                        imgSource={require("../assets/images/mic.png")}
                    />
                    <TransparentButtonWithImage
                        title={"Upload Recording"}
                        imgSource={require("../assets/images/upload.png")}
                    />
                </View>
            </BlurView>
        </RBSheet>
    );
}

const styles = StyleSheet.create({
    theme: {
        height: "100%",
        width: "100%",
        backgroundColor: "#414066ee",
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
    },
    close: {
        alignItems: "flex-end",
        paddingTop: 15,
        paddingRight: 15,
    },
});
