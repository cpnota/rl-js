const {
  Agent,
  Policy,
  StateValueFunction,
  StateTraces,
} = require('@rl-js/interfaces');
const checkInterface = require('check-interface');
const check = require('check-types');

module.exports = class Reinforce extends Agent {
  constructor({
    policy, stateValueFunction, stateTraces, lambda, gamma = 1,
  }) {
    super();
    this.policy = checkInterface(policy, Policy);
    this.stateValueFunction = checkInterface(
      stateValueFunction,
      StateValueFunction,
    );
    this.stateTraces = checkInterface(stateTraces, StateTraces);
    this.lambda = check.assert.number(lambda);
    this.gamma = check.assert.number(gamma);
  }

  newEpisode(environment) {
    this.stateTraces.reset();
    this.environment = environment;
    this.history = [];
  }

  act() {
    this.state = this.environment.getObservation();
    this.action = this.policy.chooseAction(this.state);
    this.environment.dispatch(this.action);

    this.history.push({
      state: this.state,
      action: this.action,
      reward: this.environment.getReward(),
    });

    this.updateBaseline();

    if (this.environment.isTerminated()) {
      this.updatePolicy();
    }
  }

  updateBaseline() {
    this.stateTraces.record(this.state);
    this.stateTraces.update(this.getTdError());
    this.stateTraces.decay(this.lambda);
  }

  getTdError() {
    const nextState = this.environment.getObservation();
    const nextEstimate = this.environment.isTerminated()
      ? 0
      : this.getGamma() * this.stateValueFunction.call(nextState);
    return (
      this.environment.getReward()
      + nextEstimate
      - this.stateValueFunction.call(this.state)
    );
  }

  updatePolicy() {
    const returns = this.computeReturns();
    this.history.forEach(({ state, action }, time) => {
      const error = returns[time] - this.stateValueFunction.call(state);
      this.policy.update(state, action, error);
    });
  }

  computeReturns() {
    const returns = [0];
    const gamma = this.getGamma();

    // compute returns at s_0
    this.history.forEach(({ reward }, time) => {
      returns[0] += gamma ** time * reward;
    });

    // compute rest in linear time
    for (let t = 0; t < this.history.length - 1; t++) {
      returns[t + 1] = (returns[t] - this.history[t].reward) / gamma;
    }

    return returns;
  }

  getGamma() {
    return this.gamma;
  }
};
