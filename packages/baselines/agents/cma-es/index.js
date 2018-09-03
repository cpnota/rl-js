const {
  Agent,
  Policy,
} = require('@rl-js/interfaces');
const checkInterface = require('check-interface');
const check = require('check-types');

module.exports = class CMA_ES extends Agent {
  constructor({
    policy,
    std,
    population,
    gamma = 1,
  }) {
    super();
    this.policy = checkInterface(policy, Policy);
    this.std = check.assert.number(std);
    this.population = check.assert.number(population);
    this.gamma = check.assert.number(gamma);
    this.parameters = this.policy.getParameters();
  }

  newEpisode(environment) {
    this.environmnet = environment;
  }

  act() {
    this.action = this.policy.chooseAction(this.state);
    this.environment.dispatch(this.action);
  }
};
