class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.piece = null;
  }

  reset = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.grid = this.getEmptyBoard();
  };

  draw = () => {
    this.piece.draw();
    this.drawFullBoard();
  };

  drawFullBoard() {
    this.grid.forEach((row, y) =>
      row.forEach((color, x) => {
        if (color > 0) {
          this.ctx.fillStyle = COLORS[color];
          this.ctx.fillRect(x, y, 1, 1);
        }
      })
    );
  }

  drop() {
    let p = moves[KEY.DOWN](this.piece);
    if (this.valid(p)) {
      this.piece.move(p);
    } else {
      this.freeze();
      this.piece = new Piece(this.ctx);
      this.piece.setStartPosition();
    }
  }

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
    const tmpArr = Array.from({ length: p.shape.length }, () => []);
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
    const tmpArr = Array.from({ length: p.shape.length }, () => []);
    for (let rowIndex = 0; rowIndex < oldFigure.shape.length; rowIndex++) {
      const row = oldFigure.shape[rowIndex];
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        tmpArr[row.length - columnIndex - 1][rowIndex] = oldFigure.shape[rowIndex][columnIndex];
      }
    }
    p.shape = tmpArr;
    return p;
  };

  freeze() {
    this.piece.shape.forEach((row, y) =>
      row.forEach((color, x) => {
        if (color > 0) this.grid[y + this.piece.y][x + this.piece.x] = color;
      })
    );
  }
}
