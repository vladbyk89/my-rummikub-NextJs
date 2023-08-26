import React from "react";

import { useAppSelector } from "@/redux/hooks";
import { selectGame } from "@/redux/features/game/gameSlice";

export default function PlayersSection() {
  const gameStore = useAppSelector(selectGame);
  const activePlayerId = gameStore.activePlayer.id;

  return (
    <section className="playersArea">
      {gameStore.players.map((player, index) => (
        <div
          style={{
            boxShadow: activePlayerId === player.id ? "0 0 10px 5px white" : "",
          }}
          key={index}
          className="player"
        >
          {player.userName}
        </div>
      ))}
    </section>
  );
}
