import React from "react";
import { selectBoard } from "@/redux/features/board/boardSlice";
import { useAppSelector } from "@/redux/hooks";

export default function Board() {
  const boardArr = useAppSelector(selectBoard);

  return <section className="gameBoard">{boardArr}</section>;
}
