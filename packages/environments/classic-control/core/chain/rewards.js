const types = require('./types');

module.exports = (state, action, nextState) => {
  if (action.type === types.left) return 1;
  if (nextState === 10) return 10;
  return 0;
};
