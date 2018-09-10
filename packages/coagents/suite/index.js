const AgentSuite = require('@rl-js/configuration/agent-suite');
const DiscreteEnvironment = require('@rl-js/configuration/environment-types/discrete');

module.exports = new AgentSuite({
  name: 'Coagents (Two-Layer LFA)',
  id: 'coagents-2-layer-lfa',
  builders: [
    require('./global-critic'),
  ],
  environmentType: DiscreteEnvironment,
});
