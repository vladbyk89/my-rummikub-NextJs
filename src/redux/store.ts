import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import playerReducer from "./features/players/playersSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    players: playerReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
