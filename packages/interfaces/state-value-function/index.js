const checkInterface = require('check-interface');
const FunctionApproximator = require('../function-approximator');

/**
 * The StateValueFunction interface for rl-js.
 * In RL, state-value functions are often represented by the symbol "v"
 * @interface
 * @extends FunctionApproximator
 */
class StateValueFunction extends FunctionApproximator {
  constructor() {
    super();
    checkInterface(this, StateValueFunction);
  }

  /**
   * Estimate the expected value of the returns given a specific state.
   * @param {*} state - State object of type specific to the environment
   * @returns {number} - The approximated state value (v)
   */
  call(state) {}

  /**
   * Update the value of the function approximator for a given state
   * @param {*} state - State object of type specific to the environment
   * @param {number} error - The error in the approximation for the given state
   */
  update(state, error) {}

  /**
   * Compute the gradient of the function approximator for a given state,
   * with respect to its parameters.
   * @param {*} state - State object of type specific to the environment
   * @returns {number[]} The gradient of the function approximator for the given state
   */
  gradient(state) {}
}

module.exports = StateValueFunction;
