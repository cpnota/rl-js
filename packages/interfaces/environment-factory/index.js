const checkInterface = require('check-interface');

/**
 * The EnvironmentFactory interface for rl-js.
 * An EnvironmentFactory creates Environment objects.
 * @interface
 */
class EnvironmentFactory {
  constructor() {
    checkInterface(this, EnvironmentFactory);
  }

  /**
   * @returns {Environment}
   */
  createEnvironment() {}
}

module.exports = EnvironmentFactory;
