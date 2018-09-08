const BatchStrategy = require('.');

module.exports = class FixedBatch extends BatchStrategy {
  constructor(size) {
    super();
    this.size = size;
  }

  shouldUpdate(history) {
    return history.length >= this.size;
  }
};
