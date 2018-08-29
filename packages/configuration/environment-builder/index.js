/**
 * @class EnvironmentBuilder
 */
class EnvironmentBuilder {
  constructor({
    id, name, factory, hyperparameters = [],
  }) {
    this.id = id;
    this.name = name;
    this.factory = factory;
    this.hyperparameterDefinitions = hyperparameters;
    this.hyperparameters = {};
  }

  /**
   * @returns {string} The unique ID of the EnvironmentBuilder
   */
  getId() {
    return this.id;
  }

  /**
   * @returns {string} Display name of the EnvironmentBuilder
   */
  getName() {
    return this.name;
  }

  /**
   * @returns {EnvironmentFactory} Get an instance of EnvironmentFactory
   */
  buildFactory() {
    const { hyperparameters = {} } = this;
    const _hyperparameters = {};

    for (const hyperparameter of this.hyperparameterDefinitions) {
      const name = hyperparameter.getName();
      const value = hyperparameters[name] != null
        ? hyperparameters[name]
        : hyperparameter.defaultValue();
      _hyperparameters[name] = value;
    }

    return typeof this.factory === 'function'
      ? this.factory(_hyperparameters)
      : this.factory;
  }

  /**
   * @return {object} The hyperparameter definitions and ranges for the Environment
   */
  getHyperparameterDefinitions() {
    return this.hyperparameterDefinitions;
  }

  /**
   * The specific set of hyperparameters for
   * the agents constructed by the EnvironmentFactory.
   * @param {Hyperparameters} hyperparameters
   */
  setHyperparameters(hyperparameters) {
    this.hyperparameters = hyperparameters;
    return this;
  }

  /**
   * @returns {Environment} Build an instance of the Environment
   */
  buildEnvironment() {
    this.buildFactory().createEnvironment();
  }
}

module.exports = EnvironmentBuilder;
