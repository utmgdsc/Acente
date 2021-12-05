import {useEffect, useState, React} from 'react'
import {
    HStack, VStack, Box, Center, ListItem, UnorderedList, Layout} from "@chakra-ui/react"
import axios from "axios"

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [strongWords, setStrongWords] = useState([]);
    const [weakWords, setWeakWords] = useState([])
    const [recentSentences, setRecentSentences] = useState([]);
    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        let bodyFormData = new FormData();
        bodyFormData.append('uid', localStorage.getItem('uid'));
        bodyFormData.append('token', localStorage.getItem('token'));
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:5000/api/userinfo',
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(function (response) {
            setIsLoading(false);
            if(response.status === 200){
                console.log("RES", response.data);
                var strongWords = [];
                var weakWords = [];
                var recentSentences = [];
                for(let i = 0; i < response.data.strongWords.length; i++){
                    strongWords.push(response.data.strongWords[i][0])
                    weakWords.push(response.data.weakWords[i][0])
                }
                for(let i = 0; i < response.data.recentSentences.length; i++){
                    recentSentences.push(response.data.recentSentences[i].sentence)
                }
                setStrongWords(strongWords);
                setWeakWords(weakWords);
                setRecentSentences(recentSentences);
            }
        })
        .catch(function (error) {
            setIsLoading(false);
            console.log("An error happened",error);
        });
    }
    const content = isLoading ? <div>Loading...</div> : <div>Data ...</div>
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
                    <div>Your strongest words are:</div>
                    {/* <div><pre>{JSON.stringify(strongWords, null, 2)}</pre></div> */}
                    <div>{strongWords.map(num => num)}</div>
                </Box>
                <Box height="100%" width="33%" backgroundColor="#EDF2F7" borderRadius="3xl" padding="20px">
                    <Center fontSize="3xl" color="gray" justifyContent="left">Weaknesses</Center>
                    <div>Your weakest words are:</div>
                    <div><pre>{JSON.stringify(weakWords, null, 2)}</pre></div>
                </Box>
                <Box height="100%" width="33%" backgroundColor="#EDF2F7" borderRadius="3xl" padding="20px">
                    <Center fontSize="3xl" color="gray" justifyContent="left">Custom Sentences</Center>
                    <div>Your recent sentences:</div>
                    <div><pre>{JSON.stringify(recentSentences, null, 2)}</pre></div>
                </Box>
            </HStack>
        </VStack>
    )
}

export default Dashboard;