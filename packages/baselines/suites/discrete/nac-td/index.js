const AgentBuilder = require('@rl-js/configuration/agent-builder');
const {
  Exponential,
  Linear,
  Discrete,
} = require('@rl-js/configuration/hyperparameters');

const NAC_TD = require('@rl-js/baseline-agents/nac-td');
const SoftMax = require('@rl-js/baseline-policies/soft-max');
const LinearStateValue = require('@rl-js/baseline-function-approximators/state-value/linear');
const AccumulatingTraces = require('@rl-js/baseline-function-approximators/traces/accumulating');
const Fourier = require('@rl-js/baseline-function-approximators/generic/linear/bases/fourier');

const ALPHA_V = 'alpha_v';
const ALPHA_PI = 'alpha_pi';
const LAMBDA = 'lambda';
const ORDER = 'order';

module.exports = new AgentBuilder({
  name: 'NAC TD (λ)',
  id: 'nac-td',
  hyperparameters: [
    new Exponential({
      name: ALPHA_V,
      min: 0.00001,
      max: 0.3,
      default: 0.02,
    }),
    new Exponential({
      name: ALPHA_PI,
      min: 0.00001,
      max: 0.3,
      default: 0.02,
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
    const actions = environmentFactory.getActions();

    const basis = new Fourier({
      variables,
      order: hyperparameters[ORDER],
    });

    const policy = new SoftMax({
      createStateValueFunction: () => new LinearStateValue({
        basis,
        alpha: hyperparameters[ALPHA_PI],
      }),
      actions,
      alpha: hyperparameters[ALPHA_PI],
    });

    const stateValueFunction = new LinearStateValue({
      basis,
      alpha: hyperparameters[ALPHA_V],
    });

    const createAdvantageTraces = functionApproximator => new AccumulatingTraces(functionApproximator);

    const stateTraces = new AccumulatingTraces(stateValueFunction);

    return new NAC_TD({
      alpha_w: hyperparameters[ALPHA_V],
      createAdvantageTraces,
      lambda: hyperparameters[LAMBDA],
      policy,
      stateValueFunction,
      stateTraces,
      update_frequency: 1,
    });
  },
});
