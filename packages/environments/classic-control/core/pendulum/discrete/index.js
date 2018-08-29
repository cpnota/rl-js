// https://homes.cs.washington.edu/~todorov/courses/amath579/reading/Continuous.pdf
const MdpFactory = require('@rl-js/redux-mdp');
const DiscreteEnvironmentFactory = require('@rl-js/configuration/environment-types/discrete');
const reducer = require('../reducer');
const defaultConstants = require('../constants');
const terminated = require('../terminated');
const resolveAction = require('./resolve-action');
const getObservation = require('../get-observation');
const actions = require('./types');

/* eslint-disable class-methods-use-this */
class DiscretePendulumFactory extends DiscreteEnvironmentFactory {
  constructor(constants = {}) {
    super();

    const config = Object.assign({}, defaultConstants, constants);

    this.mdpFactory = new MdpFactory({
      reducer: reducer(config),
      getObservation,
      computeReward: (state, action, nextState) => -Math.cos(nextState.theta),
      isTerminated: terminated(config),
      resolveAction,
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

module.exports = DiscretePendulumFactory;
