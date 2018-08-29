const checkInterface = require('check-interface');

/**
 * The StateTraces interface for rl-js.
 * State traces track which states have been visited,
 * such that agents can assign credit to states other than only
 * the previously visited state.
 * @interface
 */
class StateTraces {
  constructor() {
    checkInterface(this, StateTraces);
  }

  /**
   * Records a trace for the given state
   * @param {*} state - State object of type specific to the environment
   * @returns {StateTraces} - This object
   */
  record(state) {}

  /**
   * Updates the value function based on the stored traces, and the given error.
   * @param {number} error - The current TD error
   * @returns {StateTraces} - This object
   */
  update(error) {}

  /**
   * Decay the traces by the given amount.
   * @param {number} amount - The amount to multiply the traces by, usually a value less than 1.
   * @returns {StateTraces} - This object
   */
  decay(amount) {}

  /**
   * Reset the traces to their starting values.
   * Usually called at the beginning of an episode.
   * @returns {StateTraces} - This object
   */
  reset() {
    this.traces.fill(0);
    return this;
  }
}

module.exports = StateTraces;
