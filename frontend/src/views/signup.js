import React from "react";
import Form from "../components/Form";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Box } from "@chakra-ui/react";

const signup = () => (
  <Box id="signUpPage" backgroundImage="background.png">
    <NavBar />
    <Form title="Sign Up" />
    <Footer />
  </Box>
);

export default signup;
