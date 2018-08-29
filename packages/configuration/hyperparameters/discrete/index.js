const math = require('mathjs');
const Hyperparameter = require('../interface');

/**
 * Class representing a hyperparameter with a discrete
 * set of possible values
 * @extends Hyperparameter
 */
class Discrete extends Hyperparameter {
  constructor({
    name,
    values,
    default: _default, // default is reserved
  }) {
    super();
    this.name = name;
    this.values = values;
    this.default = _default;
  }

  getName() {
    return this.name;
  }

  defaultValue() {
    return this.default;
  }

  randomValue() {
    return math.pickRandom(this.values);
  }

  discretize() {
    return this.values;
  }
}

module.exports = Discrete;
