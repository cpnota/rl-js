const factory = require('../factory');
const getState = require('../factory/get-state/tabular');
const layout = require('./layout');

module.exports = factory({
  layout,
  goalReward: 0,
  timePenalty: -1,
  getState,
});
