class Board {
  reset = () => (this.grid = this.getEmptyBoard());

  getEmptyBoard = () => Array.from({ length: ROWS }, () => Array(COLS).fill(0));

  valid = (p) => {
    return p.shape.every((row, dy) =>
      row.every((color, dx) => {
        let x = p.x + dx;
        let y = p.y + dy;
        return color === 0 || (this.isInside(x) && this.isAbove(y));
      })
    );
  };
  isInside = (x) => x >= 0 && x < COLS;
  isAbove = (y) => y < ROWS;
  rotate = (oldFigure) => {
    let p = JSON.parse(JSON.stringify(oldFigure));
    p.shape = oldFigure.shape[0].map((x, i) => oldFigure.shape.map((x) => x[i]));
    p.shape.forEach((row) => row.reverse());
    return p;
  };
  counterRotate = (oldFigure) => {
    let p = JSON.parse(JSON.stringify(oldFigure));
    p.shape = oldFigure.shape[0].map((x, i) => oldFigure.shape.map((x) => x[i]));
    p.shape.forEach((row) => row.reverse());
    return p;
  };
}
