const EnvironmentSuite = require('@rl-js/configuration/environment-suite');
const EnvironmentBuilder = require('@rl-js/configuration/environment-builder');
const Tabular = require('@rl-js/configuration/environment-types/tabular');
const GridWorldFactory = require('../../core/grid-world/5x5');

module.exports = new EnvironmentSuite({
  name: 'Classic Control (Tabular)',
  id: 'classic-control-tabular',
  type: Tabular,
  builders: [
    new EnvironmentBuilder({
      id: 'grid-world',
      name: 'Grid World (5x5)',
      factory: new GridWorldFactory(),
    }),
  ],
});
