module.exports = class AccumulatingTraces {
  constructor(functionApproximator) {
    this.functionApproximator = functionApproximator;
    this.traces = new Array(this.functionApproximator.getParameters().length);
    this.reset();
  }

  record(...args) {
    const gradient = this.functionApproximator.gradient(...args);
    for (let i = 0; i < this.traces.length; i += 1) {
      this.traces[i] += gradient[i];
    }
    return this;
  }

  update(error) {
    const direction = this.traces.map(trace => trace * error);
    this.functionApproximator.updateParameters(direction);
    return this;
  }

  decay(amount) {
    for (let i = 0; i < this.traces.length; i += 1) {
      this.traces[i] *= amount;
    }
    return this;
  }

  reset() {
    this.traces.fill(0);
  }
};
