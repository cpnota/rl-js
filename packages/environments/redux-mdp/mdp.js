const Environment = require('@rl-js/interfaces/environment');

/**
 * Class representing in an Environment as an MDP using Redux.
 * @extends Environment
 */
class ReduxMDP extends Environment {
  constructor({ store, getObservation, gamma }) {
    super();
    this.store = store;
    this.getObservationFunc = getObservation;
    this.gamma = gamma;
  }

  dispatch(action) {
    return this.store.dispatch(action);
  }

  getObservation() {
    return this.getState();
  }

  getState() {
    return this.getObservationFunc(this.store.getState().environment);
  }

  getReward() {
    return this.store.getState().reward;
  }

  isTerminated() {
    return this.store.getState().terminated;
  }

  getTime() {
    return this.store.getState().time;
  }

  getStore() {
    return this.store;
  }
}

module.exports = ReduxMDP;
