import React, { useState } from "react";
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
import { useIntl } from "react-intl";

const axios = require('axios');

const SignUpForm = () => {
  let history = useHistory();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  const [isSubmitError, changeSubmitError ] = useState('');

  const { formatMessage } = useIntl();

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
      if(response.status === 200){
        localStorage.setItem('token', response.data['idToken']);
        localStorage.setItem('uid', response.data['localId']);
        localStorage.setItem('refreshToken', response.data['refreshToken']);
        changeSubmitError('');
        history.push('dashboard');
      }
      changeSubmitError("It seems like you've already signed up. Try logging in!");
    })
    .catch(function (error) {
      changeSubmitError("It seems like you've already signed up. Try logging in!"); 
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
              {formatMessage({id: "signup"})}
            </Center>
            <Center color="red.500">
              {isSubmitError}
            </Center>
            <FormControl id="name" isInvalid={errors.name}>
              <FormLabel mb="1px">{formatMessage({id: "name"})}</FormLabel>
              <Input
                name="name"
                placeholder="JohnDoe" 
                borderWidth="2px"
                {...register("name", {
                  required: formatMessage({id: 'required'}),
              })}/>
              <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
            </FormControl>
            <FormControl id="language" isInvalid={errors.language}>
              <FormLabel mb="1px">{formatMessage({id: "language"})}</FormLabel>
              <Input 
                name="language"
                placeholder="Klingon" 
                borderWidth="2px"
                {...register("language", {
                  required: formatMessage({id: 'required'}),
              })}/>
              <FormErrorMessage>
              {errors.language && errors.language.message}
            </FormErrorMessage>
            </FormControl>
            <FormControl id="email" isInvalid={errors.email}>
              <FormLabel mb="1px" mt="8px">
              {formatMessage({id: "email"})}
              </FormLabel>
              <Input
                name="email"
                type="email"
                borderWidth="2px"
                placeholder="johndoe@fakeemail.com"
                {...register("email", {
                  required: formatMessage({id: "required"}),
              })}/>
              <FormHelperText mt="1px">
              {formatMessage({id: "emailDisclaimer"})}
              </FormHelperText>
              <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
            </FormControl>
            <FormControl id="password" isInvalid={errors.password}>
              <FormLabel mb="1px">{formatMessage({id: "password"})}</FormLabel>
              <Input borderWidth="2px"
                name="password"
                type="password"
                {...register("password", {
                  required: formatMessage({id: "required"}),
                  minLength: { value: 8, message: formatMessage({id: "minimum"}) }
              })}/>
              <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
            </FormControl>
          </Flex>
          <Button colorScheme="gray" type="submit" isLoading={isSubmitting}>{formatMessage({id: "submit"})}</Button>
      </VStack>
      </form>
  </Box>
  )
};

export default SignUpForm;
