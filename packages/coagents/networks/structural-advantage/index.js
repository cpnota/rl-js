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
    const output = this.state.concat(this.actions);
    const outputValue = this.outputCritic.call(output);
    const inputAdvantage = outputValue - this.inputCritic.call(this.state);
    const outputAdvantage = this.environment.isTerminated()
      ? this.environment.getReward() - outputValue
      : this.environment.getReward() + this.inputCritic.call(this.nextState) - outputValue;

    for (let i = 0; i < this.actions.length; i += 1) {
      this.inputLayer[i].update(this.state, this.actions[i], inputAdvantage);
    }

    this.outputNode.update(this.actions, this.action, outputAdvantage);
    this.inputCritic.update(this.state, inputAdvantage);
    this.outputCritic.update(output, outputAdvantage);
  }
};
