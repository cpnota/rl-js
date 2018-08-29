const configuration = require('@rl-js/configuration');

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

const run = async (agentFactory, environmentFactory, episodes) => {
  const results = [];
  const agent = agentFactory.createAgent();

  for (let episode = 0; episode < episodes; episode += 1) {
    /* run episodes one at a time, "yielding" between episodes */
    /* eslint-disable-next-line no-await-in-loop */
    const returns = await runEpisode(agent, environmentFactory);
    results.push(returns);
  }

  return results;
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
