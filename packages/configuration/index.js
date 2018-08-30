const EnvironmentSuite = require('./environment-suite');
const AgentSuite = require('./agent-suite');

const agentSuites = [];
const environmentSuites = [];

const checkType = (object, type) => Object.getPrototypeOf(object).constructor.name === type.name;

module.exports = {
  registerAgentSuite: (suite) => {
    if (checkType(suite, AgentSuite)) {
      agentSuites.push(suite);
    } else {
      Object.values(suite)
        .map((maybeSuite) => {
          if (!(checkType(maybeSuite, AgentSuite))) {
            throw new TypeError(
              'Object must be instanceof AgentSuite, or array of AgentSuite',
            );
          }
          return maybeSuite;
        }).forEach(agentSuite => agentSuites.push(agentSuite));
    }
  },
  getAgentSuite: id => agentSuites.find(suite => suite.getId() === id),
  listAgentSuites: type => (type
    ? agentSuites.filter(
      suite => suite.getEnvironmentType().name === type.name,
    )
    : agentSuites),
  registerEnvironmentSuite: (suite) => {
    if (checkType(suite, EnvironmentSuite)) {
      environmentSuites.push(suite);
    } else {
      Object.values(suite)
        .map((maybeSuite) => {
          if (!checkType(maybeSuite, EnvironmentSuite)) {
            throw new TypeError(
              'Object must be instanceof EnvironmentSuite, or array of EnvironmentSuite',
            );
          }
          return maybeSuite;
        }).forEach(environmentSuite => environmentSuites.push(environmentSuite));
    }
  },
  getEnvironmentSuite: id => environmentSuites.find(suite => suite.getId() === id),
  listEnvironmentSuites: type => (type
    ? environmentSuites.filter(suite => suite.getType().name === type.name)
    : environmentSuites),
  agentSuites,
  environmentSuites,
};
