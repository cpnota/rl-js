const math = require('mathjs');

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
    this.traces = math.add(
      this.traces,
      math.multiply(
        gradient,
        1 - math.multiply(this.alpha, this.traces, gradient),
      ),
    );
    return this;
  }

  update(error) {
    this.functionApproximator.updateParameters(
      math.multiply(error, this.traces),
    );
    return this;
  }

  decay(amount) {
    this.traces = math.multiply(amount, this.traces);
    return this;
  }

  reset() {
    this.traces.fill(0);
  }
};
