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
            <div>
                <VStack height="100vh" position="relative" justifyContent="center">
                    <Flex direction="column" position="relative" justifyContent="center">
                        <Center fontSize="5xl" mb="10px">{this.props.value}</Center>
                        <FormControl id="username">
                            <FormLabel mb="1px" >Username</FormLabel>
                            <Input placeholder="Username" borderWidth="2px"/>
                        </FormControl>
                        <FormControl id="email">
                            <FormLabel mb="1px" mt="8px">Email address</FormLabel>
                            <Input type="email" borderWidth="2px"/>
                            <FormHelperText mt="1px">We'll (almost) never share your email.</FormHelperText>
                        </FormControl>
                    </Flex>
                    <Button colorScheme="gray">
                        Submit
                    </Button>
                </VStack>
            </div>
        )
    }
}

export default Form
