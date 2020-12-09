const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

const KEY = {
  LEFT: 37,
  RIGHT: 39,
  DOWN: 40,
  ROTATE: 90,
  COUNTERROTATE: 88,
  SPACE: 32,
};

Object.freeze(KEY);

const COLORS = ["cyan", "blue", "orange", "yellow", "green", "purple", "red"];

const SHAPES = [
  [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
  [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
];
