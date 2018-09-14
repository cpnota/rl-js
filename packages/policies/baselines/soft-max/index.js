const Policy = require('@rl-js/interfaces/policy');
const math = require('mathjs');
const { vector } = require('@rl-js/math');

class SoftMax extends Policy {
  constructor({
    createStateValueFunction,
    actions,
    alpha,
    stateValueFunctions,
  } = {}) {
    super();
    this.actions = Object.values(actions);
    this.alpha = alpha;
    this.createStateValueFunction = createStateValueFunction;
    this.stateValueFunctions = stateValueFunctions || {};
    this.actions.forEach(action => this.getStateValueFunction(action));
  }

  chooseAction(state) {
    const probabilities = this.getProbabilities(state);
    const selection = Math.random();

    let sum = 0;
    for (let i = 0; i < probabilities.length; i += 1) {
      const next = sum + probabilities[i];
      if (selection > sum && selection < next) return this.actions[i];
      sum = next;
    }
    throw new Error('no action found! Weights probably diverged.');
  }

  chooseBestAction() {
    throw new Error('TODO');
  }

  probability(state, action) {
    const actionIndex = this.actions.indexOf(action);
    if (actionIndex === -1) throw new Error(`Unknown action: ${action}`);
    const probabilities = this.getProbabilities(state);
    const result = probabilities[actionIndex];

    if (Number.isNaN(result)) {
      throw new Error(
        `Probability of ${action} was NaN. Weights probability diverged.`,
      );
    }

    return result;
  }

  update(state, action, error) {
    const derivative = this.gradient(state, action);
    return this.updateParameters(vector.scale(error, derivative));
  }

  gradient(state, a) {
    const probabilities = this.getProbabilities(state, this.weights);
    const result = [];

    this.actions.forEach((action, index) => {
      const probability = probabilities[index];
      const value = action === a ? 1 - probability : -probability;
      const gradient = this.getStateValueFunction(action).gradient(state);
      result.push(...vector.scale(value, gradient));
    });

    return result;
  }

  trueGradient(state, action) {
    return vector.scale(
      this.probability(state, action),
      this.gradient(state, action),
    );
  }

  getParameters() {
    return this.actions.reduce(
      (parameters, action) => parameters.concat(this.getStateValueFunction(action).getParameters()),
      [],
    );
  }

  setParameters(parameters) {
    const p = parameters.slice();
    this.actions.forEach((action) => {
      const stateValueFunction = this.getStateValueFunction(action);
      const stateParameters = stateValueFunction.getParameters();
      const newStateParameters = p.splice(0, stateParameters.length);
      stateValueFunction.setParameters(newStateParameters);
    });
    return this;
  }

  updateParameters(errors) {
    const newParameters = vector.add(
      this.getParameters(),
      vector.scale(this.alpha, errors),
    );
    return this.setParameters(newParameters);
  }

  getProbabilities(state) {
    const numerators = this.actions.map(action => this.getScore(state, action));
    const total = math.sum(numerators);
    return numerators.map(score => score / total);
  }

  getStateValueFunction(action) {
    if (!this.stateValueFunctions[action]) {
      this.stateValueFunctions[action] = this.createStateValueFunction();
    }
    return this.stateValueFunctions[action];
  }

  getScore(state, action) {
    return Math.exp(this.getStateValueFunction(action).call(state));
  }
}

module.exports = SoftMax;
