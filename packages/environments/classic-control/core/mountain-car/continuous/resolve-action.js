const { throttle } = require('./types');
const bound = require('./bound');

module.exports = (bounds) => {
  const boundThrottle = bound(...bounds);
  return (state, action) => ({
    type: throttle,
    payload: boundThrottle(action),
  });
};
