const EnvironmentFactory = require('@rl-js/interfaces/environment-factory');
const checkInterface = require('check-interface');

/**
 * Interface for an EnvironmentFactory corresponding to an Environment
 * with discrete actions and a continuous state space.
 * The actions should be an array of strings.
 * The observation should be an array of numbers.
 * @interface DiscreteEnvironmentFactory
 * @extends EnvironmentFactory
 */
class DiscreteEnvironmentFactory extends EnvironmentFactory {
  constructor() {
    super();
    checkInterface(this, DiscreteEnvironmentFactory);
  }

  /**
   * @returns {number} The size of the observation array for the environment
   */
  getObservationCount() {}

  /**
   * @returns {string[]} The action set for the environment
   */
  getActions() {}
}

module.exports = DiscreteEnvironmentFactory;
