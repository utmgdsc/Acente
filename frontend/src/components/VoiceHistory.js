import React, { useState, useEffect } from "react";
import { BsFillPauseBtnFill, BsFillPlayBtnFill } from "react-icons/bs";
import { HStack, VStack, Box, Center, Icon, Button } from "@chakra-ui/react";
import Sentence from "../components/Sentence";
const VoiceHistory = ({ urls }) => {
	/**
	 * This component stores and renders past sentences and audio voice of users.
	 */
	const [players, setPlayers] = useState(
		urls.map((url) => {
			return {
				...url,
				playing: false,
			};
		})
	);
	const [sources, setSources] = useState(
		urls.map((url) => {
			return {
				audio: new Audio(url.url),
				url: url.url,
			};
		})
	);
	useEffect(() => {
		setPlayers(
			urls.map((url) => {
				return {
					...url,
					playing: false,
				};
			})
		);
		setSources(
			urls.map((url) => {
				return {
					audio: new Audio(url.url),
					url: url.url,
				};
			})
		);
	}, [urls]);
	const toggle = (targetIndex) => () => {
		/* Toggle function to show diff button and control audio players
		 */
		const newPlayers = [...players];
		const currentIndex = players.findIndex((p) => p.playing === true);
		if (currentIndex !== -1 && currentIndex !== targetIndex) {
			newPlayers[currentIndex].playing = false;
			newPlayers[targetIndex].playing = true;
		} else if (currentIndex !== -1) {
			newPlayers[targetIndex].playing = false;
		} else {
			newPlayers[targetIndex].playing = true;
		}
		setPlayers(newPlayers);
	};
	useEffect(() => {
		sources.forEach((source, i) => {
			source.audio.addEventListener("ended", () => {
				const newPlayers = [...players];
				newPlayers[i].playing = false;
				setPlayers(newPlayers);
			});
			players[i].playing ? source.audio.play() : source.audio.pause();
		});
		return () => {
			sources.forEach((source, i) => {
				source.audio.removeEventListener("ended", () => {
					const newPlayers = [...players];
					newPlayers[i].playing = false;
					setPlayers(newPlayers);
				});
			});
		};
	}, [sources, players]);
	return (
		<Box height="100%" width="100%">
			<Box height="10%" width="100%">
				<Center
					color="gray"
					fontWeight="10px"
					fontSize="5xl"
					justifyContent="left"
				>
					{" History "}
				</Center>
			</Box>
			<VStack
				height="90%"
				width="100%"
				backgroundColor="#EDF2F7"
				borderRadius="3xl"
				padding="20px"
				justifyContent="left"
				style={{ overflow: "scroll" }}
			>
				{players.map((player, i) => (
					<Player key={i} player={player} toggle={toggle(i)} />
				))}
			</VStack>
		</Box>
	);
};

const Player = ({ player, toggle }) => (
	<HStack width="100%">
		<HStack width="90%">
			<Sentence
				confidence={player.confidence}
				sentence_arr={player.sentence_arr}
				textLoaded={true}
			/>
		</HStack>
		<HStack width="10%">
			<Button onClick={toggle}>
				<Icon
					w={8}
					h={8}
					as={player.playing ? BsFillPauseBtnFill : BsFillPlayBtnFill}
					color="black"
				/>
			</Button>
		</HStack>
	</HStack>
);

export default VoiceHistory;
