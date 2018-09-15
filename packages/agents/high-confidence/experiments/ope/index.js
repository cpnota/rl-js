/* 3x3 grid world OPE */
const GridWorldFactory = require('@rl-js/environments-classic-control/core/grid-world/3x3/discrete');
const { discrete } = require('@rl-js/baseline-agent-suites');
const math = require('mathjs');
const ImportanceSampling = require('../../evaluators/importance-sampling');
const generateTrajectories = require('./generator');
const train = require('./train');

const environmentFactory = new GridWorldFactory();

const agentFactory = discrete
  .getAgentBuilder('sarsa-lambda')
  .setEnvironmentFactory(environmentFactory)
  .buildFactory();

const behaviorPolicy = agentFactory.createAgent().policy;

const evaluationPolicy = train({
  agent: agentFactory.createAgent(),
  environmentFactory,
  trials: 50,
});

const scores = {};

const samples = 500;
for (let i = 0; i < samples; i += 1) {
  // console.log(`${i * 100 / samples}%`);
  const trajectories = generateTrajectories({
    policy: behaviorPolicy,
    environmentFactory,
    trials: 1000,
    horizon: 20,
  });

  Object.keys(ImportanceSampling).forEach((estimator) => {
    const evaluate = ImportanceSampling[estimator];
    const score = evaluate({
      trajectories,
      policy: evaluationPolicy,
    });
    scores[estimator] = (scores[estimator] || []).concat(score);
  });
}

Object.keys(ImportanceSampling).forEach((estimator) => {
  const results = scores[estimator];
  scores[estimator] = {
    mean: math.mean(results),
    std: math.std(results),
  };
});

console.log(scores);
