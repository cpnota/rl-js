const {
  Agent,
  StateValueFunction,
  Policy,
} = require('@rl-js/interfaces');
const checkInterface = require('check-interface');

// Two-layer Dense Coagent Network
module.exports = class GlobalCriticCoagents extends Agent {
  constructor({
    stateValueFunction,
    inputLayer,
    outputNode,
  }) {
    super();
    this.stateValueFunction = checkInterface(
      stateValueFunction,
      StateValueFunction,
    );
    this.inputLayer = inputLayer.map(node => checkInterface(node, Policy));
    this.outputNode = checkInterface(outputNode, Policy);
  }

  newEpisode(environment) {
    this.environment = environment;
    this.state = environment.getObservation();
  }

  act() {
    this.inputLayerActions = this.inputLayer.map(inputLayer => inputLayer.chooseAction(this.state));
    this.action = this.outputNode.chooseAction(this.inputLayerActions);
    this.environment.dispatch(this.action);
    this.nextState = this.environment.getObservation();
    this.update();
    this.state = this.nextState;
  }

  update() {
    const tdError = this.getTdError();
    this.stateValueFunction.update(this.state, tdError);
    for (let i = 0; i < this.inputLayerActions.length; i += 1) {
      this.inputLayer[i].update(this.state, this.inputLayerActions[i], tdError);
    }
    this.outputNode.update(this.inputLayerActions, this.action, tdError);
  }

  getTdError() {
    return this.environment.isTerminated()
      ? this.environment.getReward() - this.stateValueFunction.call(this.state)
      : (this.environment.getReward()
        + this.stateValueFunction.call(this.nextState)
        - this.stateValueFunction.call(this.state)
      );
  }
};
