const checkInterface = require('check-interface');

/* eslint-disable no-unused-vars */

/**
 * Interface defining hyperparameter configuration
 * @interface Hyperparameter
 */
class Hyperparameter {
  constructor() {
    checkInterface(this, Hyperparameter);
  }

  /**
   * @returns {string} the name of the hyperparameter
   */
  getName() {}

  /**
   * @returns {*} the default value for the hyperparameter
   */
  defaultValue() {}

  /**
   * @returns {*} a randomly chosen value for the hyperparameter
   */
  randomValue() {}

  /**
   * Discretize the range into evenly spaced values
   * @param {number} steps - an integer number of steps to discretize the range into
   * @returns {array} an array of hyperparameter values
   */
  discretize(steps) {}
}

module.exports = Hyperparameter;
