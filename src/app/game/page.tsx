"use client";

// ** Styles
import "../styles/GamePage.scss";
import "../styles/Buttons.scss";

// ** React DND
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// ** Custom components
import Board from "./components/Board";
import Tile from "./components/Tile";

// ** redux
import { DispatchType, useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectdeck,
  removeTileFromDeck,
} from "@/redux/features/deck/deckSlice";
import { useEffect, useState } from "react";
import { selectPlayers } from "@/redux/features/players/playersSlice";

// ** Types
import { PlayerType } from "@/redux/features/players/playersSlice";

export default function GamePage() {
  // Hooks
  const dispatch = useAppDispatch();
  const deckStore = useAppSelector(selectdeck);
  const playersStore = useAppSelector(selectPlayers);

  // Use State
  const [players, setPlayers] = useState<PlayerType>({
    userName: "vladb89",
    hand: [],
  });

  const createPlayerHand = (deck: JSX.Element[]) => {
    const playersHand = [];

    for (let i = 0; i < 14; i++) {
      const randomDeckIndex = Math.floor(Math.random() * deck.length);

      const tile = deck.at(randomDeckIndex) as JSX.Element;

      playersHand.push(tile);

      dispatch(removeTileFromDeck(randomDeckIndex));
    }

    return playersHand;
  };

  useEffect(() => {
    setPlayers(
      (prev) => (prev = { ...prev, hand: createPlayerHand(deckStore) })
    );
    console.log(createPlayerHand(deckStore));
  }, []);

  return (
    <main className="gamePage">
      <section className="playersArea">
        <div></div>
        <div></div>
        <div></div>
      </section>
      <DndProvider backend={HTML5Backend}>
        <section className="playerHand">
          <div className="tiles">{players.hand}</div>
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
