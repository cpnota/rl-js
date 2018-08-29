// non-deterministic action resolution
const math = require('mathjs');
const types = require('./types');

const laterals = {
  [types.UP]: [types.LEFT, types.RIGHT],
  [types.DOWN]: [types.LEFT, types.RIGHT],
  [types.LEFT]: [types.DOWN, types.UP],
  [types.RIGHT]: [types.DOWN, types.UP],
};

const configureResolveActions = ({
  doNothingProbability = 0,
  wrongDirectionProbability = 0,
}) => {
  const selectType = (action) => {
    const rand = Math.random();
    if (rand < doNothingProbability) {
      return 'DO_NOTHING';
    } if (rand < doNothingProbability + wrongDirectionProbability) {
      return laterals[action][math.randomInt(2)];
    }
    return action;
  };

  return (state, action) => ({
    type: selectType(action),
  });
};

module.exports = configureResolveActions;
