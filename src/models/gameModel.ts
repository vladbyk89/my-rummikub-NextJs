import mongoose from "mongoose";

interface Player {
  userName: string;
  hand: {
    startHand: string[];
    endHand: string[];
  };
  id: string;
}

const gameSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "Please provide an id"],
    unique: true,
  },
  deck: {
    type: [String],
    required: [true, "Please provide a username"],
    unique: true,
  },
  board: {
    type: {
      startTurn: [String],
      endTurn: [String],
    },
    required: [true, "Please provide a board"],
  },
  players: {
    type: [
      {
        userName: String,
        hand: {
          startHand: [String],
          endHand: [String],
        },
        id: String,
      },
    ],
    required: [true, "Please provide players"],
  },
  activePlayer: {
    userName: String,
    hand: {
      startHand: [String],
      endHand: [String],
    },
    id: String,
  },
  gameOver: {
    winner: {
      userName: String,
      hand: {
        startHand: [String],
        endHand: [String],
      },
      id: String,
    },
    isOver: Boolean,
  },
});

const Game = mongoose.models.games || mongoose.model("games", gameSchema);

export default Game;
