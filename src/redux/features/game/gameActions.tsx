import Square from "@/app/game/components/Square";
import { GameType, PlayerType } from "./gameSlice";

export const findTileIndexInHand = (state: GameType, tileId: string) => {
  const playersHand = state.activePlayer.hand.endHand;
  return playersHand.findIndex((item) => item.key === tileId);
};

export const findTileIndexOnBoard = (state: GameType, tileId: string) => {
  return state.board.endTurn.findIndex((item) => item.key === tileId);
};

export const drawTile = (deck: JSX.Element[], activePlayer: PlayerType) => {
  const randomDeckIndex = Math.floor(Math.random() * deck.length);

  const tile = deck.at(randomDeckIndex) as JSX.Element;

  activePlayer.hand.endHand.push(tile);

  deck.splice(randomDeckIndex, 1);
};

export const moveTileFromHandToBoard = (
  state: GameType,
  tileId: string,
  boardIndex: number
) => {
  const index = findTileIndexInHand(state, tileId);
  const tile = state.activePlayer.hand.endHand[index];
  state.activePlayer.hand.endHand.splice(index, 1);
  state.board.endTurn[boardIndex] = tile;
};

export const moveTileOnBoard = (
  state: GameType,
  tileId: string,
  boardIndex: number
) => {
  const index = findTileIndexOnBoard(state, tileId);
  const tile = state.board.endTurn[index];
  state.board.endTurn[boardIndex] = tile;
  state.board.endTurn[index] = <Square index={index} key={index} />;
};

export const saveActivePlayer = (
  state: GameType,
  activePlayerIndex: number
) => {
  state.activePlayer.hand.startHand = state.activePlayer.hand.endHand;

  state.players[activePlayerIndex] = state.activePlayer;
};

export const getNextPlayer = (
  players: PlayerType[],
  activePlayerIndex: number
) => {
  if (activePlayerIndex === players.length - 1) return players[0];
  else return players[activePlayerIndex + 1];
};
