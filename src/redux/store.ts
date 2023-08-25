import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import playerReducer from "./features/players/playersSlice";
import gameReducer from "./features/game/gameSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    players: playerReducer,
    game:gameReducer
  },
  devTools: process.env.NODE_ENV !== "production", // look up usage
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
