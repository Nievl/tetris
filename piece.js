class Piece {
  constructor(ctx) {
    this.ctx = ctx;
    this.spawn();
  }

  draw = () => {
    this.ctx.fillStyle = this.color;
    this.shape.forEach((row, y) =>
      row.forEach((color, x) => {
        if (color > 0) this.ctx.fillRect(this.x + x, this.y + y, 1, 1);
      })
    );
  };
  move = (p) => {
    this.x = p.x;
    this.y = p.y;
    this.shape = p.shape;
  };
  randomizePiece = (noOfTypes) => Math.floor(Math.random() * noOfTypes);
  spawn = () => {
    this.color = COLORS[this.randomizePiece(COLORS.length - 1)];
    this.shape = SHAPES[this.randomizePiece(SHAPES.length - 1)];
    this.x = 3;
    this.y = 0;
  };
}
