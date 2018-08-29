const math = require('mathjs');
const Hyperparameter = require('../interface');
const Linear = require('../linear');

/**
 * Class representing a hyperparameter in logarithmic space
 * @extends Hyperparameter
 */
class Exponential extends Hyperparameter {
  constructor({
    name,
    base = math.E,
    min,
    max,
    default: _default, // default is reserved
  }) {
    super();
    this.name = name;
    this.base = base;
    this.min = min;
    this.max = max;
    this.default = _default;

    this.linear = new Linear({
      min: math.log(this.min, this.base),
      max: math.log(this.max, this.base),
    });
  }

  getName() {
    return this.name;
  }

  defaultValue() {
    return this.default;
  }

  randomValue() {
    return this.fromLinear(this.linear.randomValue());
  }

  discretize(steps) {
    return this.linear.discretize(steps).map(value => this.fromLinear(value));
  }

  fromLinear(value) {
    return this.base ** value;
  }
}

module.exports = Exponential;
