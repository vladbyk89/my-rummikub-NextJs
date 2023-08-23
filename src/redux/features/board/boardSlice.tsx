import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";
import Square from "@/app/game/components/Square";

const createEmptyBoard = () => {
  const boardArr = [];
  for (let i = 0; i < 160; i++) {
    boardArr.push(<Square index={i} key={i} />);
  }

  return boardArr;
};

const initialState = { value: createEmptyBoard() };

export const board = createSlice({
  name: "board",
  initialState,
  reducers: {
    moveTile: (state, action) => {
      const { squareIndex, newDiv } = action.payload;
      state.value[squareIndex] = newDiv;
    },
  },
});

export const { moveTile } = board.actions;

export const selectBoard = (state: RootState) => state.board.value;

export default board.reducer;
