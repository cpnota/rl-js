const checkInterface = require('check-interface');

/**
 * The Policy interface for rl-js.
 * Policies are a way of selecting actions.
 * They are usually represented by the symbol π
 * @interface
 */
class Policy {
  constructor() {
    checkInterface(this, Policy);
  }

  /**
   * Choose an action given the current state.
   * @param {*} state - State object of type specific to the environment
   * @returns {*} An Action object of type specific to the environment
   */
  chooseAction(state) {}

  /**
   * Choose the best known action given the current state.
   * @param {*} state - State object of type specific to the environment
   * @returns {*} An Action object of type specific to the environment
   */
  chooseBestAction(state) {}

  /**
   * Compute the probability of selecting a given action in a given state.
   * @param {*} state - State object of type specific to the environment
   * @param {*} action - Action object of type specific to the environment
   * @returns {number} the probability between [0, 1]
   */
  probability(state, action) {}

  /**
   * Update the probability of choosing a particular action in a particular state.
   * Generally, a positive error should make chosing the action more likely,
   * and a negative error should make chosing the action less likely.
   * @param {number[]} state - State object of type specific to the environment
   * @param {*} action - Action object of type specific to the environment
   * @param {number} error - The direction and magnitude of the update
   */
  update(state, action, error) {}

  /**
   * Compute the gradient of natural logarithm of the probability of
   * choosing the given action in the given state
   * with respect to the parameters of the policy.
   * This can often be computed more efficiently than the true gradient.
   * @param {*} state - State object of type specific to the environment
   * @param {*} action - Action object of type specific to the environment
   * @returns {number[]} The gradient of the policy
   */
  gradient(state, action) {}

  /**
   * Compute the true gradient of the probability of
   * choosing the given action in the given state
   * with respect to the parameters of the policy.
   * This is contrast to the log gradient which is used for most things.
   * @param {*} state - State object of type specific to the environment
   * @param {*} action - Action object of type specific to the environment
   * @returns {number[]} The gradient of log(π(state, action))
   */
  trueGradient(state, action) {
    // By definition. This should usually be overriden with a more efficient implementation.
    return this.gradient(state, action) / this.probability(state, action);
  }

  /**
   * Get the differentiable parameters of the policy
   * @returns {number[]} The parameters that define the policy
   */
  getParameters() {}

  /**
   * Set the differentiable parameters of the policy
   * @param {number[]} parameters The parameters that define the policy
   */
  setParameters(parameters) {}

  /**
   * Update the parameters in some direction given by an array of errors.
   * @param {number[]} errors = The direction with which to update each parameter
   */
  updateParameters(errors) {}
}

module.exports = Policy;
