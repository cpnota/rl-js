const MdpFactory = require('@rl-js/redux-mdp');
const DiscreteEnvironmentFactory = require('@rl-js/configuration/environment-types/discrete');
const reducer = require('./reducer');
const isTerminated = require('./terminated');
const computeReward = require('./rewards');
const actions = require('./types');

const layout = [['s', 0, 0, 0, 0, 0, 0, 0, 0, 0, 'g']];

/* eslint-disable class-methods-use-this */
class ChainFactory extends DiscreteEnvironmentFactory {
  constructor() {
    super();

    this.mdpFactory = new MdpFactory({
      reducer,
      getObservation: state => [state / layout[0].length],
      computeReward,
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
    return 1;
  }

  getMdpFactory() {
    return this.mdpFactory;
  }
}

module.exports = ChainFactory;
