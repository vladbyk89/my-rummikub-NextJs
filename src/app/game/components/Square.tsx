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
      const tileId = tile.id;
      dispatch(
        moveTile({
          squareIndex: index,
          tile: (
            <Tile
              key={tileId}
              value={tile.value}
              color={tile.color}
              id={tileId}
            />
          ),
        })
      );
      dispatch(removeTileFromPlayerHand(tileId))
    },

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return <div ref={drop} id={String(index)} className="square"></div>;
}
