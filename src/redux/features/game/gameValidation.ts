import { GameType } from "./gameSlice";
import { TileType } from "@/app/game/components/Tile";

export default function validateBoard(state: GameType) {
  const board = state.board.endTurn;

  try {
    let validBoard = true;

    const set: JSX.Element[] = [];

    //   currentGame.sets = [];

    board.forEach((square) => {
      if (!validBoard) return;

      if (square.type.name != "Square") set.push(square);

      const squareIndex = board.indexOf(square) + 1;

      // check if reached end of set of end of row -> than run validation on set
      if (
        (square.type.name == "Square" && set.length > 0) ||
        (set.length > 0 && squareIndex % 20 == 0)
      ) {
        //check set length
        if (set.length < 3) {
          set.splice(0, set.length); // check this!!!
          alert("set too short. minimun 3 tiles needed");
          validBoard = false;
        }

        // if (tileArr.find((tile) => tile.color === "jocker")) {
        //   if (!validSetWithJocker(tileArr)) {
        //     validBoard = false;
        //   }
        // }

        // if set isn't same color then check that it is a valid group (7red, 7green, 7blue)
        if (!isSameColor(set)) {
          if (!isValidGroup(set)) {
            alert("Not valid group.");
            validBoard = false;
          }
        }

        // check if the set is going up by one number by each tile
        else {
          if (!isValidRun(set)) {
            alert("Not valid run.");
            validBoard = false;
          }
        }

        set.splice(0, set.length);
      }
    });

    return validBoard;
  } catch (error) {
    console.error(error);
  }
}

function isSameColor(tileArr: JSX.Element[]) {
  return tileArr
    .map((tile) => tile.props.color)
    .reduce((a, b) => (a === b ? a : ""));
}

function isValidGroup(tileArr: JSX.Element[]) {
  try {
    if (tileArr.length > 4) {
      return false;
    }

    const stringArr = tileArr.map(
      (tile) => tile.props.value + tile.props.color
    );
    const setArr = Array.from(new Set(stringArr));

    if (
      !tileArr
        .map((tile) => tile.props.value)
        .reduce((a, b) => (a === b ? a : NaN))
    ) {
      return false;
    }

    return setArr.length === stringArr.length;
  } catch (error) {
    console.error(error);
  }
}

function isValidRun(tileArr: JSX.Element[]) {
  return tileArr
    .map((tile) => tile.props.value)
    .reduce((a, b) => (a + 1 === b ? b : NaN));
}