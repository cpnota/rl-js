const AgentBuilder = require('@rl-js/configuration/agent-builder');
const {
  Exponential,
  Linear,
  Discrete,
} = require('@rl-js/configuration/hyperparameters');

const NAC_TD = require('@rl-js/baseline-agents/nac-td');
const Gaussian = require('@rl-js/baseline-policies/gaussian');
const LinearStateValue = require('@rl-js/baseline-function-approximators/state-value/linear');
const AccumulatingTraces = require('@rl-js/baseline-function-approximators/traces/accumulating');
const Fourier = require('@rl-js/baseline-function-approximators/generic/linear/bases/fourier');

const ALPHA_V = 'alpha_v';
const ALPHA_A = 'alpha_a';
const ALPHA_PI = 'alpha_pi';
const LAMBDA = 'lambda';
const ORDER = 'order';
const VARIANCE = 'variance';

module.exports = new AgentBuilder({
  name: 'NAC TD (λ)',
  id: 'nac-td',
  hyperparameters: [
    new Exponential({
      name: ALPHA_V,
      min: 0.00001,
      max: 0.3,
      default: 0.001,
    }),
    new Exponential({
      name: ALPHA_A,
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

    const policy = new Gaussian({
      functionApproximator: new LinearStateValue({
        basis,
        alpha: hyperparameters[ALPHA_PI],
      }),
      variance: hyperparameters[VARIANCE],
      min,
      max,
    });

    const stateValueFunction = new LinearStateValue({
      basis,
      alpha: hyperparameters[ALPHA_V],
    });

    const createAdvantageTraces = advantageFunction => new AccumulatingTraces(advantageFunction);
    const stateTraces = new AccumulatingTraces(stateValueFunction);

    return new NAC_TD({
      alpha_w: hyperparameters[ALPHA_A],
      createAdvantageTraces,
      lambda: hyperparameters[LAMBDA],
      policy,
      stateValueFunction,
      stateTraces,
      update_frequency: 1,
    });
  },
});
