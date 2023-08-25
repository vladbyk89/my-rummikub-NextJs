import React from "react";
import { selectGame } from "@/redux/features/game/gameSlice";
import { useAppSelector } from "@/redux/hooks";

export default function Board() {
  const { board } = useAppSelector(selectGame);

  return <section className="gameBoard">{board}</section>;
}
