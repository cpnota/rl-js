const Policy = require('@rl-js/interfaces/policy');
const gaussian = require('gaussian');
const math = require('mathjs');

class Gaussian extends Policy {
  constructor({ functionApproximator, variance } = {}) {
    super();
    this.variance = variance;
    this.std = this.variance ** 2;
    this.functionApproximator = functionApproximator; // TODO: this must always be linear, right now
  }

  chooseAction(state) {
    return this.getDistribution(state).ppf(Math.random());
  }

  chooseBestAction(state) {
    return this.functionApproximator.call(state);
  }

  probability(state, action) {
    return this.getDistribution(state).pdf(action);
  }

  update(state, action, error) {
    const derivative = this.computeDerivativeWithRespectToMean(state, action);
    this.functionApproximator.update(state, error * derivative);
    return this;
  }

  gradient(state, action) {
    const features = this.functionApproximator.gradient(state);
    const derivative = this.computeDerivativeWithRespectToMean(state, action);
    return math.multiply(features, derivative);
  }

  trueGradient(state, action) {
    return math.multiply(
      this.probability(state, action),
      this.gradient(state, action),
    );
  }

  getParameters() {
    return this.functionApproximator.getParameters();
  }

  setParameters(parameters) {
    this.functionApproximator.setParameters(parameters);
    return this;
  }

  updateParameters(errors) {
    this.functionApproximator.updateParameters(errors);
    return this;
  }

  getDistribution(state) {
    const mean = this.functionApproximator.call(state);
    return gaussian(mean, this.variance);
  }

  computeDerivativeWithRespectToMean(state, action) {
    const mean = this.functionApproximator.call(state);
    return (action - mean) / this.std;
  }
}

module.exports = Gaussian;
