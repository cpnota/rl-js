const AgentBuilder = require('@rl-js/configuration/agent-builder');
const { Exponential, Linear } = require('@rl-js/configuration/hyperparameters');
const SarsaLambda = require('@rl-js/baseline-agents/sarsa');
const EpsilonGreedy = require('@rl-js/baseline-policies/epsilon-greedy');
const TabularActionValue = require('@rl-js/baseline-function-approximators/action-value/tabular');
const TabularStateValue = require('@rl-js/baseline-function-approximators/state-value/tabular');
const AccumulatingTraces = require('@rl-js/baseline-function-approximators/traces/accumulating');

const ALPHA = 'alpha';
const LAMBDA = 'lambda';
const EPSILON = 'epsilon';

module.exports = new AgentBuilder({
  name: 'Sarsa (λ)',
  id: 'sarsa-tabular',
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
    new Linear({
      name: EPSILON,
      min: 0,
      max: 0.25,
      default: 0.1,
    }),
  ],
  createAgent: (environmentFactory, hyperparameters) => {
    const actions = environmentFactory.getActions();
    const states = environmentFactory.getStates();
    const defaultValues = [];
    states.forEach(state => defaultValues.push([state, 0]));

    const actionValueFunction = new TabularActionValue({
      createStateValueFunction: () => new TabularStateValue({
        alpha: hyperparameters[ALPHA],
        defaultValues,
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
