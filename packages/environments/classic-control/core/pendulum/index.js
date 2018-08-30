// https://homes.cs.washington.edu/~todorov/courses/amath579/reading/Continuous.pdf
const MdpFactory = require('@rl-js/redux-mdp');
const ContinuousEnvironmentFactory = require('@rl-js/configuration/environment-types/continuous');
const reducer = require('./reducer');
const actions = require('./types');
const defaultConstants = require('./constants');
const terminated = require('./terminated');
const getObservation = require('./get-observation');

const bound = (min, max) => value => Math.min(Math.max(value, min), max);
const boundTorque = bound(-5, 5);

const resolveAction = (state, action) => ({
  type: actions.torque,
  payload: boundTorque(action),
});

class PendulumFactory extends ContinuousEnvironmentFactory {
  constructor(constants = {}) {
    super();
    const config = Object.assign({}, defaultConstants, constants);
    this.mdpFactory = new MdpFactory({
      reducer: reducer(config),
      resolveAction,
      computeReward: (state, action, nextState) => -Math.cos(nextState.theta),
      isTerminated: terminated(config),
      getObservation,
    });
  }

  createEnvironment() {
    return this.mdpFactory.createEnvironment();
  }

  getActionRange() {
    return [-5, 5];
  }

  getObservationCount() {
    return 2;
  }
}

module.exports = PendulumFactory;
