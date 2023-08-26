import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import Square from "@/app/game/components/Square";
import Tile from "@/app/game/components/Tile";
import { v4 as uuidv4 } from "uuid";
import validateBoard from "./gameValidation";

export interface PlayerType {
  userName: string;
  hand: {
    startHand: JSX.Element[];
    endHand: JSX.Element[];
  };
  id: string;
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

const initStateBoard = {
  startTurn: createEmptyBoard(),
  endTurn: createEmptyBoard(),
};

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

const drawTile = (deck: JSX.Element[], activePlayer: PlayerType) => {
  const randomDeckIndex = Math.floor(Math.random() * deck.length);

  const tile = deck.at(randomDeckIndex) as JSX.Element;

  activePlayer.hand.endHand.push(tile);

  deck.splice(randomDeckIndex, 1);
};

const isPlayersTile = (state: GameType, tileId: string) => {
  const playersHand = state.activePlayer.hand.endHand;
  return playersHand.some((item) => item.props.id === tileId);
};

const findTileIndexInHand = (state: GameType, tileId: string) => {
  const playersHand = state.activePlayer.hand.endHand;
  return playersHand.findIndex((item) => item.key === tileId);
};

const findTileIndexOnBoard = (state: GameType, tileId: string) => {
  return state.board.endTurn.findIndex((item) => item.key === tileId);
};

const moveTileFromHandToBoard = (
  state: GameType,
  tileId: string,
  boardIndex: number
) => {
  const index = findTileIndexInHand(state, tileId);
  const tile = state.activePlayer.hand.endHand[index];
  state.activePlayer.hand.endHand.splice(index, 1);
  state.board.endTurn[boardIndex] = tile;
};

const moveTileOnBoard = (
  state: GameType,
  tileId: string,
  boardIndex: number
) => {
  const index = findTileIndexOnBoard(state, tileId);
  const tile = state.board.endTurn[index];
  state.board.endTurn[boardIndex] = tile;
  state.board.endTurn[index] = <Square index={index} key={index} />;
};

const getNextPlayer = (players: PlayerType[], activePlayerIndex: number) => {
  if (activePlayerIndex === players.length - 1) return players[0];
  else return players[activePlayerIndex + 1];
};

const saveActivePlayer = (state: GameType, activePlayerIndex: number) => {
  state.activePlayer.hand.startHand = state.activePlayer.hand.endHand;

  state.players[activePlayerIndex] = state.activePlayer;
};

const playerMadeAMove = (state: GameType) => {
  const startHand = state.activePlayer.hand.startHand;
  const endHand = state.activePlayer.hand.endHand;

  const isSame =
    startHand.length === endHand.length &&
    startHand.every((tile, index) => tile.key === endHand[index].key);

  return !isSame;
};

export interface GameType {
  deck: JSX.Element[];
  board: {
    startTurn: JSX.Element[];
    endTurn: JSX.Element[];
  };
  players: PlayerType[];
  activePlayer: PlayerType;
}

const initialState: GameType = {
  deck: initStateDeck,
  board: initStateBoard,
  players: [],
  activePlayer: { userName: "", hand: { startHand: [], endHand: [] }, id: "" },
};

export const game = createSlice({
  name: "game",
  initialState,
  reducers: {
    createGame: (state, action) => {
      const playersArr = action.payload;

      playersArr.forEach((player: string) => {
        const newHand = createHand(state.deck);
        const newPlayer = {
          userName: player,
          hand: {
            startHand: newHand,
            endHand: newHand,
          },
          id: uuidv4(),
        };
        state.players.push(newPlayer);
      });

      const randomPlayerIndex = Math.floor(Math.random() * playersArr.length);
      const randomPlayer = state.players[randomPlayerIndex];

      state.activePlayer = randomPlayer;
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
    moveFromBoardToHand: (state, action) => {
      const { tileId } = action.payload;

      // Check if tile belonged to player at start of the turn, if not do not allow to take.
      if (
        !state.activePlayer.hand.startHand.some((tile) => tile.key === tileId)
      )
        return alert("Not your tile to take");

      const index = findTileIndexOnBoard(state, tileId);
      const tile = state.board.endTurn[index];
      state.board.endTurn[index] = <Square index={index} key={index} />;
      state.activePlayer.hand.endHand.push(tile);
    },
    endActivePlayerTurn: (state) => {
      if (!validateBoard(state)) return;
      
      const activePlayerIndex = state.players.findIndex(
        (player) => player.id === state.activePlayer.id
      );

      // if player didn't make a move reset his hand draw a tile
      if (!playerMadeAMove(state)) {
        state.activePlayer.hand.endHand = state.activePlayer.hand.startHand;
        drawTile(state.deck, state.activePlayer);
      }

      // set player in players array to active player
      saveActivePlayer(state, activePlayerIndex);

      state.activePlayer = getNextPlayer(state.players, activePlayerIndex);
      state.board.startTurn = state.board.endTurn;
    },
    resetHand: (state) => {
      state.activePlayer.hand.endHand = state.activePlayer.hand.startHand;
      state.board.endTurn = state.board.startTurn;
    },
    arrangeByGroup: (state) => {
      state.activePlayer.hand.endHand.sort((a, b) => {
        return a.props.value - b.props.value;
      });
    },
    arrangeByColor: (state) => {
      // first sotring by number
      state.activePlayer.hand.endHand.sort((a, b) => {
        return a.props.value - b.props.value;
      });

      // then by color to create ordered hand
      state.activePlayer.hand.endHand.sort((a, b) => {
        const colorA = a.props.color;
        const colorB = b.props.color;
        if (colorA > colorB) {
          return -1;
        }
        if (colorA < colorB) {
          return 1;
        }
        return 0;
      });
    },
  },
});

export const gameActions = game.actions;

export const selectGame = (state: RootState) => state.game;

export default game.reducer;
