const LinearFunctionApproximator = require('@rl-js/baseline-function-approximators/generic/linear/');
const {
  StateValueFunction,
  StateTraces,
  Policy,
} = require('@rl-js/interfaces');
const checkInterface = require('check-interface');
const check = require('check-types');
const CompatibleBasis = require('./compatible-basis');

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
    this.stateTraces = checkInterface(stateTraces, StateTraces);
    this.update_frequency = check.assert.number(update_frequency);
    this.count = 0;
    this.createAdvantageFunction(createAdvantageTraces);
  }

  newEpisode(environment) {
    this.environment = environment;
    this.stateTraces.reset();
    this.advantageTraces.reset();
    this.nextState = this.environment.getObservation();
  }

  act() {
    this.executePolicy();
    this.updateCritic();
    this.updateActor();
  }

  createAdvantageFunction(createAdvantageTraces) {
    this.advantageFunction = new LinearFunctionApproximator({
      alpha: this.alpha_w,
      basis: new CompatibleBasis(this.policy),
    });
    this.advantageTraces = createAdvantageTraces(this.advantageFunction);
  }

  executePolicy() {
    this.state = this.nextState;
    this.action = this.policy.chooseAction(this.state);
    this.environment.dispatch(this.action);
    this.nextState = this.environment.getObservation();
  }

  updateCritic() {
    const tdError = this.getTDError();
    const decayFactor = this.getGamma() * this.lambda;

    const sampleAdvantage = tdError;
    const expectedAdvantage = this.advantageFunction.call([this.state, this.action]);
    const advantageError = sampleAdvantage - expectedAdvantage;

    this.stateTraces.record(this.state);
    this.stateTraces.update(tdError);
    this.stateTraces.decay(decayFactor);

    this.advantageTraces.record([this.state, this.action]);
    this.advantageTraces.update(advantageError);
    this.advantageTraces.decay(decayFactor);
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
