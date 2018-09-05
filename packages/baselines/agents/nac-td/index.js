const math = require('mathjs');
const LinearFunctionApproximator = require('@rl-js/baseline-function-approximators/generic/linear/');
const CompatibleBasis = require('./compatible-basis');
const {
  StateValueFunction,
  StateTraces,
  Agent,
  Environment,
  Policy,
} = require('@rl-js/interfaces');
const checkInterface = require('check-interface');
const check = require('check-types');

/* eslint-disable camelcase */
module.exports = class NAC_TD {
  constructor({
    alpha_w,
    createAdvantageTraces,
    lambda,
    policy,
    stateValueFunction,
    stateTraces,
    update_frequency,
    gamma = 1,
  }) {
    this.alpha_w = check.assert.number(alpha_w);
    this.gamma = check.assert.number(gamma);
    this.lambda = check.assert.number(lambda);
    this.policy = checkInterface(policy, Policy);
    this.stateValueFunction = checkInterface(stateValueFunction, StateValueFunction);
    this.stateTraces = stateTraces;
    this.update_frequency = update_frequency;
    this.count = 0;

    this.advantageFunction = new LinearFunctionApproximator({
      alpha: alpha_w,
      basis: new CompatibleBasis(policy),
    });
    this.advantageTraces = createAdvantageTraces(this.advantageFunction);
  }

  newEpisode(environment) {
    this.environment = environment;
    this.stateTraces.reset();
    this.advantageTraces.reset();
  }

  act() {
    this.executePolicy();
    this.updateCritic();
    this.updateActor();
  }

  executePolicy() {
    this.state = this.environment.getState();
    this.action = this.policy.chooseAction(this.state);
    this.environment.dispatch(this.action);
    this.nextState = this.environment.getState();
  }

  updateCritic() {
    const tdError = this.getTDError();
    const decayFactor = this.getGamma() * this.lambda;

    const sampleAdvantage = tdError;
    const expectedAdvantage = this.advantageFunction.call([this.state, this.action]);
    const advantageError = sampleAdvantage - expectedAdvantage;

    this.advantageTraces.record([this.state, this.action]);
    this.advantageTraces.update(advantageError);
    this.advantageTraces.decay(decayFactor);

    this.stateTraces.record(this.state);
    this.stateTraces.update(tdError);
    this.stateTraces.decay(decayFactor);
  }

  updateActor() {
    this.count += 1;
    if (this.count === this.update_frequency) {
      const weights = this.advantageFunction.getParameters();
      this.policy.updateParameters(weights);
      this.count = 0;
    }
  }

  getTDError() {
    const reward = this.environment.getReward();

    return this.environment.isTerminated()
      ? reward - this.stateValueFunction.call(this.state)
      : reward
        + this.getGamma() * this.stateValueFunction.call(this.nextState)
        - this.stateValueFunction.call(this.state);
  }

  getGamma() {
    return this.gamma;
  }
};
