import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Game from "@/models/gameModel";

connect();

export async function POST(req: NextRequest) {
  try {
    const { id, deck, board, players, gameOver, activePlayer } =
      await req.json();

    console.log(activePlayer);

    const game = await Game.findOne({ id });

    if (game) {
      return NextResponse.json(
        { error: "Game already exists" },
        { status: 400 }
      );
    }

    //Create and save new user to DB
    const newGame = await Game.create({
      id,
      deck,
      board,
      players,
      gameOver,
      activePlayer,
    });

    return NextResponse.json({
      message: "User created succefully",
      success: true,
      newGame,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
