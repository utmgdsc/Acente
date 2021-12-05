import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Box } from "@chakra-ui/react";
import SignUpForm from "../components/SignUpForm";

const signup = (props) => (
	<Box id="signUpPage" backgroundImage="/background.png">
		<NavBar type="loginMenu" />
		<SignUpForm title="Sign Up" {...props} />
		<Footer />
	</Box>
);

export default signup;
