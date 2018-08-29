/**
 * Class representing a set of similar or related Environments
 * @class EnvironmentSuite
 */
class EnvironmentSuite {
  constructor({
    type, builders, name, id,
  }) {
    this.name = name;
    this.type = type;
    this.id = id;
    this.builders = builders;
  }

  /**
   * @returns {string} The display name of the EnvironmentSuite
   */
  getName() {
    return this.name;
  }

  /**
   * @returns {string} The unique ID of the EnvironmentSuite
   */
  getId() {
    return this.id;
  }

  /**
   * @returns {*} A subclass of EnvironmentFactory corresponding to the EnvironmentType
   */
  getType() {
    return this.type;
  }

  /**
   * @returns {EnvironmentBuilder[]} An array of the EnvironmentBuilders
   */
  listEnvironments() {
    return this.builders;
  }

  /**
   * @param environmentName
   * @returns EnvironmentFactory
   */
  getEnvironmentBuilder(id) {
    return this.builders.find(builders => builders.getId() === id);
  }
}

module.exports = EnvironmentSuite;
