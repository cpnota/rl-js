const math = require('mathjs');
const { vector } = require('@rl-js/math');
const Optimizer = require('.');

module.exports = class MiniBatchStochasticGradientDescent extends Optimizer {
  constructor({ miniBatchSize, epochs }) {
    super();
    this.miniBatchSize = miniBatchSize;
    this.epochs = epochs;
  }

  optimize({ samples, computeGradient, update }) {
    let count = 0;
    let currentSampleIndex = 0;
    while (count < samples.length * this.epochs) {
      let gradient = 0;
      for (let i = 0; i < this.miniBatchSize; i += 1) {
        const sample = samples[currentSampleIndex];
        if (gradient) {
          vector.inplace.add(gradient, computeGradient(sample));
        } else {
          gradient = computeGradient(sample);
        }
        count += 1;
        currentSampleIndex += 1;
        if (!samples[currentSampleIndex]) currentSampleIndex = 0;
      }

      const norm = math.norm(gradient);

      if (norm === 0) {
        // we've either completely converged,
        // or there was some error.
        return;
      }
      vector.inplace.scale(1 / norm, gradient);
      update(gradient);
    }
  }
};
