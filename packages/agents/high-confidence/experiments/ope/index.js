/* 3x3 grid world OPE */
const GridWorldFactory = require('@rl-js/environments-classic-control/core/grid-world/3x3/discrete');
const { discrete } = require('@rl-js/baseline-agent-suites');
const ImportanceSampling = require('../../evaluators/importance-sampling');
const generateTrajectories = require('./generator');
const train = require('./train');

const environmentFactory = new GridWorldFactory();

const agentFactory = discrete
  .getAgentBuilder('sarsa-lambda')
  .setEnvironmentFactory(environmentFactory)
  .buildFactory();


const trajectories = generateTrajectories({
  policy: agentFactory.createAgent().policy,
  environmentFactory,
  trials: 10,
  horizon: 20,
});

console.log({ trajectories: JSON.stringify(trajectories) });

// const evaluationPolicy = train({
//   agent: agentFactory.createAgent(),
//   environmentFactory,
//   trials: 50,
//   horizon: 20,
// });
