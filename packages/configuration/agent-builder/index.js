const AgentFactory = require('@rl-js/interfaces/agent-factory');

/**
 * Class defining a builder for AgentFactories.
 * Used for defining the configuration of the
 * resulting Agent
 * @class AgentBuilder
 */
class AgentBuilder {
  constructor({
    name, id, hyperparameters, createAgent,
  }) {
    this.name = name || id;
    this.id = id;
    this.hyperparameterDefinitions = hyperparameters;
    this.createAgent = createAgent;
  }

  /**
   * @return {string} Display name of the Agent
   */
  getName() {
    return this.name;
  }

  /**
   * @return {string} The unique identifier for the Agent
   */
  getId() {
    return this.id;
  }

  /**
   * @return {object} The hyperparameter definitions and ranges for the Agent
   */
  getHyperparameterDefinitions() {
    return this.hyperparameterDefinitions;
  }

  /**
   * @returns A fully configured AgentFactory
   */
  buildFactory() {
    const { environmentFactory, hyperparameters = {} } = this;

    if (environmentFactory === undefined) {
      throw new Error('EnvironmentFactory not set');
    }

    const _hyperparameters = {};

    for (const hyperparameter of this.hyperparameterDefinitions) {
      const name = hyperparameter.getName();
      const value = hyperparameters[name] != null
        ? hyperparameters[name]
        : hyperparameter.defaultValue();
      _hyperparameters[name] = value;
    }

    return new GenericAgentFactory(() => this.createAgent(environmentFactory, _hyperparameters));
  }

  /**
   * @returns A fully configured Agent
   */
  buildAgent() {
    return this.buildFactory().createAgent();
  }

  /**
   * The EnvironmentFactory corresponding to the
   * specific Environment that the AgentFactory
   * should be built for.
   * @param {EnvironmentFactory} environmentFactory
   */
  setEnvironmentFactory(environmentFactory) {
    this.environmentFactory = environmentFactory;
    return this;
  }

  // TODO getHyperparameterDefinitions

  /**
   * The specific set of hyperparameters for
   * the agents constructed by the AgentFactory.
   * @param {Hyperparameters} hyperparameters
   */
  setHyperparameters(hyperparameters) {
    this.hyperparameters = hyperparameters;
    return this;
  }

  /**
   * Clone this AgentBuilder
   * @returns AgentBuilder
   */
  clone() {
    return new AgentBuilder({
      hyperparameters: this.hyperparameterDefinitions,
      createAgent: this.createAgent,
    });
  }
}

class GenericAgentFactory extends AgentFactory {
  constructor(createAgent) {
    super();
    this._createAgent = createAgent;
  }

  createAgent() {
    return this._createAgent();
  }
}

module.exports = AgentBuilder;
