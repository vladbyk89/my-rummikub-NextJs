import React from "react";
import { useDrop } from "react-dnd";
import { TileType } from "./Tile";
import { useAppDispatch } from "@/redux/hooks";
import { gameActions, PlayerType } from "@/redux/features/game/gameSlice";

interface Props {
  activePlayer: PlayerType;
}

export default function ActivePlayerSection({ activePlayer }: Props) {
  const dispatch = useAppDispatch();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "tile",
    drop: (tile: TileType) => {
      dispatch(gameActions.moveFromBoardToHand({ tileId: tile.id }));
    },

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <section className="playerHand" ref={drop}>
      <div className="tiles">
        {activePlayer ? activePlayer.hand.endHand : <>Loading...</>}
      </div>
      <div className="actionButtons">
        <div className="buttonWrapper">
          <button
            className="buttonStyleTwo"
            onClick={() => dispatch(gameActions.arrangeByColor())}
          >
            123
          </button>
        </div>
        <div className="buttonWrapper">
          <button
            className="buttonStyleTwo"
            onClick={() => dispatch(gameActions.arrangeByGroup())}
          >
            777
          </button>
        </div>
        <div className="buttonWrapper">
          <button
            className="buttonStyleTwo"
            onClick={() => dispatch(gameActions.resetHand())}
          >
            RESET
          </button>
        </div>
        <div className="buttonWrapper">
          <button
            onClick={() => dispatch(gameActions.endActivePlayerTurn())}
            className="buttonStyleTwo"
          >
            End turn
          </button>
        </div>
      </div>
    </section>
  );
}
