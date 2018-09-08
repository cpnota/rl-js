const AgentBuilder = require('@rl-js/configuration/agent-builder');
const {
  Exponential,
  Linear,
  Discrete,
} = require('@rl-js/configuration/hyperparameters');

const PPO = require('@rl-js/baseline-agents/ppo');
const FixedBatch = require('@rl-js/baseline-agents/ppo/batch-strategies/fixed');
const MinibatchSGD = require('@rl-js/baseline-agents/ppo/optimizers/minibatch-sgd');
const Gaussian = require('@rl-js/baseline-policies/gaussian');
const LinearStateValue = require('@rl-js/baseline-function-approximators/state-value/linear');
const Fourier = require('@rl-js/baseline-function-approximators/generic/linear/bases/fourier');

const ALPHA_V = 'alpha_v';
const ALPHA_PI = 'alpha_pi';
const VARIANCE = 'variance';
const MINIBATCH_SIZE = 'minibatch_size';
const BATCH_SIZE = 'batch_size';
const EPOCHS = 'epochs';
const ORDER = 'order';

module.exports = new AgentBuilder({
  name: 'PPO',
  id: 'ppo',
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
      name: MINIBATCH_SIZE,
      min: 1,
      max: 100,
      default: 10,
    }),
    new Linear({
      name: BATCH_SIZE,
      min: 2,
      max: 1000,
      default: 50,
    }),
    new Linear({
      name: EPOCHS,
      min: 1,
      max: 50,
      default: 5,
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
      alpha: hyperparameters[ALPHA_PI],
    });

    const policy = new Gaussian({
      functionApproximator,
      variance: hyperparameters[VARIANCE],
      min,
      max,
    });

    const stateValueFunction = new LinearStateValue({
      basis,
      alpha: hyperparameters[ALPHA_V],
    });

    return new PPO({
      policy,
      stateValueFunction,
      epsilon: 0.2,
      batchStrategy: new FixedBatch(hyperparameters[BATCH_SIZE]),
      optimizer: new MinibatchSGD({
        miniBatchSize: hyperparameters[MINIBATCH_SIZE],
        epochs: hyperparameters[EPOCHS],
      }),
    });
  },
});
