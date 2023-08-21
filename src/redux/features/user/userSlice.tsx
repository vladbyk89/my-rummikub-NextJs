import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserType = {
  value: { username: string; email: string };
};

const initialState: UserType = {
  value: { username: "", email: "" },
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => {
      state.value = initialState.value;
    },
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUser, resetUser } = user.actions;

export const selectUser = (state: RootState) => state.user.value;

export default user.reducer;
