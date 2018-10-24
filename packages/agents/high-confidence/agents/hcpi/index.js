const {
  Agent,
  Policy,
} = require('@rl-js/interfaces');
const checkInterface = require('check-interface');

module.exports = class HCPI extends Agent {
  constructor({
    policy,
    generator,
    episodesPerUpdate,
    safetyTest,
    dataSplit, // amount of data in train set
  }) {
    super();
    this.policy = checkInterface(policy, Policy);
    this.generator = generator;
    this.safetyTest = safetyTest;
    this.episodesPerUpdate = episodesPerUpdate;
    this.train = [];
    this.test = [];
    this.count = 0;
    this.dataSplit = dataSplit;
  }

  newEpisode(environment) {
    this.environment = environment;

    if (this.history) {
      this.record(this.history);
    }

    if (this.shouldUpdate()) this.tryUpdate();
    this.count += 1;
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

  record(history) {
    if (Math.random() < this.dataSplit) {
      this.train.push(history);
    } else {
      this.test.push(history);
    }
  }

  shouldUpdate() {
    return this.train.length > 0 && this.test.length > 0 && (this.count >= this.episodesPerUpdate);
  }

  tryUpdate() {
    // const oldScore = this.evaluator({ policy: this.policy, trajectories: this.trajectories });
    const candidate = this.generator.generateCandidate(this.train);

    if (candidate != null) {
      const current = this.policy.getParameters();
      const candidateIsSafe = this.safetyTest.run({
        candidate, current, policy: this.policy, trajectories: this.test,
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
