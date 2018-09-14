const checkInterface = require('check-interface');

/* eslint-disable no-unused-vars */
class BatchStrategy {
  constructor() {
    checkInterface(this, BatchStrategy);
  }

  shouldUpdate(history) {}
}

module.exports = BatchStrategy;
