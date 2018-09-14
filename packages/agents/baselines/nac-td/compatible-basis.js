const Basis = require('@rl-js/baseline-function-approximators/generic/linear/basis');
const { Policy } = require('@rl-js/interfaces');
const checkInterface = require('check-interface');

class CompatibleBasis extends Basis {
  constructor(policy) {
    super();
    this.policy = checkInterface(policy, Policy);
    this.numberOfFeatures = policy.getParameters().length;
  }

  features([state, action]) {
    return this.policy.gradient(state, action);
  }

  getNumberOfFeatures() {
    return this.numberOfFeatures;
  }
}

module.exports = CompatibleBasis;
