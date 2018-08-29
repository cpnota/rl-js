const MdpFactory = require('@rl-js/redux-mdp');
const reducer = require('./reducer');
const resolveAction = require('./resolve-action');
const getState = require('./get-state');

class MountainCarFactory extends MdpFactory {
  constructor() {
    /* eslint-disable no-unreachable */
    throw new Error('continuous actions not supported yet');
    super(
      new MdpFactory({
        reducer,
        resolveAction,
        getObservation: getState,
        computeReward: () => -1,
        isTerminated: (state, action, nextState, time) => nextState.position >= 0.5 || time >= 20000,
      }),
    );
  }
}

module.exports = MountainCarFactory;
