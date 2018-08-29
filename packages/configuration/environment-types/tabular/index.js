const EnvironmentFactory = require('@rl-js/interfaces/environment-factory');
const checkInterface = require('check-interface');

/**
 * Interface for an EnvironmentFactory corresponding to an Environment
 * with discrete actions and a discrete state space.
 * The actions should be an array of strings.
 * @interface TabularEnvironmentFactory
 * @extends EnvironmentFactory
 */
class TabularEnvironmentFactory extends EnvironmentFactory {
  constructor() {
    super();
    checkInterface(this, TabularEnvironmentFactory);
  }

  /**
   * @returns {string[]} The state set for the environment
   */
  getStates() {}

  /**
   * @returns {string[]} The action set for the environment
   */
  getActions() {}
}

module.exports = TabularEnvironmentFactory;
