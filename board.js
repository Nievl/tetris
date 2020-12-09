class Board {
  reset = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.grid = this.getEmptyBoard();
  };

  getEmptyBoard = () => Array.from({ length: ROWS }, () => Array(COLS).fill(0));

  valid = (p) => {
    return p.shape.every((row, dy) =>
      row.every((color, dx) => {
        let x = p.x + dx;
        let y = p.y + dy;
        return color === 0 || (this.isInside(x) && this.isAbove(y) && this.isOcuppied(x, y));
      })
    );
  };
  isInside = (x) => x >= 0 && x < COLS;
  isAbove = (y) => y < ROWS;
  isOcuppied = (x, y) => this.grid[y] && this.grid[y][x] === 0;

  rotate = (oldFigure) => {
    let p = JSON.parse(JSON.stringify(oldFigure));
    const tmpArr = p.length === 3 ? [[], [], []] : [[], [], [], []];
    for (let rowIndex = 0; rowIndex < oldFigure.shape.length; rowIndex++) {
      const row = oldFigure.shape[rowIndex];
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        tmpArr[columnIndex][row.length - rowIndex - 1] = oldFigure.shape[rowIndex][columnIndex];
      }
    }
    p.shape = tmpArr;
    return p;
  };
  counterRotate = (oldFigure) => {
    let p = JSON.parse(JSON.stringify(oldFigure));
    const tmpArr = p.length === 3 ? [[], [], []] : [[], [], [], []];
    for (let rowIndex = 0; rowIndex < oldFigure.shape.length; rowIndex++) {
      const row = oldFigure.shape[rowIndex];
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        tmpArr[row.length - columnIndex - 1][rowIndex] = oldFigure.shape[rowIndex][columnIndex];
      }
    }
    p.shape = tmpArr;
    return p;
  };
}
