const Policy = require('@rl-js/interfaces/policy');
const math = require('mathjs');

/* eslint-disable no-unused-vars */
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
    return math.pickRandom(Object.values(this.actions));
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

module.exports = Random;
