const AgentBuilder = require('@rl-js/configuration/agent-builder');
const {
  Exponential,
  Discrete,
} = require('@rl-js/configuration/hyperparameters');

const SoftMax = require('@rl-js/baseline-policies/soft-max');
const LinearStateValue = require('@rl-js/baseline-function-approximators/state-value/linear');
const Fourier = require('@rl-js/baseline-function-approximators/generic/linear/bases/fourier');
const Network = require('../../../networks/gate');

const ALPHA_V = 'alpha_v';
const ALPHA_PI = 'alpha_pi';
const ORDER = 'order';

module.exports = new AgentBuilder({
  name: 'Gate',
  id: 'gate',
  hyperparameters: [
    new Exponential({
      name: ALPHA_V,
      min: 0.00001,
      max: 0.3,
      default: 0.001,
    }),
    new Exponential({
      name: ALPHA_PI,
      min: 0.00001,
      max: 0.3,
      default: 0.001,
    }),
    new Discrete({
      name: ORDER,
      values: [1, 2, 3],
      default: 1,
    }),
  ],
  createAgent: (environmentFactory, hyperparameters) => {
    const variables = environmentFactory.getObservationCount();
    const actions = environmentFactory.getActions();

    const basis = new Fourier({
      variables,
      order: hyperparameters[ORDER],
    });

    const critic = new LinearStateValue({
      basis,
      alpha: hyperparameters[ALPHA_V],
    });

    const gate = new SoftMax({
      createStateValueFunction: () => new LinearStateValue({
        basis,
        alpha: hyperparameters[ALPHA_PI],
      }),
      actions: [0, 1],
      alpha: hyperparameters[ALPHA_PI],
    });

    const policy = new SoftMax({
      createStateValueFunction: () => new LinearStateValue({
        basis,
        alpha: hyperparameters[ALPHA_PI],
      }),
      actions,
      alpha: hyperparameters[ALPHA_PI],
    });

    return new Network({
      critic,
      gate,
      policy,
    });
  },
});
