const types = require('./types');

const torque = (action) => {
  if (action === types.negative) return -1;
  if (action === types.positive) return 1;
  if (action === types.zero) return 0;
  throw new Error(`Unknown action: ${action}`);
};

module.exports = (state, action) => ({
  type: 'torque',
  payload: torque(action),
});
