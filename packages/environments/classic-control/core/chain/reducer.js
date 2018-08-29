const types = require('./types');

module.exports = (state = 0, action) => {
  if (action.type === types.right) {
    return state + 1;
  }
  return state;
};
