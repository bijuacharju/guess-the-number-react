import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const ref = useRef(null);
  const [randomNumber, setRandomNumber] = useState(0);
  const [userInput, setUserInput] = useState(0);
  const [inputHistory, setInputHistory] = useState("");
  const [message, setMessage] = useState({ isError: false, text: "" });

  const generateRandomNumber = () => {
    setRandomNumber(Math.round(Math.random() * 100) + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputHistory((prev) => {
      return [...prev, userInput];
    });
    if (userInput === randomNumber) {
      setMessage({ isError: false, text: "Your guess is right" });
    } else if (userInput > randomNumber) {
      setMessage({ isError: true, text: "Your guess is high" });
    } else {
      setMessage({ isError: true, text: "Your guess is low" });
    }
  };

  const handleReset = () => {
    ref.current.value = 0;
    generateRandomNumber();
    setInputHistory([]);
    setUserInput(0);
    setMessage({ isError: false, text: "" });
  };

  useEffect(() => {
    generateRandomNumber();
  }, []);

  return (
    <Box>
      <Container>
        <Text fontSize={"2xl"} textAlign={"center"}>
          Guess The Number App
        </Text>
        <Box>
          <form onSubmit={handleSubmit}>
            <Stack gap={4}>
              <FormControl>
                <FormLabel>Enter your guess</FormLabel>
                <Input
                  ref={ref}
                  type="number"
                  name="guess"
                  onChange={(event) => {
                    setUserInput(Number(event.target.value));
                  }}
                />
                <FormHelperText
                  fontSize={"lg"}
                  color={message.isError ? "red" : "green"}
                >
                  {message.text}
                </FormHelperText>
              </FormControl>
              <Flex gap={4}>
                <Button
                  colorScheme="blue"
                  variant={"outline"}
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <Button type="submit" colorScheme="blue" variant={"solid"}>
                  Check
                </Button>
              </Flex>
            </Stack>
          </form>
        </Box>
        {inputHistory.length > 0 && (
          <Box>
            <Text fontSize={"2xl"} textAlign={"center"}>
              History
            </Text>
            {inputHistory.map((history, index) => {
              return (
                <Text fontSize={"md"} textAlign={"center"} key={index}>
                  You guessed {history}
                </Text>
              );
            })}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default App;
