const AgentBuilder = require('@rl-js/configuration/agent-builder');
const {
  Exponential,
  Discrete,
} = require('@rl-js/configuration/hyperparameters');

const SoftMax = require('@rl-js/baseline-policies/soft-max');
const LinearStateValue = require('@rl-js/baseline-function-approximators/state-value/linear');
const Fourier = require('@rl-js/baseline-function-approximators/generic/linear/bases/fourier');
const Network = require('../../../networks/structural-advantage');

const ALPHA_V = 'alpha_v';
const ALPHA_PI = 'alpha_pi';
const INPUTS = 'inputs';
const ORDER = 'order';

module.exports = new AgentBuilder({
  name: 'Structural Advantage',
  id: 'structural-advantage',
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
      name: INPUTS,
      values: [1, 2, 3, 4, 5],
      default: 2,
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

    const inputLayer = Array(hyperparameters[INPUTS]).fill().map(() => new SoftMax({
      createStateValueFunction: () => new LinearStateValue({
        basis,
        alpha: hyperparameters[ALPHA_PI],
      }),
      actions: [0, 1],
      alpha: hyperparameters[ALPHA_PI],
    }));

    const outputNode = new SoftMax({
      createStateValueFunction: () => new LinearStateValue({
        basis: new Fourier({
          variables: hyperparameters[INPUTS],
          order: hyperparameters[ORDER],
        }),
        alpha: hyperparameters[ALPHA_PI],
      }),
      actions,
      alpha: hyperparameters[ALPHA_PI],
    });

    const inputCritic = new LinearStateValue({
      basis,
      alpha: hyperparameters[ALPHA_V],
    });

    const outputCritic = new LinearStateValue({
      basis: new Fourier({
        variables: variables + hyperparameters[INPUTS],
        order: hyperparameters[ORDER],
      }),
      alpha: hyperparameters[ALPHA_V],
    });

    return new Network({
      inputLayer,
      outputNode,
      inputCritic,
      outputCritic,
    });
  },
});
