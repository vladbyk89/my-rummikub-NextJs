"use client";

import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { initiatePlayers } from "@/redux/features/players/playersSlice";
import { useRouter } from "next/navigation";
import { createPlayer } from "@/redux/features/game/gameSlice";

interface FormData {
  playerOne: string;
  playerTwo: string;
  playerThree?: string;
  playerFour?: string;
}

export default function PlayersForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [players, setPlayers] = useState<FormData>({
    playerOne: "",
    playerTwo: "",
    playerThree: "",
    playerFour: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const playersArr = Object.values(players).filter((val) => val != "");

    playersArr.forEach((player) =>
      dispatch(createPlayer({ userName: player }))
    );

    router.push("/game");
  };

  return (
    <form className="p-12 max-w-lg" onSubmit={handleSubmit}>
      <label
        htmlFor="playerOne"
        className=" text-base font-medium text-gray-900"
      >
        Player One:
        <input
          className="flex h-10 w-full m-2 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-black"
          id="playerOne"
          name="playerOne"
          required
          value={players.playerOne}
          onChange={(e) =>
            setPlayers(
              (prev) => (prev = { ...prev, playerOne: e.target.value })
            )
          }
        />
      </label>
      <label
        htmlFor="playerTwo"
        className="text-base font-medium text-gray-900"
      >
        Player Two:
        <input
          className="flex h-10 w-full m-2 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-black"
          id="playerTwo"
          name="playerTwo"
          required
          value={players.playerTwo}
          onChange={(e) =>
            setPlayers(
              (prev) => (prev = { ...prev, playerTwo: e.target.value })
            )
          }
        />
      </label>
      <label
        htmlFor="playerThree"
        className="text-base font-medium text-gray-900"
      >
        Player Three:
        <input
          className="flex h-10 w-full m-2 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-black"
          id="playerThree"
          name="playerThree"
          value={players.playerThree}
          onChange={(e) =>
            setPlayers(
              (prev) => (prev = { ...prev, playerThree: e.target.value })
            )
          }
        />
      </label>
      <label
        htmlFor="playerFour"
        className="text-base font-medium text-gray-900"
      >
        Player Four:
        <input
          className="flex h-10 w-full m-2 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-black"
          id="playerFour"
          name="playerFour"
          value={players.playerFour}
          onChange={(e) =>
            setPlayers(
              (prev) => (prev = { ...prev, playerFour: e.target.value })
            )
          }
        />
      </label>
      <button
        disabled={buttonDisabled}
        className={`inline-flex w-full mt-4 items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white ${
          !buttonDisabled && "hover:bg-black/80"
        }`}
      >
        Get started
      </button>
    </form>
  );
}
