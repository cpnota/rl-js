const FunctionApproximator = require('@rl-js/interfaces/function-approximator');
const Cache = require('./cache');

const cachify = FaConstructor => class CachifiedFA extends FunctionApproximator {
  constructor(...args) {
    super();
    this.fa = new FaConstructor(...args);
    this.cache = new Cache();
  }

  call(args) {
    const cached = this.cache.get(args);
    const output = this.fa.call(args);
    if (cached != null) return cached;
    this.cache.set(args, output);
    return output;
  }

  update(args, error) {
    this.cache.invalidate();
    return this.fa.update(args, error);
  }

  gradient(args) {
    return this.fa.gradient(args);
  }

  getParameters() {
    return this.fa.getParameters();
  }

  setParameters(parameters) {
    this.cache.invalidate();
    return this.fa.setParameters(parameters);
  }

  updateParameters(errors) {
    this.cache.invalidate();
    return this.fa.updateParameters(errors);
  }
};

module.exports = cachify;
