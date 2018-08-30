const AgentSuite = require('@rl-js/configuration/agent-suite');
const TabularEnvironment = require('@rl-js/configuration/environment-types/tabular');

module.exports = new AgentSuite({
  name: 'Baselines Tabular',
  id: 'baseline-tabular',
  builders: [
    require('./sarsa'),
  ],
  environmentType: TabularEnvironment,
});
