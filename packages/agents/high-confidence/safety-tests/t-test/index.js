/* eslint-disable camelcase */
const math = require('mathjs');
const t_inv = require('./t-inv');

module.exports = class T_Test {
  constructor({
    delta,
    evaluator,
  }) {
    this.delta = delta;
    this.evaluator = evaluator;
  }

  run({
    current,
    candidate,
    policy,
    trajectories,
  }) {
    const { evaluator, delta } = this;
    const m = trajectories.length;

    policy.setParameters(candidate);
    const candidateScores = evaluator({ trajectories, policy });
    policy.setParameters(current);
    const currentScores = evaluator({ trajectories, policy });

    // perform one-sided t-test on the difference
    const differences = math.subtract(candidateScores, currentScores);
    const mean = math.mean(differences);
    const std = math.std(differences);
    const t = t_inv(1 - delta, m - 1);
    const score = mean + std / math.sqrt(m) * t;

    return score > 0;
  }
};
