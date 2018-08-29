const checkInterface = require('check-interface');

/**
 * The Environment interface for rl-js.
 * @interface
 */
class Environment {
  constructor() {
    checkInterface(this, Environment);
  }

  /**
   * Apply an action selected by an Agent to the environment.
   * This could a string representing the action (e.g. "LEFT"),
   * or an array representing the force to apply on actuators, etc.
   * @param {*} action - An action object specific to the environment.
   */
  dispatch(action) {}

  /**
   * Get an environment-specific observation for the current timestep.
   * This might be a string identifying the current state,
   * an array representing the current environment parameters,
   * pixel-data representing the agent's vision, etc.
   * @return {*} An observation object specific to the environment.
   */
  getObservation() {}

  /**
   * Get the reward for the current timestep.
   * Rewards guide the learning of the agent:
   * Positive rewards should be given when the agent selects good actions,
   * and negative rewards should be given when the agent selects bad actions.
   * @return {number} A scalar representing the reward for the current timestep.
   */
  getReward() {}

  /**
   * Return whether or not the current episode is terminated, or finished.
   * For example, this should return True if the agent has reached some goal,
   * if the maximum number of timesteps has been exceeded, or if the agent has
   * otherwise failed. Otherwise, this should return False.
   * @return {boolean} A boolean representing whether or not the episode has terminated.
   */
  isTerminated() {}
}

module.exports = Environment;
