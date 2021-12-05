import {React, useState}from "react";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';

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

const LoginForm = ({title}) => {
  let history = useHistory();
  const [isSubmitError, changeSubmitError] = useState('');

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  function onSubmit(values) {
    let bodyFormData = new FormData();
    bodyFormData.append('email', values["email"]);
    bodyFormData.append('password', values["password"]);
    axios({
      method: 'POST',
      url: 'http://127.0.0.1:5000/api/login',
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(function (response) {
      if(response.status === 200){
        localStorage.setItem('token', response.data['idToken']);
        localStorage.setItem('uid', response.data['localId']);
        localStorage.setItem('refreshToken', response.data['refreshToken']);
        changeSubmitError('');
        history.push('/dashboard');
      }
      changeSubmitError('Invalid email or password');
    })
    // display popup
    .catch(function (error) {

      changeSubmitError('Invalid email or password');
    });
  }

  return(
  <Box m="auto" width="25%">
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack height="86vh"  justifyContent="center" background="white">
        <Flex direction="column" position="relative" justifyContent="center">
          <Center fontSize="7xl" letterSpacing="10px" fontFamily="mono">
            ACENTÉ
          </Center>
          <Center fontSize="3xl" color="gray">
            Login
          </Center>
          <Center color='red.500'>
            {isSubmitError}
          </Center>
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
            <FormControl id="password"isInvalid={errors.password}>
              <FormLabel mb="1px">Password</FormLabel>
              <Input 
                name="password"
                borderWidth="2px" 
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

export default LoginForm;
