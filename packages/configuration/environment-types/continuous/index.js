const EnvironmentFactory = require('@rl-js/interfaces/environment-factory');
const checkInterface = require('check-interface');

/**
 * Interface for an EnvironmentFactory corresponding to an Environment
 * with a single continuous action and a continuous state space.
 * The actions should be bounded by some range.
 * The observation should be an array of numbers.
 * @interface ContinuousEnvironmentFactory
 * @extends EnvironmentFactory
 */
class ContinuousEnvironmentFactory extends EnvironmentFactory {
  constructor() {
    super();
    checkInterface(this, ContinuousEnvironmentFactory);
  }

  /**
   * @returns {number} The size of the observation array for the environment
   */
  getObservationCount() {}

  /**
   * @returns {number[]} An array whose first element represents the lower bound of the action,
   * and the second element represents the upper bound.
   */
  getActionRange() {}
}

module.exports = ContinuousEnvironmentFactory;
