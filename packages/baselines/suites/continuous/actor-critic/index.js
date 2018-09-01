const AgentBuilder = require('@rl-js/configuration/agent-builder');
const {
  Exponential,
  Linear,
  Discrete,
} = require('@rl-js/configuration/hyperparameters');

const ActorCritic = require('@rl-js/baseline-agents/actor-critic');
const Gaussian = require('@rl-js/baseline-policies/gaussian');
const LinearStateValue = require('@rl-js/baseline-function-approximators/state-value/linear');
const AccumulatingTraces = require('@rl-js/baseline-function-approximators/traces/accumulating');
const Fourier = require('@rl-js/baseline-function-approximators/generic/linear/bases/fourier');

const ALPHA_V = 'alpha_v';
const ALPHA_PI = 'alpha_pi';
const LAMBDA = 'lambda';
const ORDER = 'order';
const VARIANCE = 'variance';

module.exports = new AgentBuilder({
  name: 'Actor-Critic (λ)',
  id: 'actor-critic-lambda',
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
    new Linear({
      name: VARIANCE,
      min: 0.001,
      max: 10,
      default: 1,
    }),
    new Linear({
      name: LAMBDA,
      min: 0,
      max: 1,
      default: 0.5,
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

    const stateValueFunction = new LinearStateValue({
      basis,
      alpha: hyperparameters[ALPHA_PI],
    });

    const functionApproximator = new LinearStateValue({
      basis,
      alpha: hyperparameters[ALPHA_PI],
    });

    const stochasticPolicy = new Gaussian({
      functionApproximator,
      variance: hyperparameters[VARIANCE],
      min,
      max,
    });

    const stateTraces = new AccumulatingTraces(stateValueFunction);
    const policyTraces = new AccumulatingTraces(stochasticPolicy);

    return new ActorCritic({
      stateValueFunction,
      stateTraces,
      stochasticPolicy,
      policyTraces,
      lambda: hyperparameters[LAMBDA],
    });
  },
});
