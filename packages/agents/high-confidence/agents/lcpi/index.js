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
    evaluator,
  }) {
    super();
    this.policy = checkInterface(policy, Policy);
    this.generator = generator;
    this.evaluator = evaluator;
    this.episodesPerUpdate = episodesPerUpdate;
    this.trajectories = [];
  }

  newEpisode(environment) {
    this.environment = environment;
    if (this.history) this.trajectories.push(this.history);
    if (this.shouldUpdate()) this.tryUpdate();
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
    const oldParameters = this.policy.getParameters();
    const oldScore = this.evaluator({ policy: this.policy, trajectories: this.trajectories });

    const candidate = this.generator.generateCandidate(this.trajectories);
    this.policy.setParameters(candidate);
    const candidateScore = this.evaluator({ policy: this.policy, trajectories: this.trajectories });

    if (candidateScore < oldScore) {
      this.policy.setParameters(oldParameters); // failed
    }
  }
};
