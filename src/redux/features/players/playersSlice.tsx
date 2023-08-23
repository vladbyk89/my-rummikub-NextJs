import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

export interface PlayerType {
  userName: string;
  hand: JSX.Element[];
};

interface StateStype {
  value: PlayerType[];
}

const initPlayerOne: PlayerType = {
  userName: "vladb89",
  hand: []
};

const initialState: StateStype = {
  value: [],
};

export const players = createSlice({
  name: "players",
  initialState,
  reducers: {
    initiatePlayers: (state, action) => {
      state.value = [...action.payload];
    },
  },
});

export const { initiatePlayers } = players.actions;

export const selectPlayers = (state: RootState) => state.players.value;

export default players.reducer;
