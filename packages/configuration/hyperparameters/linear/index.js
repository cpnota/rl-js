const math = require('mathjs');
const Hyperparameter = require('../interface');

/**
 * Class reperesenting a hyperparameter in linear space
 * @extends Hyperparameter
 */
class Linear extends Hyperparameter {
  constructor({
    name,
    min,
    max,
    default: _default, // default is reserved
  }) {
    super();
    this.name = name;
    this.min = min;
    this.max = max;
    this.default = _default;
  }

  getName() {
    return this.name;
  }

  defaultValue() {
    return this.default;
  }

  randomValue() {
    return math.random(this.min, this.max);
  }

  discretize(steps) {
    const stepSize = (this.max - this.min) / (steps - 1);
    const result = math.range(this.min, this.max, stepSize, true).toArray();
    if (result.length < steps) result.push(this.max); // there are sometimes rounding errors
    return result;
  }
}

module.exports = Linear;
