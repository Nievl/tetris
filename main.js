const $canvas = document.querySelector("#board");
const $button = document.querySelector("#startGame");
const $buttonKey = document.querySelectorAll('button[data-action="keyDown"]');

const ctx = $canvas.getContext("2d");

ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;

ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

// -----------------------------------
let board = new Board();

function start() {
  board.reset();
  let piece = new Piece(ctx);
  console.log("piece: ", piece);
  piece.draw();
  board.piece = piece;
}

$button.addEventListener("click", start);
// -----------------------------------

function keyDown(e) {
  const keyCode = KEY[e.currentTarget.dataset.name];
  if (keyCode) {
    let p = moves[keyCode](board.piece);
    if (board.valid(p)) {
      board.piece.move(p);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      board.piece.draw();
    }
  }
}

$buttonKey.forEach((button) => button.addEventListener("click", keyDown));
// -----------------------------------
const moves = {
  [KEY.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
  [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
  [KEY.DOWN]: (p) => ({ ...p, y: p.y + 1 }),
  [KEY.ROTATE]: (p) => board.rotate(p),
  [KEY.COUNTERROTATE]: (p) => board.counterRotate(p),
};
// -----------------------------------
document.addEventListener("keydown", (e) => {
  if (moves[e.keyCode]) {
    e.preventDefault();
    let p = moves[e.keyCode](board.piece);
    if (board.valid(p)) {
      board.piece.move(p);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      board.piece.draw();
    }
  }
});
// -----------------------------------
