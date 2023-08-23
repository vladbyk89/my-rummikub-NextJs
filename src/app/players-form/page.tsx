"use client";

import { FormEvent, useEffect, useState } from "react";

interface FormData {
  playerOne: string;
  playerTwo: string;
  playerThree?: string;
  playerFour?: string;
}

export default function PlayersForm() {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [players, setPlayers] = useState<FormData>({
    playerOne: "",
    playerTwo: "",
    playerThree: "",
    playerFour: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <form className="p-12 max-w-lg" onSubmit={(e) => handleSubmit(e)}>
      <label
        htmlFor="playerOne"
        className=" text-base font-medium text-gray-900"
      >
        Player One:
        <input
          className="flex h-10 w-full m-2 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-black"
          id="playerOne"
          name="playerOne"
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
