import { Box, Button, Flex, Grid, Stack } from "@chakra-ui/react";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";
import { randomize, cardsColors } from "../constants/colors";
import "./cards.css";

/*
Necesito hacer 4 filas y 3 columnas. 
Voy a necesitar un total de 6 colores distintos (como hacerlo: Crear un array con 6 colores y duplicar dicho array)
De forma random ubicar los colores en los distintos cuadrados. (como hacerlo: math.Random y con Math.floor para rendondear)
IMPORTANTE: El usuario va a poder clickear solo dos cartas .
Si las cartas son iguales: Las cartas seleccionadas desaparecen (como hacerlo: display:none)

*/

function Cards() {
  const [randomCards, setRandomCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedLastCard, setSelectedLastCard] = useState(null);
  const [foundCards, setFoundCards] = useState([]);
  const [indexCardSelected, setIndexCardSelected] = useState();
  const [cardsSelected, setCardsSelected] = useState([]);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    setRandomCards(randomize(cardsColors, cardsColors.length));
  }, []);

  useEffect(() => {
    if (foundCards.length === cardsColors.length) {
      setGameEnded(true);
    }
  }, [foundCards]);

  useEffect(() => {
    setIndexCardSelected(selectedCard);
    if (selectedCard !== null) {
      setCardsSelected([...cardsSelected, selectedCard]);
    }
  }, [selectedCard]);

  useEffect(() => {
    if (selectedCard !== null && selectedLastCard !== null) {
      if (randomCards[selectedLastCard] === randomCards[selectedCard]) {
        setFoundCards([...foundCards, selectedLastCard, selectedCard]);
        setTimeout(() => {
          setCardsSelected([]);
        }, 1000);
      } else {
        setTimeout(() => {
          setSelectedLastCard(null);
          setSelectedCard(null);
          setCardsSelected([]);
        }, 1000);
      }
    }
  }, [selectedLastCard, selectedCard]);

  const selectCard = (index) => {
    setSelectedLastCard(selectedCard);
    setSelectedCard(index);
  };

  const resetGameButton = () => {
    setRandomCards(randomize(cardsColors, cardsColors.length));
    setGameEnded(false);
    setFoundCards([]);
    setSelectedCard();
    setSelectedLastCard();
  };

  return (
    <Flex justifyContent={"center"} alignItems={"center"}>
      {!gameEnded ? (
        <Grid
          gridTemplateColumns={"1fr 1fr 1fr 1fr"}
          gridTemplateRows={"1fr 1fr 1fr"}
          alignSelf={"center"}
          gridGap={5}
        >
          {randomCards.map((cardColor, i) => {
            return (
              <Box
                key={i}
                className={`transition`}
                opacity={foundCards.includes(i) ? "0" : "1"}
                border={"1px solid black"}
                borderRadius={"5px"}
                data-testid={cardColor}
                bgColor={
                  i === selectedCard || i === selectedLastCard
                    ? cardColor
                    : "grey"
                }
                w={200}
                h={200}
                onClick={() => {
                  if (indexCardSelected === i || cardsSelected.length === 2) {
                    return isDisabled;
                  }
                  selectCard(i);
                }}
              ></Box>
            );
          })}
        </Grid>
      ) : (
        <Button w={250} onClick={resetGameButton} data-testid="reset">
          Reset Game
        </Button>
      )}
    </Flex>
  );
}

export default Cards;
