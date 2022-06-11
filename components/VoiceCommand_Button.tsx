import React from "react";
import { StyleSheet, Text, View, Button, Image} from "react-native";
import { Audio } from 'expo-av';
import { RNS3 } from 'react-native-aws3';

// Voice Command Flow: 
// Client recording --> AWS Bucket --> AWS Transcribe --> executes voice command(string)


// Sends recording to AWS Bucket
function awsUpload(Uri){
    const file = {
        // `uri` can also be a file system path (i.e. file://)
        uri: Uri,
        name: "recording.mp4",
        type: "audio/mp4"
    }
    
    const options = {
        keyPrefix: "VoiceFiles/",
        bucket: "transcribefiles",
        region: "us-west-1",
        accessKey: "AKIAVN2MRBTAWTEYRDU2",
        secretKey: "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",
        successActionStatus: 201
    }
    // console.log(RNS3);
    RNS3.put(file, options).then(response => {
    if (response.status !== 201)
        throw new Error("Failed to upload image to S3");
    console.log(response.body);

    /**
     * {
     *   postResponse: {
     *     bucket: "your-bucket",
     *     etag : "9f620878e06d28774406017480a59fd4",
     *     key: "uploads/image.png",
     *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
     *   }
     * }
     */
    });
        
}

//Creates voice recording
export default function VoiceCommand(){
    const [recording, setRecording] = React.useState();
    const RecordingOptions = {
        isMeteringEnabled: true,
        android: {
            extension: '.mp4',
            outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_AMR_NB,
            audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_NB,
            numberOfChannels: 1,
            bitRate: 128000,
        },
        ios: {
            extension: '.mp4',
            // outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_AMR,
            audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
            numberOfChannels: 1,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
        },
      };

    async function startRecording() {
        try {
        console.log('Requesting permissions..');
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
        }); 
        console.log('Starting recording..');
        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync(RecordingOptions);
        await recording.startAsync(); 
        setRecording(recording);
        console.log('Recording started');
        } catch (err) {
        console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI(); 
        console.log('Recording stopped and stored at', uri);
        awsUpload(uri);

    }
    return (
        <View>
            <Button
            title={recording ? 'Stop Recording' : 'Start Recording'}
            onPress={recording ? stopRecording : startRecording}
            />
        </View>
    )
}