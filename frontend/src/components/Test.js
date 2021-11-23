import React from 'react'
import {
   HStack, VStack, Box, Center, ListItem, UnorderedList, IconButton, Icon, Button
 } from "@chakra-ui/react"
 
import {HiMicrophone} from "react-icons/hi"
 
const Test = () => {
   const handleMicrophoneClick = () => { 
      
   }
 
   return (
       <HStack height="86vh" justifyContent="center" spacing="20px" padding="50px">
           <VStack height="100%" width="70%" spacing="20px">
               <Box height="50%" width="100%" backgroundColor="#EDF2F7" borderRadius="3xl" padding="20px">
                   <Center color="gray" fontWeight="light" fontSize="3xl" justifyContent="left"> I can't believe it's not butter! </Center>
                   <Button borderRadius="full" height="70px" width="70px" top="100px" left="800px" backgroundColor="#CBD5E0" onClick={handleMicrophoneClick}>
                       <Icon as={HiMicrophone}color="black" />
                   </Button>
               </Box>
               <Box height="50%" width="100%" backgroundColor="#EDF2F7" borderRadius="3xl" padding="20px">
                   <Center color="gray" fontWeight="light" fontSize="3xl" justifyContent="left"> I can't believe it's not butter! </Center>
               </Box>
           </VStack>
           <VStack height="100%" width="30%">
               <Box height="15%" width="100%">
                   <Center color="gray" fontWeight="10px" fontSize="5xl" justifyContent="left"> Your History </Center>
               </Box>
               <Box height="85%" width="100%" backgroundColor="#EDF2F7" borderRadius="3xl" padding="20px">
               </Box>
           </VStack>
       </HStack>
      
   )
}
 
export default Test;