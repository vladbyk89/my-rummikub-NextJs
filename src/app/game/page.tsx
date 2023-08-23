"use client";

import "../styles/GamePage.scss";
import "../styles/Buttons.scss";

// ** React DND
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Board from "./components/Board";
import Tile from "./components/Tile";

export default function GamePage() {

  return (
    <main className="gamePage">
      <section className="playersArea">
        <div></div>
        <div></div>
        <div></div>
      </section>
      <DndProvider backend={HTML5Backend}>
        <section className="playerHand">
          <div className="tiles">
            <Tile color="red" value={7} />
            <Tile color="red" value={8} />
            <Tile color="red" value={4} />
            <Tile color="red" value={1} />
          </div>
          <div className="actionButtons">
            <button className="buttonStyleTwo">123</button>
            <button className="buttonStyleTwo">777</button>
            <button className="buttonStyleTwo">RESET</button>
            <button className="buttonStyleTwo">End turn</button>
          </div>
        </section>
        <Board />
      </DndProvider>
    </main>
  );
}
