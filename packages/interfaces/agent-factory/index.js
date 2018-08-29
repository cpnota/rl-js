const checkInterface = require('check-interface');

/**
 * The AgentFactory interface for rl-js.
 * An AgentFactory creates Agent objects.
 * @interface
 */
class AgentFactory {
  constructor() {
    checkInterface(this, AgentFactory);
  }

  /**
   * @returns {Agent}
   */
  createAgent() {}
}

module.exports = AgentFactory;
