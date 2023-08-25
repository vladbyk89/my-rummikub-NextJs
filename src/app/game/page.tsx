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
import PlayersSection from "./components/PlayersSection";

// ** redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { selectGame, createGame } from "@/redux/features/game/gameSlice";

// ** Types
import ActivePlayerSection from "./components/ActivePlayerSection";

export default function GamePage() {
  // Hooks
  const dispatch = useAppDispatch();
  const { activePlayer, players } = useAppSelector(selectGame);

  useEffect(() => {
    if (players.length == 0) {
      const fakePlayers = ["vladb89", "riri96", "ollie21"];
      dispatch(createGame(fakePlayers));
    }
  }, []);

  return (
    <main className="gamePage">
      <PlayersSection />
      <DndProvider backend={HTML5Backend}>
        <ActivePlayerSection activePlayer={activePlayer} />
        <Board />
      </DndProvider>
    </main>
  );
}
