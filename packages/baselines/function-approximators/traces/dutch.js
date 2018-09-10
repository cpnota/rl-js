const { vector } = require('@rl-js/math');

module.exports = class DutchTraces {
  constructor(functionApproximator, { alpha } = {}) {
    this.functionApproximator = functionApproximator;
    this.alpha = alpha || this.functionApproximator.alpha;
    if (this.alpha == null) throw new Error('must provide parameter "alpha"');
    this.traces = new Array(this.functionApproximator.getParameters().length);
    this.reset();
  }

  record(...args) {
    const gradient = this.functionApproximator.gradient(...args);
    vector.inplace.add(
      this.traces,
      vector.scale(
        1 - this.alpha * vector.dot(this.traces, gradient),
        gradient,
      ),
    );
    return this;
  }

  update(error) {
    this.functionApproximator.updateParameters(
      vector.scale(error, this.traces),
    );
    return this;
  }

  decay(amount) {
    vector.inplace.scale(amount, this.traces);
    return this;
  }

  reset() {
    this.traces.fill(0);
  }
};
