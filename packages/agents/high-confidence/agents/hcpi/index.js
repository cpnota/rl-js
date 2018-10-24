const {
  Agent,
  Policy,
} = require('@rl-js/interfaces');
const gaussian = require('gaussian');
const checkInterface = require('check-interface');
const check = require('check-types');
const math = require('mathjs');

module.exports = class HCPI extends Agent {
  constructor({
    policy,
    std,
    populationSize,
    alpha,
    episodesPerUpdate,
    evaluator,
  }) {
    super();
    this.policy = checkInterface(policy, Policy);
    this.parameters = this.policy.getParameters();
    this.std = check.assert.number(std);
    this.populationSize = check.assert.number(populationSize);
    this.alpha = alpha;
    this.evaluator = evaluator;
    this.episodesPerUpdate = episodesPerUpdate;
    this.evaluate = this.evaluate.bind(this);
    this.trajectories = [];
  }

  newEpisode(environment) {
    this.environment = environment;
    if (this.history) this.trajectories.push(this.history);
    if (this.shouldTryUpdate()) this.tryUpdate();
    this.history = [];
  }

  act() {
    const state = this.environment.getObservation();
    const action = this.policy.chooseAction(state);
    this.environment.dispatch(action);
    const reward = this.environment.getReward();

    this.history.push({
      state,
      action,
      reward,
      probability: this.policy.probability(state, action),
    });
  }

  shouldUpdate() {
    return this.trajectories.length >= this.episodesPerUpdate;
  }

  tryUpdate() {
    const candidate = this.generateCandidate();

    const oldParameters = this.policy.getParameters();
    const oldScore = this.evaluator({ policy: this.policy, trajectories: this.trajectories });
    this.policy.setParameters(candidate);
    const candidateScore = this.evaluator({ policy: this.policy, trajectories: this.trajectories });

    if (candidateScore < oldScore) {
      this.policy.setParameters(oldParameters); // failed
    }
  }

  generateCandidate() {
    const population = this.generatePopulation();
    const scores = population.map(this.evaluate);
    this.parameters = this.parameters.map((parameterValue, parameterIndex) => (
      parameterValue + this.alpha / this.std * math.mean(population.map(
        (epsilons, i) => scores[i] * epsilons[parameterIndex],
      ))));
    return this.parameters;
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
};
