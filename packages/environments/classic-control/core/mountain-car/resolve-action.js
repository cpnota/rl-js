const types = require('./types');
const continuousTypes = require('./continuous/types');

const throttle = (action) => {
  if (action === types.forward) return 0.001;
  if (action === types.reverse) return -0.001;
  return 0;
};

module.exports = (state, action) => ({
  type: continuousTypes.throttle,
  payload: throttle(action),
});
