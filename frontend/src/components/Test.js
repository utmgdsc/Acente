import React, { useState, useEffect } from "react";
import { HStack, VStack, Box, Center, Icon, Button } from "@chakra-ui/react";

import { HiMicrophone } from "react-icons/hi";
import {GrRefresh} from "react-icons/gr";
import { BsFillStopFill, BsFillPlayBtnFill } from "react-icons/bs";
import Sentence from "../components/Sentence";
import VoiceHistory from "../components/VoiceHistory";

const axios = require("axios");

// Global recorder variable stores audio file and current audio state
let recorder;
let audio;

const recordAudio = () =>
	/**
	 * This component provides functionality for recording, stopping, playing and saving audio
	 */
	new Promise(async (resolve) => {
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: true,
		});
		const mediaRecorder = new MediaRecorder(stream);
		let audioChunks = [];

		mediaRecorder.addEventListener("dataavailable", (event) => {
			audioChunks.push(event.data);
		});

		const start = () => {
			audioChunks = [];
			mediaRecorder.start();
		};

		const stop = () => {
			const promise = new Promise((resolve) => {
				mediaRecorder.addEventListener("stop", () => {
					const audioBlob = new Blob(audioChunks, {
						type: "audio/mp3",
					});
					const audioUrl = URL.createObjectURL(audioBlob);
					const audio = new Audio(audioUrl);
					const play = () => audio.play();
					resolve({ audioChunks, audioBlob, audioUrl, play });
				});

				mediaRecorder.stop();
			});

			return promise;
		};

		resolve({ start, stop });
	});

const Test = () => {
	/**
	 * This component displays the practice page where users can practice on preset sentences
	 */
	const [disableRecordBtn, setDisableRecordBtn] = useState(false);
	const [disablePlayBtn, setDisablePlayBtn] = useState(false);
	const [textLoaded, setTextLoaded] = useState(false);
	const [sentence, setSentence] = useState({ sentence: "", id: "0" });
	const [confidence, setConfidence] = useState([]);
	const [sentence_arr, setSentenceArr] = useState([]);
	const [audioUrls, setAudioUrls] = useState([]);

	useEffect(() => {
		// On load, grab a randomized sentence from the database
		axios({
			method: "GET",
			url: "http://127.0.0.1:5000/api/randomSentenceGenerator",
		}).then(function (response) {
			if (response.status === 200) {
				setSentence(response.data.sentence);
			}
		});
	}, []);

	const handleRefreshButtonClick = () => {
		// Refresh button grabs a new sentence from the database
		axios({
			method: "GET",
			url: "http://127.0.0.1:5000/api/randomSentenceGenerator",
		}).then(function (response) {
			if (response.status === 200) {
				setSentence(response.data.sentence);
			}
		});
	}

	/**
	 * Start recording
	 */
	const handleRecordButtonClick = async () => {
		if (!recorder) {
			recorder = await recordAudio();
		}
		recorder.start();
		setDisableRecordBtn(true);
		setDisablePlayBtn(false);
	};

	/**
	 * Stop recording, and save audio
	 */
	const handleStopButtonClick = async () => {
		audio = await recorder.stop();
		handleSaveButtonClick();
		setDisableRecordBtn(false);
	};

	/**
	 * Playback audio recording to the user
	 */
	const handlePlayButtonClick = () => {
		audio.play();
	};

	/**
	 * Save audio recording, and send it to the backend for parsing
	 */
	const handleSaveButtonClick = () => {
		const reader = new FileReader();
		reader.readAsDataURL(audio.audioBlob);

		reader.onload = () => {
			setTextLoaded(false);
			const base64AudioMessage = reader.result.split(",")[1];
			fetch("http://127.0.0.1:5000/messages", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					uid: localStorage.getItem('uid'),
                    message: base64AudioMessage,
					...sentence,
				}),
			}).then((res) => {
				if (res.status === 200) {
					res.json().then((r) => {
						setConfidence(r.confidence);
						setSentenceArr(r.sentence_arr);
						setTextLoaded(true);
						setAudioUrls([{url:audio.audioUrl, confidence:r.confidence, sentence_arr:r.sentence_arr}, ...audioUrls]);
					});
				} else {
					console.log(
						"Invalid status saving audio message: " + res.status
					);
				}
			});
		};
		setDisablePlayBtn(true);
	};
	return (
		<HStack
			height="86vh"
			justifyContent="center"
			spacing="20px"
			padding="50px"
		>
			<VStack height="100%" width="70%" spacing="20px">
				<Box
					height="50%"
					width="100%"
					backgroundColor="#EDF2F7"
					borderRadius="3xl"
					padding="20px"
					position="relative"
				>
					<Center
						color="gray"
						fontWeight="light"
						fontSize="3xl"
						justifyContent="left"
					>
						{" "}
						{sentence.sentence}{" "}
					</Center>
					<HStack
						spacing={4}
						align="right"
						position="absolute"
						bottom="20px"
						right="20px"
					>
						<Button
							borderRadius="full"
							height="70px"
							width="70px"
							backgroundColor="#CBD5E0"
							style={{
								display: (disablePlayBtn && audio) ? "block" : "none",
							}}
							onClick={handlePlayButtonClick}
						>
							<Icon
								w={8}
								h={8}
								as={BsFillPlayBtnFill}
								color="black"
							/>
						</Button>
						<Button
							borderRadius="full"
							height="70px"
							width="70px"
							backgroundColor="#CBD5E0"
							style={{
								display: disableRecordBtn  ? "none" : "block",
							}}
							onClick={handleRecordButtonClick}
						>
							<Icon w={8} h={8} as={HiMicrophone} color="black" />
						</Button>
						
						<Button
							borderRadius="full"
							height="70px"
							width="70px"
							backgroundColor="#CBD5E0"
							style={{
								display: disableRecordBtn ? "block" : "none",
							}}
							onClick={handleStopButtonClick}
						>
							<Icon
								w={8}
								h={8}
								as={BsFillStopFill}
								color="black"
							/>
						</Button>
						<Button
							borderRadius="full"
							height="70px"
							width="70px"
							backgroundColor="#CBD5E0"
							onClick={handleRefreshButtonClick}
						>
							<Icon w={8} h={8} as={GrRefresh} color="black" />
						</Button>
					</HStack>
				</Box>
				<Box
					height="50%"
					width="100%"
					backgroundColor="#EDF2F7"
					borderRadius="3xl"
					padding="20px"
				>
					<Sentence confidence={confidence} sentence_arr={sentence_arr} textLoaded={textLoaded} />
				</Box>
			</VStack>
			<VStack height="100%" width="30%">
				<VoiceHistory urls={audioUrls} />
			</VStack>
		</HStack>
	);
};

export default Test;
