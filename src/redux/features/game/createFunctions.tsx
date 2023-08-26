import { v4 as uuidv4 } from "uuid";
import Tile from "@/app/game/components/Tile";
import Square from "@/app/game/components/Square";

export const createEmptyBoard = () => {
  const boardArr = [];
  for (let i = 0; i < 160; i++) {
    boardArr.push(<Square index={i} key={i} />);
  }
  return boardArr;
};


export const createHand = (deck: JSX.Element[]): JSX.Element[] => {
  const newHand = [];

  for (let i = 0; i < 18; i++) {
    const randomDeckIndex = Math.floor(Math.random() * deck.length);

    const tile = deck.at(randomDeckIndex) as JSX.Element;
    newHand.push(tile);

    deck.splice(randomDeckIndex, 1);
  }
  return newHand;
};

export const createDeck = () => {
  try {
    const colors = ["black", "red", "blue", "green"];
    const deck: JSX.Element[] = [];

    for (let j = 1; j < 3; j++) {
      const jockerId = uuidv4();

      const jocker = (
        <Tile key={jockerId} value={0} color="purpel" id={jockerId} />
      );
      deck.push(jocker);

      colors.forEach((color) => {
        for (let i = 1; i <= 13; i++) {
          const id = uuidv4();
          const tile = <Tile key={id} value={i} color={color} id={id} />;
          deck.push(tile);
        }
      });
    }
    return deck;
  } catch (error) {
    console.error(error);
    return [];
  }
};
