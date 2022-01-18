import logo from "./logo.svg";
import "./App.css";
import { Box, ChakraProvider, Flex, Stack, Text } from "@chakra-ui/react";
import Cards from "./modules/Cards";

function App() {
  return (
    <>
      <ChakraProvider>
        <div className="App">
          <Stack spacing={20}>
            <Box>
              <Text fontSize={24} fontWeight={600}>
                MEMOTEST GAME
              </Text>
              <Text>
                Descripción del juego: Cada cuadro representa una carta de un
                color. Elegí dos y las mismas tienen que ser iguales.
              </Text>
              <Text fontWeight={500}>
                El juego termina cuando ya no quedan cartas para elegir
              </Text>
            </Box>
            <Cards />
          </Stack>
        </div>
      </ChakraProvider>
    </>
  );
}

export default App;
