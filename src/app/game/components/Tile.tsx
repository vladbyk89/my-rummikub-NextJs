import React from "react";

import { useDrag } from "react-dnd";
import { Icon } from "@iconify/react";

export interface TileType {
  value: number;
  color: string;
  id: string;
}

export default function Tile({ value, color, id }: TileType) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "tile",
    item: { value, color, id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      id={id}
      ref={drag}
      className="tile"
      style={{
        color: `${color}`,
        visibility: isDragging ? "hidden" : "visible",
      }}
    >
      {value !== 0 ? (
        <span>{value}</span>
      ) : (
        <Icon icon="game-icons:card-joker" />
      )}
    </div>
  );
}
