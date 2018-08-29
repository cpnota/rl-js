const { throttle } = require('./types');
const bound = require('./bound');

const boundThrottle = bound(-0.001, 0.001);

module.exports = (state, action) => ({
  type: throttle,
  payload: boundThrottle(action),
});
