const MdpFactory = require('@rl-js/redux-mdp');
const DiscreteEnvironmentFactory = require('@rl-js/configuration/environment-types/discrete');
const configureReducer = require('./reducer');
const configureRewards = require('./rewards');
const configureStochasticActions = require('../stochastic-actions');
const configureTerminated = require('./terminated');
const getStateTabular = require('./get-state/tabular');
const actions = require('../types');

/* eslint-disable class-methods-use-this */
const gridworldFactory = ({
  layout,
  doNothingProbability = 0,
  wrongDirectionProbability = 0,
  waterPenalty = -10,
  goalReward = 10,
  timePenalty = 0, // add to reward at each time step
  getState = getStateTabular,
}) => class GridworldFactory extends DiscreteEnvironmentFactory {
  constructor() {
    super();

    const resolveAction = doNothingProbability || wrongDirectionProbability
      ? configureStochasticActions({
        doNothingProbability,
        wrongDirectionProbability,
      })
      : undefined; // use default

    this.mdpFactory = new MdpFactory({
      reducer: configureReducer(layout),
      computeReward: configureRewards({
        layout,
        waterPenalty,
        goalReward,
        timePenalty,
      }),
      resolveAction,
      isTerminated: configureTerminated(layout),
      getObservation: getState(layout),
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

  getStates() {
    const states = [];
    layout.forEach((row, y) => row.forEach((tile, x) => states.push(`${x}-${y}`)));
    return states;
  }

  getMdpFactory() {
    return this.mdpFactory;
  }
};

module.exports = gridworldFactory;
