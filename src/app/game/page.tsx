"use client";

// ** Styles
import "../styles/GamePage.scss";
import "../styles/Buttons.scss";

// ** React DND
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// ** Custom components
import Board from "./components/Board";
import Tile from "./components/Tile";

// ** redux
import { DispatchType, useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectdeck,
  removeTileFromDeck,
} from "@/redux/features/deck/deckSlice";
import { useEffect, useState } from "react";
import { selectPlayers } from "@/redux/features/players/playersSlice";
import { createPlayer, selectGame } from "@/redux/features/game/gameSlice";

// ** Types
import { PlayerType } from "@/redux/features/players/playersSlice";

export default function GamePage() {
  // ** use state
  const [activePlayer, setActivePlayer] = useState({ userName: "", hand: [] });

  // Hooks
  const dispatch = useAppDispatch();
  const deckStore = useAppSelector(selectdeck);
  const playersStore = useAppSelector(selectPlayers);
  const gameStore = useAppSelector(selectGame);

  useEffect(() => {
    dispatch(createPlayer({ userName: "vladb89" }));
  }, []);

  return (
    <main className="gamePage">
      <section className="playersArea">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {gameStore.players[0].userName}
        </div>
        <div></div>
        <div></div>
      </section>
      <DndProvider backend={HTML5Backend}>
        <section className="playerHand">
          <div className="tiles">{gameStore.players[0].hand}</div>
          <div className="actionButtons">
            <button className="buttonStyleTwo">123</button>
            <button className="buttonStyleTwo">777</button>
            <button className="buttonStyleTwo">RESET</button>
            <button className="buttonStyleTwo">End turn</button>
          </div>
        </section>
        <Board />
      </DndProvider>
    </main>
  );
}
