import React from "react";

import { useDrag } from "react-dnd";

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
      className={`tile square ${isDragging ? "dragging" : ""}`}
      style={{
        color: `${color}`,
        backgroundColor: isDragging ? "yellow" : "pink",
      }}
    >
      {value}
    </div>
  );
}
