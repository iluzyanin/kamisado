import Color from "./color";

// prettier-ignore
const board = [
  [Color.Orange, Color.Blue, Color.Purple, Color.Pink, Color.Yellow, Color.Red, Color.Green, Color.Brown],
  [Color.Red, Color.Orange, Color.Pink, Color.Green, Color.Blue, Color.Yellow, Color.Brown, Color.Purple],
  [Color.Green, Color.Pink, Color.Orange, Color.Red, Color.Purple, Color.Brown, Color.Yellow, Color.Blue],
  [Color.Pink, Color.Purple, Color.Blue, Color.Orange, Color.Brown, Color.Green, Color.Red, Color.Yellow],
  [Color.Yellow, Color.Red, Color.Green, Color.Brown, Color.Orange, Color.Blue, Color.Purple, Color.Pink],
  [Color.Blue, Color.Yellow, Color.Brown, Color.Purple, Color.Red, Color.Orange, Color.Pink, Color.Green],
  [Color.Purple, Color.Brown, Color.Yellow, Color.Blue, Color.Green, Color.Pink, Color.Orange, Color.Red],
  [Color.Brown, Color.Green, Color.Red, Color.Yellow, Color.Pink, Color.Purple, Color.Blue, Color.Orange]
];

export default board;
