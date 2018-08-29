const Interfaces = require('./index');

test('loads required modules', () => {
  const modules = [
    'ActionValueFunction',
    'ActionTraces',
    'Agent',
    'AgentFactory',
    'Environment',
    'EnvironmentFactory',
    'FunctionApproximator',
    'Policy',
    'PolicyTraces',
    'StateValueFunction',
    'StateTraces',
  ];

  modules.forEach(module => expect(Interfaces[module]).not.toBeUndefined());
});
