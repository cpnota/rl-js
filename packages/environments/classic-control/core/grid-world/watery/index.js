const factory = require('../factory');
const { w, g, s } = require('../factory/features');

const layout = [
  [w, s, w, g, w],
  [w, 0, w, 0, w],
  [w, 0, 0, 0, w],
  [w, w, w, w, w],
];

module.exports = ({
  wrongDirectionProbability = 0.2,
  waterPenalty = -10,
  goalReward = 10,
} = {}) => factory({
  layout,
  wrongDirectionProbability,
  waterPenalty,
});
