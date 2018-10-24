const configuration = require('@rl-js/configuration');
configuration.registerAgentSuite(require('@rl-js/high-confidence-agents/suites'));
configuration.registerEnvironmentSuite(require('@rl-js/environments-classic-control'));

configuration.listAgentSuites().forEach((agentSuite) => {
  const environmentType = agentSuite.getEnvironmentType();
  const environmentSuites = configuration.listEnvironmentSuites(environmentType);
  agentSuite.listAgents().forEach((agentBuilder) => {
    environmentSuites.forEach((environmentSuite) => {
      environmentSuite.listEnvironments().forEach((environmentBuilder) => {
        test(`${agentBuilder.getName()} | ${environmentSuite.getName()} | ${environmentBuilder.getName()}`,
          () => {
            const environmentFactory = environmentBuilder.buildFactory();
            const agentFactory = agentBuilder
              .setEnvironmentFactory(environmentFactory)
              .setHyperparameters({
                episodes_per_update: 1,
              })
              .buildFactory();

            const agent = agentFactory.createAgent();

            for (let e = 0; e < 5; e += 1) {
              const environment = environmentFactory.createEnvironment();
              agent.newEpisode(environment);

              for (let t = 0; t < 3; t += 1) {
                agent.act();
              }
            }
          });
      });
    });
  });
});
