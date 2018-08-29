// https://homes.cs.washington.edu/~todorov/courses/amath579/reading/Continuous.pdf
const MdpFactory = require('@rl-js/redux-mdp');
const DiscreteEnvironmentFactory = require('@rl-js/configuration/environment-types/discrete');
const createReducer = require('./reducer');
const isTerminated = require('./termination');
const defaultConstants = require('./constants');
const getObservation = require('./get-observation');
const actions = require('./types');

/* eslint-disable class-methods-use-this */
class CartPoleFactory extends DiscreteEnvironmentFactory {
  constructor(constants = {}) {
    super();

    const config = Object.assign({}, defaultConstants, constants);

    this.mdpFactory = new MdpFactory({
      reducer: createReducer(config),
      getObservation,
      computeReward: () => 1,
      isTerminated,
    });
  }

  createEnvironment() {
    return this.mdpFactory.createEnvironment();
  }

  getActions() {
    return actions;
  }

  getObservationCount() {
    return 4;
  }

  getMdpFactory() {
    return this.mdpFactory;
  }
}

module.exports = CartPoleFactory;
