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
 
 
const NavBar = ({type}) => {
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
 
   const handlePracticeClick = () => {
       history.push('/practice')
   }
 
   const handleProfileClick = () => {
       history.push('/dashboard')
   }
      
   if (type === "loginMenu") {
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
   else {
       return (
           <HStack spacing="20px" backgroundColor="#9AE6B4" height="7vh" paddingRight="20px" paddingLeft="20px" width="100%">
               <HStack justifyContent="flex-start" width="50%">
                   <IconButton colorScheme="green" onClick={handleMainPageClick} aria-label="Acente Logo" backgroundColor="#9AE6B4" icon={<Img maxWidth="100%" maxHeight="100%" src="AcenteIcon.png"/>}/>
               </HStack>
 
               <HStack justifyContent="flex-end" width="50%">
                   <Menu>
                       <MenuButton
                           as={IconButton}
                           aria-label="Options"
                           icon={<HamburgerIcon />}
                           variant="outline"
                       />
                       <MenuList minHeight="100vh" minWidth="35vh" right="-60px" position="absolute" top="-57px" backgroundColor="#2D3748">
                           <MenuItem minHeight="13vh" icon={<CgProfile />} fontSize="2xl" color="white" _focus={{backgroundColor:"#4A5568"}} onClick={handleProfileClick}>
                           Profile
                           </MenuItem>
                           <MenuDivider/>
                           <MenuItem minHeight="13vh" icon={<HiMicrophone />} fontSize="2xl" color="white" _focus={{backgroundColor:"#4A5568"}} onClick={handlePracticeClick}>
                           Practice
                           </MenuItem>
                           <MenuDivider/>
                           <MenuItem minHeight="13vh" icon={<GiNotebook />} fontSize="2xl" color="white" _focus={{backgroundColor:"#4A5568"}}>
                           Sandbox
                           </MenuItem>
                           <MenuDivider/>
                           <MenuItem minHeight="13vh" icon={<BiLogOut />} fontSize="2xl" color="white" _focus={{backgroundColor:"#4A5568"}}>
                           Logout
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