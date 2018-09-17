/* 3x3 grid world OPE */
const GridWorldFactory = require('@rl-js/environments-classic-control/core/grid-world/3x3/discrete');
const { discrete } = require('@rl-js/baseline-agent-suites');
const math = require('mathjs');
const ImportanceSampling = require('../../evaluators/importance-sampling');
const generateTrajectories = require('./generator');
const train = require('./train');
const evaluate = require('./evaluate');

const environmentFactory = new GridWorldFactory();

const agentFactory = discrete
  .getAgentBuilder('actor-critic-lambda')
  .setEnvironmentFactory(environmentFactory)
  .buildFactory();

const behaviorPolicy = agentFactory.createAgent().policy;

const agent = train({
  agent: agentFactory.createAgent(),
  environmentFactory,
  trials: 50,
});

const evaluationPolicy = agent.policy;
const v = agent.stateValueFunction;

const samples = 100;
const trials = 100;

const onPolicyEstimate = evaluate({
  policy: evaluationPolicy,
  environmentFactory,
  trials: 1000,
  horizon: 20,
});

const scores = {};

// const estimators = Object.keys(ImportanceSampling);
const estimators = ['importanceSampling', 'tdImportanceSampling', 'residualImportanceSampling', 'safeResidualImportanceSampling'];

for (let i = 0; i < samples; i += 1) {
  console.log(`${i * 100 / samples}%`);
  const trajectories = generateTrajectories({
    policy: behaviorPolicy,
    environmentFactory,
    trials,
    horizon: 20,
  });

  estimators.forEach((estimator) => {
  // Object.keys(ImportanceSampling).forEach((estimator) => {
    const evaluate = ImportanceSampling[estimator];
    const score = evaluate({
      trajectories,
      policy: evaluationPolicy,
      v,
    });
    scores[estimator] = (scores[estimator] || []).concat(score);
  });
}

estimators.forEach((estimator) => {
  const results = scores[estimator];
  scores[estimator] = {
    mean: math.mean(results),
    std: math.std(results),
  };
});

console.log({ onPolicyEstimate });
console.log(scores);
