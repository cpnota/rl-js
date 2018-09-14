const checkInterface = require('check-interface');
const FunctionApproximator = require('@rl-js/interfaces/function-approximator');
const { vector } = require('@rl-js/math');
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
    const result = vector.dot(this.weights, this.basis.features(args));

    if (Number.isNaN(result)) {
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
    if (Number.isNaN(error)) {
      throw new Error(`Error was not a number! ${JSON.stringify({
        args,
        error,
      })}`);
    }

    vector.inplace.update(this.alpha * error, this.weights, this.basis.features(args));
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

  updateParameters(direction) {
    vector.inplace.update(this.alpha, this.weights, direction);
    return this;
  }
}

module.exports = LinearFunctionApproximator;
