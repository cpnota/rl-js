const checkInterface = require('check-interface');

/**
 * Interface for linear function approximator Basis.
 * @interface
 */
class Basis {
  constructor() {
    checkInterface(this, Basis);
  }

  /**
   * @returns Features computed for the basis
   */
  features() {}

  /**
   * @returns The number of features produced by the basis
   */
  getNumberOfFeatures() {}
}

module.exports = Basis;
