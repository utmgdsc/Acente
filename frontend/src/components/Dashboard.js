import React from 'react'
import {
    HStack, VStack, Box, Center, ListItem, UnorderedList} from "@chakra-ui/react"

  const axios = require('axios');

  function loadWeakWords() {
    axios({
        method: 'POST',
        url: 'http://127.0.0.1:5000/api/weakwords',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            uid: localStorage.getItem('uid'),
        }),
    })
    .then(function (response) {
      if(response.status === 200){
      }
    })
    .catch(function (error) {
    });
  }

  

const Dashboard = () => {
    return (
        <VStack height="86vh" justifyContent="center" spacing="20px">
            <HStack width="100%" paddingLeft="50px" paddingRight="50px">
                <Center color="gray" fontWeight="medium" fontSize="5xl" justifyContent="left"> Your Accent Profile </Center>
            </HStack>
            <HStack height="30%" width="100%" spacing="20px" paddingLeft="50px" paddingRight="50px">
                <Box height="100%" width="100%" backgroundColor="#EDF2F7" borderRadius="3xl" padding="20px">
                    <Center fontSize="3xl" color="gray" justifyContent="left">Dashboard</Center>
                    <UnorderedList spacing="10px">
                        <ListItem>Your pronounciation has improved by 10% from last week!</ListItem>
                        <ListItem>You set a new record for most sentences practiced, way to go!</ListItem>
                    </UnorderedList>
                </Box>
            </HStack>
            <HStack height="50%" width="100%" spacing="20px" paddingLeft="50px" paddingRight="50px">
                <Box height="100%" width="33%" backgroundColor="#EDF2F7" borderRadius="3xl" padding="20px">
                    <Center fontSize="3xl" color="gray" justifyContent="left">Strengths</Center>
                    <UnorderedList spacing="10px">
                        <ListItem>Your strongest words are bird, apple, and hello</ListItem>
                    </UnorderedList>
                </Box>
                <Box height="100%" width="33%" backgroundColor="#EDF2F7" borderRadius="3xl" padding="20px">
                    <Center fontSize="3xl" color="gray" justifyContent="left">Weaknesses</Center>
                    <UnorderedList spacing="10px">
                        <ListItem>Your need to practise your sentence fluency</ListItem>
                        <ListItem>Your weakness is pronouncing words with 'uh' and 'ah' </ListItem>
                    </UnorderedList>
                </Box>
                <Box height="100%" width="33%" backgroundColor="#EDF2F7" borderRadius="3xl" padding="20px">
                    <Center fontSize="3xl" color="gray" justifyContent="left">Custom Sentences</Center>
                    <UnorderedList spacing="10px">
                        <ListItem>Peter Piper picked a peck of pickled peppers</ListItem>
                        <ListItem>I'm quite good at tennis but I need to practise my serve</ListItem>
                        <ListItem>Good morning, I would like to order a regular coffee and everything bagel</ListItem>
                    </UnorderedList>
                </Box>
            </HStack>
        </VStack>
    )
}

export default Dashboard;