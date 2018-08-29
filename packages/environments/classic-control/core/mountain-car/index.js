const MdpFactory = require('@rl-js/redux-mdp');
const DiscreteEnvironmentFactory = require('@rl-js/configuration/environment-types/discrete');
const reducer = require('./continuous/reducer');
const resolveAction = require('./resolve-action');
const getObservation = require('./continuous/get-state');
const actions = require('./types');

const TIMEOUT = 5000; // 20000 is a little long

class MountainCarFactory extends DiscreteEnvironmentFactory {
  constructor() {
    super();

    this.mdpFactory = new MdpFactory({
      reducer,
      resolveAction,
      getObservation,
      computeReward: () => -1,
      isTerminated: (state, action, nextState, time) => nextState.position >= 0.5 || time >= TIMEOUT,
    });
  }

  createEnvironment() {
    return this.mdpFactory.createEnvironment();
  }

  getActions() {
    return actions;
  }

  getObservationCount() {
    return 2;
  }

  getMdpFactory() {
    return this.mdpFactory;
  }
}

module.exports = MountainCarFactory;
