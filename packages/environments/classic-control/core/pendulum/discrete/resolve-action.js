const continuousTypes = require('../types');

const torque = action => Number(action);

module.exports = (state, action) => ({
  type: continuousTypes.torque,
  payload: torque(action),
});
