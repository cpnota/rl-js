const { vector } = require('@rl-js/math');

module.exports = class AccumulatingTraces {
  constructor(functionApproximator) {
    this.functionApproximator = functionApproximator;
    this.traces = new Array(this.functionApproximator.getParameters().length);
    this.reset();
  }

  record(...args) {
    const gradient = this.functionApproximator.gradient(...args);
    vector.inplace.add(this.traces, gradient);
    return this;
  }

  update(error) {
    const direction = vector.scale(error, this.traces);
    this.functionApproximator.updateParameters(direction);
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
