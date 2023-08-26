import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

// ** Custom components
import Square from "@/app/game/components/Square";

// ** Third party imports
import { v4 as uuidv4 } from "uuid";

// ** Functions
import validateBoard, {
  isPlayersTile,
  playerMadeAMove,
} from "./gameValidation";
import { createDeck, createEmptyBoard, createHand } from "./createFunctions";
import {
  drawTile,
  findTileIndexOnBoard,
  getNextPlayer,
  moveTileFromHandToBoard,
  moveTileOnBoard,
  saveActivePlayer,
} from "./gameActions";

export interface PlayerType {
  userName: string;
  hand: {
    startHand: JSX.Element[];
    endHand: JSX.Element[];
  };
  id: string;
}
export interface GameType {
  deck: JSX.Element[];
  board: {
    startTurn: JSX.Element[];
    endTurn: JSX.Element[];
  };
  players: PlayerType[];
  activePlayer: PlayerType;
}

const initStateDeck = createDeck();

const initStateBoard = {
  startTurn: createEmptyBoard(),
  endTurn: createEmptyBoard(),
};

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
