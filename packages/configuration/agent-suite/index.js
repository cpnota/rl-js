/**
 * Class representing a suite of similar or related agents.
 * @class AgentSuite
 */
class AgentSuite {
  constructor({
    id, name, builders, environmentType,
  }) {
    this.id = id;
    this.name = name;
    this.builders = builders;
    this.environmentType = environmentType;
  }

  /**
   * @returns {string} Display name of the agent suite
   */
  getName() {
    return this.name;
  }

  /**
   * @returns {string} Unique ID of the agent suite
   */
  getId() {
    return this.id;
  }

  /**
   * @returns {AgentBuilder[]} An array of AgentBuilders
   */
  listAgents() {
    return this.builders;
  }

  /**
   * @param {string} id - The unique ID for the AgentBuilder
   * @returns {AgentBuilder}
   */
  getAgentBuilder(id) {
    const builder = this.builders.find(b => b.getId() === id);
    return builder && builder.clone(); // create a new instance
  }

  /**
   * Get the type of the environments that agents
   * in this suite can handle.
   * E.g. DiscreteEnvironmentFactory, TabularEnvironmentFactory, etc.
   * @returns {*} An EnvironmentFactory type
   */
  getEnvironmentType() {
    return this.environmentType;
  }
}

module.exports = AgentSuite;
