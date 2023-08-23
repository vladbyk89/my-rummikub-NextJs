import React from "react";
import { selectBoard } from "@/redux/features/board/boardSlice";
import { useAppSelector } from "@/redux/hooks";
import { useDrop } from "react-dnd";

export default function Board() {
  const boardArr = useAppSelector(selectBoard);

  return <section className="gameBoard">{boardArr}</section>;
}
