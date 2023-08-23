import Square from "@/app/game/components/Square";

export default class BoardClass {
  public board: JSX.Element[] = [];
  constructor() {
    this.createEmptyBoard();
  }

  createEmptyBoard = () => {
    for (let i = 0; i < 160; i++) {
      this.board.push(<Square index={i} key={i} />);
    }
  };

  moveTile = (index: number, tile: JSX.Element) => {
    this.board[index] = tile;
    console.log(this.board);
  };
}
