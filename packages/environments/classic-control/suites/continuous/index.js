const EnvironmentSuite = require('@rl-js/configuration/environment-suite');
const EnvironmentBuilder = require('@rl-js/configuration/environment-builder');
const ContinuousEnvironment = require('@rl-js/configuration/environment-types/continuous');
const PendulumFactory = require('../../core/pendulum');

module.exports = new EnvironmentSuite({
  name: 'Classic Control (Continuous)',
  id: 'classic-control-continuous',
  type: ContinuousEnvironment,
  builders: [
    new EnvironmentBuilder({
      id: 'pendulum',
      name: 'Pendulum',
      factory: new PendulumFactory(),
    }),
  ],
});
