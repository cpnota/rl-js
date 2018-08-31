const Policy = require('@rl-js/interfaces/policy');
const gaussian = require('gaussian');
const math = require('mathjs');

class Gaussian extends Policy {
  constructor({
    functionApproximator, variance, min, max,
  } = {}) {
    super();
    this.variance = variance;
    this.std = this.variance ** 2;
    this.min = min;
    this.max = max;
    this.functionApproximator = functionApproximator;
  }

  chooseAction(state) {
    return Math.min(this.max, Math.max(this.min, this.getDistribution(state).ppf(Math.random())));
  }

  chooseBestAction(state) {
    return this.functionApproximator.call(state);
  }

  probability(state, action) {
    if (action < this.min || action > this.max) return 0;
    if (action === this.min) return this.getDistribution(state).cdf(action);
    if (action === this.max) return 1 - this.getDistribution(state).cdf(action);
    return this.getDistribution(state).pdf(action);
  }

  update(state, action, error) {
    this.functionApproximator.update(state, error * this.derivative(state, action));
    return this;
  }

  gradient(state, action) {
    const features = this.functionApproximator.gradient(state);
    const derivative = this.derivative(state, action);
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

  derivative(state, action) {
    if (action === this.min) return this.derivativeOfCdf(state, action);
    if (action === this.max) return -this.derivativeOfCdf(state, action); // TODO
    return this.derivativeOfPdf(state, action);
  }

  derivativeOfCdf(state, action) {
    return -this.getDistribution(state).pdf(action) / this.probability(state, action);
  }

  derivativeOfPdf(state, action) {
    const mean = this.functionApproximator.call(state);
    return (action - mean) / this.std;
  }
}

module.exports = Gaussian;
