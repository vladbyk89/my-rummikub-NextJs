import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import Square from "@/app/game/components/Square";
import Tile from "@/app/game/components/Tile";
import { v4 as uuidv4 } from "uuid";

export interface PlayerType {
  userName: string;
  hand: JSX.Element[];
}

const createDeck = () => {
  try {
    const colors = ["black", "red", "blue", "yellow"];
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

const initStateDeck = createDeck();

const createEmptyBoard = () => {
  const boardArr = [];
  for (let i = 0; i < 160; i++) {
    boardArr.push(<Square index={i} key={i} />);
  }

  return boardArr;
};

const initStateBoard = createEmptyBoard();

const createHand = (deck: JSX.Element[]): JSX.Element[] => {
  const newHand = [];

  for (let i = 0; i < 14; i++) {
    const randomDeckIndex = Math.floor(Math.random() * deck.length);

    const tile = deck.at(randomDeckIndex) as JSX.Element;
    newHand.push(tile);

    deck.splice(randomDeckIndex, 1);
  }
  return newHand;
};

const isPlayersTile = (state: GameType, tileId: string) => {
  const playersHand = state.activePlayer.hand;
  return playersHand.some((item) => item.props.id === tileId);
};

const findTileIndexInHand = (state: GameType, tileId: string) => {
  const playersHand = state.activePlayer.hand;
  return playersHand.findIndex((item) => item.props.id === tileId);
};

const findTileIndexOnBoard = (state: GameType, tileId: string) => {
  const board = state.board;
  return board.findIndex((item) => item.props.id === tileId);
};

const moveTileFromHandToBoard = (
  state: GameType,
  tileId: string,
  boardIndex: number
) => {
  const index = findTileIndexInHand(state, tileId);
  const tile = state.activePlayer.hand[index];
  state.activePlayer.hand.splice(index, 1);
  state.board[boardIndex] = tile;
};

const moveTileOnBoard = (
  state: GameType,
  tileId: string,
  boardIndex: number
) => {
  const index = findTileIndexOnBoard(state, tileId);
  const tile = state.board[index];
  state.board[boardIndex] = tile;
  state.board[index] = <Square index={index} key={index} />;
};

interface GameType {
  deck: JSX.Element[];
  board: JSX.Element[];
  players: PlayerType[];
  activePlayer: PlayerType;
}

const initialState: GameType = {
  deck: initStateDeck,
  board: initStateBoard,
  players: [],
  activePlayer: { userName: "", hand: [] as JSX.Element[] },
};

export const game = createSlice({
  name: "game",
  initialState,
  reducers: {
    createPlayer: (state, action) => {
      const { userName } = action.payload;

      const player = { userName, hand: createHand(state.deck) };

      state.players.push(player);
    },
    removeTileFromDeck: (state, action) => {
      const index = action.payload;
      state.deck.splice(index, 1);
    },
    moveTile: (state, action) => {
      const { squareIndex, tileId } = action.payload;

      // if tile is players tile, move it from hand to board
      if (isPlayersTile(state, tileId))
        moveTileFromHandToBoard(state, tileId, squareIndex);
      // if tile is on board, move it from board to board
      else {
        moveTileOnBoard(state, tileId, squareIndex);
      }
    },
    moveBoardToHand:(state, action) => {

    },
    nextPlayer: (state, action) => {
      const player = action.payload;
      state.activePlayer = player;
    },
  },
});

export const {
  createPlayer,
  removeTileFromDeck,
  moveTile,
  nextPlayer,
} = game.actions;

export const selectGame = (state: RootState) => state.game;

export default game.reducer;
