const Policy = require('@rl-js/interfaces/policy');

class Random extends Policy {
  constructor({ actions }) {
    super();
    this.actions = actions;
  }

  chooseAction() {
    return this.chooseRandomAction();
  }

  chooseBestAction() {
    return this.chooseRandomAction();
  }

  probability() {
    return 1 / Object.keys(this.actions).length;
  }

  chooseRandomAction() {
    return random(Object.values(this.actions));
  }

  update(state, action, error) {
    return this;
  }

  gradient(state, action) {
    return [];
  }

  trueGradient(state, action) {
    return [];
  }

  getParameters() {
    return [];
  }

  setParameters(parameters) {
    return this;
  }

  updateParameters(errors) {
    return this;
  }
}

const random = arr => arr[Math.floor(Math.random() * arr.length)];

module.exports = Random;
