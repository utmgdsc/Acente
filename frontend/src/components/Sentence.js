import React from "react";
import { Center, Skeleton } from "@chakra-ui/react";

const Sentence = ({ confidence, sentence_arr, textLoaded }) => {
    /**
     * Sentence component to represent visual feedback for the user 
     * with the color coding defined below.
     */
	const colours = ["gray", "orange", "red"];
    return (<Skeleton isLoaded={textLoaded}>
    <Center
        color="gray"
        fontWeight="light"
        fontSize="3xl"
        justifyContent="left"
    >
        <p>
            {confidence.map((k, i) => (
                <span style={{ color: colours[k] }} key={i}>
                    {sentence_arr[i] + " "}
                </span>
            ))}
        </p>
    </Center>
    </Skeleton>);
};
export default Sentence;