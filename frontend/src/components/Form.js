import React from "react";
import {
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

const Form = ({title}) => (
  <Box m="auto" width="25%">
  <VStack height="86vh"  justifyContent="center" background="white">
    <Flex direction="column" position="relative" justifyContent="center">
      <Center fontSize="7xl" letterSpacing="10px" fontFamily="mono">
        ACENTÉ
      </Center>
      <Center fontSize="3xl" color="gray">
        {title}
      </Center>
      <FormControl id="username">
        <FormLabel mb="1px">Username</FormLabel>
        <Input placeholder="JohnDoe" borderWidth="2px" />
      </FormControl>
      <FormControl id="email">
        <FormLabel mb="1px" mt="8px">
          Email address
        </FormLabel>
        <Input
          type="email"
          borderWidth="2px"
          placeholder="johndoe@fakeemail.com"
        />
        <FormHelperText mt="1px">
          We'll (almost) never share your email.
        </FormHelperText>
      </FormControl>
      <FormControl id="password">
        <FormLabel mb="1px">Password</FormLabel>
        <Input borderWidth="2px" />
      </FormControl>
    </Flex>
    <Button colorScheme="gray">Submit</Button>
  </VStack>
  </Box>
);

export default Form;
