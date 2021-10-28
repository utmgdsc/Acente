import React from "react";
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


const LoginForm = ({title}) => {
  
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
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
            <FormControl id="email" isInvalid={errors.email}>
              <FormLabel mb="1px" mt="8px">
                Email address
              </FormLabel>
              <Input
                type="email"
                borderWidth="2px"
                placeholder="johndoe@fakeemail.com"
                {...register("email", {
                  required: "This is required",
              })}/>
              <FormHelperText mt="1px">
                We'll (almost) never share your email.
              </FormHelperText>
              <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
            </FormControl>
            <FormControl id="password"isInvalid={errors.password}>
              <FormLabel mb="1px">Password</FormLabel>
              <Input borderWidth="2px" 
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
