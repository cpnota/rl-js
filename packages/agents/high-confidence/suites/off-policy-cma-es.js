const AgentBuilder = require('@rl-js/configuration/agent-builder');
const {
  Exponential,
  Linear,
  Discrete,
} = require('@rl-js/configuration/hyperparameters');

const SoftMax = require('@rl-js/baseline-policies/soft-max');
const LinearStateValue = require('@rl-js/baseline-function-approximators/state-value/linear');
const Fourier = require('@rl-js/baseline-function-approximators/generic/linear/bases/fourier');
const AgentSuite = require('@rl-js/configuration/agent-suite');
const DiscreteEnvironment = require('@rl-js/configuration/environment-types/discrete');
const CMA_ES = require('../agents/off-policy-cma-es');
const importanceSamplingEvaluators = require('../evaluators/importance-sampling');

const ALPHA = 'alpha';
const STD = 'std';
const POPULATION_SIZE = 'population_size';
const ORDER = 'order';
const EPISODES_PER_UPDATE = 'episodes_per_update';

const builder = evaluator => new AgentBuilder({
  name: `OP CMA-ES ${evaluator.name}`,
  id: `op-cma-es-${evaluator.name}`,
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
      default: 0.1,
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
    new Linear({
      name: EPISODES_PER_UPDATE,
      min: 1,
      max: 10,
      default: 5,
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
        alpha: hyperparameters[ALPHA],
      }),
      actions,
      alpha: hyperparameters[ALPHA],
    });

    return new CMA_ES({
      policy,
      std: hyperparameters[STD],
      alpha: hyperparameters[ALPHA],
      populationSize: hyperparameters[POPULATION_SIZE],
      episodesPerUpdate: hyperparameters[EPISODES_PER_UPDATE],
      evaluator,
    });
  },
});

module.exports = new AgentSuite({
  name: 'High Confidence',
  id: 'high-confidence',
  builders: Object.values(importanceSamplingEvaluators).map(builder),
  environmentType: DiscreteEnvironment,
});