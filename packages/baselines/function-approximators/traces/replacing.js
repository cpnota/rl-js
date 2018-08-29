const math = require('mathjs');

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

      if (math.abs(sum) < math.max(math.abs(trace), math.abs(partial))) {
        return sum;
      }

      return math.abs(trace) > math.abs(partial) ? trace : partial;
    });
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
