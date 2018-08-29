const math = require('mathjs');

module.exports = class AccumulatingTraces {
  constructor(functionApproximator) {
    this.functionApproximator = functionApproximator;
    this.traces = new Array(this.functionApproximator.getParameters().length);
    this.reset();
  }

  record(...args) {
    this.traces = math.add(
      this.functionApproximator.gradient(...args),
      this.traces,
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
