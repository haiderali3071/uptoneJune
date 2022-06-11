import React from 'react';
import StartRecording from '../components/StartRecording';
import Recording from '../components/Recording'
import { RouteParamList, RouteStackParamList } from '../navigation/RouteParameterList';
export default function RecordPage(props: RouteStackParamList<"RecordPage">){
    return(
        <StartRecording {...(props as unknown as RouteStackParamList<"Record">)}/>
    )
}