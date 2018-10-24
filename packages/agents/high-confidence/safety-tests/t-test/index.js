/* eslint-disable camelcase */
const math = require('@rl-js/math');
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
    const differences = math.vector.subtract(candidateScores, currentScores);
    const [mean, std] = math.stats.gaussian(differences);
    const t = t_inv(1 - delta, m - 1);
    const score = mean - std / Math.sqrt(m) * t;

    return score > 0;
  }
};
