const createDynamics = require('./dynamics');
const types = require('../types');

const initialState = {
  x: 0,
  velocity: 0,
  theta: 0, // TODO randomize?
  angularVelocity: 0,
};

module.exports = (constants) => {
  const { dt, forceMagnitude } = constants;
  const dynamics = createDynamics(constants);

  return (state = initialState, action) => {
    if (action.type === types.left || action.type === types.right) {
      const force = action.type === types.left ? -forceMagnitude : forceMagnitude;
      const angularAcceleration = dynamics.getAngularAcceleration(
        Object.assign({}, state, { force }),
      );
      const angularVelocity = state.angularVelocity + angularAcceleration * dt;
      const theta = state.theta + angularVelocity * dt;
      const acceleration = dynamics.getAcceleration(
        Object.assign({}, state, { force, angularAcceleration }),
      );
      const velocity = state.velocity + acceleration * dt;
      const x = state.x + velocity * dt;

      return {
        x,
        velocity,
        theta,
        angularVelocity,
      };
    }

    return state;
  };
};
