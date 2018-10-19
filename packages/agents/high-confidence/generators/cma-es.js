const check = require('check-types');
const math = require('mathjs');
const gaussian = require('gaussian');

class CMA_ES {
  constructor({
    std,
    populationSize,
    alpha,
    evaluator,
    policy,
  }) {
    this.std = check.assert.number(std);
    this.populationSize = check.assert.number(populationSize);
    this.alpha = alpha;
    this.evaluator = evaluator;
    this.policy = policy;
    this.evaluate = this.evaluate.bind(this);
    this.parameters = this.policy.getParameters();
  }

  generateCandidate(trajectories) {
    this.parameters = this.policy.getParameters();
    this.trajectories = trajectories;
    const population = this.generatePopulation();
    const scores = population.map(this.evaluate);
    const parameters = this.parameters.map((parameterValue, parameterIndex) => (
      parameterValue + this.alpha / this.std * math.mean(population.map(
        (epsilons, i) => scores[i] * epsilons[parameterIndex],
      ))));
    this.policy.setParameters(this.parameters);
    return parameters;
  }

  generatePopulation() {
    const distribution = gaussian(0, 1);
    const population = [];

    // mirror each perturbation
    for (let p = 0; p < this.populationSize; p += 2) {
      const epsilons1 = this.parameters.map(() => distribution.ppf(Math.random()));
      const epsilons2 = epsilons1.map(e => -e);
      population.push(epsilons1, epsilons2);
    }

    return population;
  }

  evaluate(epsilons) {
    const parameters = this.parameters.map((parameter, i) => parameter + this.std * epsilons[i]);
    this.policy.setParameters(parameters);
    return this.evaluator({ trajectories: this.trajectories, policy: this.policy });
  }
}

module.exports = CMA_ES;
