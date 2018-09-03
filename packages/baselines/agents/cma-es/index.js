const {
  Agent,
  Policy,
} = require('@rl-js/interfaces');
const checkInterface = require('check-interface');
const check = require('check-types');
const gaussian = require('gaussian');

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
    this.populationSize = check.assert.number(population);
    this.gamma = check.assert.number(gamma);
    this.parameters = this.policy.getParameters();
  }

  newEpisode(environment) {
    this.environment = environment;

    if (!this.population) {
      this.parameters = this.policy.getParameters();
      this.population = this.generatePopulation();
      this.returns = [];
    } else if (this.returns.length === this.population.length) {
      this.parameters = this.updateParameters();
      this.population = this.generatePopulation();
      this.returns = [];
    }

    this.policy.setParameters(this.nextParameters());
    this.returns.push(0);
  }

  act() {
    this.action = this.policy.chooseAction(this.environment.getObservation());
    this.environment.dispatch(this.action);
    this.returns[this.returns.length - 1] += this.environment.getReward();
  }

  generatePopulation() {
    const distribution = gaussian(0, this.std ** 2);
    const population = [];

    // mirror each peturbation
    for (let p = 0; p < this.populationSize; p += 2) {
      const epsilons1 = this.parameters.map(() => distribution.ppf(Math.random()));
      const epsilons2 = epsilons1.map(e => -e);
      population.push(epsilons1, epsilons2);
    }

    return population;
  }

  nextParameters() {
    const epsilons = this.population[this.returns.length];
    return this.parameters.map((parameter, i) => parameter + epsilons[i]);
  }

  updateParameters() {
    return this.parameters;
  }
};
