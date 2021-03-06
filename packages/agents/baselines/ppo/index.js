const { vector } = require('@rl-js/math');

const {
  Agent,
  StateValueFunction,
  Policy,
} = require('@rl-js/interfaces');
const checkInterface = require('check-interface');
const check = require('check-types');
const BatchStrategy = require('./batch-strategies');
const Optimizer = require('./optimizers');

module.exports = class ProximalPolicyOptimization extends Agent {
  constructor({
    batchStrategy,
    epsilon,
    gamma = 1,
    optimizer,
    policy,
    stateValueFunction,
  }) {
    super();
    this.batchStrategy = checkInterface(batchStrategy, BatchStrategy);
    this.epsilon = check.assert.number(epsilon);
    this.gamma = check.assert.number(gamma);
    this.optimizer = checkInterface(optimizer, Optimizer);
    this.policy = checkInterface(policy, Policy);
    this.v = checkInterface(stateValueFunction, StateValueFunction);

    this.history = [];
  }

  newEpisode(environment) {
    this.environment = environment;
  }

  act() {
    const state = this.environment.getObservation();
    const action = this.policy.chooseAction(state);
    this.environment.dispatch(action);
    const reward = this.environment.getReward();
    const terminal = this.environment.isTerminated();

    this.history.push({
      state,
      action,
      reward,
      terminal,
      actionProbability: this.policy.probability(state, action),
      value: this.v.call(state),
    });

    if (this.batchStrategy.shouldUpdate(this.history)) {
      this.update();
      this.history = [];
    }
  }

  update() {
    this.computeTdErrors();
    this.computeAdvantages();
    this.optimizeValueFunction();
    this.optimizePolicy();
  }

  computeTdErrors() {
    this.history.forEach((step, t) => {
      if (step.terminal || !this.history[t + 1]) {
        return;
      }

      const {
        reward, value,
      } = step;

      const {
        terminal, value: nextValue,
      } = this.history[t + 1];

      step.tdError = terminal // eslint-disable-line no-param-reassign
        ? reward - value
        : reward + this.getGamma() * nextValue - value;
    });
  }

  computeAdvantages() {
    const gamma = this.getGamma();

    const episodes = this.history.reduce((eps, step) => {
      eps[eps.length - 1].push(step);
      if (step.terminal) {
        eps.push([]);
      }
      return eps;
    }, [[]]);

    episodes.forEach((episode) => {
      // compute the advantage from the initial state
      // and then use this computation to iteratively
      // compute the computation for the rest of the states.
      // This is 2n instead of n^2
      let advantage = episode.reduce((discountedSum, { tdError = 0 }, t) => (
        discountedSum + tdError * (gamma ** t)), 0);

      episode.forEach((step) => {
        step.advantage = advantage; // eslint-disable-line no-param-reassign
        advantage = (advantage - step.tdError) ** (1 / gamma);
      });
    });
  }

  optimizeValueFunction() {
    this.history.forEach(({ state, tdError }) => {
      if (tdError == null) return;
      this.v.update(state, tdError);
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

  getSampleGradient({
    state, action, advantage, actionProbability,
  }) {
    const importanceWeight = this.policy.probability(state, action) / actionProbability;

    return this.shouldClip(importanceWeight, advantage)
      ? 0
      : vector.scale(
        advantage / actionProbability,
        this.policy.gradient(state, action),
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
};
