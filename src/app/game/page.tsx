"use client";

// ** Styles
import "../styles/GamePage.scss";
import "../styles/Buttons.scss";

// ** React DND
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

// ** Custom components
import Board from "./components/Board";
import Tile from "./components/Tile";
import PlayerSection from "./components/PlayerSection";

// ** redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import {
  createPlayer,
  selectGame,
  nextPlayer,
} from "@/redux/features/game/gameSlice";

// ** Types
import { PlayerType } from "@/redux/features/players/playersSlice";

export default function GamePage() {
  // Hooks
  const dispatch = useAppDispatch();
  const gameStore = useAppSelector(selectGame);
  const activePlayer = gameStore.activePlayer;

  useEffect(() => {
    if (gameStore.players.length == 0)
      dispatch(createPlayer({ userName: "vladb89" }));
    else {
      const amountOfPlayers = gameStore.players.length;
      const randomPlayerIndex = Math.floor(Math.random() * amountOfPlayers);
      const randomPlayer = gameStore.players[randomPlayerIndex];

      dispatch(nextPlayer(randomPlayer));
    }
  }, [gameStore.players]);

  return (
    <main className="gamePage">
      <PlayerSection />
      <DndProvider backend={HTML5Backend}>
        <section className="playerHand">
          <div className="tiles">
            {activePlayer ? activePlayer.hand : <>Loading...</>}
          </div>
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
