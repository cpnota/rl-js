const math = require('mathjs');

module.exports = class ProximalPolicyOptimization {
  constructor({
    policy, stateValueFunction, epsilon, batchStrategy, optimizer, lambda = 1, gamma = 1,
  }) {
    this.policy = policy;
    this.v = stateValueFunction;
    this.epsilon = epsilon;
    this.batchStrategy = batchStrategy;
    this.history = [];
    this.optimizer = optimizer;
    this.lambda = lambda;
    this.gamma = gamma;
  }

  newEpisode(environment) {
    this.environment = environment;
  }

  act() {
    const state = this.environment.getObservation();
    const action = this.policy.chooseAction(state);
    const actionProbability = this.policy.probability(state, action);
    this.environment.dispatch(action);
    const reward = this.environment.getReward();
    const terminal = this.environment.isTerminated();

    this.history.push({
      state, action, reward, terminal, actionProbability,
    });

    if (this.batchStrategy.shouldUpdate(this.history)) {
      this.update();
      this.history = [];
    }
  }

  update() {
    this.updateValueFunction();
    this.computeAdvantages();
    this.optimizePolicy();
  }

  updateValueFunction() {
    this.history.forEach(({ state, reward, terminal }, t) => {
      const estimate = this.v.call(state);

      if (!terminal && !this.history[t + 1]) {
        return; // cannot compute tdError
      }

      const nextEstimate = terminal ? 0 : this.v.call(this.history[t + 1].state);
      const tdError = reward + this.getGamma() * nextEstimate - estimate;
      this.v.update(state, tdError);
    });
  }

  computeAdvantages() {
    this.computeBaselines();
    this.computeTdErrors();

    const discountRate = this.getGamma() * this.getLambda();

    // compute the advantage from the initial state
    // and then use this computation to iteratively
    // compute the computation for the rest of the states.
    // This is 2n instead of n^2
    let advantage = this.history.reduce((discountedSum, { tdError = 0 }, t) => (
      discountedSum + tdError * (discountRate ** t)), 0);

    this.history.forEach((step) => {
      step.advantage = advantage; // eslint-disable-line no-param-reassign
      advantage = (advantage - step.tdError) ** (1 / discountRate);
    });
  }

  optimizePolicy() {
    const samples = this.history;
    const computeGradient = sample => this.getSampleGradient(sample);
    const update = direction => this.policy.updateParameters(direction);
    this.optimizer.optimize({
      samples,
      computeGradient,
      update,
    });
  }

  computeBaselines() {
    this.history.forEach((step) => {
      step.baseline = this.v.call(step.state); // eslint-disable-line no-param-reassign
    });
  }

  computeTdErrors() {
    this.history.forEach((step, t) => {
      const { state, reward, terminal } = step;
      const estimate = this.v.call(state);

      if (!terminal && !this.history[t + 1]) {
        return; // cannot compute tdError
      }

      const nextEstimate = terminal ? 0 : this.v.call(this.history[t + 1].state);
      /* eslint-disable-next-line no-param-reassign */
      step.tdError = reward + this.getGamma() * nextEstimate - estimate;
    });
  }

  getSampleGradient({
    state, action, advantage, actionProbability,
  }) {
    const importanceWeight = this.policy.probability(state, action) / actionProbability;

    return this.shouldClip(importanceWeight, advantage)
      ? 0
      : math.multiply(
        this.policy.gradient(state, action),
        1 / actionProbability,
        advantage,
      );
  }

  shouldClip(importanceWeight, advantage) {
    const clippedWeight = this.clip(importanceWeight);
    if (clippedWeight !== importanceWeight) {
      const normal = importanceWeight * advantage;
      const clipped = clippedWeight * advantage;
      return clipped < normal;
    }
    return false;
  }

  clip(importanceWeight) {
    return Math.min(
      1 + this.epsilon,
      Math.max(1 - this.epsilon, importanceWeight),
    );
  }

  getGamma() {
    return this.gamma;
  }

  getLambda() {
    return this.lambda;
  }
};
