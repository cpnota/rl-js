const EnvironmentSuite = require('@rl-js/configuration/environment-suite');
const EnvironmentBuilder = require('@rl-js/configuration/environment-builder');
const DiscreteEnvironmentFactory = require('@rl-js/configuration/environment-types/discrete');

const AcrobotFactory = require('@rl-js/environments-classic-control-core/acrobot');
const CartPoleFactory = require('@rl-js/environments-classic-control-core/cart-pole');
const GridWorldFactory = require('@rl-js/environments-classic-control-core/grid-world/5x5/discrete');
const MountainCarFactory = require('@rl-js/environments-classic-control-core/mountain-car');
const PendulumFactory = require('@rl-js/environments-classic-control-core/pendulum/discrete');

module.exports = new EnvironmentSuite({
  name: 'Classic Control (Discrete)',
  id: 'classic-control-discrete',
  type: DiscreteEnvironmentFactory,
  builders: [
    new EnvironmentBuilder({
      id: 'acrobot',
      name: 'Acrobot',
      factory: new AcrobotFactory(),
    }),
    new EnvironmentBuilder({
      id: 'cart-pole',
      name: 'Cart-Pole',
      factory: new CartPoleFactory(),
    }),
    new EnvironmentBuilder({
      id: 'grid-world',
      name: 'Grid World (5x5)',
      factory: new GridWorldFactory(),
    }),
    new EnvironmentBuilder({
      id: 'mountain-car',
      name: 'Mountain Car',
      factory: new MountainCarFactory(),
    }),
    new EnvironmentBuilder({
      id: 'pendulum',
      name: 'Pendulum',
      factory: new PendulumFactory(),
    }),
  ],
});
