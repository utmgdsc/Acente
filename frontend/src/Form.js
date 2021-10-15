import React, { Component } from 'react'
import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    VStack,
    Center,
    Button,
    Flex,
    Space
    
  } from "@chakra-ui/react"

class Form extends Component {

    render() {
        return (
            <VStack height="86vh" position="relative" justifyContent="center">
                <Flex direction="column" position="relative" justifyContent="center">
                    <Center fontSize="7xl" letterSpacing="10px" fontFamily="mono">ACENTÉ</Center>
                    <Center fontSize="3xl" color="gray">{this.props.value}</Center>
                    <FormControl id="username">
                        <FormLabel mb="1px" >Username</FormLabel>
                        <Input placeholder="JohnDoe" borderWidth="2px"/>
                    </FormControl>
                    <FormControl id="email">
                        <FormLabel mb="1px" mt="8px" >Email address</FormLabel>
                        <Input type="email" borderWidth="2px"placeholder="johndoe@fakeemail.com"/>
                        <FormHelperText mt="1px">We'll (almost) never share your email.</FormHelperText>
                    </FormControl>
                </Flex>
                <Button colorScheme="gray">
                    Submit
                </Button>
            </VStack>
        )
    }
}

export default Form
