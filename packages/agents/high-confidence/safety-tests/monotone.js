const math = require('@rl-js/math');

module.exports = class MonotoneSafetyTest {
  constructor({ evaluator }) {
    this.evaluator = evaluator;
  }

  run({
    current,
    candidate,
    policy,
    trajectories,
  }) {
    policy.setParameters(current);
    const currentScore = math.stats.mean(this.evaluator({ trajectories, policy }));
    policy.setParameters(candidate);
    const candidateScore = math.stats.mean(this.evaluator({ trajectories, policy }));
    return candidateScore > currentScore;
  }
};
