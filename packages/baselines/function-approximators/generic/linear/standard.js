const checkInterface = require('check-interface');
const FunctionApproximator = require('@rl-js/interfaces/function-approximator');
const math = require('mathjs');
const Basis = require('./basis');

class LinearFunctionApproximator extends FunctionApproximator {
  constructor({ alpha, basis, initialWeights = undefined }) {
    super();

    checkInterface(basis, Basis);
    this.basis = basis;
    this.alpha = alpha;
    this.weights = initialWeights || Array(basis.getNumberOfFeatures()).fill(0);
    if (this.weights.length !== basis.getNumberOfFeatures()) {
      throw new Error('Number of terms for basis must match number of weights');
    }
  }

  call(args) {
    const result = math.dot(this.weights, this.basis.features(args));
    if (Number.isIntegerisNaN(result)) {
      throw new Error(
        `Result was not a number! ${JSON.stringify({
          args,
          result,
        })} `,
      );
    }
    return result;
  }

  update(args, error) {
    this.weights = math.add(
      this.weights,
      math.multiply(this.alpha, error, this.basis.features(args)),
    );
    return this;
  }

  gradient(args) {
    return this.basis.features(args);
  }

  getParameters() {
    return this.weights;
  }

  setParameters(parameters) {
    if (parameters == null) throw new Error('Parameters are undefined');
    this.weights = parameters;
    return this;
  }

  updateParameters(errors) {
    this.weights = math.add(this.weights, math.multiply(this.alpha, errors));
    return this;
  }
}

module.exports = LinearFunctionApproximator;
