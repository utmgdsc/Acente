import React from 'react'
import {
   HStack, VStack, Box, Center, ListItem, UnorderedList, IconButton, Icon, Button
 } from "@chakra-ui/react"
 
import {HiMicrophone} from "react-icons/hi"
 
const Test = () => {
    const recordAudio = () =>
        new Promise(async resolve => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        let audioChunks = [];

        mediaRecorder.addEventListener('dataavailable', event => {
            audioChunks.push(event.data);
        });

        const start = () => {
            console.log("inside start");
            audioChunks = [];
            mediaRecorder.start();
        };

        const stop = () => {
            console.log("inside stop");
            new Promise(resolve => {
            mediaRecorder.addEventListener('stop', () => {
                const audioBlob = new Blob(audioChunks, { 'type': 'audio/mp3' });
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                const play = () => audio.play();
                resolve({ audioChunks, audioBlob, audioUrl, play });
            });

            mediaRecorder.stop();
            });
        }

        resolve({ start, stop });
    });

    const sleep = time => new Promise(resolve => setTimeout(resolve, time));

    // const recordButton = document.getElementById("record");
    // const stopButton = document.getElementById("stop");
    // const playButton = document.getElementById("play");
    // const saveButton = document.getElementById("save");

    let recorder;
    let audio;

    const handleRecordButtonClick = async () => {
        // recordButton.setAttribute('disabled', true);
        // stopButton.removeAttribute('disabled');
        // playButton.setAttribute('disabled', true);
        // saveButton.setAttribute('disabled', true);
        console.log("inside handle record");
        if (!recorder) {
            recorder = await recordAudio();
        }
        recorder.start();
    }

    const handleStopButtonClick = async () => {
        // recordButton.removeAttribute('disabled');
        // stopButton.setAttribute('disabled', true);
        // playButton.removeAttribute('disabled');
        // saveButton.removeAttribute('disabled');
        audio = recorder.stop();
    }

    const handlePlayButtonClick = () => {
        audio.play();
    }

    const handleSaveButtonClick = () => {
        const reader = new FileReader();
        reader.readAsDataURL(audio.audioBlob);
        reader.onload = () => {
        const base64AudioMessage = reader.result.split(',')[1];
        fetch('http://127.0.0.1:5000/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: base64AudioMessage })
        }).then(res => {
            if (res.status === 201) {
            // return populateAudioMessages();
            }
            console.log('Invalid status saving audio message: ' + res.status);
        });
        };
    }
 
   return (
       <HStack height="86vh" justifyContent="center" spacing="20px" padding="50px">
           <VStack height="100%" width="70%" spacing="20px">
               <Box height="50%" width="100%" backgroundColor="#EDF2F7" borderRadius="3xl" padding="20px">
                   <Center color="gray" fontWeight="light" fontSize="3xl" justifyContent="left"> I can't believe it's not butter! </Center>
                   {/* <Button borderRadius="full" height="70px" width="70px" top="100px" left="800px" backgroundColor="#CBD5E0" onClick={handleMicrophoneClick}>
                       <Icon w={8} h={8} as={HiMicrophone}color="black" />
                   </Button> */}
                    <button id="record" onClick={handleRecordButtonClick}>Record</button>
                    <button id="stop" onClick={handleStopButtonClick}>Stop</button>
                    <button id="play" onClick={handlePlayButtonClick}>Play</button>
                    <button id="save" onClick={handleSaveButtonClick}>Save</button>
               </Box>
               <Box height="50%" width="100%" backgroundColor="#EDF2F7" borderRadius="3xl" padding="20px">
                   <Center color="gray" fontWeight="light" fontSize="3xl" justifyContent="left"> I can't believe it's not butter! </Center>
               </Box>
           </VStack>
           <VStack height="100%" width="30%">
               <Box height="15%" width="100%">
                   <Center color="gray" fontWeight="10px" fontSize="5xl" justifyContent="left"> Your History </Center>
               </Box>
               <Box height="85%" width="100%" backgroundColor="#EDF2F7" borderRadius="3xl" padding="20px">
               </Box>
           </VStack>
       </HStack>
   )
}
 
export default Test;