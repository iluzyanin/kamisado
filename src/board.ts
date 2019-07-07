import Color from './color';

interface Tower {
  id: number;
  player?: number;
  color?: Color;
}

// prettier-ignore
const createBoard = () => [
  Color.Orange, Color.Blue, Color.Purple, Color.Pink, Color.Yellow, Color.Red, Color.Green, Color.Brown,
  Color.Red, Color.Orange, Color.Pink, Color.Green, Color.Blue, Color.Yellow, Color.Brown, Color.Purple,
  Color.Green, Color.Pink, Color.Orange, Color.Red, Color.Purple, Color.Brown, Color.Yellow, Color.Blue,
  Color.Pink, Color.Purple, Color.Blue, Color.Orange, Color.Brown, Color.Green, Color.Red, Color.Yellow,
  Color.Yellow, Color.Red, Color.Green, Color.Brown, Color.Orange, Color.Blue, Color.Purple, Color.Pink,
  Color.Blue, Color.Yellow, Color.Brown, Color.Purple, Color.Red, Color.Orange, Color.Pink, Color.Green,
  Color.Purple, Color.Brown, Color.Yellow, Color.Blue, Color.Green, Color.Pink, Color.Orange, Color.Red,
  Color.Brown, Color.Green, Color.Red, Color.Yellow, Color.Pink, Color.Purple, Color.Blue, Color.Orange
];

const createTowers = (): Tower[] =>
  createBoard().map((cell, i) => {
    if (i / 8 < 1) {
      return {
        id: i,
        player: 1,
        color: cell,
      };
    }

    if (i / 55 > 1) {
      return {
        id: i,
        player: 2,
        color: cell,
      };
    }

    return {
      id: i,
    };
  });

const getMoves = (
  position: number,
  player: number,
  towers: Tower[]
): number[] => {
  const result: number[] = [];
  const row = Math.floor(position / 8);
  let stopStraight = false;
  let stopLeft = false;
  let stopRight = false;
  const endRow = player === 1 ? 7 - row : row;

  for (let j = 1; j <= endRow; j++) {
    const straight = player === 1 ? position + j * 8 : position - j * 8; // TODO: check boundaries
    const left = straight - j;
    const right = straight + j;
    const rowStart = player === 1 ? (row + j) * 8 : (row - j) * 8;
    const rowEnd = rowStart + 7;

    if (!stopLeft) {
      if (left >= rowStart && !towers[left].player) {
        result.push(left);
      } else {
        stopLeft = true;
      }
    }
    if (!stopRight) {
      if (right <= rowEnd && !towers[right].player) {
        result.push(right);
      } else {
        stopRight = true;
      }
    }
    if (!stopStraight) {
      if (!towers[straight].player) {
        result.push(straight);
      } else {
        stopStraight = true;
      }
    }
  }

  return result;
};

export { createBoard, createTowers, getMoves };
