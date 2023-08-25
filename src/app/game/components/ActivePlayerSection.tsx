import React from "react";
import { PlayerType } from "@/redux/features/players/playersSlice";
import { useDrop } from "react-dnd";
import { TileType } from "./Tile";
import { useAppDispatch } from "@/redux/hooks";

interface Props {
  activePlayer: PlayerType;
}

export default function ActivePlayerSection({ activePlayer }: Props) {
  const dispatch = useAppDispatch();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "tile",
    drop: (tile: TileType) => {},

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <section className="playerHand" ref={drop}>
      <div className="tiles">
        {activePlayer ? activePlayer.hand : <>Loading...</>}
      </div>
      <div className="actionButtons">
        <button className="buttonStyleTwo">123</button>
        <button className="buttonStyleTwo">777</button>
        <button className="buttonStyleTwo">RESET</button>
        <button className="buttonStyleTwo">End turn</button>
      </div>
    </section>
  );
}
