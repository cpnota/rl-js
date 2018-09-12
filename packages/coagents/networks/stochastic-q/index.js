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
    inputV,
    inputQ,
    outputNode,
    outputV,
    outputQ,
  }) {
    super();
    this.inputLayer = inputLayer.map(node => checkInterface(node, Policy));
    this.inputV = checkInterface(inputV, StateValueFunction);
    this.inputQ = checkInterface(inputQ, StateValueFunction);
    this.outputNode = checkInterface(outputNode, Policy);
    this.outputV = checkInterface(outputV, StateValueFunction);
    this.outputQ = checkInterface(outputQ, StateValueFunction);
  }

  newEpisode(environment) {
    this.environment = environment;
    this.state = environment.getObservation();
    this.actions = this.inputLayer.map(inputLayer => inputLayer.chooseAction(this.state));
    this.action = this.outputNode.chooseAction(this.actions);
  }

  act() {
    this.environment.dispatch(this.action);
    this.nextState = this.environment.getObservation();
    this.nextActions = this.inputLayer.map(inputLayer => inputLayer.chooseAction(this.nextState));
    this.nextAction = this.outputNode.chooseAction(this.nextActions);
    this.update();
    this.state = this.nextState;
    this.actions = this.nextActions;
    this.action = this.nextAction;
  }

  update() {
    this.updateActors();
    this.updateVs();
    this.updateQs();
  }

  updateActors() {
    const inputAdvantage = this.inputQ.call(this.state.concat(this.actions))
      - this.inputV.call(this.state);
    this.inputLayer.map((policy, i) => policy.update(this.state, this.actions[i], inputAdvantage));
    const outputAdvantage = this.outputQ.call(this.actions, this.action)
      - this.outputV.call(this.actions);
    this.outputNode.update(this.actions, this.action, outputAdvantage);
  }

  updateVs() {
    const inputTdError = this.getTdError(this.inputV, this.state, this.nextState);
    this.inputV.update(this.state, inputTdError);
    const outputTdError = this.getTdError(this.outputV, this.actions, this.nextActions);
    this.outputV.update(this.actions, outputTdError);
  }

  updateQs() {
    const inputTdError = this.getTdError(
      this.inputQ,
      this.state.concat(this.actions),
      this.nextState.concat(this.nextActions),
    );
    this.inputQ.update(this.state.concat(this.actions), inputTdError);

    const outputTdError = this.environment.isTerminated()
      ? this.environment.getReward() - this.outputQ.call(this.actions, this.action)
      : (this.environment.getReward()
      + this.outputQ.call(this.nextActions, this.nextAction)
      - this.outputQ.call(this.actions, this.action)
      );
    this.outputQ.update(this.actions, this.action, outputTdError);
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
