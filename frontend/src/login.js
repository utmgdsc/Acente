import { Flex, Center } from '@chakra-ui/layout'
import React, { Component } from 'react'
import Footer from './Footer.js'
import Form from './Form.js'
import NavBar from './NavBar.js'

export class login extends Component {
    render() {
        return (
            <div id="loginPage">
                <NavBar/>
                <Form value="Login"/>
                <Footer/>
            </div>
        )
    }
}

export default login
