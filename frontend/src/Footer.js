import React, { Component } from 'react'
import {
    Center,
    HStack,
  } from "@chakra-ui/react"

class Footer extends Component {

    render() {
        return (
            <HStack backgroundColor="#9AE6B4" height="7vh" justifyContent="center">
                <Center fontSize="sm">Copyright &copy; Acenté 2021 | All rights reserved </Center>
            </HStack>
        )
    }
}

export default Footer