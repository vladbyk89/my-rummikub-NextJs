import React from "react";

import { useAppSelector } from "@/redux/hooks";
import { selectGame } from "@/redux/features/game/gameSlice";

export default function PlayerSection() {
  const gameStore = useAppSelector(selectGame);


  return (
    <section
      className="playersArea"
    >
      {gameStore.players.map((player, index) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          key={index}
        >
          {player.userName}
        </div>
      ))}
    </section>
  );
}
