// function approximator version
const factory = require('../factory');
const getState = require('../factory/get-state/discrete');
const { g, s } = require('../factory/features');

/* eslint-disable prettier/prettier */
const layout = [
  [s, 0, 0],
  [0, 0, 0],
  [0, 0, g],
];

module.exports = factory({
  layout,
  goalReward: 0,
  timePenalty: -1,
  getState,
});
