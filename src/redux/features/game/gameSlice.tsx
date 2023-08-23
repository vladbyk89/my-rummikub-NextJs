import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import Square from "@/app/game/components/Square";
import Tile from "@/app/game/components/Tile";

export interface PlayerType {
  userName: string;
  hand: JSX.Element[];
}

const createDeck = () => {
  try {
    const colors = ["black", "red", "blue", "yellow"];
    const deck: JSX.Element[] = [];

    for (let j = 1; j < 3; j++) {
      const jocker = <Tile key={deck.length} value={0} color="purpel" />;
      deck.push(jocker);

      colors.forEach((color) => {
        for (let i = 1; i <= 13; i++) {
          const tile = <Tile key={deck.length} value={i} color={color} />;
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

const initStateDeck = createDeck();

const createEmptyBoard = () => {
  const boardArr = [];
  for (let i = 0; i < 160; i++) {
    boardArr.push(<Square index={i} key={i} />);
  }

  return boardArr;
};

const initStateBoard = createEmptyBoard();

const createHand = (deck: JSX.Element[]) => {
  const newHand = [];
  for (let i = 0; i < 14; i++) {
    const randomDeckIndex = Math.floor(Math.random() * deck.length);

    const tile = deck.at(randomDeckIndex) as JSX.Element;

    newHand.push(tile);

    deck.splice(randomDeckIndex, 1);
  }

  return newHand;
};

interface GameType {
  deck: JSX.Element[];
  board: JSX.Element[];
  players: PlayerType[];
}

const initialState: GameType = {
  deck: initStateDeck,
  board: initStateBoard,
  players: [{ userName: "", hand: [] }],
};

export const game = createSlice({
  name: "game",
  initialState,
  reducers: {
    createPlayer: (state, action) => {
      const { userName } = action.payload;

      const player = { userName, hand: createHand(state.deck) };

      state.players = [player];
    },
  },
});

export const { createPlayer } = game.actions;

export const selectGame = (state: RootState) => state.game;

export default game.reducer;
