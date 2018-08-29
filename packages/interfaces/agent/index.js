const checkInterface = require('check-interface');

/**
 * The Agent interface for rl-js.
 * @interface
 */
class Agent {
  constructor() {
    checkInterface(this, Agent);
  }

  /**
   * Prepare the agent of the next episode.
   * The Agent should perform any cleanup and
   * setup stepts that are necessary here.
   * An Environment object is passed in,
   * which the agent should store
   * each time.
   * @param {Environment} environment - The Environment object for the new episode.
   */
  newEpisode(environment) {}

  /**
   * Perform an action for the current timestep.
   * Usually, the agent should at least:
   * 1) dispatch an action to the environment, and
   * 2) perform any necessary internal updates (e.g. updating the value function).
   */
  act() {}
}

module.exports = Agent;
