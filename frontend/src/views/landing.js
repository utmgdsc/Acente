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
import { useIntl } from "react-intl";
const Landing = (props) => {
	let history = props.history;
	const handleSignUpClick = () => {
		history.push("signup");
	};
	const handlePracticeClick = () => {
		history.push("practice");
	};

	const { formatMessage } = useIntl();
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
						src="/background.png"
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
						{formatMessage({id: "headline"})}
					</Heading>
					<Text>
						{formatMessage({id: "description"})}
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
							{formatMessage({id: "practice"})}
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
							{formatMessage({id: "create"})}
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
							{formatMessage({id: "credit"})}
						</Text>
					)}
				</Stack>
			</Flex>
			<Footer />
		</div>
	);
};

export default Landing;