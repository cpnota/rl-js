const multiply = (scalar, vector) => {
  const result = new Array(vector.length);
  for (let i = 0; i < vector.length; i += 1) {
    result[i] = scalar * vector[i];
  }
  return result;
};

/* eslint-disable no-param-reassign */
const add = (v1, v2) => {
  for (let i = 0; i < v1.length; i += 1) {
    v1[i] += v2[i];
  }
  return v1;
};

const dot = (v1, v2) => {
  let result = 0;
  for (let i = 0; i < v1.length; i += 1) {
    result += v1[i] * v2[i];
  }
  return result;
};

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
    this.traces = add(
      this.traces,
      multiply(
        1 - this.alpha * dot(this.traces, gradient),
        gradient,
      ),
    );
    return this;
  }

  update(error) {
    this.functionApproximator.updateParameters(
      multiply(error, this.traces),
    );
    return this;
  }

  decay(amount) {
    this.traces = multiply(amount, this.traces);
    return this;
  }

  reset() {
    this.traces.fill(0);
  }
};
