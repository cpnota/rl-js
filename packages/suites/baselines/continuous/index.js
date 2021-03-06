const AgentSuite = require('@rl-js/configuration/agent-suite');
const ContinuousEnvironment = require('@rl-js/configuration/environment-types/continuous');

module.exports = new AgentSuite({
  name: 'Baselines Continuous',
  id: 'baseline-continuous',
  builders: [
    require('./actor-critic'),
    require('./cma-es'),
    require('./nac-td'),
    require('./ppo'),
  ],
  environmentType: ContinuousEnvironment,
});
