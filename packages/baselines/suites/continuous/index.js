const AgentSuite = require('@rl-js/configuration/agent-suite');
const ContinuousEnvironment = require('@rl-js/configuration/environment-types/continuous');

module.exports = new AgentSuite({
  name: 'Baselines Continuous',
  id: 'baseline-continuous',
  builders: [
    require('./actor-critic'),
  ],
  environmentType: ContinuousEnvironment,
});
