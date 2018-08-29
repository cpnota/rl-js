const MdpFactory = require('@rl-js/redux-mdp');
const DiscreteEnvironmentFactory = require('@rl-js/configuration/environment-types/discrete');
const createReducer = require('./reducer');
const configureIsTerminated = require('./terminal');
const defaultConstants = require('./constants');
const configureObservations = require('./observations');
const resolveAction = require('./resolve-action');
const actions = require('./types');

class AcrobotFactory extends DiscreteEnvironmentFactory {
  constructor(constants = {}) {
    super();

    const config = Object.assign({}, defaultConstants, constants);

    this.mdpFactory = new MdpFactory({
      reducer: createReducer(config),
      getObservation: configureObservations(config),
      computeReward: () => -1,
      isTerminated: configureIsTerminated(config),
      resolveAction,
    });

    this.actions = actions;
    this.observationCount = 6;
  }

  createEnvironment() {
    return this.mdpFactory.createEnvironment();
  }

  getActions() {
    return this.actions;
  }

  getObservationCount() {
    return this.observationCount;
  }

  getMdpFactory() {
    return this.mdpFactory;
  }
}

module.exports = AcrobotFactory;
