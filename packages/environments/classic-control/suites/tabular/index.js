const EnvironmentSuite = require('@rl-js/configuration/environment-suite');
const EnvironmentBuilder = require('@rl-js/configuration/environment-builder');
const Tabular = require('@rl-js/configuration/environment-types/tabular');
const GridWorld3x3 = require('../../core/grid-world/3x3');
const GridWorld5x5 = require('../../core/grid-world/5x5');

module.exports = new EnvironmentSuite({
  name: 'Classic Control (Tabular)',
  id: 'classic-control-tabular',
  type: Tabular,
  builders: [
    new EnvironmentBuilder({
      id: 'grid-world-3x3',
      name: 'Grid World (3x3)',
      factory: new GridWorld3x3(),
    }),
    new EnvironmentBuilder({
      id: 'grid-world-5x5',
      name: 'Grid World (5x5)',
      factory: new GridWorld5x5(),
    }),
  ],
});
