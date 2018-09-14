const Agent = require('@rl-js/interfaces/agent');

module.exports = class Simple extends Agent {
  constructor({ policy }) {
    super();
    this.policy = policy;
  }

  newEpisode(environment) {
    this.environment = environment;
  }

  act() {
    const state = this.environment.getState();
    const action = this.policy.chooseAction(state);
    this.environment.dispatch(action);
  }
};
