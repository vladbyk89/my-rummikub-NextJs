import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

type PlayerType = {
  userName: string;
};

interface SliceType {
  value: PlayerType[];
}

const initialState: SliceType = {
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

export const {} = players.actions;

export const selectPlayers = (state: RootState) => state.players.value;

export default players.reducer;
