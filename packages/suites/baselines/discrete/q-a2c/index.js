const AgentBuilder = require('@rl-js/configuration/agent-builder');
const {
  Exponential,
  Linear,
  Discrete,
} = require('@rl-js/configuration/hyperparameters');

const QActorCritic = require('@rl-js/baseline-agents/q-a2c');
const SoftMax = require('@rl-js/baseline-policies/soft-max');
const LinearStateValue = require('@rl-js/baseline-function-approximators/state-value/linear');
const TabularActionValue = require('@rl-js/baseline-function-approximators/action-value/tabular');
const AccumulatingTraces = require('@rl-js/baseline-function-approximators/traces/accumulating');
const Fourier = require('@rl-js/baseline-function-approximators/generic/linear/bases/fourier');

const ALPHA_Q = 'alpha_q';
const ALPHA_PI = 'alpha_pi';
const LAMBDA = 'lambda';
const ORDER = 'order';

module.exports = new AgentBuilder({
  name: 'Q-a2c',
  id: 'q-actor-critic-lambda',
  hyperparameters: [
    new Exponential({
      name: ALPHA_Q,
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

    const policyTraces = new AccumulatingTraces(policy);

    const actionValueFunction = new TabularActionValue({
      createStateValueFunction: () => new LinearStateValue({
        basis,
        alpha: hyperparameters[ALPHA_Q],
      }),
      actions,
    });

    const actionTraces = new AccumulatingTraces(actionValueFunction);

    return new QActorCritic({
      actionValueFunction,
      actionTraces,
      policy,
      policyTraces,
      lambda: hyperparameters[LAMBDA],
    });
  },
});
