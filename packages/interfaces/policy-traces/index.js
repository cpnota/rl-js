const checkInterface = require('check-interface');

/**
 * The PolicyTraces interface for rl-js.
 * Policy traces track which state-action pairs have been chosen
 * by stochastic policies, such that agents can assign credit to
 * previous actions.
 * @interface
 */
class PolicyTraces {
  constructor() {
    checkInterface(this, PolicyTraces);
  }

  /**
   * Records a trace for the given state-action pair.
   * @param {*} state - State object of type specific to the environment
   * @param {*} action - Action object of type specific to the environment
   * @returns {PolicyTraces} - This object
   */
  record(state, action) {}

  /**
   * Updates the value function based on the stored traces, and the given error.
   * @param {number} error - The current TD error
   * @returns {PolicyTraces} - This object
   */
  update(error) {}

  /**
   * Decay the traces by the given amount.
   * @param {number} amount - The amount to multiply the traces by, usually a value less than 1.
   * @returns {PolicyTraces} - This object
   */
  decay(amount) {}

  /**
   * Reset the traces to their starting values.
   * Usually called at the beginning of an episode.
   * @returns {PolicyTraces} - This object
   */
  reset() {}
}

module.exports = PolicyTraces;
