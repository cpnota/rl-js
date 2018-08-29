const Hyperparameter = require('../interface');

/**
 * Class representing a Fixed hyperparameter
 * @extends Hyperparameter
 */
class Fixed extends Hyperparameter {
  constructor({ name, value }) {
    super();
    this.name = name;
    this.value = value;
  }

  getName() {
    return this.name;
  }

  defaultValue() {
    return this.value;
  }

  randomValue() {
    return this.value;
  }

  discretize() {
    return [this.value];
  }
}

module.exports = Fixed;
