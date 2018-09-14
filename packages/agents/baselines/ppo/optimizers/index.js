const checkInterface = require('check-interface');

/* eslint-disable no-unused-vars */
class Optimizer {
  constructor() {
    checkInterface(this, Optimizer);
  }

  optimize({ samples, computeGradient, update }) {}
}

module.exports = Optimizer;
