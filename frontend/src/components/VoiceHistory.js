import React, { useState, useEffect } from "react";
import { BsFillStopFill, BsFillPlayBtnFill } from "react-icons/bs";
import { HStack, VStack, Box, Center, Icon, Button } from "@chakra-ui/react";
import { useIntl } from "react-intl";

const VoiceHistory = ({ urls }) => {
	/**
	 * This component stores and renders past sentences and audio voice of users.
	 */
	const { formatMessage } = useIntl();
	const sources = urls.map((url) => {
		return {
			audio: new Audio(url.url),
			url: url.url,
		};
	});
	const [players, setPlayers] = useState(
		urls.map((url) => {
			return {
				...url,
				playing: false,
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
	}, [urls]);
	const toggle = (targetIndex) => () => {
		/* Toggle function to show diff button and control audio players
		 */
		const newPlayers = [...players];
		const currentIndex = players.findIndex((p) => p.playing === true);
		if (currentIndex !== -1 && currentIndex !== targetIndex) {
			newPlayers[currentIndex].playing = false;
			sources[currentIndex].audio.pause();
			sources[targetIndex].audio.play();
			newPlayers[targetIndex].playing = true;
		} else if (currentIndex !== -1) {
			newPlayers[targetIndex].playing = false;
			sources[targetIndex].audio.pause();
		} else {
			newPlayers[targetIndex].playing = true;
			sources[targetIndex].audio.play();
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
	}, [sources]);
	return (
		<Box height="100%" width="100%">
			<Box height="10%" width="100%">
				<Center
					color="gray"
					fontWeight="10px"
					fontSize="5xl"
					justifyContent="left"
				>
					{formatMessage({id: "history"})}
				</Center>
			</Box>
			<VStack
				height="90%"
				width="100%"
				backgroundColor="#EDF2F7"
				borderRadius="3xl"
				padding="20px"
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
	<Center>
		<Center
			color="gray"
			fontWeight="light"
			fontSize="2xl"
			justifyContent="left"
		>
			{player.sentence}
		</Center>
		<HStack spacing={2} align="right">
			<Button onClick={toggle}>
				<Icon
					w={8}
					h={8}
					as={player.playing ? BsFillStopFill : BsFillPlayBtnFill}
					color="black"
				/>
			</Button>
		</HStack>
	</Center>
);

export default VoiceHistory;
