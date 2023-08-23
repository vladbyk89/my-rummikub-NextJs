import React from "react";
import { useDrop } from "react-dnd";
import { useAppDispatch } from "@/redux/hooks";
import { moveTile } from "@/redux/features/board/boardSlice";
import { removeTileFromDeck } from "@/redux/features/deck/deckSlice";
import { TileType } from "./Tile";

interface SquareProps {
  index: number;
}

export default function Square({ index }: SquareProps) {
  const dispatch = useAppDispatch();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "tile",
    drop: (draggedItem: TileType) => {
      dispatch(
        moveTile({
          squareIndex: index,
          newDiv: (
            <div
              key={index}
              style={{ color: draggedItem.color }}
              className="tile"
            >
              {draggedItem.value}
            </div>
          ),
        })
      );
      dispatch(removeTileFromDeck(33));
    },

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return <div ref={drop} id={String(index)} className="square"></div>;
}
