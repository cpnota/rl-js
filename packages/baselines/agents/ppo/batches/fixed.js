module.exports = class FixedBatch {
  constructor(size) {
    this.size = size;
  }

  shouldUpdate(history) {
    return history.length >= this.size;
  }
};
