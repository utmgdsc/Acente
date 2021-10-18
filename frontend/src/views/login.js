import React from "react";
import Footer from "../components/Footer";
import Form from "../components/Form";
import NavBar from "../components/NavBar";
import { Box } from '@chakra-ui/react';

export const login = () => {
  return (
    <Box id="loginPage" backgroundImage="background.png">
      <NavBar type="loginMenu"/>
      <Form title="Login" />
      <Footer />
    </Box>
  );
};

export default login;
