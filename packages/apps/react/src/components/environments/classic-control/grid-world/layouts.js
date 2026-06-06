import { s, g, w } from '@rl-js/environments-classic-control/core/grid-world/factory/features';

const x = undefined;

export const gridWorld3x3 = [
  [s, 0, 0],
  [0, 0, 0],
  [0, 0, g],
];

export const gridWorld5x5 = [
  [s, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, x, 0, 0],
  [0, 0, x, 0, 0],
  [0, 0, w, 0, g],
];
