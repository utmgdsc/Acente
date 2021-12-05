import React from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { Box } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";

const login = (props) => {
	return (
		<Box id="loginPage" backgroundImage="/background.png">
			<NavBar type="loginMenu" />
			<LoginForm title="Login" {...props} />
			<Footer />
		</Box>
	);
};

export default login;
