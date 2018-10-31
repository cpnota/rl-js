const configuration = require('@rl-js/configuration');
const SimpleAgent = require('@rl-js/baseline-agents/simple');

const equal = (a, b) => {
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false;
  }

  return true;
};

const runEpisode = (agent, environmentFactory) => {
  const environment = environmentFactory.createEnvironment();
  agent.newEpisode(environment);

  let returns = 0;
  while (!environment.isTerminated()) {
    agent.act();
    returns += environment.getReward();
  }
  return returns;
};

const evaluate = (policy, environmentFactory) => {
  const n = 100;
  const agent = new SimpleAgent({ policy });
  let results = 0;
  for (let i = 0; i < n; i += 1) {
    results += runEpisode(agent, environmentFactory);
  }
  return results / n;
};

const run = async (agentFactory, environmentFactory, episodes) => {
  const results = [];
  const agent = agentFactory.createAgent();
  const { policy } = agent;
  const initialParameters = policy.getParameters();
  let newParameters;

  for (let episode = 0; episode < episodes; episode += 1) {
    /* run episodes one at a time, "yielding" between episodes */
    /* eslint-disable-next-line no-await-in-loop */
    const returns = await runEpisode(agent, environmentFactory);
    results.push(returns);
    newParameters = policy.getParameters();
    if (!equal(initialParameters, newParameters)) break;
  }

  policy.setParameters(initialParameters);
  const initialEvaluation = evaluate(policy, environmentFactory);
  policy.setParameters(newParameters);
  const newEvaluation = evaluate(policy, environmentFactory);

  return newEvaluation > initialEvaluation;
};

export default async ({
  agent, environment, episodes, hyperparameters,
}) => {
  const environmentFactory = configuration
    .getEnvironmentSuite(environment.suite)
    .getEnvironmentBuilder(environment.id)
    .buildFactory();

  const agentFactory = configuration
    .getAgentSuite(agent.suite)
    .getAgentBuilder(agent.id)
    .setEnvironmentFactory(environmentFactory)
    .setHyperparameters(hyperparameters)
    .buildFactory();

  return run(agentFactory, environmentFactory, episodes);
};
