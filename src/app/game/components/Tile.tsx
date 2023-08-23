import React from "react";

import { useDrag } from "react-dnd";

export interface TileType {
  value: number;
  color: string;
}

export default function Tile({ value, color }: TileType) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "tile",
    item: { value, color },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className="tile square"
      style={{
        color: `${color}`,
        backgroundColor: isDragging ? "yellow" : "pink",
      }}
    >
      {value}
    </div>
  );
}
