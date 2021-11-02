import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {
  FormErrorMessage,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  VStack,
  Center,
  Box,
  Button,
  Flex,
} from "@chakra-ui/react";

const axios = require('axios');

const SignUpForm = () => {
  
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  const [isSubmitError, changeSubmitError ] = useState('');

  function onSubmit(values) {
    let bodyFormData = new FormData();
    bodyFormData.append('name', values["name"]);
    bodyFormData.append('language', values["language"]);
    bodyFormData.append('email', values["email"]);
    bodyFormData.append('password', values["password"]);
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:5000/api/signup',
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(function (response) {
      console.log(response);

      //changeSubmitError('');
    })
    .catch(function (error) {
      console.log(error);

      //changeSubmitError(error); // might be like too nerdy, "EMAIL OR PASSWORD WRONG"
    });
  }

  return(
  <Box m="auto" width="25%">
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack height="86vh"  justifyContent="center" background="white">
          <Flex direction="column" justifyContent="center" alignItems="center">
            <Center fontSize="7xl" letterSpacing="10px" fontFamily="mono">
              ACENTÉ
            </Center>
            <Center fontSize="3xl" color="gray">
              Sign Up
            </Center>

            <FormControl id="name" isInvalid={errors.name}>
              <FormLabel mb="1px">Name</FormLabel>
              <Input
                name="name"
                placeholder="JohnDoe" 
                borderWidth="2px"
                {...register("name", {
                  required: "This is required",
              })}/>
              <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
            </FormControl>
            <FormControl id="language" isInvalid={errors.language}>
              <FormLabel mb="1px">Language</FormLabel>
              <Input 
                name="language"
                placeholder="Klingon" 
                borderWidth="2px"
                {...register("language", {
                  required: "This is required",
              })}/>
              <FormErrorMessage>
              {errors.language && errors.language.message}
            </FormErrorMessage>
            </FormControl>
            <FormControl id="email" isInvalid={errors.email}>
              <FormLabel mb="1px" mt="8px">
                Email address
              </FormLabel>
              <Input
                name="email"
                type="email"
                borderWidth="2px"
                placeholder="johndoe@fakeemail.com"
                {...register("email", {
                  required: "This is required",
              })}/>
              <FormHelperText mt="1px">
                We'll never share your email.
              </FormHelperText>
              <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
            </FormControl>
            <FormControl id="password" isInvalid={errors.password}>
              <FormLabel mb="1px">Password</FormLabel>
              <Input borderWidth="2px"
                name="password"
                type="password"
                {...register("password", {
                  required: "This is required",
                  minLength: { value: 8, message: "Minimum length should be 8" }
              })}/>
              <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
            </FormControl>
          </Flex>
          <Button colorScheme="gray" type="submit" isLoading={isSubmitting}>Submit</Button>
      </VStack>
      </form>
  </Box>
  )
};

export default SignUpForm;
