const AgentBuilder = require('@rl-js/configuration/agent-builder');
const {
  Exponential,
  Linear,
  Discrete,
} = require('@rl-js/configuration/hyperparameters');

const Gaussian = require('@rl-js/baseline-policies/gaussian');
const UnclippedGaussian = require('@rl-js/baseline-policies/gaussian/unclipped');
const LinearStateValue = require('@rl-js/baseline-function-approximators/state-value/linear');
const Fourier = require('@rl-js/baseline-function-approximators/generic/linear/bases/fourier');
const CriticActor = require('../../networks/critic-actor');

const ALPHA_V = 'alpha_v';
const ALPHA_C = 'alpha_c';
const ALPHA_PI = 'alpha_pi';
const LAMBDA = 'lambda';
const ORDER = 'order';
const VARIANCE = 'variance';

module.exports = new AgentBuilder({
  name: 'Critic-Actor',
  id: 'critic-actor',
  hyperparameters: [
    new Exponential({
      name: ALPHA_V,
      min: 0.00001,
      max: 0.3,
      default: 0.001,
    }),
    new Exponential({
      name: ALPHA_C,
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

    const actorPolicy = new Gaussian({
      functionApproximator: new LinearStateValue({
        basis,
        alpha: hyperparameters[ALPHA_PI],
      }),
      variance: hyperparameters[VARIANCE],
      min,
      max,
    });

    const criticPolicy = new UnclippedGaussian({
      functionApproximator: new LinearStateValue({
        basis,
        alpha: hyperparameters[ALPHA_C],
      }),
      variance: 1,
    });

    const globalCritic = new LinearStateValue({
      basis,
      alpha: hyperparameters[ALPHA_V],
    });

    return new CriticActor({
      actorPolicy,
      criticPolicy,
      globalCritic,
    });
  },
});
