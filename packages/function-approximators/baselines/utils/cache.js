// cache 2 most recent values
module.exports = class Cache {
  constructor() {
    this.input = [];
    this.output = [];
  }

  get(input) {
    const index = this.input.indexOf(input);
    if (index === -1) return undefined;
    return this.output[index];
  }

  set(input, output) {
    this.input = [input, this.input[0]];
    this.output = [output, this.output[0]];
    return this;
  }

  invalidate() {
    this.input = [];
    this.output = [];
    return this;
  }

  wrap(func) {
    return (input) => {
      const cached = this.get(input);
      if (cached) return cached;
      const output = func(input);
      this.set(input, output);
      return output;
    };
  }

  invalidateOn(func) {
    return (...args) => {
      const output = func(...args);
      this.invalidate();
      return output;
    };
  }
};
