const AgentSuite = require('@rl-js/configuration/agent-suite');
const DiscreteEnvironment = require('@rl-js/configuration/environment-types/discrete');

module.exports = new AgentSuite({
  name: 'Baseline LFA (discrete)',
  id: 'baseline-discrete-lfa',
  builders: [
    require('./sarsa-lambda'),
    require('./actor-critic-lambda'),
    require('./q-lambda'),
    require('./reinforce'),
  ],
  environmentType: DiscreteEnvironment,
});
