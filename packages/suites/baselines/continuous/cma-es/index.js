const AgentBuilder = require('@rl-js/configuration/agent-builder');
const {
  Exponential,
  Linear,
  Discrete,
} = require('@rl-js/configuration/hyperparameters');

const CMA_ES = require('@rl-js/baseline-agents/cma-es');
const Gaussian = require('@rl-js/baseline-policies/gaussian');
const LinearStateValue = require('@rl-js/baseline-function-approximators/state-value/linear');
const Fourier = require('@rl-js/baseline-function-approximators/generic/linear/bases/fourier');

const ALPHA = 'alpha';
const STD = 'std';
const VARIANCE = 'policy_variance';
const POPULATION_SIZE = 'population_size';
const ORDER = 'order';

module.exports = new AgentBuilder({
  name: 'CMA-ES',
  id: 'cma-es',
  hyperparameters: [
    new Exponential({
      name: ALPHA,
      min: 0.00001,
      max: 0.3,
      default: 0.001,
    }),
    new Exponential({
      name: STD,
      min: 0.01,
      max: 10,
      default: 1,
    }),
    new Exponential({
      name: VARIANCE,
      min: 0.001,
      max: 10,
      default: 1,
    }),
    new Linear({
      name: POPULATION_SIZE,
      min: 2,
      max: 50,
      default: 10,
    }),
    new Discrete({
      name: ORDER,
      values: [1, 2, 3],
      default: 1,
    }),
  ],
  createAgent: (environmentFactory, hyperparameters) => {
    const variables = environmentFactory.getObservationCount();
    const [min, max] = environmentFactory.getActionRange();

    const basis = new Fourier({
      variables,
      order: hyperparameters[ORDER],
    });

    const functionApproximator = new LinearStateValue({
      basis,
      alpha: 0,
    });

    const policy = new Gaussian({
      functionApproximator,
      variance: hyperparameters[VARIANCE],
      min,
      max,
    });

    return new CMA_ES({
      policy,
      alpha: hyperparameters[ALPHA],
      std: hyperparameters[STD],
      population: hyperparameters[POPULATION_SIZE],
    });
  },
});
