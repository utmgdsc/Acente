import React from 'react'
import { useHistory } from 'react-router-dom';
import {
   Button,
   HStack,
   IconButton,
   Img,
   Menu,
   MenuButton,
   MenuList,
   MenuItem,
   MenuDivider,
 } from "@chakra-ui/react"
 
import {
   HamburgerIcon,
} from '@chakra-ui/icons'
 
import {GiNotebook} from "react-icons/gi"
import {CgProfile} from "react-icons/cg"
import {BiLogOut} from "react-icons/bi"
import {HiMicrophone} from "react-icons/hi"
import { useIntl } from 'react-intl';
import { LanguageSwitcher } from '../i18n/components/LanguageSwitcher';
const axios = require('axios');

const NavBar = ({type}) => {
    /**
	 * This component displays the Navigation bar. The nav bar displays the login/signup buttons when user has not logged in. 
     * After User has logged in, the burger menu is shown. 
	 */
    let history = useHistory();

    const { locale, formatMessage }  = useIntl();

    /**
	 * Navigate User to Signup page
	 */
    const handleSignUpClick = () => {  
        history.push('signup');
    } 

    /**
	 * Navigate User to Landing Page
	 */
    const handleMainPageClick = () => {
        history.push(`/${locale}/`);
    }

    /**
	 * Navigate User to Login Page
	 */
    const handleLoginClick = () => {
        history.push('login');
    }

    /**
	 * Navigate User to Practice
	 */
    const handlePracticeClick = () => {
        history.push('practice')
    }

    /**
	 * Navigate User to Profile Page
	 */
    const handleProfileClick = () => {
        history.push('dashboard')
    }

    /**
	 * Navigate User to Sandbox Page
	 */
    const handleSandboxClick = () => {
        history.push('sandbox')
    }

    const handleLogoutClick = () => {
        if (localStorage.getItem('uid')){
            axios({
                method: 'POST',
                url: `${process.env.REACT_APP_BACKEND_URL}/api/logout`
              });
            localStorage.removeItem('uid');
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        }
        history.push('login');
    }
        
    if (type === "loginMenu") {
        // If user has not logged in
        return (
            <HStack spacing="20px" backgroundColor="#9AE6B4" height="7vh" paddingRight="20px" paddingLeft="20px" width="100%">
                <HStack justifyContent="flex-start" width="50%">
                    <IconButton colorScheme="green" onClick={handleMainPageClick} aria-label="Acente Logo" backgroundColor="#9AE6B4" icon={<Img maxWidth="100%" maxHeight="100%" src="/acenteIcon.png"/>}/>
                </HStack>

                <HStack justifyContent="flex-end" width="50%">
                    <LanguageSwitcher/>
                    <Button colorScheme="green" variant="outline" onClick={handleLoginClick}>
                        {formatMessage({id: "login"})}
                    </Button>
                    <Button colorScheme="green" variant="outline" onClick={handleSignUpClick}>
                    {formatMessage({id: "signup"})}
                    </Button>
                </HStack>
            </HStack>
        )
    }
    else {
        // if user has logged in
        return (
            <HStack spacing="20px" backgroundColor="#9AE6B4" height="7vh" paddingRight="20px" paddingLeft="20px" width="100%">
                <HStack justifyContent="flex-start" width="50%">
                    <IconButton colorScheme="green" onClick={handleMainPageClick} aria-label="Acente Logo" backgroundColor="#9AE6B4" icon={<Img maxWidth="100%" maxHeight="100%" src="/AcenteIcon.png"/>}/>
                </HStack>

                <HStack justifyContent="flex-end" width="50%">
                    <LanguageSwitcher/>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            icon={<HamburgerIcon />}
                            variant="outline"
                        />
                        <MenuList minHeight="100vh" minWidth="35vh" right="-60px" position="absolute" top="-57px" backgroundColor="#2D3748">
                            <MenuItem minHeight="13vh" icon={<CgProfile />} fontSize="2xl" color="white" _focus={{backgroundColor:"#4A5568"}} onClick={handleProfileClick}>
                                {formatMessage({id: "profile"})}
                            </MenuItem>
                            <MenuDivider/>
                            <MenuItem minHeight="13vh" icon={<HiMicrophone />} fontSize="2xl" color="white" _focus={{backgroundColor:"#4A5568"}} onClick={handlePracticeClick}>
                            {formatMessage({id: "practiceHeading"})}
                            </MenuItem>
                            <MenuDivider/>
                            <MenuItem minHeight="13vh" icon={<GiNotebook />} fontSize="2xl" color="white" _focus={{backgroundColor:"#4A5568"}} onClick={handleSandboxClick}>
                            {formatMessage({id: "sandBox"})}
                            </MenuItem>
                            <MenuDivider/>
                            <MenuItem minHeight="13vh" icon={<BiLogOut />} fontSize="2xl" color="white" _focus={{backgroundColor:"#4A5568"}} onClick={handleLogoutClick}>
                            {formatMessage({id: "logout"})}
                            </MenuItem>
                            <MenuDivider/>
                            <MenuItem fontSize="180px" color="white" _focus={{backgroundColor:"#2D3748"}} paddingLeft="75px">
                            &#9651;
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>
            </HStack>
        )
    }
}
 
export default NavBar;