const configuration = require('@rl-js/configuration');
configuration.registerAgentSuite(require('@rl-js/baseline-agent-suites'));
configuration.registerEnvironmentSuite(require('@rl-js/environments-classic-control'));

const TIMESTEPS = 2000;

console.time('benchmark');
configuration.listAgentSuites().forEach((agentSuite) => {
  const environmentType = agentSuite.getEnvironmentType();
  const environmentSuites = configuration.listEnvironmentSuites(environmentType);
  agentSuite.listAgents().forEach((agentBuilder) => {
    environmentSuites.forEach((environmentSuite) => {
      environmentSuite.listEnvironments().forEach((environmentBuilder) => {
        const name = `${agentBuilder.getName()} | ${environmentSuite.getName()} | ${environmentBuilder.getName()}`;
        console.time(name);
        try {
          const environmentFactory = environmentBuilder.buildFactory();
          const agentFactory = agentBuilder
            .setEnvironmentFactory(environmentFactory)
            .buildFactory();

          const environment = environmentFactory.createEnvironment();
          const agent = agentFactory.createAgent();
          agent.newEpisode(environment);

          for (let t = 0; t < TIMESTEPS; t += 1) {
            agent.act();
            if (environment.isTerminated()) {
              agent.newEpisode(environmentFactory.createEnvironment());
            }
          }
          console.timeEnd(name);
        } catch (error) {
          // console.error(error);
          console.timeEnd(name);
        }
      });
    });
  });
});
console.timeEnd('benchmark');
