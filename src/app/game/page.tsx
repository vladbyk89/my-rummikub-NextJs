"use client";

// ** Styles
import "../styles/GamePage.scss";
import "../styles/Buttons.scss";

// ** Custom components
import Board from "./components/Board";
import PlayersSection from "./components/PlayersArea";

// ** redux
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { selectGame, gameActions } from "@/redux/features/game/gameSlice";

// ** Types
import ActivePlayerSection from "./components/ActivePlayerSection";

export default function GamePage() {
  // Hooks
  const dispatch = useAppDispatch();
  const { activePlayer, players, gameOver } = useAppSelector(selectGame);

  useEffect(() => {
    if (players.length == 0) {
      const fakePlayers = ["vladb89", "riri96", "ollie21"];
      dispatch(gameActions.createGame(fakePlayers));
    }
  }, []);

  return gameOver.isOver ? (
    <div className="gameOverPage">
      The Winner is: {gameOver.winner.userName}
    </div>
  ) : (
    <main className="gamePage">
      <PlayersSection />
        <ActivePlayerSection activePlayer={activePlayer} />
        <Board />
    </main>
  );
}
