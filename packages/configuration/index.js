const agentSuites = [];
const environmentSuites = [];

module.exports = {
  registerAgentSuite: suite => agentSuites.push(suite),
  getAgentSuite: id => agentSuites.find(suite => suite.getId() === id),
  listAgentSuites: type => (type
    ? agentSuites.filter(
      suite => suite.getEnvironmentType().name === type.name,
    )
    : agentSuites),
  registerEnvironmentSuite: suite => environmentSuites.push(suite),
  getEnvironmentSuite: id => environmentSuites.find(suite => suite.getId() === id),
  listEnvironmentSuites: type => (type
    ? environmentSuites.filter(suite => suite.getType().name === type.name)
    : environmentSuites),
  agentSuites,
  environmentSuites,
};
