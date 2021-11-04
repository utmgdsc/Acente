import React from "react";
import Footer from "../components/Footer"; 
import NavBar from "../components/NavBar";
import { Box } from '@chakra-ui/react';
import LoginForm from "../components/LoginForm";

export const login = () => {
  return (
    <Box id="loginPage" backgroundImage="background.png">
      <NavBar type="loginMenu"/>
      <LoginForm title="Login" />
      <Footer />
    </Box>
  );
};

export default login;
