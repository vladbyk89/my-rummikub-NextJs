import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import playerReducer from "./features/players/playersSlice";
import boardReducer from "./features/board/boardSlice";
import deckReducer from "./features/deck/deckSlice";
import gameReducer from "./features/game/gameSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    players: playerReducer,
    board: boardReducer,
    deck: deckReducer,
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
