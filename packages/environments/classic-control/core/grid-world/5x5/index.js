const factory = require('../factory');
const { w, g, s } = require('../factory/features');

const x = undefined;

const layout = [
  [s, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, x, 0, 0],
  [0, 0, x, 0, 0],
  [0, 0, w, 0, g],
];

module.exports = factory({
  layout,
  waterPenalty: -10,
  goalReward: 10,
});
