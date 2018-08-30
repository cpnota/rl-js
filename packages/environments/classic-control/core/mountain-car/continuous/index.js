const MdpFactory = require('@rl-js/redux-mdp');
const ContinuousEnvironmentFactory = require('@rl-js/configuration/environment-types/continuous');
const reducer = require('./reducer');
const resolveAction = require('./resolve-action');
const getObservation = require('./get-state');

const TIMEOUT = 5000; // 20000 is a little long
const THROTTLE_RANGE = [-0.001, 0.001];

class MountainCarFactory extends ContinuousEnvironmentFactory {
  constructor() {
    super();

    this.mdpFactory = new MdpFactory({
      reducer,
      resolveAction: resolveAction(THROTTLE_RANGE),
      getObservation,
      computeReward: () => -1,
      isTerminated: (state, action, nextState, time) => (
        nextState.position >= 0.5 || time >= TIMEOUT
      ),
    });
  }

  createEnvironment() {
    return this.mdpFactory.createEnvironment();
  }

  getActionRange() {
    return THROTTLE_RANGE;
  }

  getObservationCount() {
    return 2;
  }

  getMdpFactory() {
    return this.mdpFactory;
  }
}

module.exports = MountainCarFactory;
