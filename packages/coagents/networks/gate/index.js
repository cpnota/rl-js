const {
  Agent,
  StateValueFunction,
  Policy,
} = require('@rl-js/interfaces');
const checkInterface = require('check-interface');

// Two-layer Dense Coagent Network
module.exports = class GateCoagent extends Agent {
  constructor({
    critic,
    policy,
    gate,
  }) {
    super();
    this.critic = checkInterface(
      critic,
      StateValueFunction,
    );
    this.policy = checkInterface(policy, Policy);
    this.gate = checkInterface(gate, Policy);
  }

  newEpisode(environment) {
    this.environment = environment;
    this.state = environment.getObservation();
    this.action = this.policy.chooseAction(this.state);
  }

  act() {
    this.gateAction = this.gate.chooseAction(this.state);
    if (this.gateAction) {
      this.action = this.policy.chooseAction(this.state);
    }
    this.environment.dispatch(this.action);
    this.nextState = this.environment.getObservation();
    this.update();
    this.state = this.nextState;
  }

  update() {
    const tdError = this.getTdError();
    this.critic.update(this.state, tdError);
    this.gate.update(this.state, this.gateAction, tdError);
    this.policy.update(this.state, this.action, tdError);
  }

  getTdError() {
    return this.environment.isTerminated()
      ? this.environment.getReward() - this.critic.call(this.state)
      : (this.environment.getReward()
        + this.critic.call(this.nextState)
        - this.critic.call(this.state)
      );
  }
};
