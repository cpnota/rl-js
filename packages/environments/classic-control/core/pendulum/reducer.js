const types = require('./types');

const initialState = {
  theta: 0,
  angularVelocity: 0,
};

module.exports = (constants) => {
  const {
    mass, g, length, mu, dt,
  } = constants;
  const torqueFromGravity = state => -mass * g * length * Math.sin(state.theta);
  const torqueFromFriction = state => -mu * state.angularVelocity;

  return (state = initialState, action) => {
    if (action.type === types.torque) {
      const torqueFromAgent = action.payload;
      const angularAcceleration = (torqueFromAgent
          + torqueFromGravity(state)
          + torqueFromFriction(state))
        / (mass * length * length);
      const angularVelocity = state.angularVelocity + angularAcceleration * dt;
      const theta = state.theta + angularVelocity * dt;

      return {
        theta,
        angularVelocity,
      };
    }

    return state;
  };
};
