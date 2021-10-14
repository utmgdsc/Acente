import { Flex, Center } from '@chakra-ui/layout'
import React, { Component } from 'react'
import Form from './Form.js'
import NavBar from './NavBar.js'
import Footer from './Footer.js'

export class login extends Component {
    render() {
        return (
            <div id="signUpPage">
                <NavBar/>
                <Form value="Sign Up"/>
                <Footer/>
            </div>
        )
    }
}

export default login
