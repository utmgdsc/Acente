import {useEffect, useState, React} from 'react'
import {
    HStack, VStack, Box, Center, ListItem, UnorderedList} from "@chakra-ui/react"
import axios from "axios"
import { useIntl } from 'react-intl';
const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [strongWords, setStrongWords] = useState([]);
    const [weakWords, setWeakWords] = useState([])
    const [recentSentences, setRecentSentences] = useState([]);
    useEffect(() => {
        getData();
    }, [])
    const { formatMessage } = useIntl();
    const getData = () => {
        let bodyFormData = new FormData();
        bodyFormData.append('uid', localStorage.getItem('uid'));
        bodyFormData.append('token', localStorage.getItem('token'));
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_BACKEND_URL}/api/userinfo`,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(async function (response) {
            setIsLoading(false);
            if(response.status === 200){
                const result = await response;
                const { strongWords: resStrongWords, weakWords: resWeakWorks, recentSentences: resRecent } = result.data;
                var recentSentences = [];
                for(let i = 0; i < resRecent.length; i++){
                    recentSentences.push(resRecent[i].sentence)
                }
                setStrongWords(resStrongWords);
                setWeakWords(resWeakWorks);
                setRecentSentences(recentSentences);
            }
        })
        .catch(function (error) {
            setIsLoading(false);
        });
    }
    const content = isLoading ? <div>Loading...</div> : <div>Data ...</div>
    return (
        <VStack height="86vh" justifyContent="center" spacing="20px">
            <HStack width="100%" paddingLeft="50px" paddingRight="50px">
                <Center color="gray" fontWeight="medium" fontSize="5xl" justifyContent="left"> {formatMessage({id: "dashHeading"})} </Center>
            </HStack>
            <HStack height="30%" width="100%" spacing="20px" paddingLeft="50px" paddingRight="50px">
                <Box height="100%" width="100%" backgroundColor="#EDF2F7" borderRadius="3xl" padding="20px">
                    <Center fontSize="3xl" color="gray" justifyContent="left">{formatMessage({id: "dashboard"})}</Center>
                    <UnorderedList spacing="10px">
                        <ListItem>Your pronounciation has improved by 10% from last week!</ListItem>
                        <ListItem>You set a new record for most sentences practiced, way to go!</ListItem>
                    </UnorderedList>
                </Box>
            </HStack>
            <HStack height="50%" width="100%" spacing="20px" paddingLeft="50px" paddingRight="50px">
                <Box height="100%" width="33%" backgroundColor="#EDF2F7" borderRadius="3xl" padding="20px">
                    <Center fontSize="3xl" color="gray" justifyContent="left">{formatMessage({id: "strengths"})}</Center>
                    <UnorderedList spacing="10px">
                        {strongWords.map(word => <ListItem>{word}</ListItem>)}
                    </UnorderedList>
                </Box>
                <Box height="100%" width="33%" backgroundColor="#EDF2F7" borderRadius="3xl" padding="20px">
                    <Center fontSize="3xl" color="gray" justifyContent="left">{formatMessage({id: "weaknesses"})}</Center>
                    <UnorderedList spacing="10px">
                        {weakWords.map(word => <ListItem>{word}</ListItem>)}
                    </UnorderedList>
                </Box>
                <Box height="100%" width="33%" backgroundColor="#EDF2F7" borderRadius="3xl" padding="20px">
                    <Center fontSize="3xl" color="gray" justifyContent="left">{formatMessage({id: "custom"})}</Center>
                    <UnorderedList spacing="10px">
                        {recentSentences.map(word => <ListItem>{word}</ListItem>)}
                    </UnorderedList>
                </Box>
            </HStack>
        </VStack>
    )
}

export default Dashboard;