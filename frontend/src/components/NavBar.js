import React from 'react'
import { useHistory } from 'react-router-dom';
import {
    Button, HStack, IconButton, Img
  } from "@chakra-ui/react"


const NavBar = () => {
    let history = useHistory();

    const handleSignUpClick = () => {  
        history.push('/signup')
    } 

    const handleMainPageClick = () => {
        history.push('/')
    }

    const handleLoginClick = () => {
        history.push('/login')
    }
    
    return (
        <HStack spacing="20px" backgroundColor="#9AE6B4" height="7vh" paddingRight="20px" paddingLeft="20px" width="100%">
            <HStack justifyContent="flex-start" width="50%">
                <IconButton colorScheme="green" onClick={handleMainPageClick} aria-label="Acente Logo" backgroundColor="#9AE6B4" icon={<Img maxWidth="100%" maxHeight="100%" src="AcenteIcon.png"/>}/>
            </HStack>

            <HStack justifyContent="flex-end" width="50%">
                <Button colorScheme="green" variant="outline" onClick={handleLoginClick}>
                    Login
                </Button>
                <Button colorScheme="green" variant="outline" onClick={handleSignUpClick}>
                    Sign Up
                </Button>
            </HStack>
        </HStack>
    )
}

export default NavBar;
