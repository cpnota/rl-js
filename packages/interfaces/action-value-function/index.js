const checkInterface = require('check-interface');
const FunctionApproximator = require('../function-approximator');

/**
 * The ActionValueFunction interface for rl-js.
 * In RL, action-value functions are often represented by the symbol "q"
 * @interface
 * @extends FunctionApproximator
 */
class ActionValueFunction extends FunctionApproximator {
  constructor() {
    super();
    checkInterface(this, ActionValueFunction);
  }

  /**
   * Estimate the expected value of the returns given a specific state-action pair
   * @param {*} state - State object of type specific to the environment
   * @param {*} action - Action object of type specific to the environment
   * @returns {number} - The approximated action value (q)
   */
  call(state, action) {}

  /**
   * Update the value of the function approximator for a given state-action pair
   * @param {*} state - State object of type specific to the environment
   * @param {*} action - Action object of type specific to the environment
   * @param {number} error - The error in the current estimate
   */
  update(state, action, error) {}

  /**
   * Compute the gradient of the function approximator for a given state-action pair,
   * with respect to its parameters.
   * @param {*} state - State object of type specific to the environment
   * @param {*} action - Action object of type specific to the environment
   * @returns {number[]} The gradient of the function approximator with respect to (s, a)
   */
  gradient(state, action) {}
}

module.exports = ActionValueFunction;
