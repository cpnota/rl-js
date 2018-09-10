const {
  Agent,
  StateValueFunction,
  Policy,
} = require('@rl-js/interfaces');
const checkInterface = require('check-interface');

// Two-layer Dense Coagent Network
module.exports = class LocalCriticCoagents extends Agent {
  constructor({
    inputLayer,
    inputCritic,
    outputNode,
    outputCritic,
  }) {
    super();
    this.inputLayer = inputLayer.map(node => checkInterface(node, Policy));
    this.inputCritic = checkInterface(inputCritic, StateValueFunction);
    this.outputNode = checkInterface(outputNode, Policy);
    this.outputCritic = checkInterface(outputCritic, StateValueFunction);
  }

  newEpisode(environment) {
    this.environment = environment;
    this.state = environment.getObservation();
    this.actions = this.inputLayer.map(inputLayer => inputLayer.chooseAction(this.state));
  }

  act() {
    this.action = this.outputNode.chooseAction(this.actions);
    this.environment.dispatch(this.action);
    this.nextState = this.environment.getObservation();
    this.nextActions = this.inputLayer.map(inputLayer => inputLayer.chooseAction(this.nextState));
    this.update();
    this.state = this.nextState;
    this.actions = this.nextActions;
  }

  update() {
    const inputTdError = this.getTdError(this.inputCritic, this.state, this.nextState);
    this.inputCritic.update(this.state, inputTdError);

    for (let i = 0; i < this.actions.length; i += 1) {
      this.inputLayer[i].update(this.state, this.actions[i], inputTdError);
    }

    const outputTdError = this.getTdError(this.outputCritic, this.actions, this.nextActions);
    this.outputCritic.update(this.actions, outputTdError);
    this.outputNode.update(this.actions, this.action, outputTdError);
  }

  getTdError(critic, state, nextState) {
    return this.environment.isTerminated()
      ? this.environment.getReward() - critic.call(state)
      : (this.environment.getReward()
        + critic.call(nextState)
        - critic.call(state)
      );
  }
};
