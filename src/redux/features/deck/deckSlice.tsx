import { RootState } from "@/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Tile from "@/app/game/components/Tile";

const createDeck = () => {
  try {
    const colors = ["black", "red", "blue", "yellow"];
    const deck: JSX.Element[] = [];

    for (let j = 1; j < 3; j++) {
      const jocker = <Tile key={deck.length} value={0} color="purpel" />;
      deck.push(jocker);

      colors.forEach((color) => {
        for (let i = 1; i <= 13; i++) {
          const tile = <Tile key={deck.length} value={i} color={color} />;
          deck.push(tile);
        }
      });
    }

    return deck;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const initialState = { value: createDeck() };

export const deck = createSlice({
  name: "deck",
  initialState,
  reducers: {
    removeTileFromDeck: (state, action) => {
      const index  = action.payload;
      state.value.splice(index, 1);
    },
  },
});

export const { removeTileFromDeck } = deck.actions;

export const selectdeck = (state: RootState) => state.deck.value;

export default deck.reducer;
