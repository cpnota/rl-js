const checkInterface = require('check-interface');

/**
 * The ActionTraces interface for rl-js.
 * Action traces track which state-action pairs have been visited,
 * such that agents can assign credit to states other than only
 * the previously visited state.
 * @interface
 */
class ActionTraces {
  constructor() {
    checkInterface(this, ActionTraces);
  }

  /**
   * Records a trace for the given state-action pair.
   * @param {*} state - State object of type specific to the environment
   * @param {*} action - Action object of type specific to the environment
   * @returns {ActionTraces} - This object
   */
  record(state, action) {}

  /**
   * Updates the value function based on the stored traces, and the given error.
   * @param {number} error - The current TD error
   * @returns {ActionTraces} - This object
   */
  update(error) {}

  /**
   * Decay the traces by the given amount.
   * @param {number} amount - The amount to multiply the traces by, usually a value less than 1.
   * @returns {ActionTraces} - This object
   */
  decay(amount) {}

  /**
   * Reset the traces to their starting values.
   * Usually called at the beginning of an episode.
   * @returns {ActionTraces} - This object
   */
  reset() {}
}

module.exports = ActionTraces;
