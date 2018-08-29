const AgentBuilder = require('@rl-js/configuration/agent-builder');
const {
  Exponential,
  Linear,
  Discrete,
} = require('@rl-js/configuration/hyperparameters');

const SarsaLambda = require('@rl-js/baseline-agents/sarsa');
const EpsilonGreedy = require('@rl-js/baseline-policies/epsilon-greedy');
const TabularActionValue = require('@rl-js/baseline-function-approximators/action-value/tabular');
const LinearStateValue = require('@rl-js/baseline-function-approximators/state-value/linear');
const Fourier = require('@rl-js/baseline-function-approximators/generic/linear/bases/fourier');
const AccumulatingTraces = require('@rl-js/baseline-function-approximators/traces/accumulating');

const ALPHA = 'alpha';
const LAMBDA = 'lambda';
const ORDER = 'order';
const EPSILON = 'epsilon';

module.exports = new AgentBuilder({
  name: 'Sarsa (λ)',
  id: 'sarsa-lambda',
  hyperparameters: [
    new Exponential({
      name: ALPHA,
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
    new Linear({
      name: EPSILON,
      min: 0,
      max: 0.25,
      default: 0.1,
    }),
  ],
  createAgent: (environmentFactory, hyperparameters) => {
    const variables = environmentFactory.getObservationCount();
    const actions = environmentFactory.getActions();

    const basis = new Fourier({
      variables,
      order: hyperparameters[ORDER],
    });

    const actionValueFunction = new TabularActionValue({
      createStateValueFunction: () => new LinearStateValue({
        basis,
        alpha: hyperparameters[ALPHA],
      }),
      actions,
    });

    const policy = new EpsilonGreedy({
      actions,
      actionValueFunction,
      epsilon: hyperparameters[EPSILON],
    });

    const actionTraces = new AccumulatingTraces(actionValueFunction);

    return new SarsaLambda({
      actionValueFunction,
      actionTraces,
      policy,
      lambda: hyperparameters[LAMBDA],
    });
  },
});
