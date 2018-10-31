const {
  Agent,
  ActionTraces,
  ActionValueFunction,
  Policy,
  PolicyTraces,
} = require('@rl-js/interfaces');
const checkInterface = require('check-interface');
const check = require('check-types');

module.exports = class ActorCritic extends Agent {
  constructor({
    actionValueFunction,
    actionTraces,
    policy,
    policyTraces,
    lambda,
    gamma = 1,
  }) {
    super();
    this.actionValueFunction = checkInterface(
      actionValueFunction,
      ActionValueFunction,
    );
    this.actionTraces = checkInterface(actionTraces, ActionTraces);
    this.policy = checkInterface(policy, Policy);
    this.policyTraces = checkInterface(policyTraces, PolicyTraces);
    this.lambda = check.assert.number(lambda);
    this.gamma = check.assert.number(gamma);
  }

  newEpisode(environment) {
    this.environment = environment;
    this.actionTraces.reset();
    this.policyTraces.reset();
    this.nextState = environment.getObservation();
    this.nextAction = this.policy.chooseAction(this.nextState);
    // /* initialize so that first action can be compare against something */
    this.initialUpdate();
  }

  act() {
    this.state = this.nextState;
    this.action = this.nextAction;
    this.environment.dispatch(this.action);

    if (!this.environment.isTerminated()) {
      this.nextState = this.environment.getObservation();
      this.nextAction = this.policy.chooseAction(this.nextState);
    }

    this.update();
  }

  update() {
    const tdError = this.getTdError();

    this.actionTraces.record(this.state, this.action);
    this.actionTraces.update(tdError);
    this.actionTraces.decay(this.lambda * this.getGamma());

    if (!this.environment.isTerminated()) {
      this.policyTraces.record(this.nextState, this.nextAction);
      this.policyTraces.update(tdError);
      this.policyTraces.decay(this.lambda * this.getGamma());
    }
  }

  getTdError() {
    const nextEstimate = this.environment.isTerminated()
      ? 0
      : this.getGamma() * this.actionValueFunction.call(this.nextState, this.nextAction);
    return (
      this.environment.getReward()
      + nextEstimate
      - this.actionValueFunction.call(this.state, this.action)
    );
  }

  // special update rule for first actions
  initialUpdate() {
    const action = this.policy.chooseAction(this.nextState);
    const advantage = this.actionValueFunction.call(this.nextState, this.nextAction)
      - this.actionValueFunction.call(this.nextState, action);
    this.policyTraces.record(this.nextState, this.action);
    this.policyTraces.update(advantage);
    this.policyTraces.decay(this.lambda * this.getGamma());
  }

  getGamma() {
    return this.gamma;
  }
};
