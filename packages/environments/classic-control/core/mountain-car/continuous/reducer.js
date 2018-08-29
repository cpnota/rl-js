const types = require('./types');
const bound = require('./bound');

const boundVelocity = bound(-0.07, 0.07);
const boundPosition = bound(-1.2, 0.5);

const gravity = position => -0.0025 * Math.cos(3 * position);

module.exports = (state = { position: -0.5, velocity: 0 }, action) => {
  if (action.type === types.throttle) {
    const throttle = action.payload;

    let velocity = boundVelocity(
      state.velocity + throttle + gravity(state.position),
    );
    const position = boundPosition(state.position + velocity);

    if (position <= -1.2) {
      velocity = 0;
    }

    return {
      position,
      velocity,
    };
  }

  return state;
};
