const AgentSuite = require('@rl-js/configuration/agent-suite');
const ContinuousEnvironment = require('@rl-js/configuration/environment-types/continuous');

module.exports = new AgentSuite({
  name: 'Critic Actor',
  id: 'critic-actor',
  builders: [
    require('.'),
  ],
  environmentType: ContinuousEnvironment,
});
