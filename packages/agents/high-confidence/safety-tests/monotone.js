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
    const currentScore = this.evaluator({ trajectories, policy });
    policy.setParameters(candidate);
    const candidateScore = this.evaluator({ trajectories, policy });
    return candidateScore > currentScore;
  }
};
