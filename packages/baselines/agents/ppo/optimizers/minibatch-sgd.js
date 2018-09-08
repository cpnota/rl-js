const math = require('mathjs');
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
        gradient = math.add(gradient, computeGradient(sample));
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
      const direction = math.divide(gradient, norm);
      update(direction);
    }
  }
};
