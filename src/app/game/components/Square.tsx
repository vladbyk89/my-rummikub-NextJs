import React from "react";
import { useDrop } from "react-dnd";
import { useAppDispatch } from "@/redux/hooks";
import {
  moveTile,
  removeTileFromPlayerHand,
} from "@/redux/features/game/gameSlice";
import Tile, { TileType } from "./Tile";

interface SquareProps {
  index: number;
}

export default function Square({ index }: SquareProps) {
  const dispatch = useAppDispatch();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "tile",
    drop: (tile: TileType) => {
      dispatch(
        moveTile({
          squareIndex: index,
          tileId: tile.id,
        })
      );
    },

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return <div ref={drop} id={String(index)} className="square"></div>;
}
