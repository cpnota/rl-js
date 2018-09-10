const { vector } = require('@rl-js/math');

module.exports = class AccumulatingTraces {
  constructor(functionApproximator) {
    this.functionApproximator = functionApproximator;
    this.traces = new Array(this.functionApproximator.getParameters().length);
    this.reset();
  }

  record(...args) {
    const gradient = this.functionApproximator.gradient(...args);
    this.traces = gradient.map((partial, i) => {
      const trace = this.traces[i];
      const sum = trace + partial;

      if (Math.abs(sum) < Math.max(Math.abs(trace), Math.abs(partial))) {
        return sum;
      }

      return Math.abs(trace) > Math.abs(partial) ? trace : partial;
    });
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
