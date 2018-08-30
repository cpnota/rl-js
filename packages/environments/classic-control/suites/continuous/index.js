const EnvironmentSuite = require('@rl-js/configuration/environment-suite');
const EnvironmentBuilder = require('@rl-js/configuration/environment-builder');
const ContinuousEnvironment = require('@rl-js/configuration/environment-types/continuous');
const PendulumFactory = require('../../core/pendulum');
const MountainCarFactory = require('../../core/mountain-car/continuous');

module.exports = new EnvironmentSuite({
  name: 'Classic Control (Continuous)',
  id: 'classic-control-continuous',
  type: ContinuousEnvironment,
  builders: [
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
