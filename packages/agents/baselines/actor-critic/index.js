const {
  Agent,
  StateTraces,
  StateValueFunction,
  Policy,
  PolicyTraces,
} = require('@rl-js/interfaces');
const checkInterface = require('check-interface');
const check = require('check-types');

module.exports = class ActorCritic extends Agent {
  constructor({
    stateValueFunction,
    stateTraces,
    stochasticPolicy,
    policyTraces,
    lambda,
    gamma = 1,
  }) {
    super();
    this.stateValueFunction = checkInterface(
      stateValueFunction,
      StateValueFunction,
    );
    this.stateTraces = checkInterface(stateTraces, StateTraces);
    this.policy = checkInterface(stochasticPolicy, Policy);
    this.policyTraces = checkInterface(policyTraces, PolicyTraces);
    this.lambda = check.assert.number(lambda);
    this.gamma = check.assert.number(gamma);
  }

  newEpisode(environment) {
    this.environment = environment;
    this.state = environment.getObservation();
    this.stateTraces.reset();
    this.policyTraces.reset();
  }

  act() {
    this.action = this.policy.chooseAction(this.state);
    this.environment.dispatch(this.action);
    this.nextState = this.environment.getObservation();
    this.update();
    this.state = this.nextState;
  }

  update() {
    const tdError = this.getTdError();

    this.stateTraces.record(this.state);
    this.stateTraces.update(tdError);
    this.stateTraces.decay(this.lambda * this.getGamma());

    this.policyTraces.record(this.state, this.action);
    this.policyTraces.update(tdError);
    this.policyTraces.decay(this.lambda * this.getGamma());
  }

  getTdError() {
    const nextEstimate = this.environment.isTerminated()
      ? 0
      : this.getGamma() * this.stateValueFunction.call(this.nextState);
    return (
      this.environment.getReward()
      + nextEstimate
      - this.stateValueFunction.call(this.state)
    );
  }

  getGamma() {
    return this.gamma;
  }
};
