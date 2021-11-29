import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import {
	Flex,
	Stack,
	Box,
	Heading,
	Button,
	Text,
	Image,
} from "@chakra-ui/react";
export const landing = (props) => {
	let history = props.history;
	const handleSignUpClick = () => {
		history.push("/signup");
	};
	const handlePracticeClick = () => {
		history.push("/practice");
	};
	return (
		<div>
			<NavBar
				type={
					localStorage.getItem("uid") ? "dashboardMenu" : "loginMenu"
				}
			/>
			<Flex
				align="center"
				justify={{
					base: "center",
					md: "space-around",
					xl: "space-between",
				}}
				direction={{ base: "column-reverse", md: "row" }}
				wrap="no-wrap"
				minH="70vh"
				height="86vh"
				px={8}
			>
				<Box
					w={{ base: "80%", sm: "60%", md: "50%" }}
					mb={{ base: 12, md: 0 }}
				>
					{/* <Practice /> and remove img */}
					<Image
						src="background.png"
						size="100%"
						rounded="1rem"
						shadow="2xl"
					/>
				</Box>
				<Stack
					spacing={4}
					w={{ base: "80%", md: "40%" }}
					align={["center", "center", "flex-start", "flex-start"]}
				>
					<Heading
						as="h1"
						size="xl"
						fontWeight="bold"
						color="primary.800"
						textAlign={["center", "center", "left", "left"]}
					>
						{"Acente"}
					</Heading>
					<Heading
						as="h2"
						size="md"
						color="primary.800"
						opacity="0.8"
						fontWeight="normal"
						lineHeight={1.5}
						textAlign={["center", "center", "left", "left"]}
					>
						{"Your personalized voice coach"}
					</Heading>
					<Text>
						Acente is a speech coach designed for your voice, to
						make learning accents a whole lot easier. <br />
						We have customized accent profiles tailored to targeting
						your weak spots and allow for a personalized learning
						experience to suit your language needs
					</Text>
					{localStorage.getItem("uid") ? (
						<Button
							onClick={handlePracticeClick}
							colorScheme="green"
							borderRadius="8px"
							py="4"
							px="4"
							size="md"
						>
							{"Start practicing now"}
						</Button>
					) : (
						<Button
							onClick={handleSignUpClick}
							colorScheme="green"
							borderRadius="8px"
							py="4"
							px="4"
							lineHeight="1"
							size="md"
						>
							{"Create your account now"}
						</Button>
					)}
					{localStorage.getItem("uid") ? (
						""
					) : (
						<Text
							fontSize="xs"
							mt={2}
							textAlign="center"
							color="primary.800"
							opacity="0.6"
						>
							No credit card required.
						</Text>
					)}
				</Stack>
			</Flex>
			<Footer />
		</div>
	);
};

export default landing;
