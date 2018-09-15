module.exports = ({
  agent,
  environmentFactory,
  trials,
}) => {
  for (let t = 0; t < trials; t += 1) {
    const environment = environmentFactory.createEnvironment();
    agent.newEpisode(environment);
    while (!environment.isTerminated()) {
      agent.act();
    }
  }
  return agent.policy;
};
