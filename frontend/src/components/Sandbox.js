import React, { useState } from "react";
import {
	HStack,
	VStack,
	Box,
	Icon,
	Button,
	Editable,
	EditablePreview,
	EditableInput,
	useEditableControls,
	Flex,
	IconButton,
	ButtonGroup,
} from "@chakra-ui/react";

import { EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { HiMicrophone } from "react-icons/hi";
import { BsFillStopFill, BsFillPlayBtnFill } from "react-icons/bs";
import Sentence from "../components/Sentence";
import VoiceHistory from "../components/VoiceHistory";

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

const Sandbox = () => {
	/**
	 * This component displays the sandbox page where users can type custom sentences and practice on them
	 */
	const [disableRecordBtn, setDisableRecordBtn] = useState(false);
	const [disablePlayBtn, setDisablePlayBtn] = useState(false);
	const [textLoaded, setTextLoaded] = useState(false);
	const [sentence, setSentence] = useState({ sentence: "Avocados are an excellent source of protein and fat", id: "0" });
	const [confidence, setConfidence] = useState([]);
	const [sentence_arr, setSentenceArr] = useState([]);
	const [sentenceUpdate, setSentenceUpdate] = useState("");
	const [audioUrls, setAudioUrls] = useState([]);

	function EditableControls() {
		/**
		 * Controls for editing sentence
		 */
		const {
			isEditing,
			getSubmitButtonProps,
			getCancelButtonProps,
			getEditButtonProps,
		} = useEditableControls();

		const handleCheckClick = () => {
			setSentence({sentence: sentenceUpdate, id:"0"});
		};

		return isEditing ? (
			<ButtonGroup justifyContent="center" size="lg">
				<IconButton icon={<CheckIcon />} onClick={handleCheckClick}{...getSubmitButtonProps()}/>
				<IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
			</ButtonGroup>
		) : (
			<Flex justifyContent="center">
				<IconButton size="lg" icon={<EditIcon />} {...getEditButtonProps()}/>
			</Flex>
		);
	}

	const handleSentenceUpdate = (event) => {
		setSentenceUpdate(event);
	};

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
	 * Play audio recording
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
			fetch(`${process.env.REACT_APP_BACKEND_URL}/messages`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					uid: localStorage.getItem("uid"),
					token: localStorage.getItem("token"),
					message: base64AudioMessage,
					...sentence,
					sandbox: true
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
					<Editable
						color="gray"
						fontWeight="light"
						fontSize="3xl"
						justifyContent="left"
						textAlign="center"
						defaultValue={sentence.sentence}
						isPreviewFocusable={false}
						onChange={handleSentenceUpdate}
						onSubmit={() =>
							setSentence({sentence: sentenceUpdate, id: "0"})
						}
					>
						<EditablePreview />
						<EditableInput onBlur={null} />
						<EditableControls bottom="20px" />
					</Editable>
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
								display:
									disablePlayBtn && audio ? "block" : "none",
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
								display: disableRecordBtn ? "none" : "block",
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

export default Sandbox;
