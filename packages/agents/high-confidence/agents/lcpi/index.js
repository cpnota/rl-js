const {
  Agent,
  Policy,
} = require('@rl-js/interfaces');
const checkInterface = require('check-interface');

module.exports = class LCPI extends Agent {
  constructor({
    policy,
    generator,
    episodesPerUpdate,
    safetyTest,
  }) {
    super();
    this.policy = checkInterface(policy, Policy);
    this.generator = generator;
    this.safetyTest = safetyTest;
    this.episodesPerUpdate = episodesPerUpdate;
    this.trajectories = [];
    this.count = 0;
  }

  newEpisode(environment) {
    this.environment = environment;
    if (this.history) this.trajectories.push(this.history);
    if (this.shouldUpdate()) this.tryUpdate();
    this.history = [];
    this.count += 1;
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
    return this.count >= this.episodesPerUpdate;
  }

  tryUpdate() {
    // const oldScore = this.evaluator({ policy: this.policy, trajectories: this.trajectories });
    const candidate = this.generator.generateCandidate(this.trajectories);

    if (candidate != null) {
      const current = this.policy.getParameters();
      const candidateIsSafe = this.safetyTest.run({
        candidate, current, policy: this.policy, trajectories: this.trajectories,
      });

      if (candidateIsSafe) {
        this.policy.setParameters(candidate);
      } else {
        this.policy.setParameters(current);
      }
    }

    this.count = 0;
  }
};
