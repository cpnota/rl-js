const {
  Agent,
  StateValueFunction,
  Policy,
} = require('@rl-js/interfaces');
const checkInterface = require('check-interface');

module.exports = class ActorCritic extends Agent {
  constructor({
    globalCritic,
    actorPolicy,
    criticPolicy,
  }) {
    super();
    this.globalCritic = checkInterface(
      globalCritic,
      StateValueFunction,
    );
    this.actorPolicy = checkInterface(actorPolicy, Policy);
    this.criticPolicy = checkInterface(criticPolicy, Policy);
  }

  newEpisode(environment) {
    this.environment = environment;
    this.actorPolicy.setParameters(this.actorPolicy.getParameters().fill(0));
    this.state = environment.getObservation();
    this.critique = undefined;
  }

  act() {
    this.action = this.actorPolicy.chooseAction(this.state);
    this.environment.dispatch(this.action);
    this.nextState = this.environment.getObservation();
    this.updateCritic();
    this.critiqueActor();
    this.state = this.nextState;
  }

  critiqueActor() {
    this.critique = this.criticPolicy.chooseAction(this.state.concat(this.action));
    this.actorPolicy.update(this.state, this.action, this.critique);
  }

  updateCritic() {
    const tdError = this.getTdError();
    this.globalCritic.update(this.state, tdError);

    if (this.critique) {
      this.criticPolicy.update(this.state.concat(this.action), this.critique, tdError);
    }
  }

  getTdError() {
    const nextEstimate = this.environment.isTerminated()
      ? 0
      : this.globalCritic.call(this.nextState);
    return (
      this.environment.getReward()
      + nextEstimate
      - this.globalCritic.call(this.state)
    );
  }
};
