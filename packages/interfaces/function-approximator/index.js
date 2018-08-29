const checkInterface = require('check-interface');

/**
 * The FunctionApproximator (FA) interface for rl-js.
 * @interface
 */
class FunctionApproximator {
  constructor() {
    checkInterface(this, FunctionApproximator);
  }

  /**
   * Call the function approximators with the given arguments.
   * The FA should return an estimate of the value of the function
   * at the point given by the arguments.
   * @param {*} args - Arguments to the function being approximated approximated
   * @returns {number} - The approximated value of the function at the given point
   */
  call(args) {}

  /**
   * Update the value of the function approximator at the given point.
   * @param {*} args - Arguments to the function being approximated approximated
   * @param {number} error - The error in the approximation at the given point
   */
  update(args, error) {}

  /**
   * Compute the gradient of the function approximator at the given point,
   * with respect to its parameters.
   * @param {number[]} args - Arguments to the function being approximated approximated
   * @returns {number[]} The gradient of the function approximator at the given point
   */
  gradient(args) {}

  /**
   * Get the differentiable parameters of the function approximator
   * @returns {number[]} The parameters that define the function approximator
   */
  getParameters() {}

  /**
   * Set the differentiable parameters fo the function approximator
   * @param {number[]} parameters - new parameters for the function approximator
   */
  setParameters(parameters) {}

  /**
   * Update the parameters in some direction given by an array of errors.
   * @param {number[]} errors = The direction with which to update each parameter
   */
  updateParameters(errors) {}
}

module.exports = FunctionApproximator;
