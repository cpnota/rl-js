const AgentSuite = require('@rl-js/configuration/agent-suite');
const DiscreteEnvironment = require('@rl-js/configuration/environment-types/discrete');

module.exports = new AgentSuite({
  name: 'Coagents (Binary)',
  id: 'coagents-binary',
  builders: [
    require('./global-critic'),
    require('./local-critic'),
    require('./structural-advantage'),
    require('./gate'),
  ],
  environmentType: DiscreteEnvironment,
});
